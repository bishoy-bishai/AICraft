import { useState } from "react";
import { Terminal, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyBlock } from "@/components/copy-block";

interface PromptTemplate {
  id: string;
  title: string;
  category: "Development" | "Architecture" | "Quality" | "Documentation" | "Product";
  description: string;
  generate: (params: { taskName: string; moduleName: string; stack: string }) => string;
}

const TEMPLATES: PromptTemplate[] = [
  {
    id: "feature",
    title: "Feature Implementation with Boundaries",
    category: "Development",
    description: "Generates atomic, layer-separated code with bounded tests and style-matching.",
    generate: ({ taskName, moduleName, stack }) => `You are an AI engineering contributor operating under the AICraft AI Constitution.

CONTEXT:
We are implementing "${taskName || "User Authentication Flow"}" inside the "${moduleName || "auth-service"}" subsystem using ${stack || "TypeScript / Node.js"}.
Related documentation: docs/architecture/overview.md, docs/domain/entities.md.

GOAL:
Implement the requested feature strictly satisfying the acceptance criteria while respecting layer boundaries.

CONSTRAINTS:
1. Follow the AICraft Constitution: Understand first, build second.
2. Search for and reuse existing primitives in the codebase before introducing any new abstraction.
3. Keep changes atomic — do not refactor surrounding or unrelated code.
4. Enforce strict layer separation (Presentation -> Application -> Domain -> Data).
5. Capabilities are not entities: do not create database tables for transient operations unless required.

INPUTS:
- Target files: [Specify file paths to inspect and modify]
- Test directory: [Specify test paths]

EXPECTED OUTPUT:
- Smallest correct code implementation matching the existing repository style.
- Unit and integration tests with evidentiary assertions proving correctness.
- Updated documentation in docs/ for any modified behavior or API contracts.

DEFINITION OF DONE:
- [ ] Pre-implementation gate passed (understood problem, architecture, domain, task).
- [ ] Code builds without errors or lint warnings.
- [ ] All tests pass green with verified output.
- [ ] Documentation updated.`,
  },
  {
    id: "bugfix",
    title: "Root-Cause Bug Fix with Regression Test",
    category: "Development",
    description: "Isolates defect with evidence, writes failing test first, and applies minimal fix.",
    generate: ({ taskName, moduleName, stack }) => `You are an AI engineering contributor operating under the AICraft AI Constitution.

CONTEXT:
Defect reported in "${moduleName || "payment-processor"}": ${taskName || "Concurrent transactions causing duplicate invoice generation"}.
Tech stack: ${stack || "TypeScript / PostgreSQL"}.

GOAL:
Identify the root cause, write a reproduction test, and implement the minimal correct fix without side effects.

CONSTRAINTS:
1. Do not rewrite unrelated code or refactor surrounding modules.
2. Do not suppress errors or use generic catch-all bypasses.
3. Preserve all existing public API signatures and domain invariants.

EXPECTED OUTPUT:
1. Root cause analysis citing exact file paths and line numbers.
2. Failing reproduction test proving the bug exists.
3. Minimal correct code fix resolving the issue.
4. Verification evidence showing reproduction test now passes and full test suite is green.

DEFINITION OF DONE:
- [ ] Root cause identified with evidence.
- [ ] Reproduction test added to regression suite.
- [ ] Fix is minimal, atomic, and matches existing style.
- [ ] Zero regressions.`,
  },
  {
    id: "adr",
    title: "Architecture Decision Record (ADR) Creation",
    category: "Architecture",
    description: "Evaluates architectural trade-offs, options, and formally documents decisions.",
    generate: ({ taskName, moduleName, stack }) => `You are an AI engineering architect operating under the AICraft AI Constitution.

CONTEXT:
Evaluating architectural change: "${taskName || "Adopt Event-Driven Messaging for Order Processing"}" for "${moduleName || "order-core"}".
Stack: ${stack || "Go / Kafka / PostgreSQL"}.

GOAL:
Draft a comprehensive Architecture Decision Record (ADR) analyzing options, trade-offs, and migration path.

CONSTRAINTS:
1. Ground all claims in measurable evidence and documented repository constraints.
2. Evaluate at least 3 distinct options (including the status quo).
3. Explicitly document layer ownership, data consistency, and failure modes.

EXPECTED OUTPUT:
A standardized ADR markdown document containing:
- Title & Status (Proposed)
- Context & Problem Statement
- Decision Drivers & Constraints
- Evaluated Options (Pros / Cons / Operational Cost)
- Proposed Decision & Detailed Rationale
- Consequences (Positive, Negative, Neutral)
- Migration & Rollback Strategy`,
  },
  {
    id: "review",
    title: "Objective Evidentiary Code Review",
    category: "Quality",
    description: "Audits PR against the 8-stage priority order with zero subjective nitpicks.",
    generate: ({ taskName, moduleName }) => `You are an AI engineering reviewer operating under the AICraft AI Constitution.

GOAL:
Perform an objective, evidence-based code review of the pull request for "${moduleName || "core-subsystem"}": "${taskName || "Refactor billing webhooks"}".

MANDATORY REVIEW ORDER (Priority 1 to 8):
1. Architecture & Boundaries: Does it violate layer boundaries or ADRs?
2. Domain & Invariants: Are domain rules, calculations, and data invariants preserved?
3. Correctness & Error Handling: Are edge cases, nullability, and race conditions handled?
4. Security: Are inputs validated, auth verified, and queries parameterized?
5. Performance: Are queries indexed, allocations bounded, and N+1 avoided?
6. Readability & Simplicity: Did every abstraction earn its existence today?
7. Testing: Are tests evidentiary with real assertions?
8. Documentation: Are API specs, types, and comments up to date?

CONSTRAINTS:
- No subjective style preferences or "I would have written it differently" comments unless violating existing codebase conventions.
- Every flagged item must cite file path, line number, and exact risk.`,
  },
  {
    id: "docs",
    title: "Living Documentation & Spec Update",
    category: "Documentation",
    description: "Syncs living documentation, domain glossaries, and API specs with codebase reality.",
    generate: ({ taskName, moduleName }) => `You are an AI engineering contributor operating under the AICraft AI Constitution.

CONTEXT:
Updating living documentation for "${taskName || "Notification Delivery Service"}" in "${moduleName || "notifications"}".

GOAL:
Ensure documentation is the authoritative, accurate source of truth for all human and AI contributors.

CONSTRAINTS:
1. Preserve domain terminology and established glossary terms.
2. Never invent architecture that is not implemented or approved in an ADR.
3. Link related documents, schemas, and entrypoints.

EXPECTED OUTPUT:
- Updated markdown documentation with accurate sequence diagrams, parameters, and return types.
- Verified file links and code references.`,
  },
];

export function PromptLibraryBuilder() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("feature");
  const [taskName, setTaskName] = useState<string>("User Authentication & Session Management");
  const [moduleName, setModuleName] = useState<string>("src/modules/auth");
  const [stack, setStack] = useState<string>("TypeScript, Node.js, PostgreSQL");

  const categories = ["All", "Development", "Architecture", "Quality", "Documentation"];

  const filteredTemplates = TEMPLATES.filter(
    (t) => activeCategory === "All" || t.category === activeCategory
  );

  const activeTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];
  const generatedPrompt = activeTemplate.generate({ taskName, moduleName, stack });

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
              <Terminal className="h-3.5 w-3.5" /> Prompt Engineering Standard
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              Prompts do not define behavior. The Constitution does.
            </h3>
            <p className="mt-1 max-w-xl text-xs text-muted-foreground">
              AICraft prompts are structured, deterministic triggers that activate the documented engineering workflow.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="rounded-lg border border-border bg-muted/40 p-2.5">
              <span className="text-primary font-bold">✓ Reusable</span>
              <span className="block text-[10px] text-muted-foreground">Parametric schemas</span>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-2.5">
              <span className="text-primary font-bold">✓ Deterministic</span>
              <span className="block text-[10px] text-muted-foreground">Bounded outputs</span>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-2.5">
              <span className="text-primary font-bold">✓ Model Agnostic</span>
              <span className="block text-[10px] text-muted-foreground">Claude, Codex, Antigravity</span>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-2.5">
              <span className="text-primary font-bold">✓ Architecture Aware</span>
              <span className="block text-[10px] text-muted-foreground">Enforces boundaries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Generator & Workbench */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Template Picker & Parameters (5 cols) */}
        <div className="space-y-5 lg:col-span-5">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "border border-border/70 bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplateId === template.id;
              return (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={cn(
                    "cursor-pointer rounded-xl border p-3.5 transition",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border/70 bg-card hover:border-border hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground">{template.title}</h4>
                    <span className="font-mono text-[10px] text-primary">{template.category}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Parameter Controls */}
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
              <span>Customize Prompt Parameters</span>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-muted-foreground uppercase">
                Task / Feature Goal:
              </label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-muted-foreground uppercase">
                Target Module / Path:
              </label>
              <input
                type="text"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-muted-foreground uppercase">
                Tech Stack:
              </label>
              <input
                type="text"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Generated Code Preview (7 cols) */}
        <div className="space-y-3 lg:col-span-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-primary uppercase">
              Generated AICraft Prompt Trigger:
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              Ready for Antigravity, Claude, Cursor, Codex
            </span>
          </div>
          <CopyBlock code={generatedPrompt} className="min-h-[420px]" />
        </div>
      </div>
    </div>
  );
}
