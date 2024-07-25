import React from 'react';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn, Path, FieldValues } from 'react-hook-form';

interface ImageFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fields?: UseFieldArrayReturn['fields'];
  append?: UseFieldArrayReturn['append'];
  remove?: UseFieldArrayReturn['remove'];
  multiple?: boolean;
}

function ImageField<T extends FieldValues>({ 
  label, 
  name, 
  register, 
  errors, 
  fields, 
  append, 
  remove, 
  multiple 
}: ImageFieldProps<T>) {
  return (
    <div>
      <label className="block mb-2">{label}:</label>
      {multiple ? (
        <>
          {fields?.map((field, index) => (
            <div key={field.id} className="flex mb-2">
              <input
                type="file"
                {...register(`${name}.${index}` as Path<T>)}
                accept="image/*"
                className="flex-grow"
              />
              <button type="button" onClick={() => remove && remove(index)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={() => append && append(null)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Agregar Imagen
          </button>
        </>
      ) : (
        <input type="file" {...register(name)} accept="image/*" />
      )}
      {errors[name] && <p className="text-red-500">{errors[name]?.message as string}</p>}
    </div>
  );
}

export default ImageField;