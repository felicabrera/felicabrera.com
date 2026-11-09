import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";
import { SiteFooter } from "@/components/home/Sections";
import { blog, profile, site } from "@/data/portfolio";

export const metadata = {
    title: "Blog | Felipe Cabrera",
    description: blog.description,
    alternates: { canonical: `${site.url}${blog.path}` },
};

export default function BlogPage() {
    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader />
                <main>
                    <div className="kicker case-kicker">{blog.kicker}</div>
                    <h1 className="plain-title">{blog.title}</h1>
                    <p className="plain-body">{blog.description}</p>

                    <div className="terminal-note">
                        <div className="p">
                            ~/blog $ <span className="cmd">ls</span>
                        </div>
                        <div>total 0</div>
                        <div className="p">
                            ~/blog $ <span className="cmd">cat proximamente.txt</span>
                        </div>
                        <div>Estoy preparando artículos sobre seguridad, CTFs, datos y hackathons.</div>
                    </div>

                    <div className="plain-actions">
                        <a
                            className="btn btn-primary"
                            href={`mailto:${profile.email}?subject=${encodeURIComponent("Avisame cuando publiques")}`}
                        >
                            avisame cuando publique ↗
                        </a>
                        <Link className="btn" href="/">
                            ← volver al inicio
                        </Link>
                    </div>
                </main>
                <SiteFooter />
            </div>
        </div>
    );
}
