import Image from "next/image";
import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";
import { SiteFooter } from "@/components/home/Sections";
import {
    about,
    aboutPath,
    blogPath,
    formatDate,
    languageAlternates,
    news,
    profile,
    site,
    socialLinks,
} from "@/data/portfolio";
import { homePath, otherLocale, sectionAnchor, tx, ui } from "@/data/i18n";
import { JsonLd, aboutPageSchema, breadcrumbSchema, openGraph } from "@/lib/seo";

export function aboutMetadata(lang) {
    const url = `${site.url}${aboutPath(lang)}`;
    const title = tx(about.metaTitle, lang);
    const description = tx(about.metaDescription, lang);
    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates({ es: aboutPath("es"), en: aboutPath("en") }),
        },
        openGraph: openGraph(lang, {
            title,
            description,
            url,
            type: "profile",
            firstName: "Felipe",
            lastName: "Cabrera",
            username: profile.handle,
        }),
    };
}

export default function AboutPage({ lang }) {
    const tr = ui[lang];
    const other = otherLocale(lang);

    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader lang={lang} />
                <JsonLd
                    data={[
                        aboutPageSchema(lang),
                        breadcrumbSchema([
                            { name: tr.home, path: homePath(lang) },
                            { name: tx(about.label, lang), path: aboutPath(lang) },
                        ]),
                    ]}
                />

                <main>
                    <div className="blog-topbar case-topbar">
                        <span className="kicker">{tx(about.kicker, lang)}</span>
                        <Link className="lang-switch" href={aboutPath(other)} hrefLang={other}>
                            {tr.switchTo} ↗
                        </Link>
                    </div>
                    <h1 className="case-title">{profile.name}</h1>

                    <div className="about-lead">
                        <Image
                            src={profile.avatarUrl}
                            alt={`${tr.portraitOf} ${profile.name}`}
                            width={400}
                            height={400}
                            sizes="(min-width: 640px) 200px, 120px"
                            loading="eager"
                        />
                        <p>{tx(profile.intro, lang)}</p>
                    </div>

                    <dl className="facts">
                        {about.facts.map((f) => (
                            <div key={tx(f.label, "es")}>
                                <dt>{tx(f.label, lang)}</dt>
                                <dd>{tx(f.value, lang)}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="case-sections">
                        {about.sections.map((s, i) => (
                            <section key={tx(s.title, "es")}>
                                <h2>
                                    {String(i + 1).padStart(2, "0")} – {tx(s.title, lang)}
                                </h2>
                                <p>{tx(s.body, lang)}</p>
                            </section>
                        ))}
                    </div>

                    <div className="case-links">
                        <Link className="btn btn-primary" href={sectionAnchor("work", lang)}>
                            {tr.work} →
                        </Link>
                        <Link className="btn" href={blogPath(lang)}>
                            blog →
                        </Link>
                    </div>

                    <section className="case-writing" aria-labelledby="about-press">
                        <h2 id="about-press">{tx(about.pressTitle, lang)}</h2>
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

                    <section className="contact" aria-labelledby="about-contact">
                        <h2 id="about-contact">{tx(about.contactTitle, lang)}</h2>
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
                </main>
                <SiteFooter lang={lang} />
            </div>
        </div>
    );
}
