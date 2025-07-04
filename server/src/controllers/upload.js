import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload file to Cloudinary
// @route   POST /api/v1/upload
// @access  Private
export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Determine resource type based on file type
    let resourceType = 'auto';
    if (req.file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    } else if (req.file.mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else {
      resourceType = 'raw'; // For documents
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: 'publiccare',
          transformation: resourceType === 'image' ? [
            { width: 1200, height: 1200, crop: 'limit', quality: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    // Determine file type for our system
    let fileType = 'document';
    if (req.file.mimetype.startsWith('image/')) {
      fileType = 'image';
    } else if (req.file.mimetype.startsWith('video/')) {
      fileType = 'video';
    }

    const fileData = {
      filename: req.file.originalname,
      url: result.secure_url,
      type: fileType,
      size: req.file.size,
      publicId: result.public_id
    };

    res.status(200).json({
      success: true,
      data: fileData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'File upload failed'
    });
  }
};

// @desc    Delete file from Cloudinary
// @route   DELETE /api/v1/upload/:publicId
// @access  Private
export const deleteFile = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'File deletion failed'
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: 'File deletion failed'
    });
  }
};