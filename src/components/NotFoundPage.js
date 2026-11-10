import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";
import { homePath, ui } from "@/data/i18n";

export const notFoundMetadata = {
    title: "404 | Felipe Cabrera",
    robots: { index: false },
};

export default function NotFoundPage({ lang }) {
    const tr = ui[lang];
    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader lang={lang} />
                <main>
                    <div className="kicker case-kicker">error 404</div>
                    <h1 className="plain-title">{tr.notFoundTitle}</h1>
                    <p className="plain-body">{tr.notFoundBody}</p>
                    <div className="plain-actions">
                        <Link className="btn btn-primary" href={homePath(lang)}>
                            {tr.backHome}
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
