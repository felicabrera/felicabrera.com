import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";
import { SiteFooter } from "@/components/home/Sections";
import { profile } from "@/data/portfolio";
import {
    blogBasePath,
    formatPostDate,
    getPosts,
    localePrefix,
    postPath,
    t,
} from "@/lib/blog";

const otherLocale = (lang) => (lang === "es" ? "en" : "es");

export default function BlogIndex({ lang }) {
    const posts = getPosts(lang);
    const tr = t[lang];
    const other = otherLocale(lang);

    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader localePrefix={localePrefix(lang)} />
                <main>
                    <div className="blog-topbar">
                        <span className="kicker">{tr.kicker}</span>
                        <Link className="lang-switch" href={blogBasePath(other)} hrefLang={other}>
                            {tr.readingOther} ↗
                        </Link>
                    </div>
                    <h1 className="plain-title">{tr.indexTitle}</h1>
                    <p className="plain-body">{tr.indexDescription}</p>

                    {posts.length === 0 ? (
                        <>
                            <div className="terminal-note">
                                <div className="p">
                                    ~/blog $ <span className="cmd">ls</span>
                                </div>
                                <div>total 0</div>
                                <div className="p">
                                    ~/blog $ <span className="cmd">cat proximamente.txt</span>
                                </div>
                                <div>{tr.empty}</div>
                            </div>
                            <div className="plain-actions">
                                <a
                                    className="btn btn-primary"
                                    href={`mailto:${profile.email}?subject=${encodeURIComponent(tr.emptyCta)}`}
                                >
                                    {tr.emptyCta} ↗
                                </a>
                            </div>
                        </>
                    ) : (
                        <ul className="post-list">
                            {posts.map((post) => (
                                <li key={post.slug}>
                                    <Link className="row post-row" href={postPath(lang, post.slug)}>
                                        <time className="post-date" dateTime={post.frontmatter.date ?? undefined}>
                                            {formatPostDate(post.frontmatter.date, lang)}
                                        </time>
                                        <span className="post-title">
                                            {post.frontmatter.title}
                                            {post.frontmatter.draft && (
                                                <span className="draft-badge">{tr.draftBadge}</span>
                                            )}
                                        </span>
                                        <span className="post-excerpt">{post.frontmatter.description}</span>
                                        {post.frontmatter.tags.length > 0 && (
                                            <span className="post-tags">{post.frontmatter.tags.join(" · ")}</span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
                <SiteFooter />
            </div>
        </div>
    );
}
