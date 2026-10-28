import { Link } from "@tanstack/react-router";
import { candidates } from "@/lib/demo";

export function EvidenceLink({ href, label = "View evidence" }: { href: string; label?: string }) {
  const sample = candidates.find((candidate) => candidate.project.link === href);
  const className = "mt-2 inline-block text-sm font-semibold underline underline-offset-4";
  if (sample) {
    return <Link to="/evidence/$candidateId" params={{ candidateId: sample.id }} className={className}>{label} (demo) ↗</Link>;
  }
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{label} ↗</a>;
}