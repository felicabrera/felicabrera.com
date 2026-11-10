import localFont from "next/font/local";
import "@/app/globals.css";
import { profile, site } from "@/data/portfolio";
import { homePath, tx } from "@/data/i18n";
import Analytics from "@/components/Analytics";
import { JsonLd, openGraph, personSchema, twitter, websiteSchema } from "@/lib/seo";
import { feedPath } from "@/lib/feed";
import { t } from "@/lib/blog";

// Shared by the Spanish and English root layouts. Each language is its own
// route group with its own root layout so <html lang> is correct for every
// page; they only differ in `lang`.

// Fonts are self-hosted (src/fonts, latin subset, SIL OFL) so the build never
// depends on reaching Google Fonts. Inter and JetBrains Mono are variable fonts.
const inter = localFont({
    src: "../fonts/Inter-latin.woff2",
    variable: "--font-inter",
    weight: "400 600",
});

const jetbrains = localFont({
    src: "../fonts/JetBrainsMono-latin.woff2",
    variable: "--font-jetbrains",
    weight: "400 500",
    adjustFontFallback: false,
});

const sourceSerif = localFont({
    src: "../fonts/SourceSerif4-SemiBold-latin.woff2",
    variable: "--font-source-serif",
    weight: "600",
    adjustFontFallback: "Times New Roman",
});

export const fontClassName = `${inter.variable} ${jetbrains.variable} ${sourceSerif.variable}`;

export function rootMetadata(lang) {
    const url = `${site.url}${homePath(lang)}`;
    return {
        metadataBase: new URL(site.url),
        title: tx(site.title, lang),
        description: tx(site.description, lang),
        openGraph: openGraph(lang, { title: tx(site.title, lang), description: tx(site.description, lang), url }),
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
        keywords: tx(profile.keywords, lang),
        authors: [{ name: profile.name, url: site.url }],
        creator: profile.name,
        twitter: twitter(lang),
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

export default function RootDocument({ lang, children }) {
    return (
        <html lang={lang} className={fontClassName}>
            <head>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={`${profile.name}: ${t[lang].metaTitle}`}
                    href={feedPath(lang)}
                />
            </head>
            <body>
                <JsonLd data={[personSchema(lang), websiteSchema(lang)]} />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
