import RootDocument, { rootMetadata, rootViewport } from "@/components/RootDocument";

const lang = "en";

export const metadata = rootMetadata(lang);
export const viewport = rootViewport;

export default function RootLayout({ children }) {
    return <RootDocument lang={lang}>{children}</RootDocument>;
}
