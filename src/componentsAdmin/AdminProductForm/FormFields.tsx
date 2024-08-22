'use client'

import React from "react";
import { motion } from "framer-motion";
import { FieldErrors, Control, Controller, useWatch } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

interface FormFieldsProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

const fieldNames: { [key: string]: string } = {
  id: "ID",
  name: "Nombre",
  brand: "Marca",
  price: "Precio",
  rating: "Calificación inicial",
  shortDescription: "Descripción Corta",
  originalPrice: "Precio Original",
  color: "Color (opcional)",
  category: "Categoría",
  subcategory: "Subcategoría",
  fullDescription: "Descripción Completa",
  seller: "Vendedor",
  stock: "Stock",
  hasStock: "¿Aplica stock?",
};

const fieldConfig = [
  { name: "id", type: "text" },
  { name: "name", type: "text" },
  { name: "brand", type: "text" },
  { name: "price", type: "number" },
  { name: "rating", type: "number", min: 1, max: 5, step: 0.1 },
  { name: "shortDescription", type: "textarea" },
  { name: "originalPrice", type: "number" },
  { name: "color", type: "text" },
  { name: "category", type: "text" },
  { name: "subcategory", type: "text" },
  { name: "fullDescription", type: "textarea" },
  { name: "seller", type: "text" },
  { name: "hasStock", type: "checkbox" },
  { name: "stock", type: "number", min: 0 },
];

export default function FormFields({ control, errors }: FormFieldsProps) {
  const hasStock = useWatch({
    control,
    name: "hasStock",
    defaultValue: false
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fieldConfig.map(({ name, type, ...rest }) => (
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
            {name !== 'color' && name !== 'stock' && name !== 'hasStock' && ' *'}
          </label>
          <Controller
            name={name as keyof ProductFormData}
            control={control}
            render={({ field }) => {
              if (type === 'textarea') {
                return (
                  <textarea
                    id={name}
                    {...field}
                    value={field.value as string || ''}
                    className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200"
                    rows={4}
                  />
                );
              }

              if (type === 'checkbox') {
                return (
                  <input
                    id={name}
                    type="checkbox"
                    checked={field.value as boolean}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                );
              }
             
              return (
                <input
                  id={name}
                  {...field}
                  type={type}
                  {...rest}
                  value={field.value as string | number | undefined ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (name === 'stock') {
                      field.onChange(value === '' ? null : Number(value));
                    } else {
                      field.onChange(value);
                    }
                  }}
                  className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200"
                  disabled={name === 'stock' && !hasStock}
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