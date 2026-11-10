import Link from "next/link";
import "./globals.css";
import { fontClassName } from "@/components/RootDocument";
import { notFoundMetadata } from "@/components/NotFoundPage";
import { homePath, ui } from "@/data/i18n";

// 404 for URLs that match no route. Each language has its own root layout, so
// there is no shared layout to render this inside; it is a full document and,
// since the language of an unknown URL is unknown, it speaks both.
export const metadata = notFoundMetadata;

export default function GlobalNotFound() {
    return (
        <html lang="es" className={fontClassName}>
            <body>
                <div className="shell">
                    <div className="inner">
                        <main>
                            <div className="kicker case-kicker">error 404</div>
                            <h1 className="plain-title">{ui.es.notFoundTitle}</h1>
                            <p className="plain-body">{ui.es.notFoundBody}</p>
                            <p className="plain-body" lang="en">
                                {ui.en.notFoundBody}
                            </p>
                            <div className="plain-actions">
                                <Link className="btn btn-primary" href={homePath("es")}>
                                    {ui.es.backHome}
                                </Link>
                                <Link className="btn" href={homePath("en")} lang="en" hrefLang="en">
                                    {ui.en.backHome}
                                </Link>
                            </div>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
