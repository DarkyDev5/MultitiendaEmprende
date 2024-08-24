'use client'

import React from "react";
import { motion } from "framer-motion";
import { Controller, useFormContext } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

const fieldNames: { [key: string]: string } = {
  id: "ID",
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
  { name: "id", type: "text" },
  { name: "brand", type: "text" },
  { name: "price", type: "number" },
  { name: "rating", type: "number", min: 0, max: 5, step: 0.1 },
  { name: "shortDescription", type: "textarea" },
  { name: "originalPrice", type: "number" },
  { name: "color", type: "text" },
  { name: "fullDescription", type: "textarea" },
  { name: "seller", type: "text" },
  { name: "hasStock", type: "checkbox" },
  { name: "stock", type: "number", min: 0 },
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
            {name !== 'color' && name !== 'hasStock' && ' *'}
          </label>
          <Controller
            name={name as keyof ProductFormData}
            control={control}
            render={({ field }) => {
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
                    {...field}
                    type={type}
                    {...rest}
                    value={hasStock ? (field.value as number | undefined ?? '') : ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? null : Number(value));
                    }}
                    className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200"
                    disabled={!hasStock}
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