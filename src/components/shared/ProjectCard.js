import React from 'react';

const ProjectCard = ({ title, category, description, year, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block group/item border-b border-white/5 last:border-0 py-4 first:pt-0">
        <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-neutral-200 font-medium group-hover/item:text-white transition-colors">{title}</h3>
            <span className="text-xs text-neutral-600 font-mono">{year}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-neutral-500 tracking-wide">{category}</span>
        </div>
        <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed opacity-80 group-hover/item:opacity-100 transition-opacity">
            {description}
        </p>
    </a>
);

export default ProjectCard;
