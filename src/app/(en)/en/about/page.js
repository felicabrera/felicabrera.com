import AboutPage, { aboutMetadata } from "@/components/AboutPage";

const lang = "en";

export const metadata = aboutMetadata(lang);

export default function Page() {
    return <AboutPage lang={lang} />;
}
