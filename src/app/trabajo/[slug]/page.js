import Link from "next/link";
import { notFound } from "next/navigation";
import InnerHeader from "@/components/InnerHeader";
import LightCurve from "@/components/LightCurve";
import { SiteFooter } from "@/components/home/Sections";
import { casePath, getProject, nextProject, projectHref, projectsWithCase, site } from "@/data/portfolio";

export function generateStaticParams() {
    return projectsWithCase().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project?.caseStudy) return {};
    const name = project.shortTitle ?? project.title;
    const url = `${site.url}${casePath(project)}`;
    return {
        title: `Caso ${slug.toUpperCase()}: ${name} | Felipe Cabrera`,
        description: project.description,
        alternates: { canonical: url },
        openGraph: { title: name, description: project.description, url, type: "article" },
    };
}

export default async function CasePage({ params }) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project?.caseStudy) notFound();

    const cs = project.caseStudy;
    const next = nextProject(slug);
    const nextIsInternal = next && Boolean(next.caseStudy);

    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader />

                <main>
                    <div className="kicker case-kicker">
                        expediente {cs.number} · {project.year}
                    </div>
                    <h1 className="case-title">{project.shortTitle ?? project.title}</h1>

                    <dl className="facts">
                        {cs.facts.map((f) => (
                            <div key={f.label}>
                                <dt>{f.label}</dt>
                                <dd>{f.value}</dd>
                            </div>
                        ))}
                    </dl>

                    {cs.chart && (
                        <figure className="case-chart">
                            <div className="plot">
                                <span className="tl">{cs.chart.label}</span>
                                {cs.chart.prompt && (
                                    <span className="tr">
                                        {cs.chart.prompt[0]} <span>{cs.chart.prompt[1]}</span>
                                    </span>
                                )}
                                <LightCurve variant="wide" />
                                <span className="bl">tiempo →</span>
                            </div>
                            <figcaption>{cs.chart.caption}</figcaption>
                        </figure>
                    )}

                    <div className="case-sections">
                        {cs.sections.map((s, i) => (
                            <section key={s.title}>
                                <h2>
                                    {String(i + 1).padStart(2, "0")} – {s.title}
                                </h2>
                                <p>{s.body}</p>
                            </section>
                        ))}
                    </div>

                    <div className="case-links">
                        {cs.links.map((l) => (
                            <a key={l.url} href={l.url} className={l.primary ? "btn btn-primary" : "btn"}>
                                {l.label} ↗
                            </a>
                        ))}
                    </div>

                    {next && (
                        <nav aria-label="Siguiente" className="case-next">
                            <span className="kicker">siguiente expediente</span>
                            {nextIsInternal ? (
                                <Link href={projectHref(next)}>{next.shortTitle ?? next.title} →</Link>
                            ) : (
                                <a href={projectHref(next)}>{next.shortTitle ?? next.title} →</a>
                            )}
                        </nav>
                    )}
                </main>

                <SiteFooter />
            </div>
        </div>
    );
}
