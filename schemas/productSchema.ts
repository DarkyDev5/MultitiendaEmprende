import * as yup from 'yup';

export const productSchema = yup.object().shape({
  id: yup.string().required('ID es requerido'),
  name: yup.string().required('Nombre es requerido'),
  price: yup.number().positive('El precio debe ser positivo').required('Precio es requerido'),
  image: yup.mixed().required('Imagen principal es requerida'),
  rating: yup.number().min(1).max(5).required('Rating es requerido'),
  category: yup.string().required('Categoría es requerida'),
  subcategory: yup.string().required('Subcategoría es requerida'),
  fullDescription: yup.string().required('Descripción completa es requerida'),
  shortDescription: yup.string().required('Descripción corta es requerida'),
  originalPrice: yup.number().positive('El precio original debe ser positivo').required('Precio original es requerido'),
  color: yup.string().required('Color es requerido'),
  images: yup.mixed().nullable()
});