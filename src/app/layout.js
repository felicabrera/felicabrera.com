import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { profile, site, socialLinks } from "@/data/portfolio";
import Analytics from "@/components/Analytics";

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

export const metadata = {
    metadataBase: new URL(site.url),
    title: site.title,
    description: site.description,
    openGraph: {
        title: profile.name,
        description: site.description,
        url: site.url,
        siteName: profile.name,
        locale: "es_UY",
        type: "website",
    },
    alternates: {
        canonical: site.url,
    },
    robots: {
        index: true,
        follow: true,
    },
    keywords: profile.keywords,
    authors: [{ name: profile.name, url: site.url }],
    twitter: {
        card: "summary_large_image",
        title: profile.name,
        description: site.description,
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

export const viewport = {
    themeColor: "#d6d6d3",
};

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: site.url,
    sameAs: socialLinks.map((link) => link.url),
    email: profile.email,
    address: {
        "@type": "PostalAddress",
        addressLocality: profile.city,
        addressCountry: "UY",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={`${inter.variable} ${jetbrains.variable} ${sourceSerif.variable}`}>
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
