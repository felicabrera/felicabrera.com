import { getStaticParams } from "@/lib/blog";
import { postCardPng, ogContentType, ogSize, pngResponse } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
    return getStaticParams("es");
}

export default async function Image({ params }) {
    const { slug } = await params;
    return pngResponse(await postCardPng("es", slug));
}
