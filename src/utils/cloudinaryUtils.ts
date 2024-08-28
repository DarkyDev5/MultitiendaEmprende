import { v2 as cloudinary } from 'cloudinary';

// Asegúrate de que esta configuración se ejecute
if (!cloudinary.config().cloud_name) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

console.log('Cloudinary config:', cloudinary.config());

export async function verifyImageExists(url: string): Promise<boolean> {
  try {
    const publicId = extractPublicId(url);
    if (!publicId) return false;
   
    await cloudinary.api.resource(publicId);
    return true;
  } catch (error) {
    console.error('Error verifying image:', error);
    return false;
  }
}
export async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: `products/${filename}`,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );

    uploadStream.end(buffer);
  });
}
export async function deleteFromCloudinary(url: string): Promise<boolean> {
  try {
    const publicId = extractPublicId(url);
    if (!publicId) return false;
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
}

function extractPublicId(url: string): string | null {
  const regex = /\/v\d+\/(.+)\.\w+$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export { cloudinary };