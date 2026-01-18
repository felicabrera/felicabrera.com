'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BentoCard from '@/components/shared/BentoCard';
import ProjectCard from '@/components/shared/ProjectCard';
import NewsItem from '@/components/shared/NewsItem';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { profile, projects, news, achievements, icons, socialLinks } from '@/data/portfolio';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-white/20 pt-28 pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* 1. Stacked Layout for small screens, Grid for large */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* Profile Card */}
          <BentoCard dataGa="bento:sobre-mi" className="md:col-span-1 md:row-span-2 relative overflow-hidden bg-[#0e0e11] border border-white/5" title="Sobre Mí" icon={icons.mapPin}>
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="space-y-6">
                <div className="w-24 h-24 rounded-full bg-neutral-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out border border-white/10">
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-xl font-medium text-white mb-1">{profile.name}</h1>
                  <p className="text-sm text-neutral-500 font-mono">{profile.role}</p>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-end text-xs text-neutral-500">
                  <span className="opacity-50 uppercase tracking-widest text-[10px]">{profile.location}</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Featured Achievement */}
          <BentoCard dataGa="bento:premio-destacado" className="md:col-span-2 group cursor-pointer bg-[#0e0e11] border-white/5 hover:border-white/10" title="Premio Destacado" icon={icons.trophy}>
            <div className="flex flex-col md:flex-row items-start gap-6 h-full p-2">
              <div className="bg-white text-black p-5 rounded-2xl shrink-0 flex items-center justify-center aspect-square h-20 w-20">
                <FontAwesomeIcon icon={icons.trophy} size="2x" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#6366f1]/20 text-[#6366f1] text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(99,102,241,0.2)]">{achievements[0].award}</span>
                  <span className="text-neutral-600 text-[10px] font-mono">{achievements[0].year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{achievements[0].title}</h3>
                <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
                  {achievements[0].description}
                </p>
              </div>
            </div>
          </BentoCard>



          {/* Secondary Achievement (UTE) */}
          <BentoCard dataGa="bento:reconocimiento" className="md:col-span-1 flex flex-col justify-center" title="Reconocimiento" icon={icons.trophy}>
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">{achievements[1].title}</h3>
                  <p className="text-xs text-neutral-500 mt-1">{achievements[1].award}</p>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{achievements[1].year}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-4 leading-relaxed line-clamp-3">
                {achievements[1].description}
              </p>
            </div>
          </BentoCard>

          {/* Projects */}
          <BentoCard dataGa="bento:proyectos-seleccionados" className="md:col-span-2 md:row-span-2" title="Proyectos Seleccionados" icon={icons.code}>
            <div className="flex flex-col h-full gap-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </BentoCard>

          {/* Blog (White Card) */}
          <BentoCard
            dataGa="bento:blog-card"
            glass={false}
            className="md:col-span-1 md:row-span-2 bg-[#e5e5e5] hover:bg-white text-black border-none"
            title=""
            icon={null}
            onClick={() => window.location.href = '/blog'}
          >
            <div className="flex flex-col h-full justify-between p-1">
              <div>
                <span className="inline-block px-3 py-1 border border-black/10 rounded-full text-[10px] uppercase tracking-wider font-bold mb-6 bg-black/5">Blog Personal</span>
                <h3 className="text-2xl font-bold leading-tight mb-3 tracking-tight">Ingeniería, Espacio <br /> & Código.</h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-medium">Reflexiones sobre el desarrollo de software moderno y mi viaje en la tecnología.</p>
              </div>
              <div className="mt-4">
                <Link href="/blog" data-ga="nav:blog-link" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 border-transparent hover:border-black transition-all pb-0.5">
                  Leer artículos
                </Link>
              </div>
            </div>
          </BentoCard>

          {/* Prensa */}
          <BentoCard className="md:col-span-1" title="Prensa" icon={icons.newspaper}>
            <div className="flex flex-col gap-1">
              {news.map((item) => (
                <NewsItem key={item.headline} {...item} />
              ))}
            </div>
          </BentoCard>

          {/* Contact CTA */}
          <BentoCard dataGa="bento:contact-cta" glass={false} className="md:col-span-1 flex flex-col justify-center text-center py-8 bg-[#0a0a0a] border border-white/5" title="" icon={null} onClick={() => window.location.href = `mailto:${profile.email}`}>
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-400 border border-white/5">
                <FontAwesomeIcon icon={icons.envelope} />
              </div>
              <div>
                <h3 className="text-neutral-500 text-xs font-medium mb-1">¿Nuevo proyecto?</h3>
                <a href={`mailto:${profile.email}`} data-ga="contact:mailto" className="text-lg text-white font-bold hover:text-neutral-300 transition-colors">
                  Hablemos
                </a>
              </div>
            </div>
          </BentoCard>

        </div>

        <Footer />
      </main>
    </div>
  );
}
