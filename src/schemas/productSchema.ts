import * as Yup from 'yup';
import { ProductFormData } from '../types/product';

export const productSchema: Yup.ObjectSchema<ProductFormData> = Yup.object().shape({
  id: Yup.string().required('ID es requerido'),
  name: Yup.string().required('Nombre es requerido'),
  brand: Yup.string().required('Marca es requerida'),
  price: Yup.number().required('Precio es requerido').positive('El precio debe ser positivo'),
  rating: Yup.number().min(1).max(5).required('Calificación es requerida'),
  shortDescription: Yup.string().required('Descripción corta es requerida'),
  originalPrice: Yup.number().nullable().optional(),
  color: Yup.string().nullable().optional(),
  category: Yup.string().required('Categoría es requerida'),
  subcategory: Yup.string().required('Subcategoría es requerida'),
  image: Yup.mixed()
  .test('fileOrString', 'La imagen principal es requerida', (value) => {
    return value instanceof File || (typeof value === 'string' && value.trim() !== '');
  }),
  images: Yup.mixed()
  .test('filesOrArray', 'Las imágenes adicionales son requeridas', (value) => {
    return (value instanceof FileList && value.length > 0) || 
           (Array.isArray(value) && value.length > 0) ||
           (typeof value === 'string' && value.trim() !== '');
  }),
  fullDescription: Yup.string().required('La descripción completa es requerida'),
  seller: Yup.string().required('Vendedor es requerido'),
  hasStock: Yup.boolean().required('Debe especificar si aplica stock'),
  stock: Yup.number().nullable().when('hasStock', {
    is: true,
    then: (schema) => schema.required('Stock es requerido cuando hasStock es true')
                            .integer('El stock debe ser un número entero')
                            .min(0, 'El stock no puede ser negativo'),
    otherwise: (schema) => schema.nullable()
  }),
}) as Yup.ObjectSchema<ProductFormData>;