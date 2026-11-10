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
        es: "Felipe Cabrera, estudiante de Ingeniería en Uruguay: ciberseguridad, CTFs y software de datos y ML. 1er lugar nacional NASA Space Apps 2025, 3er lugar OEA Cyber Challenge 2026.",
        en: "Felipe Cabrera, engineering student in Uruguay: cybersecurity, CTFs, and data and ML software. 1st place nationally at NASA Space Apps 2025, 3rd place at the OEA Cyber Challenge 2026.",
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
    // The full name the press uses.
    fullName: "Felipe Cabrera Bisio",
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
    // Named after the person: image search reads the file name.
    avatarUrl: "/felipe-cabrera.jpg",
    email: "me@felieppe.com",
    twitter: "@thefelieppe",
    // Shown in the footer only when set.
    pgpFingerprint: "",
    keywords: {
        es: [
            "felipe cabrera",
            "ciberseguridad",
            "ctf",
            "writeups ctf",
            "voto electrónico",
            "criptografía",
            "uruguay",
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
            "ctf writeups",
            "electronic voting",
            "cryptography",
            "uruguay",
            "nasa space apps",
            "data challenge",
            "machine learning",
            "python",
            "fastapi",
        ],
    },
    // schema.org Person fields for search engines.
    knowsAbout: {
        es: [
            "Ciberseguridad",
            "Capture the Flag",
            "Explotación de binarios",
            "Criptografía aplicada",
            "Voto electrónico verificable",
            "Machine learning",
            "Desarrollo backend",
        ],
        en: [
            "Cybersecurity",
            "Capture the Flag",
            "Binary exploitation",
            "Applied cryptography",
            "Verifiable electronic voting",
            "Machine learning",
            "Backend development",
        ],
    },
    awards: {
        es: [
            "NASA Space Apps Challenge 2025, 1er lugar nacional (Uruguay)",
            "OEA Cyber Challenge 2026, 3er lugar nacional (Uruguay)",
            "ANCAP Data Challenge 2025, mención especial corriente CCR",
        ],
        en: [
            "NASA Space Apps Challenge 2025, 1st place nationally (Uruguay)",
            "OEA Cyber Challenge 2026, 3rd place nationally (Uruguay)",
            "ANCAP Data Challenge 2025, special mention for the CCR stream",
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

// The "about" page: /sobre-mi (es) and /en/about (en). It is the page meant
// to answer the search "Felipe Cabrera", so it says in plain prose who he is.
export const about = {
    segment: { es: "sobre-mi", en: "about" },
    label: { es: "sobre mí", en: "about" },
    kicker: { es: "sobre mí", en: "about" },
    metaTitle: {
        es: "Quién es Felipe Cabrera | Ciberseguridad e ingeniería, Uruguay",
        en: "About Felipe Cabrera | Cybersecurity and engineering, Uruguay",
    },
    metaDescription: {
        es: "Felipe Cabrera (Felipe Cabrera Bisio) es estudiante de Ingeniería en Informática en la UCU, Uruguay. Ciberseguridad, CTFs, machine learning y voto electrónico verificable.",
        en: "Felipe Cabrera (Felipe Cabrera Bisio) is a Computer Engineering student at UCU, Uruguay. Cybersecurity, CTFs, machine learning and verifiable electronic voting.",
    },
    // One line that tells this Felipe Cabrera apart from others with the name.
    disambiguation: {
        es: "Estudiante uruguayo de Ingeniería en Informática dedicado a la ciberseguridad y al software de datos",
        en: "Uruguayan Computer Engineering student working on cybersecurity and data software",
    },
    facts: [
        { label: { es: "nombre", en: "name" }, value: "Felipe Cabrera Bisio" },
        { label: { es: "ubicación", en: "location" }, value: "Montevideo, Uruguay" },
        {
            label: { es: "estudios", en: "studies" },
            value: {
                es: "Ingeniería en Informática, Universidad Católica del Uruguay",
                en: "Computer Engineering, Universidad Católica del Uruguay",
            },
        },
        {
            label: { es: "áreas", en: "fields" },
            value: {
                es: "Ciberseguridad · CTF · Machine learning · Criptografía aplicada",
                en: "Cybersecurity · CTF · Machine learning · Applied cryptography",
            },
        },
    ],
    sections: [
        {
            title: { es: "quién soy", en: "who I am" },
            body: {
                es: "Soy Felipe Cabrera, estudiante de Ingeniería en Informática en la Universidad Católica del Uruguay (UCU). Soy de San José y vivo en Montevideo. Rompo sistemas para entender cómo protegerlos, y construyo software que convierte datos complejos en algo que cualquiera puede usar.",
                en: "I am Felipe Cabrera, a Computer Engineering student at Universidad Católica del Uruguay (UCU). I am from San José and I live in Montevideo. I break systems to understand how to protect them, and I build software that turns complex data into something anyone can use.",
            },
        },
        {
            title: { es: "ciberseguridad", en: "cybersecurity" },
            body: {
                es: "Compito en CTFs, y mi categoría favorita es pwn: explotación de binarios. En 2026 salimos terceros a nivel nacional en el OEA Cyber Challenge Uruguay con el equipo Never be Frog, junto a Stefano Francolino. En el blog publico los writeups de los retos que resuelvo.",
                en: "I compete in CTFs, and my favourite category is pwn: binary exploitation. In 2026 we placed third nationally at the OEA Cyber Challenge Uruguay with the team Never be Frog, together with Stefano Francolino. I publish writeups of the challenges I solve on the blog.",
            },
        },
        {
            title: { es: "datos y machine learning", en: "data and machine learning" },
            body: {
                es: "En 2025 gané el primer lugar nacional del NASA Space Apps Challenge en Uruguay con HEA, un analizador de exoplanetas habitables con IA explicable que presenté de forma individual. El mismo año, Calorflow recibió una mención especial en el ANCAP Data Challenge por predecir el contenido de H2 y el poder calorífico en la refinería de La Teja.",
                en: "In 2025 I won first place nationally at the NASA Space Apps Challenge in Uruguay with HEA, a habitable exoplanet analyzer built on explainable AI that I entered on my own. The same year, Calorflow received a special mention at the ANCAP Data Challenge for predicting H2 content and heating value at the La Teja refinery.",
            },
        },
        {
            title: { es: "en qué estoy ahora", en: "what I am doing now" },
            body: {
                es: "Mi Proyecto Final de Grado es ÁGORA + FARO, un sistema de voto electrónico verificable de extremo a extremo: ElGamal homomórfico, pruebas de conocimiento cero y un log público auditable. Lo desarrollo con Stefano Francolino y Lucia Vazquez, con entrega en agosto de 2027.",
                en: "My capstone thesis is ÁGORA + FARO, an end-to-end verifiable electronic voting system: homomorphic ElGamal, zero-knowledge proofs and a public auditable log. I am building it with Stefano Francolino and Lucia Vazquez, due August 2027.",
            },
        },
    ],
    pressTitle: { es: "en la prensa", en: "in the press" },
    contactTitle: { es: "contacto y perfiles", en: "contact and profiles" },
};

export function aboutPath(lang) {
    return `${localePrefix(lang)}/${about.segment[lang]}`;
}

// Projects listed under "01 trabajo". A project with `caseStudy` gets its own
// page at /trabajo/<slug> (es) and /work/<slug> (en); otherwise the row links
// straight to `url`.
//
// A project with `publishAt` ("YYYY-MM-DD") stays out of the site, its case
// page and the sitemap until that day in Montevideo. The check runs at build
// time, so the deploy workflow also rebuilds on a schedule to publish it. Set
// SHOW_SCHEDULED=1 to preview scheduled projects locally.
const allProjects = [
    {
        slug: "agora",
        title: "ÁGORA + FARO",
        year: "2026–2027",
        description: {
            es: "Voto electrónico verificable de extremo a extremo: ElGamal homomórfico, pruebas de conocimiento cero y FARO, un log público auditable. Medido con ÁBACO. Proyecto Final de Grado, UCU.",
            en: "End-to-end verifiable electronic voting: homomorphic ElGamal, zero-knowledge proofs and FARO, a public auditable log. Measured with ÁBACO. Capstone thesis, UCU.",
        },
        tags: ["go", "elgamal", "zkp", "merkle"],
        url: "https://github.com/felicabrera/agora",
        caseStudy: {
            number: "003",
            facts: [
                {
                    label: { es: "tipo", en: "type" },
                    value: {
                        es: "Proyecto Final de Grado, Ingeniería en Informática (UCU)",
                        en: "Capstone thesis, Computer Engineering (UCU)",
                    },
                },
                {
                    label: { es: "estado", en: "status" },
                    value: { es: "En desarrollo, entrega en agosto de 2027", en: "In development, due August 2027" },
                },
                {
                    label: { es: "equipo", en: "team" },
                    value: "Felipe Cabrera · Stefano Francolino · Lucia Vazquez",
                },
                {
                    label: "stack",
                    value: "Go · ristretto255 · Tessera · C2SP tlog-tiles · PostgreSQL · Next.js",
                },
            ],
            sections: [
                {
                    title: { es: "el problema", en: "the problem" },
                    body: {
                        es: "Quien pierde una votación necesita una razón para aceptar el resultado. Hoy esa razón es confiar en quien organizó el proceso. ÁGORA la reemplaza por una prueba matemática que cualquiera puede verificar por su cuenta, para sindicatos, colegios profesionales, cajas, clubes, cooperativas y universidades.",
                        en: "Whoever loses a vote needs a reason to accept the result. Today that reason is trust in whoever ran the process. ÁGORA replaces it with a mathematical proof that anyone can check on their own, for unions, professional associations, pension funds, clubs, cooperatives and universities.",
                    },
                },
                {
                    title: { es: "ágora, el voto", en: "ágora, the vote" },
                    body: {
                        es: "El voto se cifra en el dispositivo del votante con ElGamal exponencial sobre ristretto255, junto con pruebas de conocimiento cero de que es válido, sin revelar cuál es. Los votos se suman cifrados y solo se descifra el total, con descifrado por umbral: ninguna autoridad tiene la clave completa. El sistema se piensa en niveles según el riesgo, desde voto remoto verificable hasta una urna presencial air-gapped con comprobante en papel (VVPAT).",
                        en: "The ballot is encrypted on the voter's device with exponential ElGamal over ristretto255, together with zero-knowledge proofs that it is valid, without revealing the choice. Ballots are added up while encrypted and only the total is decrypted, using threshold decryption: no single authority holds the full key. The system is designed in tiers by risk, from verifiable remote voting to an air-gapped in-person voting machine with a paper receipt (VVPAT).",
                    },
                },
                {
                    title: { es: "faro, el registro", en: "faro, the log" },
                    body: {
                        es: "FARO es el log público append-only donde quedan los votos cifrados. Está construido sobre Tessera, la biblioteca de transparency.dev que también sostiene logs de Certificate Transparency, y se sirve con la API C2SP tlog-tiles. Con pruebas de inclusión y de consistencia, un votante confirma que su voto quedó registrado y un auditor confirma que el log nunca fue reescrito, sin confiar en el operador y sin blockchain.",
                        en: "FARO is the public append-only log that holds the encrypted ballots. It is built on Tessera, the transparency.dev library that also backs Certificate Transparency logs, and served over the C2SP tlog-tiles API. With inclusion and consistency proofs, a voter can confirm their ballot was recorded and an auditor can confirm the log was never rewritten, without trusting the operator and without a blockchain.",
                    },
                },
                {
                    title: { es: "ábaco, la medición", en: "ábaco, the measurement" },
                    body: {
                        es: "ÁBACO es un benchmark en Go que mide el pipeline criptográfico completo de una elección: cifrar, probar, verificar, sumar, insertar en el log y descifrar por umbral. En un AMD Ryzen 5 3600, un millón de votos se procesó en 287 s, a unas 3.500 papeletas por segundo, con 6,6 MiB de memoria pico y el conteo correcto. Insertar un voto en FARO cuesta 390 ns, y verificar que está incluido en un log de un millón de entradas, 2,25 µs con una prueba de 640 bytes.",
                        en: "ÁBACO is a Go benchmark that measures an election's full cryptographic pipeline: encrypt, prove, verify, add up, append to the log and threshold-decrypt. On an AMD Ryzen 5 3600, one million ballots were processed in 287 s, at about 3,500 ballots per second, with 6.6 MiB of peak memory and a correct tally. Appending a ballot to FARO costs 390 ns, and verifying that it is included in a log of one million entries takes 2.25 µs with a 640-byte proof.",
                    },
                },
                {
                    title: { es: "el estado", en: "the status" },
                    body: {
                        es: "Es nuestro Proyecto Final de Grado de Ingeniería en Informática en la Universidad Católica del Uruguay, con entrega en agosto de 2027. El núcleo criptográfico de ÁGORA y el servicio de log de FARO ya están en código público; el protocolo de elección, la verificación desde la CLI y el navegador, y el panel de administración están en desarrollo.",
                        en: "It is our Computer Engineering capstone thesis at Universidad Católica del Uruguay, due in August 2027. ÁGORA's cryptographic core and FARO's log service are already public; the election protocol, verification from the CLI and the browser, and the admin panel are in development.",
                    },
                },
            ],
            links: [
                {
                    label: { es: "ágora en github", en: "ágora on github" },
                    url: "https://github.com/felicabrera/agora",
                    primary: true,
                },
                {
                    label: { es: "faro en github", en: "faro on github" },
                    url: "https://github.com/felicabrera/faro",
                },
                {
                    label: { es: "ábaco en github", en: "ábaco on github" },
                    url: "https://github.com/felicabrera/abaco",
                },
            ],
        },
    },
    {
        slug: "clavoware",
        title: "Clavoware",
        year: "2026",
        publishAt: "2026-11-17",
        description: {
            es: "SaaS de control de vencimientos para supermercados: el equipo escanea al recibir y el encargado sabe cada mañana qué vence y qué hacer. App web offline-first, API en Go.",
            en: "Expiry-date tracking SaaS for supermarkets: staff scan stock on arrival and managers know every morning what is about to expire and what to do. Offline-first web app, Go API.",
        },
        tags: ["go", "next.js", "postgres", "saas"],
        url: "https://clavoware.com",
        caseStudy: {
            number: "004",
            facts: [
                {
                    label: { es: "tipo", en: "type" },
                    value: { es: "SaaS B2B para supermercados", en: "B2B SaaS for supermarkets" },
                },
                {
                    label: { es: "estado", en: "status" },
                    value: { es: "Acceso anticipado, 2026", en: "Early access, 2026" },
                },
                {
                    label: { es: "idiomas", en: "languages" },
                    value: { es: "Español · portugués · inglés", en: "Spanish · Portuguese · English" },
                },
                {
                    label: "stack",
                    value: "Go · Fiber · PostgreSQL · Next.js · next-intl · ZXing · Docker · Sentry",
                },
            ],
            sections: [
                {
                    title: { es: "el problema", en: "the problem" },
                    body: {
                        es: "En un supermercado la mercadería vence en silencio en la góndola. Nadie revisa fechas producto por producto, y lo que se descubre tarde termina en la basura.",
                        en: "In a supermarket, stock expires quietly on the shelf. Nobody checks dates product by product, and whatever is found too late ends up in the trash.",
                    },
                },
                {
                    title: { es: "el producto", en: "the product" },
                    body: {
                        es: "El personal escanea el código de barras con la cámara del celular al recibir la mercadería y carga la fecha en tres toques, incluso sin conexión. Cada día a las 08:00 el encargado recibe un resumen con lo que vence en 7 días, lo crítico a 3 días y qué hacer con cada cosa: rebajar, reubicar o retirar. Las cadenas comparan sus locales por merma.",
                        en: "Staff scan the barcode with their phone camera when stock arrives and enter the date in three taps, even offline. Every day at 08:00 the manager gets a summary of what expires within 7 days, what is critical within 3, and what to do with each item: discount, move or remove it. Chains compare their stores by waste.",
                    },
                },
                {
                    title: { es: "la plataforma", en: "the platform" },
                    body: {
                        es: "Una API en Go con Fiber y PostgreSQL, y una app web en Next.js con escaneo por cámara (ZXing), cola de escaneos sin conexión que sincroniza al volver la señal y notificaciones push. Funciona en Android e iOS sin hardware dedicado, en español, portugués e inglés.",
                        en: "A Go API built with Fiber and PostgreSQL, and a Next.js web app with camera scanning (ZXing), an offline scan queue that syncs when the connection returns, and push notifications. It runs on Android and iOS with no dedicated hardware, in Spanish, Portuguese and English.",
                    },
                },
                {
                    title: { es: "el estado", en: "the status" },
                    body: {
                        es: "Lanzado en 2026 en acceso anticipado para supermercados de Uruguay y la región.",
                        en: "Launched in 2026 in early access for supermarkets in Uruguay and the region.",
                    },
                },
            ],
            links: [
                {
                    label: { es: "clavoware.com", en: "clavoware.com" },
                    url: "https://clavoware.com",
                    primary: true,
                },
            ],
        },
    },
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

// The build day in Montevideo as "YYYY-MM-DD". Next.js inlines BUILD_DATE_MVD
// (next.config.mjs) so pages never read the clock; the sitemap script runs on
// plain Node and computes it (en-CA formats dates as ISO).
export function buildDate() {
    return (
        process.env.BUILD_DATE_MVD ??
        new Intl.DateTimeFormat("en-CA", { timeZone: "America/Montevideo" }).format(new Date())
    );
}

function isPublished(project) {
    if (!project.publishAt || process.env.SHOW_SCHEDULED === "1") return true;
    return project.publishAt <= buildDate();
}

export const projects = allProjects.filter(isPublished);

// The hero teaser card; the only project with a `card`.
export const featuredProject = projects.find((p) => p.slug === "hea");

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
        title: "ANCAP Data Challenge",
        year: "2025",
        mark: "CCR",
        award: { es: "Mención especial", en: "Special mention" },
        description: {
            es: "Mención especial en la corriente CCR. Predicción de H2 y poder calorífico en la refinería de La Teja.",
            en: "Special mention for the CCR stream. Predicting H2 content and heating value at the La Teja refinery.",
        },
        terminal: {
            long: {
                es: ["ancap-data-challenge_2025_mencion"],
                en: ["ancap-data-challenge_2025_mention"],
            },
            short: {
                es: ["ancap-data-challenge_25_ccr"],
                en: ["ancap-data-challenge_25_ccr"],
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
