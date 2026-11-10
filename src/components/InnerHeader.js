import Link from "next/link";
import { blog, profile } from "@/data/portfolio";

// `localePrefix` keeps the blog link inside the current language ("" for the
// default Spanish, "/en" for English). The portfolio itself is Spanish-only,
// so the home and work links always point at the apex.
export default function InnerHeader({ localePrefix = "" }) {
    return (
        <header className="inner-header">
            <Link href="/">← {profile.name.toLowerCase()}</Link>
            <nav aria-label="Principal" className="hide-mobile">
                <Link href="/#trabajo">trabajo</Link>
                <Link href={`${localePrefix}${blog.path}`}>blog</Link>
                <a href={`mailto:${profile.email}`}>email</a>
            </nav>
            <a className="email-short only-mobile" href={`mailto:${profile.email}`}>
                email ↗
            </a>
        </header>
    );
}
