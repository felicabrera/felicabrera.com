import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import { profile, site, socialLinks } from "@/data/portfolio";
import { homePath, locales, ogLocale, tx } from "@/data/i18n";
import Analytics from "@/components/Analytics";

// Shared by the Spanish and English root layouts. Each language is its own
// route group with its own root layout so <html lang> is correct for every
// page; they only differ in `lang`.

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
    variable: "--font-jetbrains",
    subsets: ["latin"],
    weight: ["400", "500"],
});

const sourceSerif = Source_Serif_4({
    variable: "--font-source-serif",
    subsets: ["latin"],
    weight: ["600"],
});

export const fontClassName = `${inter.variable} ${jetbrains.variable} ${sourceSerif.variable}`;

export function rootMetadata(lang) {
    const url = `${site.url}${homePath(lang)}`;
    return {
        metadataBase: new URL(site.url),
        title: tx(site.title, lang),
        description: tx(site.description, lang),
        openGraph: {
            title: profile.name,
            description: tx(site.description, lang),
            url,
            siteName: profile.name,
            locale: ogLocale[lang],
            alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
        },
        keywords: tx(profile.keywords, lang),
        authors: [{ name: profile.name, url: site.url }],
        twitter: {
            card: "summary_large_image",
            title: profile.name,
            description: tx(site.description, lang),
            site: profile.twitter,
            creator: profile.twitter,
        },
        icons: {
            icon: [
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            ],
            shortcut: "/favicon.ico",
            apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
        },
        manifest: "/site.webmanifest",
    };
}

export const rootViewport = {
    themeColor: "#d6d6d3",
};

function personSchema(lang) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        jobTitle: tx(profile.role, lang),
        url: site.url,
        sameAs: socialLinks.map((link) => link.url),
        email: profile.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: profile.city,
            addressCountry: "UY",
        },
    };
}

export default function RootDocument({ lang, children }) {
    return (
        <html lang={lang} className={fontClassName}>
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(lang)) }}
                />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
