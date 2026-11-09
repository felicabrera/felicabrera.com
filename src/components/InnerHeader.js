import Link from "next/link";
import { blog, profile } from "@/data/portfolio";

export default function InnerHeader() {
    return (
        <header className="inner-header">
            <Link href="/">← {profile.name.toLowerCase()}</Link>
            <nav aria-label="Principal" className="hide-mobile">
                <Link href="/#trabajo">trabajo</Link>
                <Link href={blog.path}>blog</Link>
                <a href={`mailto:${profile.email}`}>email</a>
            </nav>
            <a className="email-short only-mobile" href={`mailto:${profile.email}`}>
                email ↗
            </a>
        </header>
    );
}
