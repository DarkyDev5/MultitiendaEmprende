import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductFormData } from '@/src/types/product';

interface NotionProductImporterProps {
  onProductImport: (product: ProductFormData) => void;
}

export default function NotionProductImporter({ onProductImport }: NotionProductImporterProps) {
  const [notionProductId, setNotionProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { reset } = useFormContext<ProductFormData>();

  const handleImportProduct = async () => {
    if (!notionProductId) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notion/import-product?id=${encodeURIComponent(notionProductId)}`);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const responseText = await response.text();
      console.log('Response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error(`La respuesta del servidor no es JSON válido. Respuesta: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to import product from Notion');
      }
      
      onProductImport(data);
      reset(data);
    } catch (error: unknown) {
      console.error('Error importing product from Notion:', error);
      let errorMessage = 'Error al importar el producto de Notion.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = error.message as string;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <label htmlFor="notionProductId" className="text-sm font-medium text-gray-700">
        ID del producto en Notion
      </label>
      <div className="flex items-center space-x-2">
        <input
          id="notionProductId"
          type="text"
          value={notionProductId}
          onChange={(e) => setNotionProductId(e.target.value)}
          placeholder="Ingrese el ID del producto (ej: 1)"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleImportProduct}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isLoading ? 'Importando...' : 'Importar de Notion'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}