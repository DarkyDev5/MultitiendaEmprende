import React from 'react';

const ElegantLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 z-50">
      <div className="text-white text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Cargando...</span>
        </div>
        <p className="mt-4 text-xl font-light">Preparando tu experiencia...</p>
      </div>
    </div>
  );
};

export default ElegantLoading;