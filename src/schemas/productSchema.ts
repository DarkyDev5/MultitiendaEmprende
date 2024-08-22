import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  id: Yup.string().required('ID es requerido'),
  name: Yup.string().required('Nombre es requerido'),
  brand: Yup.string().required('Marca es requerida'),
  price: Yup.number().required('Precio es requerido').positive('El precio debe ser positivo'),
  image: Yup.mixed().nullable(),
  images: Yup.mixed().nullable(),
  rating: Yup.number().min(1).max(5).required('Calificación es requerida'),
  category: Yup.string().required('Categoría es requerida'),
  subcategory: Yup.string().required('Subcategoría es requerida'),
  fullDescription: Yup.array()
    .of(Yup.string())
    .min(1, 'Debe proporcionar al menos una descripción')
    .required('Descripción completa es requerida'),
  shortDescription: Yup.string().required('Descripción corta es requerida'),
  originalPrice: Yup.number().positive('El precio original debe ser positivo'),
  color: Yup.string().nullable(),
  seller: Yup.string().required('Vendedor es requerido'),
  hasStock: Yup.boolean().required('Debe especificar si aplica stock'),
  stock: Yup.number().when('hasStock', {
    is: true,
    then: (schema) => schema.integer('El stock debe ser un número entero').min(0, 'El stock no puede ser negativo').required('Stock es requerido cuando hasStock es true'),
    otherwise: (schema) => schema.nullable()
  }),
});