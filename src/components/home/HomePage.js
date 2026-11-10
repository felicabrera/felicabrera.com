import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/home/Hero";
import {
    Achievements,
    Contact,
    Intro,
    Press,
    SiteFooter,
    Work,
    Writing,
} from "@/components/home/Sections";
import { JsonLd, profilePageSchema } from "@/lib/seo";

export default function HomePage({ lang }) {
    return (
        <div className="shell">
            <div className="wrap">
                <SiteHeader lang={lang} />
                <JsonLd data={profilePageSchema(lang)} />
                <main>
                    <Hero lang={lang} />
                    <Intro lang={lang} />
                    <Work lang={lang} />
                    <Achievements lang={lang} />
                    <div className="press-blog">
                        <Press lang={lang} />
                        <Writing lang={lang} />
                    </div>
                    <Contact lang={lang} />
                </main>
                <SiteFooter lang={lang} />
            </div>
        </div>
    );
}
