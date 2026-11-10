// Share cards (1200x630) for case studies and blog posts, rendered at build
// time by next/og from each page's opengraph-image.js. The home and the blog
// index use the static public/og-*.png cards.
//
// next/og cannot read woff2, so the card has its own TTF copies of the fonts
// and a pre-made grayscale avatar in src/assets/og.

import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProject, profile, site } from "@/data/portfolio";
import { tx, ui } from "@/data/i18n";
import { formatPostDate, getPost } from "@/lib/blog";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const ASSETS = path.join(process.cwd(), "src", "assets", "og");

async function assets() {
    const [medium, semibold, mono, avatar] = await Promise.all([
        fs.readFile(path.join(ASSETS, "Inter-Medium.ttf")),
        fs.readFile(path.join(ASSETS, "Inter-SemiBold.ttf")),
        fs.readFile(path.join(ASSETS, "JetBrainsMono-Regular.ttf")),
        fs.readFile(path.join(ASSETS, "avatar-gray.jpg")),
    ]);
    return {
        fonts: [
            { name: "Inter", data: medium, weight: 500, style: "normal" },
            { name: "Inter", data: semibold, weight: 600, style: "normal" },
            { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
        ],
        avatar: `data:image/jpeg;base64,${avatar.toString("base64")}`,
    };
}

// Long titles get a smaller size so they stay within three lines.
function titleSize(title) {
    if (title.length <= 28) return 88;
    if (title.length <= 52) return 68;
    return 54;
}

const ink = "#111111";
const accent = "#ff4f1a";

export async function shareCard({ kicker, title, description, footer }) {
    const { fonts, avatar } = await assets();
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "56px 72px",
                    background: "#d6d6d3",
                    color: ink,
                    fontFamily: "Inter",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontFamily: "JetBrains Mono",
                        fontSize: 22,
                        color: "#4a4a4a",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: 14, height: 14, background: accent, marginRight: 14 }} />
                        felicabrera.com
                    </div>
                    <div style={{ display: "flex", color: accent }}>{kicker}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: titleSize(title),
                            fontWeight: 600,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.05,
                        }}
                    >
                        {title}
                    </div>
                    {description && (
                        <div
                            style={{
                                display: "block",
                                marginTop: 24,
                                fontSize: 27,
                                fontWeight: 500,
                                lineHeight: 1.35,
                                color: "#333333",
                                lineClamp: 2,
                            }}
                        >
                            {description}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        paddingTop: 22,
                        borderTop: `2px solid ${ink}`,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatar} width={56} height={56} alt="" style={{ border: `2px solid ${ink}` }} />
                    <div style={{ display: "flex", marginLeft: 20, fontSize: 26, fontWeight: 600 }}>{profile.name}</div>
                    <div
                        style={{
                            display: "flex",
                            marginLeft: "auto",
                            fontFamily: "JetBrains Mono",
                            fontSize: 20,
                            color: "#4a4a4a",
                        }}
                    >
                        {footer}
                    </div>
                </div>
            </div>
        ),
        { ...ogSize, fonts },
    );
}

// The cards are cached as PNG bytes (a Response cannot be cached), which lets
// the build prerender them for every static param.
async function png(card) {
    return new Uint8Array(await (await card).arrayBuffer());
}

export async function postCardPng(lang, slug) {
    "use cache";
    return png(postCard(lang, slug));
}

export async function caseCardPng(lang, slug) {
    "use cache";
    return png(caseCard(lang, slug));
}

export function pngResponse(bytes) {
    return new Response(bytes, { headers: { "Content-Type": ogContentType } });
}

async function postCard(lang, slug) {
    const post = getPost(lang, slug);
    if (!post) return siteCard(lang);
    const { title, description, date, tags } = post.frontmatter;
    return shareCard({
        kicker: date ? `blog · ${formatPostDate(date, lang)}` : "blog",
        title,
        description,
        footer: tags.slice(0, 3).join(" · "),
    });
}

async function caseCard(lang, slug) {
    const project = getProject(slug);
    if (!project?.caseStudy) return siteCard(lang);
    return shareCard({
        kicker: `${ui[lang].caseFile} ${project.caseStudy.number} · ${project.year}`,
        title: project.shortTitle ?? project.title,
        description: tx(project.description, lang),
        footer: project.tags.slice(0, 4).join(" · "),
    });
}

function siteCard(lang) {
    return shareCard({ kicker: "", title: profile.name, description: tx(site.description, lang), footer: "" });
}
