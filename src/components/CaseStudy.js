import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";
import LightCurve from "@/components/LightCurve";
import { SiteFooter } from "@/components/home/Sections";
import {
    casePath,
    getProject,
    languageAlternates,
    nextProject,
    projectHref,
    projectsWithCase,
    site,
} from "@/data/portfolio";
import { homePath, otherLocale, tx, ui } from "@/data/i18n";
import { JsonLd, breadcrumbSchema, openGraph, personId } from "@/lib/seo";

export function caseStaticParams() {
    return projectsWithCase().map((p) => ({ slug: p.slug }));
}

export function caseMetadata(slug, lang) {
    const project = getProject(slug);
    if (!project?.caseStudy) return {};
    const name = project.shortTitle ?? project.title;
    const description = tx(project.description, lang);
    const url = `${site.url}${casePath(project, lang)}`;
    return {
        // "Caso HEA: Habitable Exoplanet Analyzer" when the slug is an acronym
        // of a longer name, otherwise just "Caso: Calorflow".
        title: project.shortTitle
            ? `${ui[lang].caseTitle} ${slug.toUpperCase()}: ${name} | Felipe Cabrera`
            : `${ui[lang].caseTitle}: ${name} | Felipe Cabrera`,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates({ es: casePath(project, "es"), en: casePath(project, "en") }),
        },
        openGraph: openGraph(lang, { title: name, description, url, type: "article" }),
    };
}

function caseSchema(project, lang) {
    const url = `${site.url}${casePath(project, lang)}`;
    const name = project.shortTitle ?? project.title;
    return [
        {
            "@type": "CreativeWork",
            "@id": `${url}#work`,
            name: project.title,
            description: tx(project.description, lang),
            url,
            inLanguage: lang,
            dateCreated: project.year.slice(0, 4),
            keywords: project.tags.join(", "),
            creator: { "@id": personId },
            sameAs: project.url,
        },
        breadcrumbSchema([
            { name: ui[lang].home, path: homePath(lang) },
            { name, path: casePath(project, lang) },
        ]),
    ];
}

// Case study page. The caller has already checked the project has a case study.
export default function CaseStudy({ project, lang }) {
    const tr = ui[lang];
    const other = otherLocale(lang);
    const cs = project.caseStudy;
    const next = nextProject(project.slug);
    const nextIsInternal = next && Boolean(next.caseStudy);
    const prompt = cs.chart && tx(cs.chart.prompt, lang);

    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader lang={lang} />
                <JsonLd data={caseSchema(project, lang)} />

                <main>
                    <div className="blog-topbar case-topbar">
                        <span className="kicker">
                            {tr.caseFile} {cs.number} · {project.year}
                        </span>
                        <Link className="lang-switch" href={casePath(project, other)} hrefLang={other}>
                            {tr.switchTo} ↗
                        </Link>
                    </div>
                    <h1 className="case-title">{project.shortTitle ?? project.title}</h1>

                    <dl className="facts">
                        {cs.facts.map((f) => (
                            <div key={tx(f.label, "es")}>
                                <dt>{tx(f.label, lang)}</dt>
                                <dd>{tx(f.value, lang)}</dd>
                            </div>
                        ))}
                    </dl>

                    {cs.chart && (
                        <figure className="case-chart">
                            <div className="plot">
                                <span className="tl">{tx(cs.chart.label, lang)}</span>
                                {prompt && (
                                    <span className="tr">
                                        {prompt[0]} <span>{prompt[1]}</span>
                                    </span>
                                )}
                                <LightCurve variant="wide" />
                                <span className="bl">{tr.time}</span>
                            </div>
                            <figcaption>{tx(cs.chart.caption, lang)}</figcaption>
                        </figure>
                    )}

                    <div className="case-sections">
                        {cs.sections.map((s, i) => (
                            <section key={tx(s.title, "es")}>
                                <h2>
                                    {String(i + 1).padStart(2, "0")} – {tx(s.title, lang)}
                                </h2>
                                <p>{tx(s.body, lang)}</p>
                            </section>
                        ))}
                    </div>

                    <div className="case-links">
                        {cs.links.map((l) => (
                            <a key={l.url} href={l.url} className={l.primary ? "btn btn-primary" : "btn"}>
                                {tx(l.label, lang)} ↗
                            </a>
                        ))}
                    </div>

                    {next && (
                        <nav aria-label={tr.next} className="case-next">
                            <span className="kicker">{tr.nextCaseFile}</span>
                            {nextIsInternal ? (
                                <Link href={projectHref(next, lang)}>{next.shortTitle ?? next.title} →</Link>
                            ) : (
                                <a href={projectHref(next, lang)}>{next.shortTitle ?? next.title} →</a>
                            )}
                        </nav>
                    )}
                </main>

                <SiteFooter lang={lang} />
            </div>
        </div>
    );
}
