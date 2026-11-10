// RSS 2.0 feed of a locale's published posts, served at <blog>/feed.xml.
// Items carry the post's description, not its full body (posts are MDX).

import { profile, site } from "@/data/portfolio";
import { blogBasePath, getPosts, postPath, t } from "@/lib/blog";

export function feedPath(lang) {
    return `${blogBasePath(lang)}/feed.xml`;
}

function escape(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// "2025-10-15" -> "Wed, 15 Oct 2025 00:00:00 GMT", built from the date alone
// so the feed never reads the clock.
function rfc822(iso) {
    const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d)).toUTCString();
}

export function buildFeed(lang) {
    const posts = getPosts(lang);
    const home = `${site.url}${blogBasePath(lang)}`;
    const items = posts.map((post) => {
        const { title, description, date, tags } = post.frontmatter;
        const url = `${site.url}${postPath(lang, post.slug)}`;
        return [
            "    <item>",
            `      <title>${escape(title)}</title>`,
            `      <link>${url}</link>`,
            `      <guid isPermaLink="true">${url}</guid>`,
            ...(date ? [`      <pubDate>${rfc822(date)}</pubDate>`] : []),
            `      <description>${escape(description)}</description>`,
            `      <dc:creator>${escape(profile.name)}</dc:creator>`,
            ...tags.map((tag) => `      <category>${escape(tag)}</category>`),
            "    </item>",
        ].join("\n");
    });
    const latest = posts.find((p) => p.frontmatter.date)?.frontmatter.date;
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
        "  <channel>",
        `    <title>${escape(`${profile.name}: ${t[lang].metaTitle}`)}</title>`,
        `    <link>${home}</link>`,
        `    <atom:link href="${site.url}${feedPath(lang)}" rel="self" type="application/rss+xml"/>`,
        `    <description>${escape(t[lang].metaDescription)}</description>`,
        `    <language>${lang}</language>`,
        ...(latest ? [`    <lastBuildDate>${rfc822(latest)}</lastBuildDate>`] : []),
        ...items,
        "  </channel>",
        "</rss>",
        "",
    ].join("\n");
}

export function feedResponse(lang) {
    return new Response(buildFeed(lang), {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
