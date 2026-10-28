import { useEffect, useState } from "react";

export type EvidenceStatus = "Self-submitted" | "Pending verification" | "Verified in demo";

export const opportunity = {
  role: "Junior Data Analyst",
  company: "Ubuntu Fresh Markets (sample company)",
  location: "Johannesburg · Hybrid",
  requiredSkills: ["SQL", "Excel", "Data visualisation", "Communication", "Problem-solving"],
  challenge:
    "Weekly sales at three stores dropped 12% last month. In 150–250 words, explain how you would investigate the cause using the sales data available, and what you would present to the store manager.",
  cvPreferences: {
    length: "1 page (max 2)",
    headings: ["Profile (2–3 lines)", "Skills", "Projects & evidence", "Education", "Other experience"],
    include: [
      "Link to at least one project with your specific contribution",
      "Tools you actually used (e.g. SQL, Excel, Power BI)",
      "Plain-language results — no exaggeration",
    ],
    avoid: ["Photo, age, ID number or marital status", "Long lists of soft skills without examples"],
  },
};

export type Project = {
  title: string;
  description: string;
  skills: string[];
  contribution: string;
  link: string;
};

export const sampleGraduate = {
  name: "Thandeka Mokoena",
  qualification: "BCom Information Systems, University of Johannesburg (2025)",
  skills: ["Excel", "SQL", "Communication", "Python"],
};

export const defaultProject: Project = {
  title: "Campus cafeteria waste dashboard",
  description:
    "Analysed six months of cafeteria purchase and waste records to find which menu items were over-ordered.",
  skills: ["Excel", "SQL", "Data visualisation"],
  contribution:
    "I cleaned the data, wrote the SQL queries to group waste by item and day, and built the charts our team presented to the catering manager.",
  link: "https://github.com/example/cafeteria-waste",
};

export type Candidate = {
  id: string;
  name: string;
  initials: string;
  headline: string;
  project: Project;
  status: EvidenceStatus;
  challenge: string;
};

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Thandeka Mokoena",
    initials: "TM",
    headline: "BCom Information Systems graduate",
    project: defaultProject,
    status: "Pending verification",
    challenge:
      "I would first check whether the drop is the same across all three stores and all product categories, using a simple pivot by store, week and category. Then I'd compare against the same period last year to rule out seasonality. If one category explains most of the drop, I'd look at stock-outs and price changes for that category. For the manager, I'd present one chart showing where the drop happened, two likely causes ranked by evidence, and one action to test next week.",
  },
  {
    id: "c2",
    name: "Sipho Ndlovu",
    initials: "SN",
    headline: "BSc Statistics graduate",
    project: {
      title: "Taxi route demand model",
      description: "Estimated peak demand on four Soweto taxi routes from survey data.",
      skills: ["Python", "Statistics", "Data visualisation"],
      contribution: "Designed the survey sampling plan and wrote the Python analysis notebook.",
      link: "https://github.com/example/taxi-demand",
    },
    status: "Verified in demo",
    challenge:
      "Start by segmenting sales by store and day of week. Check if foot traffic, promotions or supplier delays changed. I would build a small regression to see which factor explains most of the variance and show the manager a one-page summary.",
  },
  {
    id: "c3",
    name: "Aisha Patel",
    initials: "AP",
    headline: "Diploma in Business Analysis",
    project: {
      title: "Spaza shop stock tracker",
      description: "Built a Google Sheets tracker for a family-run shop to reduce stock-outs.",
      skills: ["Excel", "Communication"],
      contribution: "Built the whole tracker and trained the shop owner to use it.",
      link: "https://docs.google.com/example",
    },
    status: "Self-submitted",
    challenge:
      "I would talk to the store staff first to understand what changed, then look at the sales numbers for the top 20 products.",
  },
];

export const sampleFeedback = {
  from: "Lerato Dube, Talent Lead — Kasi Logistics (sample)",
  role: "Graduate Operations Analyst (previous application)",
  missing:
    "Your project showed strong Excel skills, but we couldn't see how you communicated findings to a non-technical audience.",
  fix: "Add a short summary (3–5 bullets or a 2-minute video) explaining what your analysis found and what decision it supported.",
  nextStep: "Write a 5-bullet 'what we found and why it matters' summary for your cafeteria project and add it to your evidence link.",
  suggestion: {
    company: "Greenline Recycling Co-op (sample)",
    role: "Data & Reporting Intern",
    why: "Your waste-analysis project directly matches their reporting work, and the role offers mentorship on presenting insights.",
  },
};

export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);
  return [value, setValue] as const;
}

/** Rule-based (not AI): skills with evidence = skills in saved project + challenge if response is long enough. */
export function evidencePath(project: Project, challenge: string) {
  const words = challenge.trim().split(/\s+/).filter(Boolean).length;
  const evidenced = new Set(project.skills.map((s) => s.trim()).filter(Boolean));
  if (words >= 120) evidenced.add("Problem-solving");
  if (words >= 120 && /manager|present|summary|chart/i.test(challenge)) evidenced.add("Communication");
  const supported = opportunity.requiredSkills.filter((s) => evidenced.has(s));
  const missing = opportunity.requiredSkills.filter((s) => !evidenced.has(s));
  let next: string;
  if (!project.title.trim() || !project.contribution.trim()) next = "Add a project and describe exactly what you did.";
  else if (!project.link.trim()) next = "Add a link to evidence (repo, slides or document) for your project.";
  else if (words < 120) next = `Finish the practical challenge — ${Math.max(0, 150 - words)} more words to reach 150.`;
  else if (missing.length) next = `Show evidence of ${missing[0]}: add it to a project with a concrete example.`;
  else next = "Your evidence covers every required skill. Generate your CV draft and apply.";
  return { supported, missing, next, words };
}

export function cvDraft(project: Project) {
  return `${sampleGraduate.name}
${sampleGraduate.qualification}
[Email] · [Phone] · [City]

PROFILE
[2–3 lines in your own words about the analyst work you want to do.]

SKILLS
${project.skills.join(" · ") || "[Add skills you can show evidence for]"}

PROJECTS & EVIDENCE
${project.title || "[Project title]"}
${project.description || "[What the project was about]"}
My contribution: ${project.contribution || "[What you specifically did]"}
Evidence: ${project.link || "[Link]"}

EDUCATION
${sampleGraduate.qualification}

OTHER EXPERIENCE
[Add volunteering, part-time work or tutoring — only if real.]`;
}
