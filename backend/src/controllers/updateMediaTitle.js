exports.updateTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!id) return res.status(400).json({ message: 'Missing id' });
    if (typeof description !== 'string') return res.status(400).json({ message: 'Missing or invalid description' });

    const updated = await require('../models/Media').findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Media not found' });
    return res.json({ updated: true, item: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
