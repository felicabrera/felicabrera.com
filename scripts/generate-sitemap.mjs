// Dynamic sitemap.xml generator for Next.js (ESM)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';
import { projectsWithCase } from '../src/data/portfolio.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../content/blog');
const APP_DIR = path.join(__dirname, '../src/app');
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITE_URL = 'https://felicabrera.com';

// Values for dynamic route segments, keyed by the route base that contains them.
const DYNAMIC_PARAMS = {
    '/trabajo/[slug]': () => projectsWithCase().map((p) => p.slug),
};

function formatDate(d) {
    if (!d) return new Date().toISOString().split('T')[0];
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString().split('T')[0];
}

function getPageRoutes(dir = APP_DIR, base = '') {
    let routes = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        // Exclude error pages and error folders
        const isErrorFolder = file.toLowerCase() === 'errors';
        const isErrorPage = ['notfound.js', 'servererror.js', '404.js', '500.js', 'dashboard.js', 'login.js'].includes(file.toLowerCase());
        if (stat.isDirectory()) {
            const isDashboardFolder = file.toLowerCase() === 'dashboard';
            if (!isErrorFolder && !isDashboardFolder) {
                routes = routes.concat(getPageRoutes(fullPath, base + '/' + file));
            }
        } else if (file === 'page.js' && !isErrorPage) {
            // For app router, page.js defines the route
            const gitDate = getGitLastCommitDate(fullPath);
            const entry = { lastmod: gitDate || stat.mtime, source: gitDate ? 'git' : 'fs' };
            if (/\[.+\]/.test(base)) {
                const expand = DYNAMIC_PARAMS[base];
                if (!expand) continue; // unknown dynamic route: skip rather than emit a literal [param]
                for (const value of expand()) {
                    routes.push({ route: base.replace(/\[[^\]]+\]/, value).toLowerCase(), ...entry });
                }
            } else {
                routes.push({ route: base.toLowerCase() || '/', ...entry });
            }
        }
    }
    return routes;
}

function getGitLastCommitDate(filePath) {
    try {
        const repoRoot = path.join(__dirname, '..');
        const rel = path.relative(repoRoot, filePath).replace(/\\/g, '/');
        // Use Git to get last commit date in ISO 8601 format
        const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', rel], { cwd: repoRoot, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
        const val = out && String(out).trim();
        if (!val) return null;
        const dt = new Date(val);
        if (isNaN(dt)) return null;
        return dt;
    } catch {
        // Fallback: git not available or file not in history
        return null;
    }
}

// Blog posts live in /content/blog as "<slug>.<lang>.mdx". Drafts are hidden
// unless BLOG_SHOW_DRAFTS=1, matching the rule the Next.js build uses, so the
// sitemap never lists a post the build chose not to render.
function getBlogRoutes() {
    const showDrafts = process.env.BLOG_SHOW_DRAFTS === '1';
    let files;
    try {
        files = fs.readdirSync(BLOG_DIR);
    } catch {
        return [];
    }
    const routes = [];
    for (const file of files) {
        if (file.startsWith('_') || !file.endsWith('.mdx')) continue;
        const m = file.match(/^(.+)\.(es|en)\.mdx$/);
        if (!m) continue;
        const [, slug, lang] = m;
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
        const { data } = matter(raw);
        if (data.draft === true && !showDrafts) continue;
        const prefix = lang === 'es' ? '' : `/${lang}`;
        routes.push({
            route: `${prefix}/blog/${slug}`.toLowerCase(),
            lastmod: data.date ? new Date(data.date) : new Date(),
            source: data.date ? 'frontmatter' : 'fs',
        });
    }
    return routes;
}

function buildSitemap(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${SITE_URL}${u.route}</loc>\n    <lastmod>${formatDate(u.lastmod)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.route === '/' ? '1.0' : '0.7'}</priority>\n  </url>`).join('\n')}\n</urlset>`;
}

function main() {
    const routes = [...getPageRoutes(), ...getBlogRoutes()];
    const sitemap = buildSitemap(routes);
    if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    // Log routes with last modified dates to help debugging
    console.log('Sitemap generated:', routes.map(r => `${r.route} (${formatDate(r.lastmod)}) [${r.source}]`));
}

main();