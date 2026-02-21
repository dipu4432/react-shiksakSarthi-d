import { useState, useEffect } from "react";
import "./image.css";
import { useAuth } from "../designIdeas/context/userContext";

const API = import.meta.env.VITE_API_URL || "https://react-shiksak-sarthi-d.vercel.app/";

export default function KitchenDesign() {
  const [images, setImages] = useState([]);     // uploaded images
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Desktop default = 3
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState({}); // { [imgId]: boolean }
  const [titleEdits, setTitleEdits] = useState({}); // { [imgId]: string }
  const [originalTitles, setOriginalTitles] = useState({}); // { [imgId]: string }
  const [pendingImageEdits, setPendingImageEdits] = useState({}); // { [imgId]: { file, previewUrl } }

  const { user } = useAuth();

  useEffect(() => {
    fetchImages();
  }, []);

  // Responsive images count
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1); // Mobile = 1 image
      } else {
        setVisibleCount(3); // Desktop = 3 images
      }
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  async function fetchImages() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/media?category=kitchen`);
      const data = await res.json();

      const uploadedImages = data.items.map((item) => ({
        id: item._id,
        url: item.url,
        description: item.description,
      }));

      // const resources = data.resources || [];

      // // take only images
      // const uploadedImages = resources
      //   .filter((r) => r.resource_type === "image")
      //   .map((r) => ({
      //     id: r.asset_id || r.public_id,
      //     url: r.secure_url,
      //   }));

      setImages(uploadedImages);
      // Store original titles for reset
      const origTitles = {};
      uploadedImages.forEach(img => {
        origTitles[img.id] = img.description || "";
      });
      setOriginalTitles(origTitles);
      setTitleEdits({}); // Reset edits on fetch
    } catch (err) {
      console.error("Failed to load images", err);
    } finally {
      setLoading(false);
    }
  }

  // Next Slide
  const next = () => {
    setStartIndex((prev) => (prev + 1) % images.length);
  };

  // Previous Slide
  const prev = () => {
    setStartIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Compute visible images dynamically
  const visibleImages = Array.from({ length: visibleCount }).map(
    (_, i) => images[(startIndex + i) % images.length]
  );

  // Change slide by clicking dot
  const goToSlide = (i) => setStartIndex(i);

  // Inline image upload handler
  // Only preview image, don't upload yet
  function handleImageChange(imgId, e) {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPendingImageEdits(prev => ({ ...prev, [imgId]: { file, previewUrl } }));
  }

  // Save image and title to server
  async function handleSaveImage(imgId) {
    const pending = pendingImageEdits[imgId];
    if (!pending) return;
    setUploading((prev) => ({ ...prev, [imgId]: true }));
    try {
      const formData = new FormData();
      formData.append("category", "kitchen");
      formData.append("file", pending.file);
      // Use edited title if present, otherwise fallback to previous/original title
      const titleToSave =
        titleEdits[imgId] !== undefined
          ? titleEdits[imgId]
          : (originalTitles[imgId] !== undefined ? originalTitles[imgId] : "");
      formData.append("description", titleToSave);
      const res = await fetch(`${API}/api/media/replace/${imgId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.replaced) {
        await fetchImages();
        setPendingImageEdits(prev => { const copy = { ...prev }; delete copy[imgId]; return copy; });
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      alert("Failed to upload image");
    } finally {
      setUploading((prev) => ({ ...prev, [imgId]: false }));
    }
  }

  return (
    <div className="container text-center mb-3">
      <h2 className="fw-semibold mt-4 mb-4">Smart Modular Kitchen Designs</h2>
      {/* Edit mode toggle */}
      {user && (
        <div className="mb-3 text-end">
          <button className="btn btn-primary" onClick={() => setEditMode((v) => !v)}>
            {editMode ? "Done Editing" : "Change Images"}
          </button>
        </div>
      )}
      {loading && <div>Loading images...</div>}
      {!loading && images.length === 0 && <div>No images found</div>}
      {images.length > 0 && (
        <>
          <div className="position-relative">
            <button
              onClick={prev}
              className="btn btn-light shadow rounded-circle position-absolute top-50 start-0 translate-middle-y"
              style={{ zIndex: 10 }}
            >
              ❮
            </button>
            <div className="d-flex justify-content-center gap-3">
              {visibleImages.map((img) => (
                <div key={img.id} style={{ width: visibleCount === 1 ? "90%" : "30%" }}>
                  <div className="image-box position-relative">
                    <img src={pendingImageEdits[img.id]?.previewUrl || img.url} className="image-full" alt="Uploaded" />
                    {editMode && (
                      <div className="edit-overlay d-flex flex-column align-items-center justify-content-center">
                        <label className="btn btn-secondary mb-2">
                          {uploading[img.id] ? "Uploading..." : "Change Image"}
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            disabled={uploading[img.id]}
                            onChange={(e) => handleImageChange(img.id, e)}
                          />
                        </label>
                        {pendingImageEdits[img.id] && (
                          <button
                            className="btn btn-success btn-sm mb-2"
                            disabled={uploading[img.id]}
                            onClick={() => handleSaveImage(img.id)}
                          >Save Image</button>
                        )}
                        {/* Title edit input */}
                        <input
                          className="form-control mb-2"
                          type="text"
                          value={titleEdits[img.id] !== undefined ? titleEdits[img.id] : img.description || ""}
                          onChange={e => setTitleEdits(edits => ({ ...edits, [img.id]: e.target.value }))}
                          placeholder="Edit image title"
                          style={{ maxWidth: 180 }}
                        />
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm"
                            disabled={uploading[img.id] || (titleEdits[img.id] === undefined || titleEdits[img.id] === img.description)}
                            onClick={async () => {
                              setUploading(prev => ({ ...prev, [img.id]: true }));
                              try {
                                const res = await fetch(`${API}/api/media/update-title/${img.id}`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ description: titleEdits[img.id] })
                                });
                                const data = await res.json();
                                if (data.updated) {
                                  await fetchImages();
                                } else {
                                  alert("Failed to update title");
                                }
                              } catch (err) {
                                alert("Failed to update title");
                              } finally {
                                setUploading(prev => ({ ...prev, [img.id]: false }));
                              }
                            }}
                          >Save Title</button>
                          <button
                            className="btn btn-warning btn-sm"
                            disabled={uploading[img.id] || (titleEdits[img.id] === undefined || titleEdits[img.id] === originalTitles[img.id])}
                            onClick={() => setTitleEdits(edits => ({ ...edits, [img.id]: originalTitles[img.id] }))}
                          >Reset</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={next}
              className="btn btn-light shadow rounded-circle position-absolute top-50 end-0 translate-middle-y"
              style={{ zIndex: 10 }}
            >
              ❯
            </button>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-2">
            {visibleImages.map((img) => (
              <p
                key={img.id}
                className="text-muted text-center"
                style={{ width: visibleCount === 1 ? "90%" : "30%" }}
              >
                {editMode
                  ? (titleEdits[img.id] !== undefined ? titleEdits[img.id] : img.description || "")
                  : img.description}
              </p>
            ))}
          </div>
        </>
      )}
      {visibleCount === 1 && images.length > 0 && (
        <div className="d-flex justify-content-center mt-2 gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: i === startIndex ? "12px" : "10px",
                height: i === startIndex ? "12px" : "10px",
                borderRadius: "50%",
                backgroundColor:
                  i === startIndex ? "#6c757d" : "#d3d3d3",
                cursor: "pointer",
                transition: "0.3s",
              }}
            />
          ))}
        </div>
      )}
      <div className="container mt-4">
        {/* <button  className="btn btn-danger shadow-sm" data-bs-dismiss="offcanvas">
              Book A Free Consultation
          </button> */}
      </div>
      {/* Add overlay styling for edit mode */}
      <style>{`
        .edit-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 20;
        }
      `}</style>
    </div>
  );
}
