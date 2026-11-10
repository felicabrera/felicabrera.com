// Bilingual blog backed by MDX files in /content/blog.
//
// Each post is a file named <slug>.<lang>.mdx (lang is "es" or "en").
// Two files that describe the same post in different languages share a
// `translationKey` in their frontmatter, which is what links them for the
// language switch and for hreflang.
//
// Spanish is the default locale and lives at /blog ; English lives at /en/blog.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogPath, languageAlternates, profile, site } from "@/data/portfolio";
import { defaultLocale } from "@/data/i18n";
import { openGraph } from "@/lib/seo";

export { defaultLocale, locales, localePrefix } from "@/data/i18n";

export function blogBasePath(lang) {
    return blogPath(lang);
}

export function postPath(lang, slug) {
    return `${blogBasePath(lang)}/${slug}`;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Drafts are hidden in production. Set BLOG_SHOW_DRAFTS=1 to preview them,
// and outside production (local dev) they are always shown.
function showDrafts() {
    return process.env.BLOG_SHOW_DRAFTS === "1" || process.env.NODE_ENV !== "production";
}

function readDir() {
    try {
        return fs.readdirSync(BLOG_DIR);
    } catch {
        return [];
    }
}

function parseFileName(file) {
    // "<slug>.<lang>.mdx"; ignore helper files like "_sources.md".
    if (file.startsWith("_") || !file.endsWith(".mdx")) return null;
    const m = file.match(/^(.+)\.(es|en)\.mdx$/);
    if (!m) return null;
    return { slug: m[1], lang: m[2] };
}

function readPostFile(file) {
    const parsed = parseFileName(file);
    if (!parsed) return null;
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
        slug: parsed.slug,
        lang: parsed.lang,
        content,
        frontmatter: {
            title: data.title ?? parsed.slug,
            description: data.description ?? "",
            date: data.date ?? null,
            tags: Array.isArray(data.tags) ? data.tags : [],
            author: data.author ?? "Felipe Cabrera",
            translationKey: data.translationKey ?? parsed.slug,
            draft: data.draft === true,
        },
    };
}

function allPosts() {
    return readDir()
        .map(readPostFile)
        .filter(Boolean);
}

function byDateDesc(a, b) {
    return String(b.frontmatter.date ?? "").localeCompare(String(a.frontmatter.date ?? ""));
}

// Posts for a locale's index, newest first, drafts hidden in production.
export function getPosts(lang) {
    return allPosts()
        .filter((p) => p.lang === lang)
        .filter((p) => showDrafts() || !p.frontmatter.draft)
        .sort(byDateDesc);
}

// Slugs to statically generate for a locale (drafts excluded in production,
// so their pages 404 and never get indexed).
export function getPostSlugs(lang) {
    return getPosts(lang).map((p) => p.slug);
}

// Params for the [slug] route's generateStaticParams. With cacheComponents
// enabled, generateStaticParams must return at least one entry, so when a
// locale has no published posts we emit a sentinel slug that getPost rejects
// and the page turns into a 404. It never appears in the sitemap.
export const NO_POSTS_SENTINEL = "__no-posts__";
export function getStaticParams(lang) {
    const slugs = getPostSlugs(lang);
    if (slugs.length === 0) return [{ slug: NO_POSTS_SENTINEL }];
    return slugs.map((slug) => ({ slug }));
}

export function getPost(lang, slug) {
    const post = allPosts().find((p) => p.lang === lang && p.slug === slug);
    if (!post) return null;
    if (post.frontmatter.draft && !showDrafts()) return null;
    return post;
}

// The slug of the same post in another language, or null if untranslated.
export function getTranslationSlug(translationKey, lang) {
    const match = allPosts().find(
        (p) => p.lang === lang && p.frontmatter.translationKey === translationKey,
    );
    return match ? match.slug : null;
}

// Next.js metadata for the blog index.
export function blogIndexMetadata(lang) {
    const url = `${site.url}${blogBasePath(lang)}`;
    const title = t[lang].metaTitle;
    const description = t[lang].metaDescription;
    return {
        title: `${title} | ${profile.name}`,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates({ es: blogBasePath("es"), en: blogBasePath("en") }),
        },
        openGraph: openGraph(lang, { title, description, url }),
    };
}

// Next.js metadata for a post page, including hreflang alternates that pair the
// Spanish and English versions. A draft is marked noindex.
export function buildPostMetadata(lang, slug) {
    const post = getPost(lang, slug);
    if (!post) return {};
    const key = post.frontmatter.translationKey;
    const esSlug = getTranslationSlug(key, "es");
    const enSlug = getTranslationSlug(key, "en");
    const languages = {};
    if (esSlug) languages.es = `${site.url}${postPath("es", esSlug)}`;
    if (enSlug) languages.en = `${site.url}${postPath("en", enSlug)}`;
    languages["x-default"] = languages.es ?? `${site.url}${postPath(lang, slug)}`;
    const url = `${site.url}${postPath(lang, slug)}`;
    const { title, description, date, tags } = post.frontmatter;
    return {
        title: `${title} | Felipe Cabrera`,
        description,
        keywords: tags,
        alternates: { canonical: url, languages },
        openGraph: openGraph(lang, {
            title,
            description,
            url,
            type: "article",
            ...(date ? { publishedTime: date } : {}),
            authors: [site.url],
            tags,
        }),
        ...(post.frontmatter.draft ? { robots: { index: false, follow: false } } : {}),
    };
}

const MONTHS = {
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
};

// "2025-10-11" -> "11 oct 2025", no Date parsing so it is time-zone safe.
export function formatPostDate(iso, lang = defaultLocale) {
    if (!iso) return "";
    const [y, m, d] = String(iso).split("-");
    const month = MONTHS[lang]?.[Number(m) - 1] ?? m;
    return `${Number(d)} ${month} ${y}`;
}

// UI strings per locale.
export const t = {
    es: {
        kicker: "blog",
        metaTitle: "Blog: ciberseguridad, writeups de CTF e ingeniería",
        metaDescription:
            "Writeups de CTF, ciberseguridad, criptografía y proyectos de datos e IA, escritos por Felipe Cabrera desde Uruguay.",
        indexTitle: "Ingeniería, espacio & código.",
        indexDescription:
            "Notas sobre seguridad, CTFs, datos y lo que voy aprendiendo en el camino.",
        empty: "Estoy preparando los primeros artículos. Vuelve pronto.",
        emptyCta: "avisame cuando publiques",
        back: "volver al blog",
        backHome: "volver al inicio",
        readingOther: "English",
        draftBadge: "borrador",
        by: "por",
        related: "relacionado",
        allPosts: "todos los artículos",
    },
    en: {
        kicker: "blog",
        metaTitle: "Blog: cybersecurity, CTF writeups and engineering",
        metaDescription:
            "CTF writeups, cybersecurity, cryptography, and data and AI projects, written by Felipe Cabrera from Uruguay.",
        indexTitle: "Engineering, space & code.",
        indexDescription: "Notes on security, CTFs, data, and what I learn along the way.",
        empty: "I'm writing the first posts. Check back soon.",
        emptyCta: "let me know when you publish",
        back: "back to the blog",
        backHome: "back home",
        readingOther: "Español",
        draftBadge: "draft",
        by: "by",
        related: "related",
        allPosts: "all posts",
    },
};
