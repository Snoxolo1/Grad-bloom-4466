import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { candidates } from "@/lib/demo";

const demoRows = {
  c1: { metric: "Waste (kg)", unit: "kg", before: "January", after: "June", rows: [{ label: "Rice", before: 48, after: 28 }, { label: "Vegetables", before: 32, after: 19 }, { label: "Bread", before: 25, after: 14 }] },
  c2: { metric: "Passengers surveyed", unit: "passengers", before: "Morning peak", after: "Off-peak", rows: [{ label: "Route A", before: 92, after: 36 }, { label: "Route B", before: 78, after: 42 }, { label: "Route C", before: 64, after: 25 }, { label: "Route D", before: 85, after: 31 }] },
  c3: { metric: "Stock-outs", unit: "stock-outs", before: "Before tracker", after: "With tracker", rows: [{ label: "Milk", before: 8, after: 2 }, { label: "Bread", before: 6, after: 1 }, { label: "Maize meal", before: 5, after: 2 }] },
};

export const Route = createFileRoute("/evidence/$candidateId")({
  head: ({ params }) => {
    const title = `${candidates.find((c) => c.id === params.candidateId)?.project.title ?? "Project evidence"} — Launch of Exploration`;
    const description = "Explore illustrative project evidence, sample data and a graduate's specific contribution.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: EvidenceDemo,
});

function EvidenceDemo() {
  const { candidateId } = Route.useParams();
  const candidate = candidates.find((c) => c.id === candidateId);
  const demo = demoRows[candidateId as keyof typeof demoRows];
  const [period, setPeriod] = useState<"before" | "after">("before");
  if (!candidate || !demo) return <AppShell><h1 className="text-2xl font-bold">Evidence not found</h1><Button asChild variant="link"><Link to="/employer">Return to candidates</Link></Button></AppShell>;
  const max = Math.max(...demo.rows.map((r) => Math.max(r.before, r.after)));
  const total = demo.rows.reduce((sum, r) => sum + r[period], 0);
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="outline"><Link to="/graduate"><ArrowLeft />Graduate view</Link></Button>
        <Button asChild variant="outline"><Link to="/employer"><ArrowLeft />Employer view</Link></Button>
      </div>
      <span className="chip bg-highlight">Illustrative evidence demo</span>
      <h1 className="mt-3 text-3xl font-bold">{candidate.project.title}</h1>
      <p className="mt-2 max-w-3xl text-muted-foreground">{candidate.project.description}</p>
      <p className="mt-3 text-sm">All figures below are made-up sample data, not verified project results.</p>
      <section className="mt-8 border-y py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3"><BarChart3 className="text-brand" /><h2 className="text-xl font-bold">{demo.metric}</h2></div>
          <label className="flex items-center gap-2 text-sm font-medium">Period<select className="field w-auto" value={period} onChange={(e) => setPeriod(e.target.value === "after" ? "after" : "before")}><option value="before">{demo.before}</option><option value="after">{demo.after}</option></select></label>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-5" aria-label="Sample data chart">{demo.rows.map((row) => <div key={row.label}><div className="mb-2 flex justify-between text-sm"><span>{row.label}</span><b>{row[period]} {demo.unit}</b></div><div className="h-5 overflow-hidden rounded bg-muted"><div className="h-full bg-brand" style={{ width: `${row[period] / max * 100}%` }} /></div></div>)}</div>
          <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="mb-3 text-left font-semibold">Sample source data</caption><thead><tr className="border-b"><th className="py-2">Category</th><th className="py-2">{demo.before}</th><th className="py-2">{demo.after}</th></tr></thead><tbody>{demo.rows.map((row) => <tr key={row.label} className="border-b"><td className="py-3">{row.label}</td><td>{row.before}</td><td>{row.after}</td></tr>)}</tbody></table><p className="mt-4 font-semibold" aria-live="polite">{demo[period]} total: {total} {demo.unit}</p></div>
        </div>
      </section>
      <section className="py-7"><SectionTitle title="Specific contribution" /><p className="max-w-3xl">{candidate.project.contribution}</p><div className="mt-4 flex flex-wrap gap-2">{candidate.project.skills.map((skill) => <span key={skill} className="chip bg-secondary">{skill}</span>)}</div></section>
    </AppShell>
  );
}