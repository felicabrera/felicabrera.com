import Link from "next/link";
import { blogPath, profile } from "@/data/portfolio";
import { homePath, sectionAnchor, ui } from "@/data/i18n";

// Header for inner pages (case studies, blog, 404). Links stay inside `lang`.
export default function InnerHeader({ lang }) {
    const tr = ui[lang];
    return (
        <header className="inner-header">
            <Link href={homePath(lang)}>← {profile.name.toLowerCase()}</Link>
            <nav aria-label={tr.mainNav} className="hide-mobile">
                <Link href={sectionAnchor("work", lang)}>{tr.work}</Link>
                <Link href={blogPath(lang)}>blog</Link>
                <a href={`mailto:${profile.email}`}>email</a>
            </nav>
            <a className="email-short only-mobile" href={`mailto:${profile.email}`}>
                email ↗
            </a>
        </header>
    );
}
