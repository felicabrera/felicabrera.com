import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks, icons } from '../../data/portfolio';

const Footer = () => {
    return (
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600 font-mono">
            <p>© 2026 Felipe Cabrera. Todos los derechos reservados.</p>
            <div className="flex gap-6">
                {socialLinks.map((link) => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                        {icons[link.icon] && <FontAwesomeIcon icon={icons[link.icon]} />}
                        {link.name}
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
