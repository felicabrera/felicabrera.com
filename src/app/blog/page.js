'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { profile, icons } from '@/data/portfolio';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-white/20 pt-28 pb-20">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Blog Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 border border-white/10 rounded-full text-xs uppercase tracking-wider font-bold mb-6 bg-white/5">
                        Blog
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Ingeniería, Espacio & Código
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        Reflexiones sobre el desarrollo de software moderno y mi viaje en la tecnología.
                    </p>
                </div>

                {/* Coming Soon Section */}
                <div className="glass-panel rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/5">
                        <FontAwesomeIcon icon={icons.code} className="text-2xl text-neutral-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Próximamente</h2>
                    <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                        Estoy preparando contenido sobre desarrollo web, inteligencia artificial y experiencias en hackathons. ¡Vuelve pronto!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-medium"
                    >
                        <FontAwesomeIcon icon={icons.chevronRight} className="rotate-180" />
                        Volver al inicio
                    </Link>
                </div>

                {/* Newsletter Signup (Optional Future Feature) */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-neutral-500">
                        ¿Quieres ser notificado cuando publique?
                    </p>
                    <a
                        href={`mailto:${profile.email}?subject=Notifícame sobre nuevos artículos`}
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mt-2"
                    >
                        <FontAwesomeIcon icon={icons.envelope} />
                        Envíame un correo
                    </a>
                </div>

                <Footer />
            </main>
        </div>
    );
}
