import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary using an upload stream
 * (works well with multer's memoryStorage, no temp files on disk).
 * @param {Buffer} fileBuffer
 * @param {string} folder e.g. "portfolio/certifications"
 * @returns {Promise<{secure_url: string, public_id: string}>}
 */
export const uploadBufferToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

/**
 * Deletes an asset from Cloudinary by its public_id.
 * Never throws - image cleanup should not block the main DB operation.
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error(`Cloudinary deletion failed for ${publicId}:`, err.message);
  }
};

export default cloudinary;
