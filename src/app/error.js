'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRefresh } from '@fortawesome/free-solid-svg-icons';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
            <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className="text-red-400" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">500</h1>
          <h2 className="text-2xl font-medium text-neutral-300 mb-4">Error del servidor</h2>
          <p className="text-neutral-400 leading-relaxed mb-8">
            Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <FontAwesomeIcon icon={faRefresh} />
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}