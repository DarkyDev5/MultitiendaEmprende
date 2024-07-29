// ThankYouMessage.tsx
import React from 'react';

const ThankYouMessage: React.FC = () => (
  <div className="text-center">
    <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md my-5" role="alert">
      <div className="flex justify-center">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 15l-5-5h3V5h4v5h3l-5 5z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold">Gracias por tu mensaje!</p>
          <p className="text-sm">Nos pondremos en contacto contigo pronto.</p>
        </div>
      </div>
    </div>
  </div>
);

export default ThankYouMessage;
