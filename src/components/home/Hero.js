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
} from "@/data/portfolio";

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

function Terminal() {
    const [first, last] = profile.name.toLowerCase().split(" ");
    return (
        <div className="sheet-terminal lift">
            <Prompt>whoami</Prompt>
            <h1 className="name">
                {first}
                <br />
                {last}
            </h1>
            <div>{profile.tagline}</div>

            <div className="hide-mobile">
                <div className="gap" />
                <Prompt>cat ubicacion</Prompt>
                <div>{profile.location.toLowerCase()}</div>
            </div>

            <div className="gap" />
            <Prompt>ls logros/</Prompt>
            {achievements.map((a) => (
                <div key={a.title}>
                    <span className="hide-mobile">
                        <AchievementLine parts={a.terminal.long} />
                    </span>
                    <span className="only-mobile">
                        <AchievementLine parts={a.terminal.short} />
                    </span>
                </div>
            ))}

            <div className="hide-mobile">
                <div className="gap" />
                <Prompt>./contacto --email</Prompt>
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

function Clipping() {
    return (
        <div className="sheet-clip lift">
            <div className="clip-meta">
                <span>{featuredNews.source}</span>
                <span>{formatDate(featuredNews.date, { long: true })}</span>
            </div>
            <h2 className="clip-headline">{featuredNews.headline}</h2>
            <div className="redacted" aria-hidden="true">
                {redactedLines.map((w, i) => (
                    <span
                        key={i}
                        className={w === null ? "blank extra" : i >= mobileWidths.length ? "extra" : undefined}
                        style={w === null ? undefined : { "--w": `${w}%`, "--wm": `${mobileWidths[i] ?? w}%` }}
                    />
                ))}
            </div>
            {featuredNews.stamp && (
                <div className="stamp">
                    {featuredNews.stamp[0]}
                    <br />
                    {featuredNews.stamp[1]}
                </div>
            )}
        </div>
    );
}

export default function Hero() {
    return (
        <section id="top" className="hero">
            <figure className="spread">
                <div className="spread-pages">
                    <Terminal />
                    <Clipping />
                </div>
                <figcaption className="spread-caption">
                    <span className="hide-mobile">desclasificado: </span>
                    <a className="u" href={featuredNews.url}>
                        publicado en {featuredNews.source}
                    </a>
                </figcaption>
            </figure>

            <div className="hero-cards" aria-label="Destacados">
                <figure>
                    <Link
                        href={casePath(featuredProject)}
                        className="card card-hea"
                        aria-label={`Ver caso: ${featuredProject.shortTitle ?? featuredProject.title}`}
                    >
                        <span className="tl">FLUJO RELATIVO<span className="hide-mobile"> · KEPLER</span></span>
                        <span className="tr">{featuredProject.card.metric}</span>
                        <LightCurve variant="card" />
                        <span className="bl">
                            <span className="hide-mobile">tránsito detectado → </span>ver caso ↗
                        </span>
                    </Link>
                    <figcaption className="card-caption">{featuredProject.card.caption}</figcaption>
                </figure>

                <figure>
                    <a href="#logros" className="card card-flag" aria-label="Ver logros en CTF">
                        <span className="flag">{flag.text}</span>
                        <span className="bl">
                            <span className="hide-mobile">{flag.meta}</span>
                            <span className="only-mobile">{flag.metaShort}</span>
                        </span>
                    </a>
                    <figcaption className="card-caption">{flag.caption}</figcaption>
                </figure>
            </div>
        </section>
    );
}
