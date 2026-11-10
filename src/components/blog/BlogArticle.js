import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";
import PostBody from "@/components/blog/PostBody";
import { SiteFooter } from "@/components/home/Sections";
import { homePath, otherLocale, ui } from "@/data/i18n";
import { site } from "@/data/portfolio";
import {
    blogBasePath,
    formatPostDate,
    postPath,
    t,
} from "@/lib/blog";
import { JsonLd, breadcrumbSchema, ogImage, personId, websiteId } from "@/lib/seo";

function postSchema(lang, post) {
    const { title, description, date, tags } = post.frontmatter;
    const url = `${site.url}${postPath(lang, post.slug)}`;
    return [
        {
            "@type": "BlogPosting",
            "@id": `${url}#post`,
            headline: title,
            description,
            url,
            mainEntityOfPage: url,
            inLanguage: lang,
            ...(date ? { datePublished: date } : {}),
            keywords: tags.join(", "),
            image: ogImage(lang).url,
            author: { "@id": personId },
            publisher: { "@id": personId },
            isPartOf: { "@id": websiteId },
        },
        breadcrumbSchema([
            { name: ui[lang].home, path: homePath(lang) },
            { name: "blog", path: blogBasePath(lang) },
            { name: title, path: postPath(lang, post.slug) },
        ]),
    ];
}

export default function BlogArticle({ lang, post, translationSlug }) {
    const tr = t[lang];
    const other = otherLocale(lang);
    const { frontmatter } = post;
    // Language switch points at the translated post when it exists, otherwise
    // at the other language's blog index.
    const otherHref = translationSlug ? postPath(other, translationSlug) : blogBasePath(other);

    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader lang={lang} />
                <JsonLd data={postSchema(lang, post)} />
                <main>
                    <article className="post" lang={lang}>
                        <div className="blog-topbar">
                            <span className="kicker">
                                <time dateTime={frontmatter.date ?? undefined}>
                                    {formatPostDate(frontmatter.date, lang)}
                                </time>
                                {" · "}
                                {tr.by} {frontmatter.author}
                                {frontmatter.draft && <span className="draft-badge">{tr.draftBadge}</span>}
                            </span>
                            {translationSlug && (
                                <Link className="lang-switch" href={otherHref} hrefLang={other}>
                                    {tr.readingOther} ↗
                                </Link>
                            )}
                        </div>

                        <h1 className="post-headline">{frontmatter.title}</h1>

                        {frontmatter.tags.length > 0 && (
                            <div className="post-tags post-tags-top">{frontmatter.tags.join(" · ")}</div>
                        )}

                        <PostBody content={post.content} />
                    </article>

                    <nav className="post-foot" aria-label={tr.allPosts}>
                        <Link href={blogBasePath(lang)}>← {tr.back}</Link>
                        <Link href={homePath(lang)}>{tr.backHome} ↗</Link>
                    </nav>
                </main>
                <SiteFooter lang={lang} />
            </div>
        </div>
    );
}
