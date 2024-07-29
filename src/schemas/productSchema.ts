import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  id: Yup.string().required('ID es requerido'),
  name: Yup.string().required('Nombre es requerido'),
  price: Yup.number().required('Precio es requerido').positive('El precio debe ser positivo'),
  image: Yup.mixed().required('Imagen principal es requerida'),
  images: Yup.mixed().nullable(),
  rating: Yup.number().min(1).max(5).required('Calificación es requerida'),
  category: Yup.string().required('Categoría es requerida'),
  subcategory: Yup.string().required('Subcategoría es requerida'),
  fullDescription: Yup.string().required('Descripción completa es requerida'),
  shortDescription: Yup.string().required('Descripción corta es requerida'),
  originalPrice: Yup.number().positive('El precio original debe ser positivo'),
  color: Yup.string().required('Color es requerido'),
});