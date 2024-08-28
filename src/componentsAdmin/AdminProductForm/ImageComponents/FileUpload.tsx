'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

interface FileUploadProps {
  onChange: (files: (File | string)[]) => void;
  value: File | string | (File | string)[] | null;
  multiple?: boolean;
  maxFiles?: number;
  required?: boolean;
}

const FileUpload = ({ onChange, value, multiple = false, maxFiles = 5 }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (multiple) {
      onChange([...(Array.isArray(value) ? value : []), ...acceptedFiles].slice(0, maxFiles));
    } else {
      onChange([acceptedFiles[0]]);
    }
  }, [onChange, multiple, maxFiles, value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple,
    maxFiles,
  });

  const files = Array.isArray(value) ? value : (value ? [value] : []);

  const removeFile = (fileToRemove: File | string) => {
    const newFiles = files.filter(file => file !== fileToRemove);
    onChange(multiple ? newFiles : newFiles.length > 0 ? [newFiles[0]] : []);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Suelta los archivos aquí...'
            : 'Arrastra y suelta imágenes aquí, o haz clic para seleccionar'}
        </p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <span className="truncate">{typeof file === 'string' ? file : file.name}</span>
              <button
                onClick={() => removeFile(file)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;