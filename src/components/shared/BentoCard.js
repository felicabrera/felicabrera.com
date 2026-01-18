import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BentoCard = ({ children, className = "", title, icon, onClick, glass = true }) => (
    <div
        onClick={onClick}
        className={`
      ${glass ? 'glass-panel hover:bg-[#111] hover:border-white/10' : ''}
      rounded-2xl p-6 flex flex-col 
      transition-all duration-500 ease-out group 
      cursor-pointer
      overflow-hidden
      relative
      ${className}
    `}
    >
        {(title || icon) && (
            <div className="flex items-center justify-between mb-6 text-neutral-500 relative z-10">
                <div className="flex items-center gap-2">
                    {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
                    {title && <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{title}</span>}
                </div>
            </div>
        )}
        <div className="relative z-10 h-full">
            {children}
        </div>
    </div>
);

export default BentoCard;
