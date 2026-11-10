import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

// Renders a post's Markdown/MDX body. The content is authored as GitHub
// Flavored Markdown (tables, fenced code), so react-markdown parses it without
// treating tokens like <stdio.h> or %n$p as JSX. Code blocks are highlighted
// with highlight.js classes (styled in globals.css).
export default function PostBody({ content }) {
    return (
        <div className="prose">
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
            >
                {content}
            </Markdown>
        </div>
    );
}
