import React from "react";
import { motion } from "framer-motion";
import { fieldConfig } from "@/src/utils/formConfig";
import { FieldErrors, Control, Controller } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

interface FormFieldsProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

// Objeto para mapear los nombres de los campos a sus equivalentes en español
const fieldNames: { [key: string]: string } = {
  id: "ID",
  name: "Nombre",
  price: "Precio",
  rating: "Calificación",
  shortDescription: "Descripción Corta",
  originalPrice: "Precio Original",
  color: "Color",
  // Agrega aquí más campos según sea necesario
};

export default function FormFields({ control, errors }: FormFieldsProps) {
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
            {fieldNames[name] || name.replace(/([A-Z])/g, " $1").trim()}:
          </label>
          <Controller
            name={name as keyof ProductFormData}
            control={control}
            render={({ field }) => {
              if (type === 'file') {
                return (
                  <input
                    id={name}
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100 transition-colors duration-200"
                  />
                );
              }
              
              return (
                <input
                  id={name}
                  {...field}
                  type={type}
                  {...rest}
                  value={field.value as string || ''}
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