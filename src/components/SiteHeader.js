import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import { blog, githubUrl, profile, sectionNumber, socialLinks } from "@/data/portfolio";

const desktopLinks = [
    { label: "trabajo", href: "#trabajo" },
    { label: "logros", href: "#logros" },
    { label: "prensa", href: "#prensa" },
    { label: "blog", href: blog.path },
    { label: "github", href: githubUrl },
    { label: "email", href: `mailto:${profile.email}` },
];

const mobileLinks = [
    { label: "trabajo", href: "#trabajo", number: sectionNumber("trabajo") },
    { label: "logros", href: "#logros", number: sectionNumber("logros") },
    { label: "prensa", href: "#prensa", number: sectionNumber("prensa") },
    { label: "blog", href: blog.path, number: sectionNumber("blog") },
    { label: "contacto", href: "#contacto", number: sectionNumber("contacto") },
];

const linkedin = socialLinks.find((s) => s.name === "linkedin");

const mobileSocial = [
    { label: "github", href: githubUrl },
    ...(linkedin ? [{ label: "linkedin", href: linkedin.url }] : []),
    { label: "email", href: `mailto:${profile.email}` },
];

export default function SiteHeader() {
    return (
        <header className="site-header">
            <a href="#top" className="avatar" aria-label={`${profile.name}, inicio`}>
                <Image
                    src={profile.avatarUrl}
                    alt={`Retrato de ${profile.name}`}
                    width={150}
                    height={170}
                    sizes="(min-width: 640px) 150px, 84px"
                    loading="eager"
                    fetchPriority="high"
                />
            </a>

            <nav className="main-nav" aria-label="Principal">
                {desktopLinks.map((link) => (
                    <a key={link.href} href={link.href} data-ga={`nav:${link.label}`}>
                        {link.label}
                    </a>
                ))}
            </nav>

            <MobileMenu links={mobileLinks} social={mobileSocial} />
        </header>
    );
}
