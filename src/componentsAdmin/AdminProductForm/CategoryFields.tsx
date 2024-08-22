import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/src/types/product";
import { FieldErrors, Control, Controller, UseFormWatch } from "react-hook-form";
import { ProductFormData } from "@/src/types/product";

interface CategoryFieldsProps {
  control: Control<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function CategoryFields({ control, watch, errors }: CategoryFieldsProps) {
  return (
    <div className="space-y-6">
      {["category", "subcategory"].map((field) => (
        <motion.div 
          key={field} 
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label 
            htmlFor={field}
            className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200"
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <Controller
            name={field as "category" | "subcategory"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <select 
                id={field}
                onChange={onChange}
                value={value}
                className="block w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200 appearance-none"
              >
                <option value="">Seleccione {field === "category" ? "una categoría" : "una subcategoría"}</option>
                {field === "category" 
                  ? Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>)
                  : categories[watch("category")]?.map(sub => <option key={sub} value={sub}>{sub}</option>)
                }
              </select>
            )}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
          {errors[field as "category" | "subcategory"] && (
            <p className="mt-2 text-sm text-red-600 animate-pulse">{errors[field as "category" | "subcategory"]?.message}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}