import Link from "next/link";
import InnerHeader from "@/components/InnerHeader";

export const metadata = {
    title: "404 | Felipe Cabrera",
    robots: { index: false },
};

export default function NotFound() {
    return (
        <div className="shell">
            <div className="inner">
                <InnerHeader />
                <main>
                    <div className="kicker case-kicker">error 404</div>
                    <h1 className="plain-title">Expediente no encontrado.</h1>
                    <p className="plain-body">La página que buscás no existe o fue movida.</p>
                    <div className="plain-actions">
                        <Link className="btn btn-primary" href="/">
                            ← volver al inicio
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
