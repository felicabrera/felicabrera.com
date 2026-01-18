import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navLinks, icons } from '../../data/portfolio';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Felipe Cabrera
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.url} data-ga={`nav:${link.name}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                            {link.name}
                        </a>
                    ))}
                    <a href="mailto:contact@felipecabrera.com" data-ga="contact:mailto" className="text-sm px-4 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-medium">
                        Contactar
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} data-ga="nav:toggle">
                    <FontAwesomeIcon icon={isOpen ? icons.close : icons.menu} size="lg" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden min-h-screen">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.url} data-ga={`nav:${link.name}`} className="text-2xl text-neutral-300">
                            {link.name}
                        </a>
                    ))}
                    <a href="mailto:contact@felipecabrera.com" data-ga="contact:mailto" className="text-2xl text-white font-medium pt-4 border-t border-white/10">Contactar</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
