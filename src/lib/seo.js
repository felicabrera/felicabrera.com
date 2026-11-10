// Shared pieces for page metadata and structured data.
//
// Next.js merges metadata shallowly: a page that sets `openGraph` replaces the
// root layout's whole `openGraph` object, image and site name included. Pages
// build theirs with `openGraph()` so every page keeps the same base fields.

import { about, aboutPath, news, profile, site, socialLinks } from "@/data/portfolio";
import { homePath, locales, ogLocale, tx } from "@/data/i18n";

export function ogImage(lang) {
    return {
        url: `${site.url}/og-${lang}.png`,
        width: 1200,
        height: 630,
        alt: `${profile.name}: ${tx(profile.tagline, lang)}`,
    };
}

// A page with its own generated opengraph-image passes `ownImage`: an explicit
// `images` here would take precedence over the generated file.
export function openGraph(lang, { title, description, url, type = "website", ownImage = false, ...extra }) {
    return {
        title,
        description,
        url,
        siteName: profile.name,
        locale: ogLocale[lang],
        alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
        type,
        ...(ownImage ? {} : { images: [ogImage(lang)] }),
        ...extra,
    };
}

// Twitter falls back to the page's own title and description when these are
// left out, so only the shared fields live here.
export function twitter(lang) {
    return {
        card: "summary_large_image",
        site: profile.twitter,
        creator: profile.twitter,
        images: [ogImage(lang).url],
    };
}

export const personId = `${site.url}/#person`;
export const websiteId = `${site.url}/#website`;

export function personSchema(lang) {
    return {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        givenName: "Felipe",
        familyName: "Cabrera",
        // The full name the press uses, and the handle used across GitHub,
        // LinkedIn and this domain.
        alternateName: [profile.fullName, profile.handle],
        // Tells this Felipe Cabrera apart from others with the same name.
        disambiguatingDescription: tx(about.disambiguation, lang),
        url: site.url,
        mainEntityOfPage: `${site.url}${aboutPath(lang)}`,
        image: `${site.url}${profile.avatarUrl}`,
        jobTitle: tx(profile.role, lang),
        description: tx(profile.intro, lang),
        email: `mailto:${profile.email}`,
        sameAs: socialLinks.map((link) => link.url),
        nationality: { "@type": "Country", name: "Uruguay" },
        address: {
            "@type": "PostalAddress",
            addressLocality: profile.city,
            addressCountry: "UY",
        },
        affiliation: {
            "@type": "CollegeOrUniversity",
            name: "Universidad Católica del Uruguay",
            url: "https://www.ucu.edu.uy/",
        },
        knowsAbout: tx(profile.knowsAbout, lang),
        knowsLanguage: ["es", "en"],
        award: tx(profile.awards, lang),
        // Press coverage: third-party pages about the same person.
        subjectOf: news.map((item) => ({
            "@type": "NewsArticle",
            headline: item.headline,
            url: item.url,
            datePublished: item.date,
            inLanguage: item.lang,
            publisher: { "@type": "Organization", name: item.source },
        })),
    };
}

export function aboutPageSchema(lang) {
    const url = `${site.url}${aboutPath(lang)}`;
    return {
        "@type": "AboutPage",
        "@id": `${url}#about`,
        url,
        name: tx(about.metaTitle, lang),
        description: tx(about.metaDescription, lang),
        inLanguage: lang,
        mainEntity: { "@id": personId },
        about: { "@id": personId },
        isPartOf: { "@id": websiteId },
        primaryImageOfPage: `${site.url}${profile.avatarUrl}`,
    };
}

export function websiteSchema(lang) {
    return {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${site.url}${homePath(lang) === "/" ? "" : homePath(lang)}`,
        name: profile.name,
        description: tx(site.description, lang),
        inLanguage: lang,
        publisher: { "@id": personId },
    };
}

// The home page is the canonical profile of the person: ProfilePage tells
// search engines this page is about them, which helps it rank for their name.
export function profilePageSchema(lang) {
    const url = `${site.url}${homePath(lang) === "/" ? "" : homePath(lang)}`;
    return {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: tx(site.title, lang),
        inLanguage: lang,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
    };
}

// [{ name, path }] from the home down to the current page.
export function breadcrumbSchema(items) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${site.url}${item.path}`,
        })),
    };
}

// A <script type="application/ld+json"> with one or more schema.org nodes.
// "<" is escaped so content can never close the script tag early.
export function JsonLd({ data }) {
    const graph = Array.isArray(data) ? data : [data];
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
