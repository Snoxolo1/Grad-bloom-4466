import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-card">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-3 lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold sm:text-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-navy-foreground">↗</span>
          <span>launch of exploration</span>
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 sm:gap-4">
          <Button asChild variant="ghost"><Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-brand" }}><Home className="size-4" />Home</Link></Button>
          <Button asChild variant="ghost"><Link to="/graduate" activeProps={{ className: "text-brand" }}>Graduate view</Link></Button>
          <Button asChild variant="ghost"><Link to="/employer" activeProps={{ className: "text-brand" }}>Employer view</Link></Button>
          <span className="hidden border-l pl-5 text-xs uppercase tracking-widest text-muted-foreground xl:inline">Prototype · sample data</span>
        </nav>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <div className="bg-highlight/40 px-4 py-1.5 text-center text-xs font-medium">
        Prototype with sample data · changes are saved only in this browser · no real applications or referrals are sent
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

export function StatusChip({ status }: { status: string }) {
  const cls =
    status === "Verified in demo"
      ? "bg-success/15 text-success"
      : status === "Pending verification"
        ? "bg-highlight/50 text-highlight-foreground"
        : "bg-muted text-muted-foreground";
  return <span className={`chip ${cls}`}>{status}</span>;
}

export function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-3">
      {kicker && <p className="text-xs font-bold uppercase tracking-widest text-accent-foreground/70">{kicker}</p>}
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}
