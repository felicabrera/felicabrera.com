// Locales, localized routes and UI strings for the whole site.
//
// Spanish is the default locale and is unprefixed: the home is /, case pages
// /trabajo/<slug>, the blog /blog. English lives at /en, /work/<slug> and
// /en/blog. Content fields in portfolio.js are either a plain value (same in
// every language) or an `{ es, en }` pair resolved with `tx`.
//
// Plain relative imports only: scripts/generate-sitemap.mjs loads this file
// with Node directly, without the Next.js `@/` alias.

export const locales = ["es", "en"];
export const defaultLocale = "es";

export const otherLocale = (lang) => (lang === "es" ? "en" : "es");

// Open Graph locale per language.
export const ogLocale = { es: "es_UY", en: "en_US" };

// Resolve a localized `{ es, en }` value; anything else is returned as is.
export function tx(value, lang) {
    if (value && typeof value === "object" && !Array.isArray(value) && "es" in value && "en" in value) {
        return value[lang] ?? value[defaultLocale];
    }
    return value;
}

// URL prefix for a locale. Default locale is unprefixed.
export function localePrefix(lang) {
    return lang === defaultLocale ? "" : `/${lang}`;
}

export function homePath(lang) {
    return localePrefix(lang) || "/";
}

// Case study pages use a translated segment instead of a locale prefix.
export const caseSegment = { es: "trabajo", en: "work" };

// Ids of the home sections, used as #anchors, per language.
export const sectionIds = {
    work: { es: "trabajo", en: "work" },
    achievements: { es: "logros", en: "achievements" },
    press: { es: "prensa", en: "press" },
    writing: { es: "blog", en: "writing" },
    contact: { es: "contacto", en: "contact" },
};

export function sectionAnchor(key, lang) {
    return `${homePath(lang)}#${sectionIds[key][lang]}`;
}

// Interface strings that are not content.
export const ui = {
    es: {
        langName: "español",
        switchTo: "English",
        mainNav: "Principal",
        menuOpen: "menú",
        menuClose: "cerrar ×",
        home: "inicio",
        portraitOf: "Retrato de",
        highlights: "Destacados",
        viewCase: "Ver caso",
        viewCtf: "Ver logros en CTF",
        relativeFlux: "FLUJO RELATIVO",
        transitDetected: "tránsito detectado → ",
        seeCase: "ver caso ↗",
        declassified: "desclasificado: ",
        publishedIn: "publicado en",
        location: "ubicacion",
        achievementsDir: "logros",
        contactCmd: "contacto",
        index: "índice",
        allOn: "todo en ",
        readArticles: "leer artículos →",
        pressNote: null,
        madeIn: "hecho en",
        work: "trabajo",
        caseFile: "expediente",
        nextCaseFile: "siguiente expediente",
        next: "Siguiente",
        time: "tiempo →",
        caseTitle: "Caso",
        caseWriting: "escritos",
        notFoundTitle: "Expediente no encontrado.",
        notFoundBody: "La página que buscás no existe o fue movida.",
        backHome: "← volver al inicio",
        errorTitle: "Algo se rompió.",
        errorBody: "Ocurrió un error inesperado. Probá recargar la página.",
        retry: "intentar de nuevo",
    },
    en: {
        langName: "english",
        switchTo: "Español",
        mainNav: "Main",
        menuOpen: "menu",
        menuClose: "close ×",
        home: "home",
        portraitOf: "Portrait of",
        highlights: "Highlights",
        viewCase: "View case study",
        viewCtf: "See CTF achievements",
        relativeFlux: "RELATIVE FLUX",
        transitDetected: "transit detected → ",
        seeCase: "view case ↗",
        declassified: "declassified: ",
        publishedIn: "published in",
        location: "location",
        achievementsDir: "achievements",
        contactCmd: "contact",
        index: "index",
        allOn: "all on ",
        readArticles: "read articles →",
        pressNote: "coverage in spanish",
        madeIn: "made in",
        work: "work",
        caseFile: "case file",
        nextCaseFile: "next case file",
        next: "Next",
        time: "time →",
        caseTitle: "Case study",
        caseWriting: "writing",
        notFoundTitle: "Case file not found.",
        notFoundBody: "The page you are looking for does not exist or has been moved.",
        backHome: "← back home",
        errorTitle: "Something broke.",
        errorBody: "An unexpected error occurred. Try reloading the page.",
        retry: "try again",
    },
};
