import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { buildPostMetadata, getPost, getStaticParams, getTranslationSlug } from "@/lib/blog";

const lang = "en";

export function generateStaticParams() {
    return getStaticParams(lang);
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    return buildPostMetadata(lang, slug);
}

export default async function Page({ params }) {
    const { slug } = await params;
    const post = getPost(lang, slug);
    if (!post) notFound();
    const translationSlug = getTranslationSlug(post.frontmatter.translationKey, "es");
    return <BlogArticle lang={lang} post={post} translationSlug={translationSlug} />;
}
