import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import { profile, site } from "@/data/portfolio";
import { homePath, tx } from "@/data/i18n";
import Analytics from "@/components/Analytics";
import { JsonLd, openGraph, personSchema, twitter, websiteSchema } from "@/lib/seo";

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
            <body>
                <JsonLd data={[personSchema(lang), websiteSchema(lang)]} />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
