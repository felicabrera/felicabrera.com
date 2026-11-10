import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";
import PostBody from "@/components/blog/PostBody";
import { SiteFooter } from "@/components/home/Sections";
import { homePath, otherLocale } from "@/data/i18n";
import {
    blogBasePath,
    formatPostDate,
    postPath,
    t,
} from "@/lib/blog";

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
