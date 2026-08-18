import { useState } from "react";
import { 
  FileText, 
  Sparkles, 
  Bug, 
  Wrench, 
  Boxes, 
  Microscope, 
  FileCheck2, 
  CheckCheck,
  AlertOctagon,
  ShieldCheck,
  Ban,
  CheckCircle2,
  ListOrdered
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Scenario {
  id: string;
  name: string;
  icon: any;
  goal: string;
  checklist: string[];
  never: string[];
  deliverables?: string[];
  reviewOrder?: string[];
}

const PLAYBOOK_SCENARIOS: Scenario[] = [
  {
    id: "feature",
    name: "Feature Development",
    icon: Sparkles,
    goal: "Implement a new feature cleanly inside existing architecture boundaries.",
    checklist: [
      "Understand business requirements and domain invariants.",
      "Validate alignment with layered architecture (Presentation -> App -> Domain -> Data).",
      "Search for and reuse existing patterns, entities, and primitives.",
      "Keep changes atomic and strictly bounded to feature scope.",
      "Add unit, integration, and contract tests with real assertions.",
      "Update user/developer documentation and API contracts.",
    ],
    never: [
      "Skip documentation or test verification.",
      "Introduce new architectural patterns or frameworks without an ADR.",
      "Mix refactoring of unrelated legacy code into the feature PR.",
      "Create persistence entities for capabilities (e.g. search, upload).",
    ],
  },
  {
    id: "bugfix",
    name: "Bug Fix",
    icon: Bug,
    goal: "Fix the defect with the smallest possible blast radius.",
    checklist: [
      "Identify and isolate the root cause with evidence.",
      "Confirm reproduction case or write a failing test first.",
      "Implement the minimal correct fix matching existing code style.",
      "Verify that all existing tests pass and no regressions occur.",
      "Update documentation if edge-case behavior or error contracts change.",
    ],
    never: [
      "Rewrite unrelated code or refactor surrounding modules.",
      "Suppress errors silently or wrap with generic try/catch bypasses.",
      "Change system architecture or API contracts without approval.",
    ],
  },
  {
    id: "refactoring",
    name: "Refactoring",
    icon: Wrench,
    goal: "Improve code readability, cohesion, and maintainability without altering external behavior.",
    checklist: [
      "Verify existing test suite passes 100% green before touching code.",
      "Preserve external behavior and public API contracts identically.",
      "Improve readability, eliminate dead code, and reduce cognitive complexity.",
      "Keep all tests passing green at every intermediate commit.",
      "Update architecture and code docs if folder or module structure changes.",
    ],
    never: [
      "Introduce new features or alter business rules during refactor.",
      "Degrade performance or introduce memory leaks.",
      "Refactor without existing test coverage.",
    ],
  },
  {
    id: "architecture",
    name: "Architecture Modification",
    icon: Boxes,
    goal: "Modify or extend system architecture safely with explicit records.",
    checklist: [
      "Read all related Architectural Decision Records (ADRs).",
      "Analyze cross-cutting impact (APIs, persistence, services, consumers).",
      "Draft a new ADR detailing context, options, decision, and consequences.",
      "Update architectural diagrams and module boundary specs.",
      "Implement only after explicit review and approval.",
    ],
    never: [
      "Change architectural patterns silently without an ADR.",
      "Breach domain boundaries or leak infrastructure into domain logic.",
      "Add abstractions for speculative future requirements.",
    ],
  },
  {
    id: "research",
    name: "Technical Research & Spike",
    icon: Microscope,
    goal: "Investigate a technical or business problem thoroughly before committing.",
    checklist: [
      "Review existing codebase benchmarks and architectural constraints.",
      "Evaluate at least 2–3 viable options with trade-offs.",
      "Identify performance, operational, and security risks.",
      "Formulate concrete, evidence-based recommendations.",
    ],
    deliverables: [
      "Summary of Findings",
      "Evaluated Options & Trade-off Matrix",
      "Concrete Recommendation",
      "Identified Risks & Failure Modes",
      "Proof-of-Concept Benchmarks / References",
    ],
    never: [
      "Start direct production implementation under a research task.",
      "Assume that a research recommendation equals formal implementation approval.",
    ],
  },
  {
    id: "code-review",
    name: "Code Review",
    icon: CheckCheck,
    goal: "Review implementation quality objectively against engineering standards.",
    reviewOrder: [
      "1. Architecture & Boundaries (ADR alignment, layer leaks)",
      "2. Domain & Business Invariants (correctness of rules)",
      "3. Correctness & Error Handling (edge cases, concurrency)",
      "4. Security (input validation, auth, injection risk)",
      "5. Performance & Scalability (queries, allocations, N+1)",
      "6. Readability & Simplicity (avoid unnecessary abstractions)",
      "7. Testing (evidentiary quality, real assertions)",
      "8. Documentation (updated specs, comments, changelogs)",
    ],
    checklist: [
      "Evaluate code against the 8-stage priority order.",
      "Ensure feedback is evidence-based with file and line references.",
      "Avoid subjective 'I would have written it differently' comments.",
    ],
    never: [
      "Approve PRs without verifying tests and documentation.",
      "Enforce personal stylistic preferences over existing codebase patterns.",
    ],
  },
  {
    id: "docs",
    name: "Documentation",
    icon: FileText,
    goal: "Create or update documentation as the single living source of truth.",
    checklist: [
      "Understand the domain and preserve established business terminology.",
      "Keep formatting, voice, and structure consistent with repository standards.",
      "Link related documentation, specs, diagrams, and ADRs.",
      "Update document metadata, authors, and versioning.",
    ],
    never: [
      "Invent architecture that is not implemented or approved.",
      "Contradict existing documentation without explicit rationale and approval.",
      "Remove historical architectural decisions without migration context.",
    ],
  },
  {
    id: "docs-review",
    name: "Documentation Review",
    icon: FileCheck2,
    goal: "Review documentation quality, accuracy, and clarity.",
    checklist: [
      "Validate correct and consistent domain terminology.",
      "Verify internal consistency across related guides and diagrams.",
      "Check all code references, URLs, file paths, and snippets for accuracy.",
      "Ensure clear, concise, active-voice technical writing.",
    ],
    never: [
      "Allow outdated code examples or dead links in documentation.",
    ],
  },
];

const ESCALATION_TRIGGERS = [
  "Requirements conflict with each other or with the Constitution.",
  "Necessary documentation or domain specifications are missing.",
  "Architecture boundaries or ownership are ambiguous.",
  "Business rules or invariant handling are undefined for an edge case.",
  "Multiple valid architectural solutions exist with significant trade-offs.",
];

export function PlaybookExplorer() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("feature");
  const scenario = PLAYBOOK_SCENARIOS.find((s) => s.id === activeScenarioId) || PLAYBOOK_SCENARIOS[0];
  const Icon = scenario.icon;

  return (
    <div className="space-y-8">
      {/* Scenario Selector Chips */}
      <div className="flex flex-wrap gap-2">
        {PLAYBOOK_SCENARIOS.map((s) => {
          const SIcon = s.icon;
          const isActive = activeScenarioId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveScenarioId(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-bold"
                  : "border border-border/70 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <SIcon className="h-3.5 w-3.5" />
              <span>{s.name}</span>
            </button>
          );
        })}
      </div>

      {/* Scenario Detail Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-primary uppercase">
              Playbook Scenario Guide
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {scenario.name}
            </h3>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-muted/40 p-4">
          <span className="font-mono text-xs font-semibold text-primary uppercase">Scenario Goal</span>
          <p className="mt-1 text-sm font-medium text-foreground">{scenario.goal}</p>
        </div>

        {scenario.reviewOrder && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <ListOrdered className="h-4 w-4 text-primary" />
              <span>Mandatory Review Priority Order (Top to Bottom):</span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
              {scenario.reviewOrder.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs font-mono text-foreground"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Checklist */}
          <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-5">
            <div className="flex items-center gap-2 font-bold text-sm text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Mandatory Checklist</span>
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {scenario.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="font-mono text-primary font-bold">✓</span>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prohibited Rules (Never) */}
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
            <div className="flex items-center gap-2 font-bold text-sm text-destructive">
              <Ban className="h-4 w-4" />
              <span>Strictly Prohibited ("Never")</span>
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {scenario.never.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="font-mono text-destructive font-bold">✗</span>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {scenario.deliverables && (
          <div className="mt-6 rounded-xl border border-border/70 bg-card p-5">
            <span className="font-mono text-xs font-semibold text-primary uppercase">
              Required Deliverables:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {scenario.deliverables.map((del, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-border bg-muted/60 px-3 py-1 font-mono text-xs text-foreground"
                >
                  {del}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Escalation Rules & Authority Banner */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-amber-500">
            <AlertOctagon className="h-5 w-5" />
            <h4 className="text-base font-bold tracking-tight">Escalation Rules — When to Stop and Ask</h4>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            The AI agent must halt execution and ask the human engineer for clarification if any of the following occur:
          </p>
          <ul className="mt-3 grid gap-1.5 text-xs text-muted-foreground">
            {ESCALATION_TRIGGERS.map((trigger, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-foreground/90">
                <span className="font-mono text-amber-500 font-bold">!</span>
                <span>{trigger}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-primary/40 bg-primary/10 p-6">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <h4 className="text-base font-bold tracking-tight">Hierarchy of Authority</h4>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              The Playbook provides situational guidance. The Constitution provides absolute authority.
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-primary/30 bg-card p-3 font-mono text-xs text-primary font-bold">
            If they ever conflict, the Constitution ALWAYS wins.
          </div>
        </div>
      </div>
    </div>
  );
}
