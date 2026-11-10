import { notFound } from "next/navigation";
import CaseStudy, { caseMetadata, caseStaticParams } from "@/components/CaseStudy";
import { getProject } from "@/data/portfolio";

const lang = "es";

export function generateStaticParams() {
    return caseStaticParams();
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    return caseMetadata(slug, lang);
}

export default async function CasePage({ params }) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project?.caseStudy) notFound();
    return <CaseStudy project={project} lang={lang} />;
}
