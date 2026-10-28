import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AppHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import capabilityCard from "@/assets/capability-card.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Launch of Exploration — Show what you can do" },
      { name: "description", content: "Turn graduate projects and a practical challenge into a Capability Card employers can review in minutes." },
      { property: "og:title", content: "Launch of Exploration" },
      { property: "og:description", content: "Show what you can do. Get noticed for it and step into your future." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main>
        <section className="bg-navy text-navy-foreground">
          <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-14 lg:grid-cols-[1.6fr_1fr] lg:px-6 lg:py-16">
            <div>
              <p className="mb-7 text-sm font-bold uppercase tracking-widest text-accent">Your potential has a place here</p>
              <h1 className="text-4xl font-bold leading-[1.08] sm:text-6xl xl:text-7xl">Experience is more than a <span className="text-highlight">job title.</span></h1>
              <p className="mt-6 text-lg text-navy-foreground/85 sm:text-xl">Show what you can do. Get noticed for it and step into your future.</p>
              <p className="mt-6 max-w-3xl text-lg text-navy-foreground/85 sm:text-xl">Turn your projects and practical skills into evidence employers can see—and discover your next step towards opportunity.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-auto min-h-14 whitespace-normal bg-highlight px-6 py-4 text-base font-bold text-highlight-foreground hover:bg-highlight/90"><Link to="/graduate">Explore as a graduate <ArrowUpRight /></Link></Button>
                <Button asChild size="lg" variant="outline" className="h-auto min-h-14 whitespace-normal border-navy-foreground/50 bg-transparent px-6 py-4 text-base font-bold text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"><Link to="/employer">Explore as an employer <ArrowRight /></Link></Button>
              </div>
            </div>
            <img src={capabilityCard} alt="Capability Card: proof of potential, with skills, projects and practical thinking in one place" width={1024} height={768} className="mx-auto w-full max-w-lg" />
          </div>
        </section>
        <section className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-6 lg:px-6">
          <h2 className="text-xl font-bold">Launch of Exploration</h2>
          <p className="text-sm text-muted-foreground">Projects. Practical skills. Your next opportunity.</p>
        </section>
      </main>
    </div>
  );
}
