import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, SectionTitle, StatusChip } from "@/components/AppShell";
import { EvidenceLink } from "@/components/EvidenceLink";
import {
  cvDraft, defaultProject, evidencePath, opportunity, sampleFeedback, sampleGraduate, useLocal, type Project,
} from "@/lib/demo";

export const Route = createFileRoute("/graduate")({
  head: () => ({
    meta: [
      { title: "Graduate demo — Launch of Exploration" },
      { name: "description", content: "Build your Capability Card, see your Evidence-to-Opportunity Path and draft a CV." },
      { property: "og:title", content: "Graduate demo — Launch of Exploration" },
      { property: "og:description", content: "See the evidence you have, what's missing, and your next best step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Graduate,
});

function Graduate() {
  const [project, setProject] = useLocal<Project>("loe-project", defaultProject);
  const [challenge, setChallenge] = useLocal<string>("loe-challenge", "");
  const [draftProject, setDraftProject] = useState<Project>(project);
  const [draftChallenge, setDraftChallenge] = useState(challenge);
  const [saved, setSaved] = useState("");
  useEffect(() => setDraftProject(project), [project]);
  useEffect(() => setDraftChallenge(challenge), [challenge]);

  const path = evidencePath(project, challenge);
  const flash = (m: string) => { setSaved(m); setTimeout(() => setSaved(""), 2000); };

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="panel bg-hero text-navy-foreground">
            <p className="text-sm opacity-75">Welcome back (sample profile)</p>
            <h1 className="text-3xl font-bold">{sampleGraduate.name}</h1>
            <p className="text-sm opacity-80">{sampleGraduate.qualification}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sampleGraduate.skills.map((s) => <span key={s} className="chip bg-navy-foreground/15">{s}</span>)}
            </div>
            <p className="mt-4 text-sm">Applying for: <b>{opportunity.role}</b> · {opportunity.company}</p>
          </section>

          <section className="panel">
            <SectionTitle kicker="Step 1" title="Your project" />
            <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); setProject(draftProject); flash("Project saved"); }}>
              <L label="Title"><input className="field" value={draftProject.title} onChange={(e) => setDraftProject({ ...draftProject, title: e.target.value })} /></L>
              <L label="Description"><textarea className="field" rows={2} value={draftProject.description} onChange={(e) => setDraftProject({ ...draftProject, description: e.target.value })} /></L>
              <L label="Skills demonstrated (comma separated)"><input className="field" value={draftProject.skills.join(", ")} onChange={(e) => setDraftProject({ ...draftProject, skills: e.target.value.split(",").map((s) => s.trim()) })} /></L>
              <L label="Your specific contribution"><textarea className="field" rows={3} value={draftProject.contribution} onChange={(e) => setDraftProject({ ...draftProject, contribution: e.target.value })} /></L>
              <L label="Link to supporting evidence"><input className="field" type="url" value={draftProject.link} onChange={(e) => setDraftProject({ ...draftProject, link: e.target.value })} /></L>
              <button className="btn btn-primary w-fit">Save project</button>
            </form>
          </section>

          <section className="panel">
            <SectionTitle kicker="Step 2" title="Practical challenge" />
            <p className="rounded-xl bg-secondary p-4 text-sm">{opportunity.challenge}</p>
            <textarea className="field mt-3" rows={7} placeholder="Write your response…" value={draftChallenge} onChange={(e) => setDraftChallenge(e.target.value)} />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{draftChallenge.trim().split(/\s+/).filter(Boolean).length} words</span>
              <button className="btn btn-primary" onClick={() => { setChallenge(draftChallenge); flash("Response saved"); }}>Save response</button>
            </div>
          </section>

          <section className="panel">
            <SectionTitle kicker="Step 3" title="Your Capability Card" />
            <CapabilityCard project={project} challenge={challenge} />
          </section>

          <Feedback />
          <CvBuilder project={project} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="panel border-2 border-highlight">
            <p className="text-xs font-bold uppercase tracking-widest">Your next best step</p>
            <p className="mt-2 font-display text-lg font-semibold">{path.next}</p>
          </section>
          <section className="panel">
            <SectionTitle title="Evidence-to-Opportunity Path" />
            <p className="mb-3 text-xs text-muted-foreground">Based on simple rules matching your saved evidence to the role's required skills — not an AI assessment.</p>
            <p className="text-sm font-semibold text-success">✓ Supported by evidence</p>
            <div className="mb-3 mt-1 flex flex-wrap gap-1.5">
              {path.supported.length ? path.supported.map((s) => <span key={s} className="chip bg-accent/25">{s}</span>) : <span className="text-sm text-muted-foreground">None yet</span>}
            </div>
            <p className="text-sm font-semibold">○ Still needs evidence</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {path.missing.length ? path.missing.map((s) => <span key={s} className="chip border border-dashed">{s}</span>) : <span className="text-sm text-muted-foreground">All covered 🎉</span>}
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-accent transition-all" style={{ width: `${(path.supported.length / opportunity.requiredSkills.length) * 100}%` }} />
            </div>
          </section>
          {saved && <div className="panel bg-accent text-accent-foreground">{saved} ✓</div>}
        </aside>
      </div>
    </AppShell>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1 text-sm font-medium">{label}{children}</label>;
}

function CapabilityCard({ project, challenge }: { project: Project; challenge: string }) {
  const path = evidencePath(project, challenge);
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-navy">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-navy p-4 text-navy-foreground">
        <div>
          <div className="font-display text-lg font-bold">{sampleGraduate.name}</div>
          <div className="text-xs opacity-75">{opportunity.role}</div>
        </div>
        <StatusChip status="Pending verification" />
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground">Project</p>
          <p className="font-semibold">{project.title || "—"}</p>
          <p className="mt-1 text-sm">{project.contribution}</p>
          {project.link && <EvidenceLink href={project.link} />}
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground">Skills with evidence</p>
          <div className="mt-1 flex flex-wrap gap-1.5">{path.supported.map((s) => <span key={s} className="chip bg-accent/25">{s}</span>)}</div>
          <p className="mt-3 text-xs font-bold uppercase text-muted-foreground">Challenge</p>
          <p className="text-sm">{challenge ? `Submitted · ${path.words} words` : "Not submitted yet"}</p>
          <p className="mt-3 text-xs font-bold uppercase text-muted-foreground">Assessment status</p>
          <p className="text-sm">{challenge ? "Awaiting employer review" : "Incomplete"}</p>
        </div>
      </div>
      <div className="border-t bg-secondary p-3 text-sm"><b>Next:</b> {path.next}</div>
    </div>
  );
}

function Feedback() {
  const f = sampleFeedback;
  return (
    <section className="panel">
      <SectionTitle kicker="Keep moving forward" title="Feedback and next steps" />
      <p className="text-xs text-muted-foreground">Sample feedback from {f.from} on: {f.role}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-muted p-3 text-sm"><b className="block">What was missing</b>{f.missing}</div>
        <div className="rounded-xl bg-muted p-3 text-sm"><b className="block">How to fix it</b>{f.fix}</div>
        <div className="rounded-xl bg-highlight/40 p-3 text-sm"><b className="block">Your next step</b>{f.nextStep}</div>
      </div>
      <div className="mt-4 rounded-xl border border-dashed border-accent p-4 text-sm">
        <span className="chip mb-2 bg-accent/25">Illustrative suggestion</span>
        <p><b>{f.suggestion.role}</b> at {f.suggestion.company}</p>
        <p className="mt-1 text-muted-foreground">{f.suggestion.why}</p>
        <p className="mt-2 text-xs text-muted-foreground">This prototype does not send referrals or guarantee an interview or job.</p>
      </div>
    </section>
  );
}

function CvBuilder({ project }: { project: Project }) {
  const [draft, setDraft] = useLocal<string>("loe-cv", "");
  const [copied, setCopied] = useState(false);
  const p = opportunity.cvPreferences;
  return (
    <section className="panel">
      <SectionTitle kicker="Step 4" title="CV & portfolio builder" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-secondary p-4 text-sm">
          <b>{opportunity.company} prefers:</b>
          <p className="mt-1">Length: {p.length}</p>
          <p className="mt-2 font-semibold">Headings</p>
          <ol className="list-decimal pl-5">{p.headings.map((h) => <li key={h}>{h}</li>)}</ol>
          <p className="mt-2 font-semibold">Include</p>
          <ul className="list-disc pl-5">{p.include.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="mt-2 font-semibold">Leave out</p>
          <ul className="list-disc pl-5">{p.avoid.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
        <div>
          <button className="btn btn-accent mb-2" onClick={() => setDraft(cvDraft(project))}>
            {draft ? "Regenerate from saved project" : "Generate draft"}
          </button>
          <textarea className="field font-mono text-xs" rows={16} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Your editable draft appears here." />
          <div className="mt-2 flex items-center gap-2">
            <button className="btn btn-ghost" disabled={!draft} onClick={() => { navigator.clipboard.writeText(draft); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? "Copied ✓" : "Copy draft"}</button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Check every detail and fill in the [brackets] before sharing. Only include qualifications, results and experience that are true.</p>
        </div>
      </div>
    </section>
  );
}
