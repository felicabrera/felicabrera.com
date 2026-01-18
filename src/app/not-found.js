'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
            <FontAwesomeIcon icon={faSearch} size="2x" className="text-neutral-400" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-medium text-neutral-300 mb-4">Página no encontrada</h2>
          <p className="text-neutral-400 leading-relaxed mb-8">
            Lo siento, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <FontAwesomeIcon icon={faHome} />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}