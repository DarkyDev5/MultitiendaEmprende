import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Product';
import cloudinary from '@/src/utils/cloudinary';


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const productId = params.id;
    console.log('Attempting to delete product with ID:', productId);

    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      console.log('Product not found:', productId);
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    console.log('Product deleted successfully:', productId);
    return NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const productId = params.id;
    const formData = await request.formData();
    const productData: any = {};
    const additionalImages: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof Blob) {
        productData.image = await uploadToCloudinary(value);
      } else if (key.startsWith('images[') && value instanceof Blob) {
        const index = parseInt(key.match(/\d+/)?.[0] || '0', 10);
        additionalImages[index] = await uploadToCloudinary(value);
      } else {
        productData[key] = value;
      }
    }

    if (additionalImages.length > 0) {
      productData.images = additionalImages.filter(Boolean);
    }

    const updatedProduct = await Product.findOneAndUpdate({ id: productId }, productData, { new: true });
    
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error al actualizar el producto' }, { status: 500 });
  }
}

async function uploadToCloudinary(file: Blob): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    ).end(buffer);
  });
}
