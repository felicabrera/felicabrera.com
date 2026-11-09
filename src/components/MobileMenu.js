"use client";

import { useEffect, useState } from "react";

// Mobile-only (< 640px) menu: a 44px button that opens a dark overlay.
// Hidden by CSS on larger screens, where the inline nav is shown instead.
export default function MobileMenu({ links, social }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const close = () => setOpen(false);

    return (
        <>
            <button
                type="button"
                className="menu-button"
                aria-expanded={open}
                aria-controls="menu-movil"
                onClick={() => setOpen((v) => !v)}
                data-ga="nav:toggle"
            >
                {open ? "cerrar ×" : "menú"}
            </button>

            {open && (
                <nav id="menu-movil" className="menu-overlay" aria-label="Principal">
                    {links.map((link) => (
                        <a key={link.href} className="menu-link" href={link.href} onClick={close}>
                            <span>{link.label}</span>
                            <small>{link.number}</small>
                        </a>
                    ))}
                    <div className="menu-social">
                        {social.map((s) => (
                            <a key={s.href} href={s.href} onClick={close}>
                                {s.label} ↗
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </>
    );
}
