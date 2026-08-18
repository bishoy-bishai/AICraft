import { useState } from "react";
import { Download, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyBlock } from "@/components/copy-block";

interface TargetAgent {
  id: string;
  name: string;
  filename: string;
  location: string;
  desc: string;
}

const TARGET_AGENTS: TargetAgent[] = [
  {
    id: "claudecode",
    name: "Claude Code",
    filename: "CLAUDE.md",
    location: "Project root CLAUDE.md",
    desc: "Standing instructions and /aicraft custom slash command.",
  },
  {
    id: "cursor",
    name: "Cursor AI",
    filename: ".cursorrules",
    location: "Project root .cursorrules or .cursor/rules/aicraft.mdc",
    desc: "Rules for Cursor composer and agentic inline edits.",
  },
  {
    id: "windsurf",
    name: "Windsurf Cascade",
    filename: ".windsurfrules",
    location: "Project root .windsurfrules",
    desc: "Direct system instructions for Cascade flow.",
  },
  {
    id: "codex",
    name: "Codex / Universal",
    filename: "AGENTS.md",
    location: "Project root AGENTS.md or ~/.codex/AGENTS.md",
    desc: "Universal standard standing agent instructions.",
  },
];

const STACKS = [
  { id: "ts-react", name: "TypeScript / React / Next.js", path: "src/components, src/lib" },
  { id: "node-nest", name: "Node.js / NestJS / Express", path: "src/modules, src/services" },
  { id: "python-fastapi", name: "Python / FastAPI / SQLAlchemy", path: "app/domain, app/services" },
  { id: "go", name: "Go / Standard Library", path: "pkg/domain, internal/service" },
  { id: "rust", name: "Rust / Axum / Tokio", path: "src/domain, src/infrastructure" },
];

export function AgentConfigGenerator() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("claudecode");
  const [selectedStackId, setSelectedStackId] = useState<string>("ts-react");

  const agent = TARGET_AGENTS.find((a) => a.id === selectedAgentId) || TARGET_AGENTS[0];
  const stack = STACKS.find((s) => s.id === selectedStackId) || STACKS[0];

  const generateConfig = () => {
    if (selectedAgentId === "cursor") {
      return `# Cursor AI Rules — AICraft Engineering Discipline
# Stack: ${stack.name}

## CORE MANDATE: Understand first. Build second.

You are a senior staff engineer pairing in an existing production codebase.

### NON-NEGOTIABLE RULES:
1. ALWAYS inspect 3–5 existing files in ${stack.path} before proposing or writing code. Match naming, errors, and typing exactly.
2. NEVER introduce speculative abstractions (services, factories, wrappers) unless needed today.
3. CAPABILITIES ARE NOT ENTITIES: Do not create database models for transient capabilities (search, caching, upload).
4. KEEP CHANGES ATOMIC: Only touch files directly requested. Do not refactor surrounding code or reformat untouched files.
5. RESPECT LAYER BOUNDARIES: Keep presentation, application, domain, and persistence separate.
6. EVIDENCE OVER ASSUMPTION: Run the test suite and verify real output. Never assume code works without verification.
7. VIOLATION POLICY: If a request contradicts existing architecture or ADRs, STOP, explain the conflict, and ask for guidance.

### PRE-IMPLEMENTATION GATE:
- Understand problem? [Yes/No]
- Understand architecture? [Yes/No]
- Understand domain invariants? [Yes/No]
- Understand task scope? [Yes/No]
If any is No, ask the user before generating code.`;
    }

    if (selectedAgentId === "claudecode") {
      return `# CLAUDE.md — AICraft Engineering Standard
# Project Stack: ${stack.name}

## Operating Philosophy
Understand first. Build second. Match the codebase. Ship the smallest correct change.

## Commands
- Build: verify compiler and type checker
- Test: execute unit and integration test suite
- Lint: run project linter

## Engineering Discipline Rules
- Read 3–5 representative files in ${stack.path} before modifying code.
- Match existing project conventions; do not impose personal stylistic preferences.
- Reuse existing primitives before introducing new abstractions.
- Never claim tests passed without executing them and verifying the output.
- Keep changes strictly atomic and bounded.
- Update docs whenever behavior or contracts change.
- If requirements conflict with architecture or domain rules, STOP and ask.`;
    }

    // Default: AGENTS.md (Codex) / .windsurfrules (Windsurf)
    return `# ${agent.filename} — AICraft AI Engineering Discipline
# Applicable Agents: OpenAI Codex, Windsurf Cascade, Copilot, ChatGPT
# Tech Stack: ${stack.name}

## Core Principle
> **Understand first. Build second.**

## 1. Pre-Implementation Checklist
Before writing code, verify:
1. Problem understood?
2. Architecture understood?
3. Domain invariants understood?
4. Task bounded and clear?
If any answer is "No", stop and request clarification.

## 2. 7-Phase Execution Workflow
1. **Receive:** Understand scope and non-goals.
2. **Understand:** Read docs, ADRs, and existing code in ${stack.path}.
3. **Plan:** Bounded task breakdown, reusable primitives.
4. **Implement:** Smallest correct change, match style, no speculative code.
5. **Validate:** Run tests with verified output.
6. **Review:** Priority: Architecture -> Domain -> Correctness -> Security -> Simplicity -> Tests.
7. **Complete:** Update docs, ADRs, atomic commits.

## 3. Ground Truth Rules
- NEVER claim tests passed without execution evidence.
- NEVER invent new abstractions when existing primitives suffice.
- NEVER mix refactoring with feature development.`;
  };

  const configContent = generateConfig();

  const handleDownload = () => {
    const blob = new Blob([configContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = agent.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Target Agent Selector */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Looking for <strong>Google Antigravity</strong>? It needs the full multi-file skill folder, not a single
          generated file — use the "Google Antigravity (AGY)" tab in the install command section below instead.
        </p>
        <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
          1. Select Your AI Tool / Platform:
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {TARGET_AGENTS.map((t) => {
            const isSelected = selectedAgentId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedAgentId(t.id)}
                className={cn(
                  "flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm font-bold"
                    : "border-border/70 bg-card text-muted-foreground hover:border-border hover:bg-muted"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs text-foreground font-bold">{t.name}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </div>
                <span className="mt-1 font-mono text-[10px] text-primary">{t.filename}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Selector */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
          2. Select Project Tech Stack:
        </span>
        <div className="flex flex-wrap gap-2">
          {STACKS.map((s) => {
            const isSelected = selectedStackId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStackId(s.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "border border-border/70 bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Preview Box with Download */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs font-bold text-foreground">
                Target: {agent.filename}
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              Save location: {agent.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download {agent.filename}</span>
            </button>
          </div>
        </div>

        <CopyBlock code={configContent} className="min-h-[380px]" />
      </div>
    </div>
  );
}
