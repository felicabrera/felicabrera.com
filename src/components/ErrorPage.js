"use client";

import Link from "next/link";
import { homePath, ui } from "@/data/i18n";

export default function ErrorPage({ lang, reset }) {
    const tr = ui[lang];
    return (
        <div className="shell">
            <div className="inner">
                <main>
                    <div className="kicker case-kicker">error 500</div>
                    <h1 className="plain-title">{tr.errorTitle}</h1>
                    <p className="plain-body">{tr.errorBody}</p>
                    <div className="plain-actions">
                        <button type="button" className="btn btn-primary" onClick={reset}>
                            {tr.retry}
                        </button>
                        <Link className="btn" href={homePath(lang)}>
                            {tr.backHome}
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
