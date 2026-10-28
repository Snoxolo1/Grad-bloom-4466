import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionTitle, StatusChip } from "@/components/AppShell";
import { candidates, opportunity, useLocal } from "@/lib/demo";

export const Route = createFileRoute("/employer")({
  head: () => ({
    meta: [
      { title: "Employer demo — Launch of Exploration" },
      { name: "description", content: "Review graduate Capability Cards with a shared rubric and optional blind review." },
      { property: "og:title", content: "Employer demo — Launch of Exploration" },
      { property: "og:description", content: "Fair, evidence-first candidate review in minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Employer,
});

const criteria = ["Relevant skills", "Quality of project evidence", "Practical problem-solving"] as const;
type Score = { score: number; notes: string };
type Review = Record<string, Score>;
type FeedbackRec = { improve: string; how: string; suggestion: string; savedAt?: string };

function Employer() {
  const [blind, setBlind] = useLocal("loe-blind", false);
  const [shortlist, setShortlist] = useLocal<string[]>("loe-shortlist", []);
  const [reviews, setReviews] = useLocal<Record<string, Review>>("loe-reviews", {});
  const [feedback, setFeedback] = useLocal<Record<string, FeedbackRec>>("loe-feedback", {});
  const [openId, setOpenId] = useState(candidates[0]!.id);
  const c = candidates.find((x) => x.id === openId)!;
  const idx = candidates.indexOf(c);
  const label = (i: number, name: string) => (blind ? `Candidate ${String.fromCharCode(65 + i)}` : name);
  const review = reviews[c.id] ?? {};
  const scored = criteria.filter((k) => review[k]?.score);
  const overall = scored.length ? scored.reduce((a, k) => a + (review[k]?.score ?? 0), 0) / scored.length : 0;
  const fb = feedback[c.id] ?? { improve: "", how: "", suggestion: "" };
  const [fbDraft, setFbDraft] = useState<FeedbackRec | null>(null);
  const fbv = fbDraft ?? fb;

  const setScore = (k: string, patch: Partial<Score>) =>
    setReviews({ ...reviews, [c.id]: { ...review, [k]: { score: 0, notes: "", ...review[k], ...patch } } });

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Sample opportunity</p>
          <h1 className="text-3xl font-bold">{opportunity.role}</h1>
          <p className="text-sm text-muted-foreground">{opportunity.company} · {opportunity.location}</p>
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-full border bg-card px-4 py-2 text-sm font-semibold">
          <input type="checkbox" className="h-4 w-4 accent-accent" checked={blind} onChange={(e) => setBlind(e.target.checked)} />
          Blind review {blind ? "on" : "off"}
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-3">
          <p className="text-xs text-muted-foreground">Listed in submission order — not ranked.</p>
          {candidates.map((x, i) => (
            <button key={x.id} onClick={() => { setOpenId(x.id); setFbDraft(null); }}
              className={`panel w-full text-left transition ${openId === x.id ? "border-2 border-accent" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-navy font-bold text-navy-foreground">
                  {blind ? "?" : x.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold">{label(i, x.name)}</div>
                  <div className="truncate text-xs text-muted-foreground">{x.project.title}</div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <StatusChip status={x.status} />
                {shortlist.includes(x.id) && <span className="chip bg-highlight">★ Shortlisted</span>}
              </div>
            </button>
          ))}
          <div className="panel text-xs text-muted-foreground">
            <b className="text-foreground">About evidence labels.</b> "Verified in demo" is fictional sample data, not a real verification service. A future version could let an educator, mentor or project owner verify a contribution — this isn't live.
          </div>
        </aside>

        <div className="space-y-6">
          <section className="panel">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">{label(idx, c.name)}</h2>
                {!blind && <p className="text-sm text-muted-foreground">{c.headline}</p>}
              </div>
              <button className={`btn ${shortlist.includes(c.id) ? "btn-yellow" : "btn-primary"}`}
                onClick={() => setShortlist(shortlist.includes(c.id) ? shortlist.filter((s) => s !== c.id) : [...shortlist, c.id])}>
                {shortlist.includes(c.id) ? "★ Shortlisted — undo" : "Shortlist for review"}
              </button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-secondary p-4">
                <div className="flex items-center justify-between"><b>Project evidence</b><StatusChip status={c.status} /></div>
                <p className="mt-2 font-semibold">{c.project.title}</p>
                <p className="text-sm">{c.project.description}</p>
                <p className="mt-2 text-sm"><b>Contribution:</b> {c.project.contribution}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{c.project.skills.map((s) => <span key={s} className="chip bg-accent/25">{s}</span>)}</div>
                <a className="mt-2 inline-block text-sm font-semibold underline" href={c.project.link} target="_blank" rel="noreferrer">Open evidence link ↗</a>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <b>Practical challenge response</b>
                <p className="mt-2 text-sm italic">"{c.challenge}"</p>
              </div>
            </div>
          </section>

          <section className="panel">
            <SectionTitle title="Evaluation rubric" />
            <p className="mb-4 text-xs text-muted-foreground">The same three criteria for every candidate. Scores come only from your selections — nothing is inferred from personal information. The rubric supports human judgment; it does not make hiring decisions.</p>
            <div className="space-y-4">
              {criteria.map((k) => (
                <div key={k} className="grid gap-2 md:grid-cols-[220px_auto_1fr] md:items-center">
                  <span className="font-semibold">{k}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} aria-label={`${k} ${n}`} onClick={() => setScore(k, { score: n })}
                        className={`h-9 w-9 rounded-lg border font-bold ${review[k]?.score === n ? "bg-navy text-navy-foreground" : "bg-card"}`}>{n}</button>
                    ))}
                  </div>
                  <input className="field" placeholder="Notes — what evidence supports this score?" value={review[k]?.notes ?? ""} onChange={(e) => setScore(k, { notes: e.target.value })} />
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl bg-navy p-4 text-navy-foreground">
              <div className="font-display text-4xl font-bold text-highlight">{overall ? overall.toFixed(1) : "–"}<span className="text-lg opacity-60">/5</span></div>
              <div className="text-sm">
                Overall = average of scored criteria ({scored.length}/3 scored)<br />
                {criteria.map((k) => `${k.split(" ")[0]} ${review[k]?.score ?? "–"}`).join(" · ")}
              </div>
            </div>
          </section>

          <section className="panel">
            <SectionTitle title="Feedback for the candidate" />
            <div className="grid gap-3">
              <textarea className="field" rows={2} placeholder="What could they improve?" value={fbv.improve} onChange={(e) => setFbDraft({ ...fbv, improve: e.target.value })} />
              <textarea className="field" rows={2} placeholder="How could they improve it?" value={fbv.how} onChange={(e) => setFbDraft({ ...fbv, how: e.target.value })} />
              <input className="field" placeholder="Optional: another company or opportunity that may fit their skills" value={fbv.suggestion} onChange={(e) => setFbDraft({ ...fbv, suggestion: e.target.value })} />
              <div className="flex flex-wrap items-center gap-3">
                <button className="btn btn-accent" onClick={() => { setFeedback({ ...feedback, [c.id]: { ...fbv, savedAt: new Date().toLocaleString() } }); setFbDraft(null); }}>Save feedback (demo)</button>
                {fb.savedAt && <span className="text-xs text-muted-foreground">Saved locally {fb.savedAt}. Nothing is sent.</span>}
              </div>
            </div>
          </section>

          <section className="panel">
            <SectionTitle title="What applicants are asked to prepare" />
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div>
                <p>Length: <b>{opportunity.cvPreferences.length}</b></p>
                <ul className="mt-2 list-disc pl-5">{opportunity.cvPreferences.include.map((x) => <li key={x}>{x}</li>)}</ul>
                <p className="mt-2 font-semibold">Leave out</p>
                <ul className="list-disc pl-5">{opportunity.cvPreferences.avoid.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="rounded-xl border bg-muted p-4 font-mono text-xs leading-6">
                {opportunity.cvPreferences.headings.map((h) => <div key={h}><b>{h.toUpperCase()}</b><div className="mb-1 h-2 w-3/4 rounded bg-border" /></div>)}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
