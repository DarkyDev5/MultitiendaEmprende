import React from "react";
import { motion } from "framer-motion";
import { Controller, useFormContext } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const fieldNames: { [key: string]: string } = {
  id: "ID",
  name: "Nombre",
  brand: "Marca",
  price: "Precio",
  rating: "Calificación inicial",
  shortDescription: "Descripción Corta",
  originalPrice: "Precio Original",
  color: "Color",
  fullDescription: "Descripción Completa",
  seller: "Vendedor",
  hasStock: "¿Aplica stock?",
  stock: "Stock",
};

const fieldConfig = [
  { name: "id", type: "number", required: true },
  { name: "name", type: "text", required: true },
  { name: "brand", type: "text", required: true },
  { name: "price", type: "number", required: true },
  { name: "rating", type: "number", min: 0, max: 5, step: 0.1, required: false },
  { name: "shortDescription", type: "textarea", required: true },
  { name: "originalPrice", type: "number", required: false },
  { name: "color", type: "text", required: false },
  { name: "fullDescription", type: "quill", required: true },
  { name: "seller", type: "text", required: true },
  { name: "hasStock", type: "checkbox", required: false },
  { name: "stock", type: "number", min: 0, required: false },
];


export default function FormFields() {
  const formContext = useFormContext<ProductFormData>();

  if (!formContext) {
    return <div>Error: FormFields debe ser usado dentro de un FormProvider</div>;
  }

  const { control, watch, formState: { errors } } = formContext;
  const hasStock = watch("hasStock");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fieldConfig.map(({ name, type, required, ...rest }) => (
        <motion.div
          key={name}
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200"
          >
            {fieldNames[name] || name.replace(/([A-Z])/g, " $1").trim()}
            {required && '*'}
          </label>
          <Controller
            name={name as keyof ProductFormData}
            control={control}
            rules={{ required: required ? 'Este campo es obligatorio' : false }}
            render={({ field }) => {
              if (type === 'quill' && name === 'fullDescription') {
                return (
                  <ReactQuill
                    theme="snow"
                    value={typeof field.value === 'string' ? field.value : ''}
                    onChange={(content: string) => {
                      field.onChange(content);
                    }}
                    onBlur={field.onBlur}
                    modules={{
                      toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                      ],
                    }}
                    className="bg-white"
                  />
                );
              }

              if (type === 'checkbox' && name === 'hasStock') {
                return (
                  <input
                    type="checkbox"
                    id={name}
                    checked={field.value as boolean}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                );
              }

              if (name === 'stock') {
                return (
                  <input
                    id={name}
                    type={type}
                    {...rest}
                    value={hasStock ? (field.value as number | undefined ?? '') : ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? null : Number(value));
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200"
                    disabled={!hasStock}
                  />
                );
              }

              if (type === 'textarea') {
                return (
                  <textarea
                    id={name}
                    {...rest}
                    value={field.value as string}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200"
                  />
                );
              }

              // Default input rendering for other types
              return (
                <input
                  id={name}
                  type={type}
                  {...rest}
                  value={field.value as string | number | undefined ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200"
                />
              );
            }}
          />
          {errors[name as keyof ProductFormData] && (
            <p className="mt-2 text-sm text-red-600 animate-pulse">{errors[name as keyof ProductFormData]?.message}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}