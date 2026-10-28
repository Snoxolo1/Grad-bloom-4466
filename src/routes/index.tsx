import { createFileRoute, Link } from "@tanstack/react-router";

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
    <div className="min-h-screen bg-hero text-navy-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-5 py-16">
        <span className="chip mb-6 w-fit bg-highlight text-highlight-foreground">Prototype · sample data</span>
        <h1 className="text-5xl font-bold leading-[1.05] sm:text-7xl">
          Launch of <span className="text-accent">Exploration</span>
        </h1>
        <p className="mt-5 max-w-2xl text-xl opacity-90 sm:text-2xl">
          Show what you can do. Get noticed for it and step into your future.
        </p>
        <p className="mt-6 max-w-2xl opacity-75">
          Graduates turn their projects and a short practical challenge into a <b>Capability Card</b>. The
          <b> Evidence-to-Opportunity Path</b> shows what you've already proven, what's missing, and the fastest next step.
          Employers review every candidate with the same fair rubric.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/graduate" className="btn btn-yellow px-6 py-3 text-base">Explore as a graduate →</Link>
          <Link to="/employer" className="btn btn-accent px-6 py-3 text-base">Explore as an employer →</Link>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Add evidence", "A real project and your exact contribution."],
            ["2", "Take the challenge", "A short task tied to the role."],
            ["3", "Get reviewed fairly", "Same rubric for everyone, optional blind review."],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-5">
              <div className="font-display text-3xl font-bold text-highlight">{n}</div>
              <div className="mt-2 font-semibold">{t}</div>
              <div className="text-sm opacity-75">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
