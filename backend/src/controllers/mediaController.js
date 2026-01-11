const { cloudinary } = require('../config/cloudinary');
const Media = require('../models/Media');

// allowed upload categories (radio buttons)
const ALLOWED_CATEGORIES = ['kitchen', 'bedroom', 'livingroom', 'bathroom'];

// Uploads one or multiple files (multer memoryStorage) to Cloudinary
exports.upload = async (req, res, next) => {
  // console.log(" UPLOAD CONTROLLER HIT ");
  // Normalize category from frontend
const rawCategory = req.body.category;

// normalize: lowercase + remove spaces
const normalizedCategory = rawCategory
  ? rawCategory.toLowerCase().replace(/\s+/g, '')
  : null;
  
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No files uploaded' });

    // Validate category from frontend (radio button)
    const category = ALLOWED_CATEGORIES.includes(normalizedCategory)
      ? normalizedCategory
      : 'others';

      // console.log("UPLOAD CATEGORY:", req.body.category);

      // console.log("FINAL CATEGORY:", category);

    const results = [];

      const uploadSingle = (file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: `siksha/${category}` }, async (error, result) => {
            if (error) return reject(error);
            try {
              // Build MongoDB document data
              const docData = {
                url: result.secure_url,
                public_id: result.public_id,
                category,
                format: result.format,
                resource_type: result.resource_type,
                bytes: result.bytes,
                width: result.width,
                height: result.height,
                uploadedBy: req.user ? req.user.id : undefined,
                // accept optional description or other text fields sent in the multipart form
                description: req.body && req.body.description ? req.body.description : undefined
              };

              // Persist to MongoDB so we track uploads and uploader
              const created = await Media.create(docData);

              resolve(created);
            } catch (e) {
              // If saving to DB fails, still return the Cloudinary result shape as a fallback
              const fallback = {
                url: result.secure_url,
                // description: result.description,
                public_id: result.public_id,
                format: result.format,
                resource_type: result.resource_type,
                bytes: result.bytes,
                width: result.width,
                height: result.height,
                uploadedBy: req.user ? req.user.id : undefined,
                description: req.body && req.body.description ? req.body.description : undefined,
                createdAt: new Date()
              };
              // log and resolve fallback so upload doesn't fail silently
              console.error('Failed to save Media document', e && e.message ? e.message : e);
              resolve(fallback);
            }
          });
          stream.end(file.buffer);
        });

      for (const file of req.files) {
        // eslint-disable-next-line no-await-in-loop
        const r = await uploadSingle(file);
        results.push(r);
      }

      return res.status(201).json({ uploaded: results });
  } catch (err) {
    next(err);
  }
};

/*
exports.list = async (req, res, next) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    // console.log("LIST FILTER:", filter);
    
    const items = await Media.find(filter).sort({ createdAt: -1 })
    .limit(100)
    // populate user info ( optional fields)
    .populate('uploadedBy', 'name email');

    // If no filtered data found → return all data
    if (items.length === 0) {
      items = await Media.find(false)
        .sort({ createdAt: -1 })
        .limit(100)
        .populate('uploadedBy', 'name email');
    }

    res.json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
};
*/
exports.list = async (req, res) => {
  try {
    let { category } = req.query;

    // normalize category
    if (!category || category === "all" || category === "undefined") {
      category = null;
    }

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const items = await Media.find(filter)
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("uploadedBy", "name email");

    res.json({
      count: items.length,
      items,
    });

  } catch (err) {
    console.error("MEDIA LIST ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};




// Optional: directly list Cloudinary resources (requires API key/secret)
exports.listCloudinary = async (req, res, next) => {
  try {
  // List only resources uploaded under the 'siksha' folder
  // use prefix to restrict results to that folder. Include trailing slash to match folder path.
  // Cloudinary requires the `type` parameter (e.g. 'upload') when listing resources.
  const resources = await cloudinary.api.resources({ max_results: 50, prefix: 'siksha/', type: 'upload' });
    res.json(resources);
  } catch (err) {
    next(err);
  }
};

// // Delete a Media resource by id: remove from Cloudinary and MongoDB.
// // Only the uploader (or an admin in future) may delete their uploads.
// exports.delete = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ message: 'Missing id' });

//     const media = await Media.findById(id);
//     if (!media) return res.status(404).json({ message: 'Media not found' });

//     // Authorization: only the uploader can delete
//     if (media.uploadedBy && req.user && media.uploadedBy.toString() !== req.user.id.toString()) {
//       return res.status(403).json({ message: 'Forbidden: not the owner' });
//     }

//     // Attempt to remove from Cloudinary if public_id present
//     if (media.public_id) {
//       try {
//         // set resource_type if available; default to 'image'
//         const resourceType = media.resource_type || 'image';
//         // cloudinary.v2.uploader.destroy supports resource_type option for videos
//         await cloudinary.uploader.destroy(media.public_id, { resource_type: resourceType });
//       } catch (e) {
//         // Log but continue to delete DB record to avoid orphaned entries blocking users
//         console.error('Cloudinary delete error', e && e.message ? e.message : e);
//       }
//     }

//     await Media.findByIdAndDelete(id);

//     return res.json({ message: 'Deleted', id });
//   } catch (err) {
//     next(err);
//   }
// };

// Delete a Media resource by public_id (Cloudinary-safe)
// Only uploader (or admin later) can delete
exports.delete = async (req, res, next) => {
  try {
    // const { public_id } = req.params;
    const { public_id } = req.query;

    // id here = Cloudinary public_id (e.g. siksha/kitchen/fw2n)
    if (!public_id) {
      return res.status(400).json({ message: 'Missing public_id' });
    }

    //  Find media by public_id (NOT Mongo _id)
    const media = await Media.findOne({ public_id });

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Authorization: only uploader can delete
    // if (
    //   media.uploadedBy &&
    //   req.user &&
    //   media.uploadedBy.toString() !== req.user.id.toString()
    // ) {
    //   return res.status(403).json({ message: 'Forbidden: not the owner' });
    // }

    //  Delete from Cloudinary
    try {
      const resourceType = media.resource_type || 'image';

      await cloudinary.uploader.destroy(media.public_id, {
        resource_type: resourceType
      });
    } catch (cloudErr) {
      // Log Cloudinary error but DO NOT block DB delete
      console.error(
        'Cloudinary delete failed:',
        cloudErr?.message || cloudErr
      );
    }

    // Delete from MongoDB
    await Media.deleteOne({ public_id });

    return res.json({
      message: 'Deleted successfully',
      public_id
    });
  } catch (err) {
    next(err);
  }
};
