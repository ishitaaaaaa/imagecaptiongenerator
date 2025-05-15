const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config(); // Load variables from .env

const router = express.Router();

// Use .env or fallback to default
const uploadPath = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');

// ✅ Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log(`Created upload directory at: ${uploadPath}`);
}

// ✅ Multer setup using environment path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // or use process.env.UPLOAD_DIR
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Configure multer middleware with limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// ✅ Controller import
const { generateCaption } = require('../controllers/captioncontroller');

// ✅ Route for uploading image and generating caption
router.post('/caption', upload.single('image'), generateCaption);

module.exports = router;
