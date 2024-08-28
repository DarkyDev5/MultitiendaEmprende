import { ProductFormData } from '@/src/types/product';

export function processFormData(formData: FormData): Partial<ProductFormData> {
  const productData: Partial<ProductFormData> = {};

  for (const [key, value] of formData.entries()) {
    switch (key) {
      case 'image':
        if (typeof value === 'string') {
          productData.image = value;
        }
        break;
      case 'images':
        if (typeof value === 'string') {
          productData.images = value.split(',').map(img => img.trim());
        }
        break;
      case 'hasStock':
        productData.hasStock = value === 'true';
        break;
      case 'stock':
        if (value !== '') {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            productData.stock = numValue;
          }
        } else {
          productData.stock = null;
        }
        break;
      case 'price':
      case 'rating':
        if (value !== '') {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            productData[key] = numValue;
          }
        }
        break;
      case 'originalPrice':
        if (value !== '') {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            productData.originalPrice = numValue;
          }
        } else {
          productData.originalPrice = null;
        }
        break;
      case 'fullDescription':
        if (typeof value === 'string') {
          productData.fullDescription = value;
        }
        break;
      default:
        if (typeof value === 'string') {
          (productData as any)[key] = value;
        }
    }
  }

  return productData;
}