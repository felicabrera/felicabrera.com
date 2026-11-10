import { feedResponse } from "@/lib/feed";

export function GET() {
    return feedResponse("en");
}
