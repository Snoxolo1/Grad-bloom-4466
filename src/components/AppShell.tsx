import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-highlight">↗</span>
            <span className="hidden sm:inline">Launch of Exploration</span>
          </Link>
          <nav className="flex gap-1 rounded-full bg-muted p-1 text-sm font-semibold">
            {[
              ["/graduate", "Graduate demo"],
              ["/employer", "Employer demo"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to as "/graduate"}
                className="rounded-full px-3 py-1.5 text-muted-foreground"
                activeProps={{ className: "rounded-full px-3 py-1.5 bg-navy text-navy-foreground" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
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
