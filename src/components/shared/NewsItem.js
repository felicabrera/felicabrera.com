import React from 'react';

const NewsItem = ({ source, headline, date, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col py-3 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] -mx-4 px-4 transition-colors">
        <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500">{source}</span>
            <span className="text-[10px] text-neutral-600 font-mono">{date}</span>
        </div>
        <p className="text-sm text-neutral-300 group-hover:text-white transition-colors leading-snug">
            {headline}
        </p>
    </a>
);

export default NewsItem;
