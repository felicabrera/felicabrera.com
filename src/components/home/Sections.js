import Link from "next/link";
import {
    achievements,
    blog,
    formatDate,
    githubUrl,
    news,
    profile,
    projectHref,
    projects,
    sectionTitle,
    socialLinks,
} from "@/data/portfolio";

function SectionHead({ id, children }) {
    return (
        <div className="sec-head">
            <h2>{sectionTitle(id)}</h2>
            {children}
        </div>
    );
}

export function Intro() {
    return (
        <section className="intro" aria-label="Índice">
            <p className="kicker">índice</p>
            <p className="lead">{profile.intro}</p>
        </section>
    );
}

function WorkRow({ project }) {
    const internal = Boolean(project.caseStudy);
    const content = (
        <>
            <span className="work-year">{project.year}</span>
            <span className="work-title">{project.title}</span>
            <span className="work-desc">
                {project.description}
                {project.tags?.length > 0 && <span className="work-tags">{project.tags.join(" · ")}</span>}
            </span>
            <span className="work-arrow" aria-hidden="true">
                {internal ? "→" : "↗"}
            </span>
        </>
    );

    return internal ? (
        <Link className="row work-row" href={projectHref(project)}>
            {content}
        </Link>
    ) : (
        <a className="row work-row" href={projectHref(project)}>
            {content}
        </a>
    );
}

export function Work() {
    return (
        <section id="trabajo" className="section">
            <SectionHead id="trabajo">
                <a href={githubUrl}>
                    <span className="hide-mobile">todo en </span>github ↗
                </a>
            </SectionHead>
            {projects.map((p) => (
                <WorkRow key={p.slug} project={p} />
            ))}
        </section>
    );
}

export function Achievements() {
    return (
        <section id="logros" className="section">
            <SectionHead id="logros" />
            <div className="ach-grid">
                {achievements.map((a) => (
                    <div key={a.title} className="ach">
                        <div className="ach-year">{a.year}</div>
                        <div className="ach-mark">{a.mark}</div>
                        <div>
                            <div className="ach-title">{a.title}</div>
                            <div className="ach-desc">{a.description}</div>
                            <div className="ach-meta">
                                {a.award} · {a.year}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function Press() {
    return (
        <section id="prensa" className="section">
            <SectionHead id="prensa" />
            {news.map((item) => (
                <a key={item.url} className="row press-row" href={item.url}>
                    <span className="press-source">{item.source}</span>
                    <span className="press-headline">{item.headline}</span>
                    <time className="press-date" dateTime={item.date}>
                        {formatDate(item.date)}
                    </time>
                </a>
            ))}
        </section>
    );
}

export function Writing() {
    return (
        <section id="blog" className="section">
            <SectionHead id="blog" />
            <Link href={blog.path} className="blog-card lift">
                <div className="kicker">{blog.kicker}</div>
                <div className="blog-card-title">{blog.title}</div>
                <div className="blog-card-desc">{blog.description}</div>
                <div className="blog-card-cta u">leer artículos →</div>
            </Link>
        </section>
    );
}

export function Contact() {
    return (
        <section id="contacto" className="contact">
            <h2>{sectionTitle("contacto")}</h2>
            <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
            </a>
            <div className="contact-social">
                {socialLinks.map((s) => (
                    <a key={s.name} href={s.url} rel="me">
                        {s.name} ↗
                    </a>
                ))}
            </div>
        </section>
    );
}

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <span>
                © {process.env.BUILD_YEAR} {profile.name.toLowerCase()}
            </span>
            <span>hecho en {profile.location.toLowerCase()}</span>
            {profile.pgpFingerprint && <span>pgp: {profile.pgpFingerprint}</span>}
        </footer>
    );
}
