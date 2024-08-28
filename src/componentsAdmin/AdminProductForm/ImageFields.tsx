import React, { useState, useCallback, useEffect } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ProductFormData } from '@/src/types/product';
import FileUpload from './ImageComponents/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageFieldsProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

const imageFieldConfig = [
  { name: 'image', label: 'Imagen Principal', required: true, maxFiles: 1 },
  { name: 'images', label: 'Imágenes Adicionales', required: false, maxFiles: 6 }
];

export default function ImageFields({ control, errors }: ImageFieldsProps) {
  const [previews, setPreviews] = useState<{ [key: string]: string[] }>({
    image: [],
    images: []
  });

  const updatePreviews = useCallback((name: 'image' | 'images', files: (File | string)[]) => {
    const newPreviews = files.map(file => {
      if (typeof file === 'string') {
        return file;
      } else if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return '';
    }).filter(Boolean);

    setPreviews(prev => ({
      ...prev,
      [name]: name === 'image' ? [newPreviews[0]] : newPreviews
    }));
  }, []);

  useEffect(() => {
    return () => {
      Object.values(previews).flat().forEach(preview => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [previews]);

  const removeImage = useCallback((fieldName: 'image' | 'images', index: number, onChange: (value: any) => void, currentValue: File | string | (File | string)[]) => {
    setPreviews(prev => {
      const newPreviews = {
        ...prev,
        [fieldName]: prev[fieldName].filter((_, i) => i !== index)
      };
      
      if (fieldName === 'image') {
        onChange(null);
      } else if (Array.isArray(currentValue)) {
        const newValue = currentValue.filter((_, i) => i !== index);
        onChange(newValue);
      }
      
      return newPreviews;
    });
  }, []);

  return (
    <>
      {imageFieldConfig.map((field) => (
        <div key={field.name} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {field.label} {field.required && '*'}
            {field.name === 'images' && ` (máximo ${field.maxFiles})`}
          </label>
          <Controller
            name={field.name as 'image' | 'images'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FileUpload
                  onChange={(files) => {
                    const fileArray = Array.isArray(files) ? files : [files];
                    updatePreviews(field.name as 'image' | 'images', fileArray);
                    onChange(field.name === 'image' ? fileArray[0] : fileArray);
                  }}
                  value={value}
                  multiple={field.name === 'images'}
                  maxFiles={field.maxFiles}
                  required={field.required}
                />
                <AnimatePresence>
                  {previews[field.name] && previews[field.name].length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 grid grid-cols-3 gap-4"
                    >
                      {previews[field.name].map((preview, index) => (
                        <motion.div
                          key={preview}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative group"
                        >
                          <Image
                            src={preview}
                            alt={`Vista previa ${index + 1}`}
                            width={150}
                            height={150}
                            className="rounded-md object-cover w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(field.name as 'image' | 'images', index, onChange, value)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          />
          {errors[field.name as 'image' | 'images'] && (
            <p className="mt-2 text-sm text-red-600 animate-pulse">
              {errors[field.name as 'image' | 'images']?.message}
            </p>
          )}
        </div>
      ))}
    </>
  );
}