import BlogIndex from "@/components/blog/BlogIndex";
import { blogIndexMetadata } from "@/lib/blog";

const lang = "es";

export const metadata = blogIndexMetadata(lang);

export default function Page() {
    return <BlogIndex lang={lang} />;
}
