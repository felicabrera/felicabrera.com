// sitemap.xml and llms.txt generator, run after `next build` (ESM, plain Node).
//
// Both are built from the same data as the pages, so a project hidden by
// `publishAt` or a draft post never shows up in either.
//
// Every page exists in Spanish and English, so each <url> lists both versions
// with xhtml:link hreflang alternates (es, en, x-default = es), the same pairs
// the pages declare in their <head>. A blog post without a translation lists
// only itself.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';
import {
    aboutPath,
    achievements,
    blogPath,
    buildDate,
    casePath,
    news,
    profile,
    projects,
    projectsWithCase,
    site,
    socialLinks,
} from '../src/data/portfolio.js';
import { homePath, tx } from '../src/data/i18n.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content/blog');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE_URL = 'https://felicabrera.com';

// Last commit date of the given files, or null when git is unavailable (the
// Docker build has no .git). A missing <lastmod> is better than a wrong one:
// search engines stop trusting lastmod that changes on every build.
function gitDate(...files) {
    try {
        const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
            cwd: ROOT,
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'ignore'],
        }).trim();
        return out ? out.slice(0, 10) : null;
    } catch {
        return null;
    }
}

// A page pair: { es, en } paths plus an optional lastmod. `image` is a
// site-relative image shown on the page, listed for image search.
function pair(es, en, lastmod, image) {
    return { alternates: { es, en }, lastmod, image };
}

function pagePairs() {
    const data = 'src/data/portfolio.js';
    const pairs = [
        pair('/', '/en', gitDate(data, 'src/components/home'), profile.avatarUrl),
        pair(aboutPath('es'), aboutPath('en'), gitDate(data, 'src/components/AboutPage.js'), profile.avatarUrl),
        pair('/blog', '/en/blog', gitDate('content/blog', 'src/components/blog')),
    ];
    for (const p of projectsWithCase()) {
        pairs.push(pair(`/trabajo/${p.slug}`, `/work/${p.slug}`, gitDate(data, 'src/components/CaseStudy.js')));
    }
    return pairs;
}

// Blog posts are "<slug>.<lang>.mdx", paired by `translationKey`. Drafts and
// posts dated after the build day are skipped unless BLOG_SHOW_DRAFTS=1,
// matching the build.
function postPairs() {
    const showDrafts = process.env.BLOG_SHOW_DRAFTS === '1';
    let files;
    try {
        files = fs.readdirSync(BLOG_DIR);
    } catch {
        return [];
    }
    const byKey = new Map();
    for (const file of files) {
        const m = file.match(/^([^_].*)\.(es|en)\.mdx$/);
        if (!m) continue;
        const [, slug, lang] = m;
        const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'));
        const scheduled = data.date && String(data.date).slice(0, 10) > buildDate();
        if ((data.draft === true || scheduled) && !showDrafts) continue;
        const key = data.translationKey ?? slug;
        const entry = byKey.get(key) ?? { alternates: {}, lastmod: null, titles: {} };
        entry.titles[lang] = data.title ?? slug;
        entry.alternates[lang] = `${lang === 'es' ? '' : `/${lang}`}/blog/${slug}`;
        // Posts carry their own date; the later of the two versions wins.
        const date = data.date ? String(data.date).slice(0, 10) : null;
        if (date && (!entry.lastmod || date > entry.lastmod)) entry.lastmod = date;
        byKey.set(key, entry);
    }
    return [...byKey.values()];
}

function urlEntries({ alternates, lastmod, image }) {
    const langs = ['es', 'en'].filter((l) => alternates[l]);
    const links =
        langs.length > 1
            ? [
                  ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${alternates[l]}"/>`),
                  `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${alternates.es}"/>`,
              ]
            : [];
    return langs.map((l) =>
        [
            '  <url>',
            `    <loc>${SITE_URL}${alternates[l]}</loc>`,
            ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
            ...links,
            ...(image ? [`    <image:image><image:loc>${SITE_URL}${image}</image:loc></image:image>`] : []),
            '  </url>',
        ].join('\n'),
    );
}

// llms.txt (https://llmstxt.org): a plain summary of the site for LLMs.
function buildLlms(posts) {
    const en = 'en';
    const url = (p) => `${SITE_URL}${p}`;
    const lines = [
        '# felicabrera.com',
        '',
        `> ${tx(site.description, en)}`,
        '',
        '## About',
        `Personal site of ${profile.name} (${profile.fullName}), based in ${profile.city}, ${profile.location}. ${tx(profile.intro, en)}`,
        `Full profile: ${url(aboutPath(en))} (Spanish ${url(aboutPath('es'))}).`,
        '',
        '## Languages',
        `The site is bilingual. Spanish is the default (${url('/')}); English lives at ${url(homePath('en'))}, case studies at /work/<slug> (Spanish /trabajo/<slug>) and the blog at ${url(blogPath('en'))} (Spanish ${url(blogPath('es'))}). Press coverage is in Spanish.`,
        '',
        '## Feeds',
        `- RSS, English: ${url(`${blogPath('en')}/feed.xml`)}`,
        `- RSS, Spanish: ${url(`${blogPath('es')}/feed.xml`)}`,
        '',
        '## Projects',
        ...projects.map((p) => {
            const links = [p.caseStudy && `[Case study](${url(casePath(p, en))})`, `[Link](${p.url})`].filter(Boolean);
            return `- **${p.title}** (${p.year}): ${tx(p.description, en)} ${links.join(' · ')}`;
        }),
        '',
        '## Achievements',
        ...achievements.map((a) => `- **${a.title}** (${a.year}): ${tx(a.description, en)}`),
        '',
        '## Blog posts',
        ...posts
            .sort((a, b) => String(b.lastmod).localeCompare(String(a.lastmod)))
            .map((p) => {
                const versions = ['en', 'es']
                    .filter((l) => p.alternates[l])
                    .map((l) => `[${l === 'en' ? 'English' : 'Español'}](${url(p.alternates[l])})`);
                return `- ${p.titles.en ?? p.titles.es} (${p.lastmod ?? 'undated'}): ${versions.join(' · ')}`;
            }),
        '',
        '## Press',
        ...news.map((n) => `- ${n.source}: "${n.headline}" (${n.date}, Spanish) ${n.url}`),
        '',
        '## Contact',
        `- Email: ${profile.email}`,
        ...socialLinks.map((l) => `- ${l.name}: ${l.url}`),
        '',
    ];
    return lines.join('\n');
}

function main() {
    const posts = postPairs();
    const entries = [...pagePairs(), ...posts];
    const urls = entries.flatMap(urlEntries);
    const xml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
        urls.join('\n') +
        '\n</urlset>\n';
    if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), buildLlms(posts));
    console.log(
        'Sitemap generated:',
        entries.map((e) => `${Object.values(e.alternates).join(' + ')} (${e.lastmod ?? 'no lastmod'})`),
    );
}

main();
