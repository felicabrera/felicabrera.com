import HomePage from "@/components/home/HomePage";
import { languageAlternates, site } from "@/data/portfolio";
import { homePath } from "@/data/i18n";

const lang = "es";

export const metadata = {
    alternates: {
        canonical: `${site.url}${homePath(lang)}`,
        languages: languageAlternates({ es: homePath("es"), en: homePath("en") }),
    },
};

export default function Home() {
    return <HomePage lang={lang} />;
}
