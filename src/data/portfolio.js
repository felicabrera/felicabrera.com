
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapPin, faTrophy, faNewspaper, faCode, faEnvelope, faGlobe, faArrowUpRightFromSquare, faBars, faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const icons = {
    mapPin: faMapPin,
    trophy: faTrophy,
    newspaper: faNewspaper,
    code: faCode,
    envelope: faEnvelope,
    globe: faGlobe,
    arrowUpRight: faArrowUpRightFromSquare,
    menu: faBars,
    close: faTimes,
    chevronRight: faChevronRight,
    linkedin: faLinkedin,
    github: faGithub,
    twitter: faTwitter,
    instagram: faInstagram,
};

export const profile = {
    name: "Felipe Cabrera",
    role: "Full Stack Developer",
    bio: "Apasionado por conectar datos complejos con interfaces humanas intuitivas.",
    keywords: ["nasa", "space apps", "data challenge", "fastapi", "python", "machine learning", "full stack developer", "felipe cabrera"],
    location: "Uruguay",
    age: "21 años",
    avatarUrl: "/avatar.jpg",
    status: "Disponible para nuevos retos",
    email: "me@felieppe.com"
};

export const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/felicabrera/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/felicabrera/", icon: "github" },
    { name: "Instagram", url: "http://instagram.com/feli_cabrera", icon: "instagram" },
    { name: "Mail", url: "mailto:me@felieppe.com", icon: "envelope" }
];

export const navLinks = [
    { name: "Blog", url: "/blog" },
];

export const projects = [
    {
        title: "HEA - Habitable Exoplanet Analyzer",
        category: "Python • Streamlit • FastAPI • scikit-learn • XGBoost • SHAP",
        year: "2025",
        description: "AI-powered exoplanet detection and habitability assessment with SHAP explainability, a Streamlit UI and FastAPI backend. Achieves ~94% accuracy and was created for the NASA Space Apps Challenge 2025.",
        url: "https://github.com/felicabrera/hea"
    },
    {
        title: "Calorflow",
        category: "Python • FastAPI • Docker • Postgres • Celery • MLflow • Chart.js",
        year: "2025",
        description: "API and small web UI for preprocessing, model training and predictions (ANCAP Data Challenge 2025). Includes Docker Compose, Celery workers, and ML model checkpoints.",
        url: "https://github.com/felicabrera/calorflow"
    },
];

export const news = [
    {
        source: "Montevideo Portal",
        headline: "Joven uruguayo diseñó una IA para evaluar exoplanetas y va por premio de la NASA",
        date: "11/10/2025",
        url: "https://www.montevideo.com.uy/Ciencia-y-Tecnologia/Joven-uruguayo-diseno-una-IA-para-evaluar-exoplanetas-y-va-por-premio-de-la-NASA-uc939532"
    },
    {
        source: "UCU",
        headline: "Estudiantes de UCU ganaron desafío nacional de competencia de la NASA",
        date: "20/10/2025",
        url: "https://www.ucu.edu.uy/Institucionales/Estudiantes-de-UCU-ganaron-desafio-nacional-de-competencia-de-la-NASA-uc3468"
    },
    {
        source: "San José Ahora",
        headline: "Joven maragato diseñó IA para analizar exoplanetas y compite por premio global de NASA",
        date: "13/10/2025",
        url: "https://sanjoseahora.com.uy/2025/10/13/joven-maragato-disenao-ia-para-analizar-exoplanetas-y-compite-por-premio-global-de-nasa/"
    },
    {
        source: "ANCAP",
        headline: "Data Challenge ANCAP 2025: innovación aplicada a la refinación",
        date: "15/12/2025",
        url: "https://www.ancap.com.uy/21021/1/data-challenge-ancap-2025:-innovacion-aplicada-a-la-refinacion.html"
    }
];

export const achievements = [
    {
        title: "NASA Space Apps Challenge",
        award: "1er Lugar Nacional",
        year: "2025",
        description: "Desarrollo de algoritmos de ML para procesamiento de datos satelitales. Reconocido por innovación técnica e impacto social.",
        icon: "globe"
    },
    {
        title: "UTE Data Challenge",
        award: "Reconocimiento CCR",
        year: "2025",
        description: "Optimización de consumo energético mediante redes neuronales.",
        icon: "trophy"
    }
];