import AboutPage, { aboutMetadata } from "@/components/AboutPage";

const lang = "es";

export const metadata = aboutMetadata(lang);

export default function Page() {
    return <AboutPage lang={lang} />;
}
