import { caseStaticParams } from "@/components/CaseStudy";
import { caseCardPng, ogContentType, ogSize, pngResponse } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
    return caseStaticParams();
}

export default async function Image({ params }) {
    const { slug } = await params;
    return pngResponse(await caseCardPng("es", slug));
}
