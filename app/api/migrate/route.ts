// app/api/migrate/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/utils/cloudinary';
import axios from 'axios';

async function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

async function migrateImages() {
  await dbConnect();
  const products = await Product.find({});
  let migratedCount = 0;

  for (const product of products) {
    if (product.image && product.image.includes('drive.google.com')) {
      try {
        const response = await axios.get(product.image, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const newImageUrl = await uploadToCloudinary(buffer);
        product.image = newImageUrl;
        await product.save();
        migratedCount++;
      } catch (error) {
        console.error(`Error migrating image for product ${product._id}:`, error);
      }
    }

    if (product.images && Array.isArray(product.images)) {
      const newImages = await Promise.all(product.images.map(async (imgUrl) => {
        if (imgUrl.includes('drive.google.com')) {
          try {
            const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');
            return await uploadToCloudinary(buffer);
          } catch (error) {
            console.error(`Error migrating additional image for product ${product._id}:`, error);
            return imgUrl;
          }
        }
        return imgUrl;
      }));
      product.images = newImages;
      await product.save();
    }
  }

  return migratedCount;
}

export async function GET() {
  try {
    const migratedCount = await migrateImages();
    return NextResponse.json({ message: `Migration completed. Migrated ${migratedCount} images.` });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}