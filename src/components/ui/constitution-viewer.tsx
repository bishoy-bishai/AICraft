import { useState } from "react";
import { ShieldAlert, CheckCircle2, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Rule {
  id: number;
  title: string;
  category: "Readiness" | "Architecture" | "Execution" | "Integrity" | "Review";
  summary: string;
  detail: string;
  quote?: string;
}

const CONSTITUTION_RULES: Rule[] = [
  {
    id: 1,
    title: "Read before you write",
    category: "Readiness",
    summary: "Inspect existing code, module boundaries, naming, and dependencies before proposing changes.",
    detail: "AI must build an internal style profile from 3–5 representative modules. Existing project conventions are the default. Do not copy defects, but match the established architecture.",
    quote: "Existing code is the first source of truth.",
  },
  {
    id: 2,
    title: "Documentation is the source of truth",
    category: "Readiness",
    summary: "System design, API contracts, domain models, and ADRs override assumptions.",
    detail: "Never guess what a system does when documentation or explicit specifications exist. If code contradicts documentation, flag the mismatch before coding.",
    quote: "No guessing.",
  },
  {
    id: 3,
    title: "Tasks drive development",
    category: "Execution",
    summary: "Every change must have a bounded scope, explicit goal, acceptance criteria, and real dependencies.",
    detail: "Do not begin writing code for vague or open-ended instructions. Deconstruct the request into atomic units of work with unambiguous definition of done.",
  },
  {
    id: 4,
    title: "Respect the architecture",
    category: "Architecture",
    summary: "Keep code inside its designated layer (Presentation, Application, Domain, Data, Infrastructure).",
    detail: "Business rules belong strictly in Domain/Application layers. UI cannot enforce backend authorization. Persistence stays behind data repositories.",
    quote: "Responsibilities never leak across boundaries.",
  },
  {
    id: 5,
    title: "Protect existing decisions",
    category: "Architecture",
    summary: "Do not rewrite or redesign existing architectural choices without an approved ADR.",
    detail: "Work inside the established engineering system. Extending an existing pattern is preferred over re-architecting it out of personal fashion.",
  },
  {
    id: 6,
    title: "Reuse before creating",
    category: "Architecture",
    summary: "Search for and utilize existing primitives, utilities, and abstractions before introducing new ones.",
    detail: "Every abstraction must earn its existence today. Capabilities are not automatically entities (e.g., search or caching doesn't need a dedicated model).",
    quote: 'If the reason is "future flexibility", do not add it.',
  },
  {
    id: 7,
    title: "Keep changes atomic",
    category: "Execution",
    summary: "Solve only the assigned task. Never mix feature work, bug fixes, formatting overhaul, or speculative refactoring.",
    detail: "The smallest correct change is the gold standard. Collateral changes make PRs unreviewable and break git bisectability.",
  },
  {
    id: 8,
    title: "Update documentation",
    category: "Integrity",
    summary: "Every change affecting behavior, configuration, contracts, or data models must update documentation.",
    detail: "A feature is not finished when the code compiles. The documentation must reflect the new reality so future contributors and agents have accurate context.",
  },
  {
    id: 9,
    title: "Think long term",
    category: "Architecture",
    summary: "Prioritize maintainability, readability, system invariants, and simplicity over clever hacks.",
    detail: "Code should tell the story clearly. The reader should not need to understand the entire distributed system to understand one single feature.",
  },
  {
    id: 10,
    title: "Explain decisions",
    category: "Integrity",
    summary: "Provide clear, evidence-based rationales for structural choices, trade-offs, and deviations.",
    detail: "Avoid hand-wavy explanations. Cite file lines, benchmark numbers, architectural constraints, or documented invariants.",
  },
  {
    id: 11,
    title: "Never break the Domain",
    category: "Integrity",
    summary: "Business rules and domain invariants are inviolable. Protect domain integrity under all circumstances.",
    detail: "Database corruption, bypass of state-machine invariants, or improper entity state transitions are critical failures.",
  },
  {
    id: 12,
    title: "Ask when unsure",
    category: "Readiness",
    summary: "Stop and seek clarification when specifications are ambiguous, contradictory, or missing.",
    detail: "Stopping to ask a clarifying question is a sign of high engineering maturity, not incompetence. Guessing leads to rewrites.",
  },
  {
    id: 13,
    title: "Respect people's time",
    category: "Review",
    summary: "Deliver clean diffs, precise summaries, verified facts, and actionable review feedback without fluff.",
    detail: "Write concise PR descriptions. Highlight risks, test results, and migration steps directly.",
  },
  {
    id: 14,
    title: "Leave the project better",
    category: "Integrity",
    summary: "Improve clarity, test coverage, and documentation without expanding unnecessary complexity.",
    detail: "Boy Scout rule: if you touch a file, fix minor typos or add missing docstrings if it doesn't pollute the diff.",
  },
  {
    id: 15,
    title: "Protect the vision",
    category: "Architecture",
    summary: "Maintain alignment with the overarching system philosophy and product direction.",
    detail: "AI agents must serve the long-term vision of the repository and adhere to its core engineering principles.",
  },
];

const PRE_FLIGHT_CHECKS = [
  { id: "prob", label: "Do I understand the problem completely?", hint: "Target outcomes, user intent, acceptance criteria" },
  { id: "arch", label: "Do I understand the architecture & boundaries?", hint: "Layer ownership, ADRs, module interfaces" },
  { id: "dom", label: "Do I understand the domain & invariants?", hint: "Business rules, data integrity, edge cases" },
  { id: "task", label: "Do I understand the specific task scope?", hint: "Bounded files, non-goals, real dependencies" },
];

export function ConstitutionViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRuleId, setActiveRuleId] = useState<number | null>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    prob: true,
    arch: true,
    dom: true,
    task: true,
  });

  const categories = ["All", "Readiness", "Architecture", "Execution", "Integrity", "Review"];

  const filteredRules = CONSTITUTION_RULES.filter((rule) => {
    const matchesCategory = selectedCategory === "All" || rule.category === selectedCategory;
    const matchesSearch =
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.detail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);

  return (
    <div className="space-y-8">
      {/* Principle Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-background p-6 md:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 font-mono text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Core Law of AICraft
            </div>
            <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Understand first. Build second.
            </h3>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              These 15 rules are mandatory for every AI agent and engineer. If any request conflicts with this Constitution, the Constitution always wins.
            </p>
          </div>
          <div className="flex flex-col items-start rounded-xl border border-border/80 bg-card/80 p-4 backdrop-blur md:min-w-[240px]">
            <span className="font-mono text-xs text-muted-foreground uppercase">Authority Hierarchy</span>
            <div className="mt-2 flex items-center gap-1.5 font-mono text-xs">
              <span className="font-semibold text-primary">Constitution</span>
              <span className="text-muted-foreground">›</span>
              <span>Workflow</span>
              <span className="text-muted-foreground">›</span>
              <span>Playbook</span>
            </div>
            <span className="mt-2 text-[11px] text-muted-foreground">
              Constitution has ultimate precedence.
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "border border-border/70 bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search 15 rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* 15 Rules Grid */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        {filteredRules.map((rule) => {
          const isActive = activeRuleId === rule.id;
          return (
            <div
              key={rule.id}
              onClick={() => setActiveRuleId(isActive ? null : rule.id)}
              className={cn(
                "cursor-pointer rounded-xl border p-4.5 transition-all duration-200",
                isActive
                  ? "border-primary bg-primary/5 shadow-[0_0_20px_-5px_var(--primary)]"
                  : "border-border/70 bg-card hover:border-border hover:bg-card/90 hover:-translate-y-0.5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary">
                  RULE #{String(rule.id).padStart(2, "0")}
                </span>
                <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {rule.category}
                </span>
              </div>
              <h4 className="mt-2 text-base font-bold tracking-tight text-foreground">
                {rule.title}
              </h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {rule.summary}
              </p>
              {isActive && (
                <div className="mt-3.5 space-y-2.5 border-t border-border/60 pt-3 text-xs animate-in fade-in duration-200">
                  <p className="text-foreground/90 leading-relaxed">{rule.detail}</p>
                  {rule.quote && (
                    <div className="border-l-2 border-primary pl-2.5 font-mono text-[11px] text-primary italic">
                      "{rule.quote}"
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Violation Policy & Pre-Implementation Gate */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Violation Policy */}
        <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 md:p-6">
          <div className="flex items-center gap-2.5 text-destructive">
            <ShieldAlert className="h-5 w-5" />
            <h4 className="text-base font-bold tracking-tight">Violation Policy</h4>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            If a user prompt or assigned task conflicts with documentation, domain invariants, architecture, or this Constitution:
          </p>
          <div className="mt-4 space-y-2 font-mono text-xs">
            <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 text-destructive-foreground">
              <span className="font-bold text-destructive">1. STOP</span>
              <span>Halt execution immediately. Do not write or commit code.</span>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 text-destructive-foreground">
              <span className="font-bold text-destructive">2. EXPLAIN</span>
              <span>Cite the exact conflict with documentation or rule citations.</span>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 text-destructive-foreground">
              <span className="font-bold text-destructive">3. CLARIFY</span>
              <span>Request explicit clarification or an approved ADR before resuming.</span>
            </div>
          </div>
        </div>

        {/* Pre-Implementation Gate Checklist */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h4 className="text-base font-bold tracking-tight">Pre-Implementation Gate</h4>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                allChecked
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-destructive/20 text-destructive border border-destructive/30"
              )}
            >
              {allChecked ? "READY TO CODE" : "STOP: DO NOT CODE"}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Before writing a single line of code, the AI must verify all four prerequisites:
          </p>
          <div className="mt-4 space-y-2.5">
            {PRE_FLIGHT_CHECKS.map((check) => (
              <div
                key={check.id}
                onClick={() => toggleCheck(check.id)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border p-2.5 text-xs transition",
                  checkedItems[check.id]
                    ? "border-primary/40 bg-primary/5 text-foreground"
                    : "border-border/70 bg-card text-muted-foreground hover:border-border"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={checkedItems[check.id]}
                    onChange={() => {}}
                    className="h-3.5 w-3.5 accent-primary"
                  />
                  <div>
                    <span className="font-medium text-foreground">{check.label}</span>
                    <span className="block text-[10px] text-muted-foreground">{check.hint}</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-primary">
                  {checkedItems[check.id] ? "PASS" : "FAIL"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
            If any answer is "No", <strong className="text-destructive">do not write code</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
