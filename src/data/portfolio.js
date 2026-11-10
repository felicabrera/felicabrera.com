// Single source of truth for the site's content.
// Every section of the home page and the case pages renders from here.
//
// Text that differs per language is an `{ es, en }` pair; resolve it with
// `tx(value, lang)` from ./i18n.js. Plain values are shared by both languages.

import { caseSegment, defaultLocale, localePrefix, sectionIds, tx } from "./i18n.js";

export const site = {
    url: "https://felicabrera.com",
    title: {
        es: "Felipe Cabrera | Ciberseguridad, ingeniería y código",
        en: "Felipe Cabrera | Cybersecurity, engineering and code",
    },
    description: {
        es: "Estudiante de Ingeniería en Uruguay. Ciberseguridad, CTFs y software de datos y ML. 1er lugar nacional NASA Space Apps 2025, 3er lugar OEA Cyber Challenge 2026.",
        en: "Engineering student in Uruguay. Cybersecurity, CTFs, and data and ML software. 1st place nationally at NASA Space Apps 2025, 3rd place at the OEA Cyber Challenge 2026.",
    },
    accent: "#ff4f1a",
};

// hreflang map for a page that exists in both languages. Spanish is x-default.
export function languageAlternates(paths) {
    return {
        es: `${site.url}${paths.es}`,
        en: `${site.url}${paths.en}`,
        "x-default": `${site.url}${paths.es}`,
    };
}

export const profile = {
    name: "Felipe Cabrera",
    handle: "felicabrera",
    role: {
        es: "Ciberseguridad · Ingeniería · Código",
        en: "Cybersecurity · Engineering · Code",
    },
    tagline: {
        es: "ciberseguridad · ingeniería · código",
        en: "cybersecurity · engineering · code",
    },
    intro: {
        es: "Rompo sistemas para entender cómo protegerlos, y construyo software que convierte datos complejos en algo que cualquiera puede usar.",
        en: "I break systems to understand how to protect them, and I build software that turns complex data into something anyone can use.",
    },
    location: "Uruguay",
    city: "Montevideo",
    avatarUrl: "/avatar.jpg",
    email: "me@felieppe.com",
    twitter: "@thefelieppe",
    // Shown in the footer only when set.
    pgpFingerprint: "",
    keywords: {
        es: [
            "felipe cabrera",
            "ciberseguridad",
            "ctf",
            "nasa space apps",
            "data challenge",
            "machine learning",
            "python",
            "fastapi",
        ],
        en: [
            "felipe cabrera",
            "cybersecurity",
            "ctf",
            "nasa space apps",
            "data challenge",
            "machine learning",
            "python",
            "fastapi",
        ],
    },
};

export const socialLinks = [
    { name: "linkedin", url: "https://www.linkedin.com/in/felicabrera/" },
    { name: "github", url: "https://github.com/felicabrera/" },
    { name: "x", url: "https://x.com/thefelieppe" },
    { name: "instagram", url: "http://instagram.com/feli_cabrera" },
];

export const githubUrl = "https://github.com/felicabrera/";

export const blog = {
    kicker: { es: "blog personal", en: "personal blog" },
    title: { es: "Ingeniería, espacio & código.", en: "Engineering, space & code." },
    description: {
        es: "Notas sobre software, seguridad y lo que voy aprendiendo en el camino.",
        en: "Notes on software, security, and what I learn along the way.",
    },
};

export function blogPath(lang) {
    return `${localePrefix(lang)}/blog`;
}

// Projects listed under "01 trabajo". A project with `caseStudy` gets its own
// page at /trabajo/<slug> (es) and /work/<slug> (en); otherwise the row links
// straight to `url`.
export const projects = [
    {
        slug: "hea",
        title: "HEA – Habitable Exoplanet Analyzer",
        shortTitle: "Habitable Exoplanet Analyzer",
        year: "2025",
        description: {
            es: "Detección de exoplanetas y evaluación de habitabilidad con IA explicable (SHAP). Streamlit + FastAPI. NASA Space Apps 2025.",
            en: "Exoplanet detection and habitability assessment with explainable AI (SHAP). Streamlit + FastAPI. NASA Space Apps 2025.",
        },
        tags: ["python", "fastapi", "xgboost", "shap"],
        url: "https://github.com/felicabrera/hea",
        // Home hero teaser card
        card: {
            metric: "~94% acc",
            caption: {
                es: "hea – ia que evalúa exoplanetas habitables",
                en: "hea – ai that assesses habitable exoplanets",
            },
        },
        caseStudy: {
            number: "001",
            facts: [
                {
                    label: { es: "evento", en: "event" },
                    value: "NASA Space Apps Challenge 2025",
                },
                {
                    label: { es: "resultado", en: "result" },
                    value: { es: "1er lugar nacional, Uruguay", en: "1st place nationally, Uruguay" },
                },
                { label: { es: "precisión", en: "accuracy" }, value: "~94%" },
                { label: "stack", value: "Python · FastAPI · Streamlit · scikit-learn · XGBoost · SHAP" },
            ],
            chart: {
                label: { es: "flujo relativo", en: "relative flux" },
                prompt: {
                    es: ["candidato → habitable?", "evaluar"],
                    en: ["candidate → habitable?", "assess"],
                },
                caption: {
                    es: "la caída de brillo cuando un planeta pasa frente a su estrella, la señal que el modelo aprende a leer",
                    en: "the dip in brightness when a planet passes in front of its star, the signal the model learns to read",
                },
            },
            sections: [
                {
                    title: { es: "el problema", en: "the problem" },
                    body: {
                        es: "Detectar exoplanetas en datos de telescopio y estimar si podrían ser habitables, sin que el modelo sea una caja negra.",
                        en: "Detect exoplanets in telescope data and estimate whether they could be habitable, without the model being a black box.",
                    },
                },
                {
                    title: { es: "el enfoque", en: "the approach" },
                    body: {
                        es: "Modelos de clasificación con XGBoost y scikit-learn, explicados con SHAP para ver qué variable pesó en cada decisión. Backend FastAPI, interfaz Streamlit.",
                        en: "Classification models with XGBoost and scikit-learn, explained with SHAP to show which variable weighed on each decision. FastAPI backend, Streamlit interface.",
                    },
                },
                {
                    title: { es: "el resultado", en: "the result" },
                    body: {
                        es: "~94% de precisión y primer lugar nacional en NASA Space Apps 2025.",
                        en: "~94% accuracy and first place nationally at NASA Space Apps 2025.",
                    },
                },
            ],
            links: [
                {
                    label: { es: "código en github", en: "code on github" },
                    url: "https://github.com/felicabrera/hea",
                    primary: true,
                },
                {
                    label: { es: "nota en prensa", en: "press coverage (spanish)" },
                    url: "https://www.montevideo.com.uy/Ciencia-y-Tecnologia/Joven-uruguayo-diseno-una-IA-para-evaluar-exoplanetas-y-va-por-premio-de-la-NASA-uc939532",
                },
            ],
        },
    },
    {
        slug: "calorflow",
        title: "Calorflow",
        year: "2025",
        description: {
            es: "API y UI para preprocesar, entrenar y predecir en el ANCAP Data Challenge 2025. Docker Compose, workers Celery, seguimiento con MLflow.",
            en: "API and UI to preprocess, train and predict for the ANCAP Data Challenge 2025. Docker Compose, Celery workers, MLflow tracking.",
        },
        tags: ["fastapi", "postgres", "celery", "mlflow"],
        url: "https://github.com/felicabrera/calorflow",
        caseStudy: {
            number: "002",
            facts: [
                {
                    label: { es: "evento", en: "event" },
                    value: "ANCAP Data Challenge 2025",
                },
                {
                    label: { es: "resultado", en: "result" },
                    value: {
                        es: "Mención especial, corriente CCR",
                        en: "Special mention, CCR stream",
                    },
                },
                {
                    label: { es: "equipo", en: "team" },
                    value: "Never be Frog",
                },
                {
                    label: "stack",
                    value: "Python · FastAPI · Celery · Redis · PostgreSQL · MLflow · XGBoost · LightGBM · CatBoost",
                },
            ],
            sections: [
                {
                    title: { es: "el problema", en: "the problem" },
                    body: {
                        es: "Predecir el contenido de hidrógeno (H2) y el poder calorífico inferior (PCI) de las corrientes de gas de las unidades FCC y CCR de la Refinería de La Teja, a partir de datos operativos y propiedades de la carga. El objetivo del desafío: optimizar el uso de productos intermedios de la refinación.",
                        en: "Predict the hydrogen (H2) content and the lower heating value (LHV) of the gas streams from the FCC and CCR units at ANCAP's La Teja refinery, using operating data and feedstock properties. The goal of the challenge: optimize the use of intermediate refining products.",
                    },
                },
                {
                    title: { es: "el enfoque", en: "the approach" },
                    body: {
                        es: "El PCI se calcula a partir de la composición de cada muestra de gas. Para cada objetivo se entrena un ensamble que promedia XGBoost, LightGBM y CatBoost, con ajuste opcional de hiperparámetros con Optuna.",
                        en: "The LHV is computed from the composition of each gas sample. For each target, an ensemble averages XGBoost, LightGBM and CatBoost, with optional hyperparameter tuning through Optuna.",
                    },
                },
                {
                    title: { es: "la plataforma", en: "the platform" },
                    body: {
                        es: "La lógica del notebook de competencia pasó a una API FastAPI con una interfaz web simple. Docker Compose levanta la API, workers Celery que entrenan en segundo plano con Redis como broker, PostgreSQL para los metadatos de entrenamiento y MLflow para el seguimiento de experimentos.",
                        en: "The competition notebook's logic became a FastAPI service with a simple web interface. Docker Compose runs the API, Celery workers that train in the background with Redis as the broker, PostgreSQL for training metadata and MLflow for experiment tracking.",
                    },
                },
                {
                    title: { es: "el resultado", en: "the result" },
                    body: {
                        es: "Mención especial en la corriente CCR del ANCAP Data Challenge 2025, con el equipo Never be Frog junto a Stefano Francolino.",
                        en: "Special mention for the CCR stream at the ANCAP Data Challenge 2025, with the team Never be Frog alongside Stefano Francolino.",
                    },
                },
            ],
            links: [
                {
                    label: { es: "código en github", en: "code on github" },
                    url: "https://github.com/felicabrera/calorflow",
                    primary: true,
                },
                {
                    label: { es: "anuncio de ANCAP", en: "ANCAP announcement (spanish)" },
                    url: "https://www.ancap.com.uy/21021/1/data-challenge-ancap-2025:-innovacion-aplicada-a-la-refinacion.html",
                },
            ],
        },
    },
];

export const featuredProject = projects[0];

// "02 logros". `terminal` feeds the `ls logros/` lines in the hero.
export const achievements = [
    {
        title: "NASA Space Apps Challenge",
        year: "2025",
        mark: { es: "1º", en: "1st" },
        award: { es: "Primer lugar nacional", en: "First place nationally" },
        description: {
            es: "Primer lugar nacional, Uruguay. ML aplicado a datos satelitales.",
            en: "First place nationally, Uruguay. ML applied to satellite data.",
        },
        terminal: {
            long: {
                es: ["nasa-space-apps_2025_", "1er-lugar-nacional"],
                en: ["nasa-space-apps_2025_", "1st-place-national"],
            },
            short: {
                es: ["nasa-space-apps_25_", "1º-nacional"],
                en: ["nasa-space-apps_25_", "1st-national"],
            },
        },
    },
    {
        title: "OEA Cyber Challenge Uruguay",
        year: "2026",
        mark: { es: "3º", en: "3rd" },
        award: { es: "Equipo “Never be Frog”", en: "Team “Never be Frog”" },
        description: {
            es: "Tercer lugar nacional con el equipo “Never be Frog”.",
            en: "Third place nationally with the team “Never be Frog”.",
        },
        terminal: {
            long: {
                es: ["oea-cyber-challenge_2026_", "3er-lugar"],
                en: ["oea-cyber-challenge_2026_", "3rd-place"],
            },
            short: {
                es: ["oea-cyber-challenge_26_", "3º"],
                en: ["oea-cyber-challenge_26_", "3rd"],
            },
        },
    },
    {
        title: "UTE Data Challenge",
        year: "2025",
        mark: "CCR",
        award: { es: "Reconocimiento", en: "Recognition" },
        description: {
            es: "Reconocimiento. Optimización de consumo energético con redes neuronales.",
            en: "Recognition. Energy consumption optimization with neural networks.",
        },
        terminal: {
            long: {
                es: ["ute-data-challenge_2025_reconocimiento"],
                en: ["ute-data-challenge_2025_recognition"],
            },
            short: {
                es: ["ute-data-challenge_25_ccr"],
                en: ["ute-data-challenge_25_ccr"],
            },
        },
    },
];

// The CTF card in the hero.
export const flag = {
    text: "flag{n3v3r_b3_fr0g}",
    caption: { es: "los flags son mi firma", en: "flags are my signature" },
    meta: {
        es: "oea cyber challenge · 2026 · 3er lugar",
        en: "oea cyber challenge · 2026 · 3rd place",
    },
    metaShort: {
        es: "oea cyber challenge · 2026 · 3º",
        en: "oea cyber challenge · 2026 · 3rd",
    },
};

// "03 prensa". Dates are ISO so they can be formatted per layout.
// The entry marked `featured` becomes the redacted clipping in the hero.
// Headlines stay in the language they were published in (`lang`).
export const news = [
    {
        source: "UCU",
        lang: "es",
        headline: "Estudiantes de UCU ganaron desafío nacional de competencia de la NASA",
        date: "2025-10-20",
        url: "https://www.ucu.edu.uy/Institucionales/Estudiantes-de-UCU-ganaron-desafio-nacional-de-competencia-de-la-NASA-uc3468",
    },
    {
        source: "San José Ahora",
        lang: "es",
        headline: "Joven maragato diseñó IA para analizar exoplanetas y compite por premio global de NASA",
        date: "2025-10-13",
        url: "https://sanjoseahora.com.uy/2025/10/13/joven-maragato-disenao-ia-para-analizar-exoplanetas-y-compite-por-premio-global-de-nasa/",
    },
    {
        source: "Montevideo Portal",
        lang: "es",
        headline: "Joven uruguayo diseñó una IA para evaluar exoplanetas y va por premio de la NASA",
        date: "2025-10-11",
        url: "https://www.montevideo.com.uy/Ciencia-y-Tecnologia/Joven-uruguayo-diseno-una-IA-para-evaluar-exoplanetas-y-va-por-premio-de-la-NASA-uc939532",
        featured: true,
        stamp: {
            es: ["1er lugar nacional", "nasa space apps"],
            en: ["1st place nationally", "nasa space apps"],
        },
    },
    {
        source: "ANCAP",
        lang: "es",
        headline: "Data Challenge ANCAP 2025: innovación aplicada a la refinación",
        date: "2025-12-15",
        url: "https://www.ancap.com.uy/21021/1/data-challenge-ancap-2025:-innovacion-aplicada-a-la-refinacion.html",
    },
];

export const featuredNews = news.find((item) => item.featured) ?? news[0];

// Home sections in display order; `key` matches `sectionIds` in i18n.js.
export const sections = [
    { key: "work", label: { es: "trabajo", en: "work" } },
    { key: "achievements", label: { es: "logros", en: "achievements" } },
    { key: "press", label: { es: "prensa", en: "press" } },
    { key: "writing", label: { es: "escritos", en: "writing" } },
    { key: "contact", label: { es: "contacto", en: "contact" } },
];

// "work" -> "01"
export function sectionNumber(key) {
    const i = sections.findIndex((s) => s.key === key);
    return String(i + 1).padStart(2, "0");
}

export function sectionTitle(key, lang) {
    const s = sections.find((x) => x.key === key);
    return `${sectionNumber(key)} – ${tx(s.label, lang)}`;
}

export function sectionId(key, lang) {
    return sectionIds[key][lang];
}

export function casePath(project, lang = defaultLocale) {
    return `/${caseSegment[lang]}/${project.slug}`;
}

export function projectHref(project, lang = defaultLocale) {
    return project.caseStudy ? casePath(project, lang) : project.url;
}

export function projectsWithCase() {
    return projects.filter((p) => p.caseStudy);
}

export function getProject(slug) {
    return projects.find((p) => p.slug === slug);
}

export function nextProject(slug) {
    const i = projects.findIndex((p) => p.slug === slug);
    if (i === -1 || projects.length < 2) return null;
    return projects[(i + 1) % projects.length];
}

// No Date parsing, so the output never depends on the server's time zone.
// es: "2025-10-20" -> "20/10/25" (short) or "20/10/2025" (long).
// en: ISO "2025-10-20" either way, since day/month order is ambiguous in English.
export function formatDate(iso, { long = false, lang = defaultLocale } = {}) {
    if (lang === "en") return iso;
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${long ? y : y.slice(2)}`;
}
