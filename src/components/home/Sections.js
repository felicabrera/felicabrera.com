import Link from "next/link";
import {
    achievements,
    blog,
    blogPath,
    formatDate,
    githubUrl,
    news,
    profile,
    projectHref,
    projects,
    sectionId,
    sectionTitle,
    socialLinks,
} from "@/data/portfolio";
import { tx, ui } from "@/data/i18n";

function SectionHead({ id, lang, children }) {
    return (
        <div className="sec-head">
            <h2>{sectionTitle(id, lang)}</h2>
            {children}
        </div>
    );
}

export function Intro({ lang }) {
    const tr = ui[lang];
    return (
        <section className="intro" aria-label={tr.index}>
            <p className="kicker">{tr.index}</p>
            <p className="lead">{tx(profile.intro, lang)}</p>
        </section>
    );
}

function WorkRow({ project, lang }) {
    const internal = Boolean(project.caseStudy);
    const href = projectHref(project, lang);
    const content = (
        <>
            <span className="work-year">{project.year}</span>
            <span className="work-title">{project.title}</span>
            <span className="work-desc">
                {tx(project.description, lang)}
                {project.tags?.length > 0 && <span className="work-tags">{project.tags.join(" · ")}</span>}
            </span>
            <span className="work-arrow" aria-hidden="true">
                {internal ? "→" : "↗"}
            </span>
        </>
    );

    return internal ? (
        <Link className="row work-row" href={href}>
            {content}
        </Link>
    ) : (
        <a className="row work-row" href={href}>
            {content}
        </a>
    );
}

export function Work({ lang }) {
    return (
        <section id={sectionId("work", lang)} className="section">
            <SectionHead id="work" lang={lang}>
                <a href={githubUrl}>
                    <span className="hide-mobile">{ui[lang].allOn}</span>github ↗
                </a>
            </SectionHead>
            {projects.map((p) => (
                <WorkRow key={p.slug} project={p} lang={lang} />
            ))}
        </section>
    );
}

export function Achievements({ lang }) {
    return (
        <section id={sectionId("achievements", lang)} className="section">
            <SectionHead id="achievements" lang={lang} />
            <div className="ach-grid">
                {achievements.map((a) => (
                    <div key={a.title} className="ach">
                        <div className="ach-year">{a.year}</div>
                        <div className="ach-mark">{tx(a.mark, lang)}</div>
                        <div>
                            <div className="ach-title">{a.title}</div>
                            <div className="ach-desc">{tx(a.description, lang)}</div>
                            <div className="ach-meta">
                                {tx(a.award, lang)} · {a.year}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Headlines are quoted in the language they were published in.
export function Press({ lang }) {
    const note = ui[lang].pressNote;
    return (
        <section id={sectionId("press", lang)} className="section press-section">
            <SectionHead id="press" lang={lang}>
                {note && <span className="sec-note">{note}</span>}
            </SectionHead>
            {news.map((item) => (
                <a key={item.url} className="row press-row" href={item.url} hrefLang={item.lang}>
                    <span className="press-source">{item.source}</span>
                    <span className="press-headline" lang={item.lang}>
                        {item.headline}
                    </span>
                    <time className="press-date" dateTime={item.date}>
                        {formatDate(item.date, { lang })}
                    </time>
                </a>
            ))}
        </section>
    );
}

export function Writing({ lang }) {
    return (
        <section id={sectionId("writing", lang)} className="section writing-section">
            <SectionHead id="writing" lang={lang} />
            <Link href={blogPath(lang)} className="blog-card lift">
                <div className="kicker">{tx(blog.kicker, lang)}</div>
                <div className="blog-card-title">{tx(blog.title, lang)}</div>
                <div className="blog-card-desc">{tx(blog.description, lang)}</div>
                <div className="blog-card-cta u">{ui[lang].readArticles}</div>
            </Link>
        </section>
    );
}

export function Contact({ lang }) {
    return (
        <section id={sectionId("contact", lang)} className="contact">
            <h2>{sectionTitle("contact", lang)}</h2>
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

export function SiteFooter({ lang }) {
    return (
        <footer className="site-footer">
            <span>
                © {process.env.BUILD_YEAR} {profile.name.toLowerCase()}
            </span>
            <span>
                {ui[lang].madeIn} {profile.location.toLowerCase()}
            </span>
            {profile.pgpFingerprint && <span>pgp: {profile.pgpFingerprint}</span>}
        </footer>
    );
}
