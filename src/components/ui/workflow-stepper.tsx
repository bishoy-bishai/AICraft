import { useState } from "react";
import { 
  Inbox, 
  BrainCircuit, 
  Compass, 
  Code2, 
  CheckCircle, 
  Eye, 
  CheckCheck, 
  ChevronRight,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyBlock } from "@/components/copy-block";

interface Phase {
  number: number;
  name: string;
  short: string;
  icon: any;
  objective: string;
  actions: string[];
  requiredReading?: string[];
  checklist?: string[];
  reviewQuestions?: string[];
  exitCriteria: string;
  examplePrompt: string;
}

const WORKFLOW_PHASES: Phase[] = [
  {
    number: 1,
    name: "Receive",
    short: "Scope",
    icon: Inbox,
    objective: "Understand what is being requested before taking action.",
    actions: [
      "Read the assigned task thoroughly.",
      "Identify the core business and technical goal.",
      "Identify expected deliverables and outputs.",
      "Identify explicit constraints, dependencies, and potential blockers.",
    ],
    exitCriteria: "The task scope, objectives, and constraints are fully understood without assumptions.",
    examplePrompt: `Analyze the following task ticket. Extract: 1) Core Objective, 2) Expected Outputs, 3) Constraints, 4) Real Dependencies. Do not write code yet.`,
  },
  {
    number: 2,
    name: "Understand",
    short: "Context",
    icon: BrainCircuit,
    objective: "Understand the project, domain invariants, and existing codebase before planning.",
    requiredReading: [
      "AI Constitution (15 mandatory rules)",
      "Project Principles & Architecture Documentation",
      "Related Architecture Decision Records (ADRs)",
      "Domain documentation & data contracts",
      "3–5 representative code files in the target subsystem",
    ],
    actions: [
      "Profile existing naming, directory, and typing conventions.",
      "Identify layer boundaries and existing primitives for reuse.",
      "Confirm domain business invariants and edge cases.",
    ],
    exitCriteria: "The contributor understands the business context and existing architectural patterns.",
    examplePrompt: `Inspect src/domain/ and docs/adr/. Build an internal style and boundary profile for this subsystem. List 3 existing primitives we can reuse.`,
  },
  {
    number: 3,
    name: "Plan",
    short: "Design",
    icon: Compass,
    objective: "Design and bound the solution before touching implementation code.",
    actions: [
      "Define the technical approach and boundary impact.",
      "Identify all impacted files and dependencies.",
      "Verify that capabilities are not modeled as unnecessary entities.",
      "Validate design against architectural layer rules.",
      "Formulate atomic, bounded tasks with acceptance criteria.",
    ],
    exitCriteria: "Implementation plan is clear, bounded, and approved.",
    examplePrompt: `Draft an implementation plan for [Task]. List: impacted files [NEW/MODIFY], reusable primitives, acceptance criteria, and potential failure modes. Request approval before proceeding.`,
  },
  {
    number: 4,
    name: "Implement",
    short: "Code",
    icon: Code2,
    objective: "Execute the planned work cleanly, conservatively, and idiomatically.",
    actions: [
      "Implement only what the task requests (the smallest correct change).",
      "Match the codebase's existing naming, typing, and formatting style.",
      "Keep responsibilities strictly inside their owning layers.",
      "Avoid speculative features, premature abstractions, or unrelated refactoring.",
      "Ensure all changes are atomic and bisectable.",
    ],
    exitCriteria: "Requested functionality is completely implemented without collateral scope creep.",
    examplePrompt: `Implement Task #2 from our approved plan. Strictly match the existing style in src/services/user.service.ts. Do not modify unrelated files.`,
  },
  {
    number: 5,
    name: "Validate",
    short: "Evidence",
    icon: CheckCircle,
    objective: "Verify correctness with real execution evidence.",
    checklist: [
      "Architecture and layer boundaries respected",
      "Constitution and Project Principles respected",
      "Documentation updated to reflect changes",
      "Naming, typing, and linting match project standards",
      "No duplicated logic or stray abstractions",
      "Build passes cleanly without errors or warnings",
      "Unit, integration, and boundary tests pass with evidentiary output",
    ],
    actions: [
      "Run the compiler, linter, and type checker.",
      "Execute targeted unit and integration tests.",
      "Provide real command output as proof of success.",
    ],
    exitCriteria: "Implementation is production-ready with evidentiary verification proof.",
    examplePrompt: `Run npm run test and npm run build. Output the exact terminal results. Never claim tests passed without executing them.`,
  },
  {
    number: 6,
    name: "Review",
    short: "Audit",
    icon: Eye,
    objective: "Objectively evaluate quality, security, and maintainability before completion.",
    reviewQuestions: [
      "Did we solve the correct problem without collateral changes?",
      "Did we follow the documented architecture and ADRs?",
      "Are business rules and domain invariants protected?",
      "Can another engineer understand this code in six months?",
      "Did we leave the project better?",
    ],
    actions: [
      "Review diff against the 8-stage priority order (Architecture -> Domain -> Correctness -> Security -> Performance -> Readability -> Testing -> Docs).",
      "Ensure no subjective preference comments or unnecessary bloat.",
    ],
    exitCriteria: "Review approved with zero unaddressed regressions or boundary leaks.",
    examplePrompt: `Perform an objective code review on git diff. Audit in order: 1) Architecture, 2) Domain Invariants, 3) Security, 4) Simplicity. Flag any issues with file/line citations.`,
  },
  {
    number: 7,
    name: "Complete",
    short: "Ship",
    icon: CheckCheck,
    objective: "Close the task with clean documentation, ADRs, and commits.",
    actions: [
      "Update task status in tracker or changelog.",
      "Update related documentation, API specs, and schemas.",
      "Record an ADR if architectural patterns or invariants changed.",
      "Prepare a clean, descriptive, atomic git commit.",
    ],
    exitCriteria: "Task is officially Done, documented, and reproducible.",
    examplePrompt: `Prepare the atomic commit message following conventional commits format. Verify that README and API documentation are updated.`,
  },
];

export function WorkflowStepper() {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = WORKFLOW_PHASES[activePhaseIndex];
  const IconComponent = activePhase.icon;

  return (
    <div className="space-y-8">
      {/* Visual Pipeline Bar */}
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[720px] items-center justify-between gap-1 rounded-2xl border border-border/80 bg-card p-2">
          {WORKFLOW_PHASES.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            const isCompleted = activePhaseIndex > idx;

            return (
              <button
                key={phase.number}
                onClick={() => setActivePhaseIndex(idx)}
                className={cn(
                  "group relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition-all duration-200",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md font-bold"
                    : isCompleted
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-mono",
                    isSelected
                      ? "bg-primary-foreground text-primary font-bold"
                      : isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background"
                  )}
                >
                  {phase.number}
                </span>
                <span className="truncate">{phase.name}</span>
                {idx < WORKFLOW_PHASES.length - 1 && (
                  <ChevronRight
                    className={cn(
                      "hidden h-3.5 w-3.5 opacity-40 xl:block",
                      isSelected ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
                    Phase {activePhase.number} of 7
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-mono text-xs text-muted-foreground">{activePhase.short}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {activePhase.name}
                </h3>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/40 p-4 text-sm">
              <span className="font-mono text-xs font-semibold text-primary uppercase">Objective</span>
              <p className="mt-1 text-foreground font-medium">{activePhase.objective}</p>
            </div>

            {activePhase.requiredReading && (
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                  Required Reading & Discovery:
                </span>
                <ul className="grid gap-1.5 text-xs text-muted-foreground">
                  {activePhase.requiredReading.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-lg border border-border/40 bg-card px-3 py-2">
                      <span className="font-mono text-primary font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                Mandatory Execution Actions:
              </span>
              <ul className="grid gap-1.5 text-xs text-muted-foreground">
                {activePhase.actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg border border-border/40 bg-card px-3 py-2">
                    <span className="font-mono text-primary font-bold">✓</span>
                    <span className="text-foreground/90">{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activePhase.checklist && (
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-primary uppercase">
                  Validation Checklist:
                </span>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-xs">
                  {activePhase.checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePhase.reviewQuestions && (
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                  Review Questions:
                </span>
                <div className="space-y-1.5 text-xs">
                  {activePhase.reviewQuestions.map((q, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg border border-border/40 bg-card px-3 py-2">
                      <span className="font-mono text-primary font-bold">Q{i + 1}:</span>
                      <span className="text-foreground">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Exit Criteria & Agent Prompt Snippet */}
          <div className="w-full lg:w-[380px] space-y-4">
            <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-4">
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
                Exit Criteria (Gate)
              </span>
              <p className="mt-2 text-xs font-medium text-foreground leading-relaxed">
                {activePhase.exitCriteria}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Skipping steps is a process violation.
              </div>
            </div>

            <div>
              <span className="mb-2 block font-mono text-xs font-semibold text-muted-foreground uppercase">
                Example Agent Prompt:
              </span>
              <CopyBlock code={activePhase.examplePrompt} />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activePhaseIndex === 0}
                onClick={() => setActivePhaseIndex((prev) => Math.max(0, prev - 1))}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground disabled:opacity-30 hover:text-foreground"
              >
                ← Previous Phase
              </button>
              <button
                disabled={activePhaseIndex === WORKFLOW_PHASES.length - 1}
                onClick={() => setActivePhaseIndex((prev) => Math.min(WORKFLOW_PHASES.length - 1, prev + 1))}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-30 hover:brightness-110"
              >
                <span>Next Phase</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
