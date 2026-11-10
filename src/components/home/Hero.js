import Link from "next/link";
import LightCurve from "@/components/LightCurve";
import {
    achievements,
    casePath,
    featuredNews,
    featuredProject,
    flag,
    formatDate,
    profile,
    sectionId,
} from "@/data/portfolio";
import { tx, ui } from "@/data/i18n";

// Widths (%) of the redacted lines in the clipping; `null` is a paragraph gap.
// Mobile shows only the first three lines, at the widths in `mobileWidths`.
const redactedLines = [100, 92, 97, 64, null, 88, 100, 41, null, 95, 72];
const mobileWidths = [100, 88, 62];

function Prompt({ children }) {
    return (
        <div className="p">
            <span className="hide-mobile">~/{profile.handle}</span>
            <span className="only-mobile">~</span> ${" "}
            {children && <span className="cmd">{children}</span>}
        </div>
    );
}

function AchievementLine({ parts }) {
    const [base, highlight] = parts;
    return (
        <>
            {base}
            {highlight && <span className="hl">{highlight}</span>}
        </>
    );
}

function Terminal({ lang }) {
    const tr = ui[lang];
    const [first, last] = profile.name.toLowerCase().split(" ");
    return (
        <div className="sheet-terminal lift">
            <Prompt>whoami</Prompt>
            <h1 className="name">
                {first}
                <br />
                {last}
            </h1>
            <div>{tx(profile.tagline, lang)}</div>

            <div className="hide-mobile">
                <div className="gap" />
                <Prompt>cat {tr.location}</Prompt>
                <div>{profile.location.toLowerCase()}</div>
            </div>

            <div className="gap" />
            <Prompt>ls {tr.achievementsDir}/</Prompt>
            {achievements.map((a) => (
                <div key={a.title}>
                    <span className="hide-mobile">
                        <AchievementLine parts={tx(a.terminal.long, lang)} />
                    </span>
                    <span className="only-mobile">
                        <AchievementLine parts={tx(a.terminal.short, lang)} />
                    </span>
                </div>
            ))}

            <div className="hide-mobile">
                <div className="gap" />
                <Prompt>./{tr.contactCmd} --email</Prompt>
                <div>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
            </div>

            <div className="p" style={{ marginTop: 10 }}>
                <span className="hide-mobile">~/{profile.handle}</span>
                <span className="only-mobile">~</span> $ <span className="cursor" aria-hidden="true" />
            </div>
        </div>
    );
}

function Clipping({ lang }) {
    const stamp = tx(featuredNews.stamp, lang);
    return (
        <div className="sheet-clip lift">
            <div className="clip-meta">
                <span>{featuredNews.source}</span>
                <span>{formatDate(featuredNews.date, { long: true, lang })}</span>
            </div>
            {/* The clipping reproduces the article, so it stays in its original language. */}
            <h2 className="clip-headline" lang={featuredNews.lang}>
                {featuredNews.headline}
            </h2>
            <div className="redacted" aria-hidden="true">
                {redactedLines.map((w, i) => (
                    <span
                        key={i}
                        className={w === null ? "blank extra" : i >= mobileWidths.length ? "extra" : undefined}
                        style={w === null ? undefined : { "--w": `${w}%`, "--wm": `${mobileWidths[i] ?? w}%` }}
                    />
                ))}
            </div>
            {stamp && (
                <div className="stamp">
                    {stamp[0]}
                    <br />
                    {stamp[1]}
                </div>
            )}
        </div>
    );
}

export default function Hero({ lang }) {
    const tr = ui[lang];
    const projectName = featuredProject.shortTitle ?? featuredProject.title;
    return (
        <section id="top" className="hero">
            <figure className="spread">
                <div className="spread-pages">
                    <Terminal lang={lang} />
                    <Clipping lang={lang} />
                </div>
                <figcaption className="spread-caption">
                    <span className="hide-mobile">{tr.declassified}</span>
                    <a className="u" href={featuredNews.url} hrefLang={featuredNews.lang}>
                        {tr.publishedIn} {featuredNews.source}
                    </a>
                </figcaption>
            </figure>

            <div className="hero-cards" aria-label={tr.highlights}>
                <figure>
                    <Link
                        href={casePath(featuredProject, lang)}
                        className="card card-hea"
                        aria-label={`${tr.viewCase}: ${projectName}`}
                    >
                        <span className="tl">{tr.relativeFlux}<span className="hide-mobile"> · KEPLER</span></span>
                        <span className="tr">{featuredProject.card.metric}</span>
                        <LightCurve variant="card" />
                        <span className="bl">
                            <span className="hide-mobile">{tr.transitDetected}</span>{tr.seeCase}
                        </span>
                    </Link>
                    <figcaption className="card-caption">{tx(featuredProject.card.caption, lang)}</figcaption>
                </figure>

                <figure>
                    <a href={`#${sectionId("achievements", lang)}`} className="card card-flag" aria-label={tr.viewCtf}>
                        <span className="flag">{flag.text}</span>
                        <span className="bl">
                            <span className="hide-mobile">{tx(flag.meta, lang)}</span>
                            <span className="only-mobile">{tx(flag.metaShort, lang)}</span>
                        </span>
                    </a>
                    <figcaption className="card-caption">{tx(flag.caption, lang)}</figcaption>
                </figure>
            </div>
        </section>
    );
}
