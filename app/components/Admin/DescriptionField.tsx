import React from 'react';
import { Control, useFieldArray, FieldPath, FieldValues, FieldErrors, UseFormRegister, ArrayPath } from 'react-hook-form';

interface DescriptionFieldProps<T extends FieldValues> {
  label: string;
  name: ArrayPath<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

function DescriptionField<T extends FieldValues>({ 
  label, 
  name, 
  control, 
  errors,
  register
}: DescriptionFieldProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Función para añadir un nuevo elemento
  const addNewField = () => {
    append({ value: '' } as any);
  };

  return (
    <div>
      <label className="block mb-2">{label}:</label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex mb-2">
          <input 
            {...register(`${name}.${index}.value` as FieldPath<T>)} 
            className="flex-grow p-2 border rounded mr-2" 
          />
          <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
        </div>
      ))}
      <button type="button" onClick={addNewField} className="bg-blue-500 text-white px-4 py-2 rounded">Agregar Línea</button>
      {errors[name] && <p className="text-red-500">{(errors[name] as any)?.message}</p>}
    </div>
  );
}

export default DescriptionField;