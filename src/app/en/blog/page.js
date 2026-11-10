import BlogIndex from "@/components/blog/BlogIndex";
import { blogBasePath, t } from "@/lib/blog";
import { site } from "@/data/portfolio";

const lang = "en";

export const metadata = {
    title: "Blog | Felipe Cabrera",
    description: t[lang].indexDescription,
    alternates: {
        canonical: `${site.url}${blogBasePath("en")}`,
        languages: {
            es: `${site.url}${blogBasePath("es")}`,
            en: `${site.url}${blogBasePath("en")}`,
            "x-default": `${site.url}${blogBasePath("es")}`,
        },
    },
};

export default function Page() {
    return <BlogIndex lang={lang} />;
}
