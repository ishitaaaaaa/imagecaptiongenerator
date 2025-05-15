const generateCaption = (req, res) => {
  try {
    console.log("req.file:", req.file); // Log to verify multer is working

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = req.file.path;
    console.log("Image Path:", imagePath);
    console.log("Received file:", req.file);
    console.log("Body:", req.body);

    res.json({ caption: `This is a caption for ${req.file.originalname}` });
  } catch (error) {
    console.error("Error generating caption:", error);
    res.status(500).json({ error: "Failed to generate caption" });
  }
};

module.exports = { generateCaption };
