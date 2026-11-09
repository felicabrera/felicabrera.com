// Single source of truth for the site's content.
// Every section of the home page and the case pages renders from here.

export const site = {
    url: "https://felicabrera.com",
    title: "Felipe Cabrera | Ciberseguridad, ingeniería y código",
    description:
        "Estudiante de Ingeniería en Uruguay. Ciberseguridad, CTFs y software de datos y ML. 1er lugar nacional NASA Space Apps 2025, 3er lugar OEA Cyber Challenge 2026.",
    accent: "#ff4f1a",
};

export const profile = {
    name: "Felipe Cabrera",
    handle: "felicabrera",
    role: "Ciberseguridad · Ingeniería · Código",
    tagline: "ciberseguridad · ingeniería · código",
    intro:
        "Rompo sistemas para entender cómo protegerlos, y construyo software que convierte datos complejos en algo que cualquiera puede usar.",
    location: "Uruguay",
    city: "Montevideo",
    avatarUrl: "/avatar.jpg",
    email: "me@felieppe.com",
    twitter: "@thefelieppe",
    // Shown in the footer only when set.
    pgpFingerprint: "",
    keywords: [
        "felipe cabrera",
        "ciberseguridad",
        "ctf",
        "nasa space apps",
        "data challenge",
        "machine learning",
        "python",
        "fastapi",
    ],
};

export const socialLinks = [
    { name: "linkedin", url: "https://www.linkedin.com/in/felicabrera/" },
    { name: "github", url: "https://github.com/felicabrera/" },
    { name: "x", url: "https://x.com/thefelieppe" },
    { name: "instagram", url: "http://instagram.com/feli_cabrera" },
];

export const githubUrl = "https://github.com/felicabrera/";

export const blog = {
    path: "/blog",
    kicker: "blog personal",
    title: "Ingeniería, espacio & código.",
    description: "Notas sobre software, seguridad y lo que voy aprendiendo en el camino.",
};

// Projects listed under "01 trabajo". A project with `caseStudy` gets its own
// page at /trabajo/<slug>; otherwise the row links straight to `url`.
export const projects = [
    {
        slug: "hea",
        title: "HEA – Habitable Exoplanet Analyzer",
        shortTitle: "Habitable Exoplanet Analyzer",
        year: "2025",
        description:
            "Detección de exoplanetas y evaluación de habitabilidad con IA explicable (SHAP). Streamlit + FastAPI. NASA Space Apps 2025.",
        tags: ["python", "fastapi", "xgboost", "shap"],
        url: "https://github.com/felicabrera/hea",
        // Home hero teaser card
        card: {
            metric: "~94% acc",
            caption: "hea – ia que evalúa exoplanetas habitables",
        },
        caseStudy: {
            number: "001",
            facts: [
                { label: "evento", value: "NASA Space Apps Challenge 2025" },
                { label: "resultado", value: "1er lugar nacional, Uruguay" },
                { label: "precisión", value: "~94%" },
                { label: "stack", value: "Python · FastAPI · Streamlit · scikit-learn · XGBoost · SHAP" },
            ],
            chart: {
                label: "flujo relativo",
                prompt: ["candidato → habitable?", "evaluar"],
                caption:
                    "la caída de brillo cuando un planeta pasa frente a su estrella, la señal que el modelo aprende a leer",
            },
            sections: [
                {
                    title: "el problema",
                    body: "Detectar exoplanetas en datos de telescopio y estimar si podrían ser habitables, sin que el modelo sea una caja negra.",
                },
                {
                    title: "el enfoque",
                    body: "Modelos de clasificación con XGBoost y scikit-learn, explicados con SHAP para ver qué variable pesó en cada decisión. Backend FastAPI, interfaz Streamlit.",
                },
                {
                    title: "el resultado",
                    body: "~94% de precisión y primer lugar nacional en NASA Space Apps 2025.",
                },
            ],
            links: [
                { label: "código en github", url: "https://github.com/felicabrera/hea", primary: true },
                {
                    label: "nota en prensa",
                    url: "https://www.montevideo.com.uy/Ciencia-y-Tecnologia/Joven-uruguayo-diseno-una-IA-para-evaluar-exoplanetas-y-va-por-premio-de-la-NASA-uc939532",
                },
            ],
        },
    },
    {
        slug: "calorflow",
        title: "Calorflow",
        year: "2025",
        description:
            "API y UI para preprocesar, entrenar y predecir en el ANCAP Data Challenge 2025. Docker Compose, workers Celery, checkpoints con MLflow.",
        tags: ["fastapi", "postgres", "celery", "mlflow"],
        url: "https://github.com/felicabrera/calorflow",
    },
];

export const featuredProject = projects[0];

// "02 logros". `terminal` feeds the `ls logros/` lines in the hero.
export const achievements = [
    {
        title: "NASA Space Apps Challenge",
        year: "2025",
        mark: "1º",
        award: "Primer lugar nacional",
        description: "Primer lugar nacional, Uruguay. ML aplicado a datos satelitales.",
        terminal: {
            long: ["nasa-space-apps_2025_", "1er-lugar-nacional"],
            short: ["nasa-space-apps_25_", "1º-nacional"],
        },
    },
    {
        title: "OEA Cyber Challenge Uruguay",
        year: "2026",
        mark: "3º",
        award: "Equipo “Never be Frog”",
        description: "Tercer lugar nacional con el equipo “Never be Frog”.",
        terminal: {
            long: ["oea-cyber-challenge_2026_", "3er-lugar"],
            short: ["oea-cyber-challenge_26_", "3º"],
        },
    },
    {
        title: "UTE Data Challenge",
        year: "2025",
        mark: "CCR",
        award: "Reconocimiento",
        description: "Reconocimiento. Optimización de consumo energético con redes neuronales.",
        terminal: {
            long: ["ute-data-challenge_2025_reconocimiento"],
            short: ["ute-data-challenge_25_ccr"],
        },
    },
];

// The CTF card in the hero.
export const flag = {
    text: "flag{n3v3r_b3_fr0g}",
    caption: "los flags son mi firma",
    meta: "oea cyber challenge · 2026 · 3er lugar",
    metaShort: "oea cyber challenge · 2026 · 3º",
};

// "03 prensa". Dates are ISO so they can be formatted per layout.
// The entry marked `featured` becomes the redacted clipping in the hero.
export const news = [
    {
        source: "UCU",
        headline: "Estudiantes de UCU ganaron desafío nacional de competencia de la NASA",
        date: "2025-10-20",
        url: "https://www.ucu.edu.uy/Institucionales/Estudiantes-de-UCU-ganaron-desafio-nacional-de-competencia-de-la-NASA-uc3468",
    },
    {
        source: "San José Ahora",
        headline: "Joven maragato diseñó IA para analizar exoplanetas y compite por premio global de NASA",
        date: "2025-10-13",
        url: "https://sanjoseahora.com.uy/2025/10/13/joven-maragato-disenao-ia-para-analizar-exoplanetas-y-compite-por-premio-global-de-nasa/",
    },
    {
        source: "Montevideo Portal",
        headline: "Joven uruguayo diseñó una IA para evaluar exoplanetas y va por premio de la NASA",
        date: "2025-10-11",
        url: "https://www.montevideo.com.uy/Ciencia-y-Tecnologia/Joven-uruguayo-diseno-una-IA-para-evaluar-exoplanetas-y-va-por-premio-de-la-NASA-uc939532",
        featured: true,
        stamp: ["1er lugar nacional", "nasa space apps"],
    },
    {
        source: "ANCAP",
        headline: "Data Challenge ANCAP 2025: innovación aplicada a la refinación",
        date: "2025-12-15",
        url: "https://www.ancap.com.uy/21021/1/data-challenge-ancap-2025:-innovacion-aplicada-a-la-refinacion.html",
    },
];

export const featuredNews = news.find((item) => item.featured) ?? news[0];

export const sections = [
    { id: "trabajo", label: "trabajo" },
    { id: "logros", label: "logros" },
    { id: "prensa", label: "prensa" },
    { id: "blog", label: "escritos" },
    { id: "contacto", label: "contacto" },
];

// "trabajo" -> "01"
export function sectionNumber(id) {
    const i = sections.findIndex((s) => s.id === id);
    return String(i + 1).padStart(2, "0");
}

export function sectionTitle(id) {
    const s = sections.find((x) => x.id === id);
    return `${sectionNumber(id)} – ${s.label}`;
}

export function casePath(project) {
    return `/trabajo/${project.slug}`;
}

export function projectHref(project) {
    return project.caseStudy ? casePath(project) : project.url;
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

// "2025-10-20" -> "20/10/25" (short) or "20/10/2025" (long), no Date parsing
// so the output never depends on the server's time zone.
export function formatDate(iso, { long = false } = {}) {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${long ? y : y.slice(2)}`;
}
