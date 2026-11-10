import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import { about, aboutPath, blogPath, githubUrl, profile, sectionId, sectionNumber, sections, socialLinks } from "@/data/portfolio";
import { homePath, otherLocale, tx, ui } from "@/data/i18n";

const label = (key, lang) => tx(sections.find((s) => s.key === key).label, lang);

const linkedin = socialLinks.find((s) => s.name === "linkedin");

export default function SiteHeader({ lang }) {
    const tr = ui[lang];
    const other = otherLocale(lang);
    const anchor = (key) => `#${sectionId(key, lang)}`;
    // The language switch goes to the other language's home page.
    const langLink = { label: ui[other].langName, href: homePath(other), hrefLang: other };

    const aboutLink = { label: tx(about.label, lang), href: aboutPath(lang) };

    const desktopLinks = [
        { key: "about", ...aboutLink },
        { key: "work", label: label("work", lang), href: anchor("work") },
        { key: "achievements", label: label("achievements", lang), href: anchor("achievements") },
        { key: "press", label: label("press", lang), href: anchor("press") },
        { key: "blog", label: "blog", href: blogPath(lang) },
        { key: "github", label: "github", href: githubUrl },
        { key: "email", label: "email", href: `mailto:${profile.email}` },
        { key: "lang", ...langLink },
    ];

    const mobileLinks = [
        { label: label("work", lang), href: anchor("work"), number: sectionNumber("work") },
        { label: label("achievements", lang), href: anchor("achievements"), number: sectionNumber("achievements") },
        { label: label("press", lang), href: anchor("press"), number: sectionNumber("press") },
        { label: "blog", href: blogPath(lang), number: sectionNumber("writing") },
        { label: label("contact", lang), href: anchor("contact"), number: sectionNumber("contact") },
    ];

    const mobileSocial = [
        aboutLink,
        { label: "github", href: githubUrl },
        ...(linkedin ? [{ label: "linkedin", href: linkedin.url }] : []),
        { label: "email", href: `mailto:${profile.email}` },
        langLink,
    ];

    return (
        <header className="site-header">
            <a href="#top" className="avatar" aria-label={`${profile.name}, ${tr.home}`}>
                <Image
                    src={profile.avatarUrl}
                    alt={`${tr.portraitOf} ${profile.name}`}
                    width={150}
                    height={170}
                    sizes="(min-width: 640px) 150px, 84px"
                    loading="eager"
                    fetchPriority="high"
                />
            </a>

            <nav className="main-nav" aria-label={tr.mainNav}>
                {desktopLinks.map((link) => (
                    <a key={link.key} href={link.href} hrefLang={link.hrefLang} data-ga={`nav:${link.key}`}>
                        {link.label}
                    </a>
                ))}
            </nav>

            <MobileMenu
                links={mobileLinks}
                social={mobileSocial}
                labels={{ open: tr.menuOpen, close: tr.menuClose, nav: tr.mainNav }}
            />
        </header>
    );
}
