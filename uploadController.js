// backend/controllers/uploadController.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup for local temp uploads
const upload = multer({ dest: 'uploads/' });

exports.uploadFile = [
  upload.single('file'),
  async (req, res) => {
    try {
      const file = req.file;
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'gharcare_uploads'
      });

      // Delete the local file after upload
      fs.unlinkSync(file.path);

      res.json({
        success: true,
        url: result.secure_url
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
];
