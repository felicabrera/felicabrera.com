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

export default function Home() {
    return (
        <div className="shell">
            <div className="wrap">
                <SiteHeader />
                <main>
                    <Hero />
                    <Intro />
                    <Work />
                    <Achievements />
                    <div className="press-blog">
                        <Press />
                        <Writing />
                    </div>
                    <Contact />
                </main>
                <SiteFooter />
            </div>
        </div>
    );
}
