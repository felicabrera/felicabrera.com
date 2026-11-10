import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { buildPostMetadata, getPost, getPostSlugs, getTranslationSlug } from "@/lib/blog";

const lang = "es";

export function generateStaticParams() {
    return getPostSlugs(lang).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    return buildPostMetadata(lang, slug);
}

export default async function Page({ params }) {
    const { slug } = await params;
    const post = getPost(lang, slug);
    if (!post) notFound();
    const translationSlug = getTranslationSlug(post.frontmatter.translationKey, "en");
    return <BlogArticle lang={lang} post={post} translationSlug={translationSlug} />;
}
