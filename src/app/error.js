"use client";

import Link from "next/link";

export default function Error({ reset }) {
    return (
        <div className="shell">
            <div className="inner">
                <main>
                    <div className="kicker case-kicker">error 500</div>
                    <h1 className="plain-title">Algo se rompió.</h1>
                    <p className="plain-body">Ocurrió un error inesperado. Probá recargar la página.</p>
                    <div className="plain-actions">
                        <button type="button" className="btn btn-primary" onClick={reset}>
                            intentar de nuevo
                        </button>
                        <Link className="btn" href="/">
                            ← volver al inicio
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
