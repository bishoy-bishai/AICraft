import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { CopyBlock } from "@/components/copy-block";
import { LoopStackInteractor } from "@/components/ui/loop-stack-interactor";
import { ConstitutionViewer } from "@/components/ui/constitution-viewer";
import { WorkflowStepper } from "@/components/ui/workflow-stepper";
import { PlaybookExplorer } from "@/components/ui/playbook-explorer";
import { PromptLibraryBuilder } from "@/components/ui/prompt-library-builder";
import { ChaosComparison } from "@/components/ui/chaos-comparison";
import { AgentConfigGenerator } from "@/components/ui/agent-config-generator";
import { DisciplineScorecard } from "@/components/ui/discipline-scorecard";
import { MultiAgentInstallHub } from "@/components/ui/multi-agent-install-hub";
import { 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Workflow, 
  Boxes, 
  ArrowRight,
  Zap,
  Layers,
  FileCode2,
  Shield,
  Code2
} from "lucide-react";
import { cn } from "@/lib/utils";

const REPO_URL = "https://github.com/bishoy-bishai/AICraft";

const QUICK_INSTALL_OPTIONS = [
  { id: "curl", label: "1-Line curl", cmd: "curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/install.sh | bash" },
  { id: "antigravity", label: "Antigravity", cmd: "mkdir -p .agents/skills/aicraft && curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/skill/SKILL.md -o .agents/skills/aicraft/SKILL.md" },
  { id: "claude", label: "Claude Code", cmd: "git clone --depth 1 --filter=blob:none --sparse https://github.com/bishoy-bishai/AICraft.git /tmp/aicraft && cd /tmp/aicraft && git sparse-checkout set skill && mkdir -p ~/.claude/skills/aicraft && cp -R skill/. ~/.claude/skills/aicraft/" },
  { id: "cursor", label: "Cursor Rules", cmd: "mkdir -p .cursor/rules && curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/skill/constitution.md -o .cursor/rules/aicraft.md" },
  { id: "codex", label: "Codex AGENTS.md", cmd: "mkdir -p ~/.codex && curl -fsSL https://raw.githubusercontent.com/bishoy-bishai/AICraft/main/skill/constitution.md >> ~/.codex/AGENTS.md" },
];

const FOUR_PILLARS = [
  {
    n: "01",
    title: "Constitution",
    subtitle: "15 Mandatory Rules",
    icon: ShieldCheck,
    desc: "The absolute law of the engineering system. Mandates 'Understand first. Build second.' Violation policy stops execution immediately when tasks conflict with architecture.",
    target: "#constitution",
  },
  {
    n: "02",
    title: "Workflow",
    subtitle: "7-Phase Execution Lifecycle",
    icon: Workflow,
    desc: "Receive → Understand → Plan → Implement → Validate → Review → Complete. Every contributor, AI or human, adheres to the same gated lifecycle.",
    target: "#workflow",
  },
  {
    n: "03",
    title: "Playbook",
    subtitle: "8 Scenario Runbooks",
    icon: Boxes,
    desc: "Targeted playbooks for Features, Bug Fixes, Refactoring, Architecture, Spikes, and Code Review with the 8-Stage Priority Order.",
    target: "#playbook",
  },
  {
    n: "04",
    title: "Prompt Library",
    subtitle: "Deterministic AI Prompts",
    icon: Terminal,
    desc: "Structured schemas (Context, Goal, Inputs, Constraints, Expected Output, Definition of Done). Prompts do not define behavior — the Constitution does.",
    target: "#prompt-library",
  },
];

const GROUND_RULES = [
  "tests passed when they were not actually executed",
  "an integration works when it was not verified with real output",
  "a requirement exists when it was not explicitly specified",
  "a file was changed when it was untouched",
  "an architectural pattern was approved when no ADR exists",
  "an error was fixed when it was merely suppressed in a try/catch block",
];

function App() {
  const [quickTab, setQuickTab] = useState("curl");
  const activeQuick = QUICK_INSTALL_OPTIONS.find((o) => o.id === quickTab) || QUICK_INSTALL_OPTIONS[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2.5 text-base font-bold tracking-tight">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20 text-primary border border-primary/40 shadow-[0_0_12px_var(--primary)]">
              <Cpu className="h-3.5 w-3.5" />
            </span>
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">AICraft</span>
          </a>

          <div className="hidden items-center gap-6 text-xs font-medium md:flex">
            <a href="#pillars" className="text-muted-foreground transition hover:text-foreground">
              4 Pillars
            </a>
            <a href="#constitution" className="text-muted-foreground transition hover:text-foreground">
              Constitution
            </a>
            <a href="#workflow" className="text-muted-foreground transition hover:text-foreground">
              Workflow
            </a>
            <a href="#playbook" className="text-muted-foreground transition hover:text-foreground">
              Playbook
            </a>
            <a href="#prompt-library" className="text-muted-foreground transition hover:text-foreground">
              Prompt Library
            </a>
            <a href="#comparison" className="text-muted-foreground transition hover:text-foreground">
              Discipline vs Chaos
            </a>
            <a href="#generator" className="text-muted-foreground transition hover:text-foreground">
              Config Generator
            </a>
            <a href="#scorecard" className="text-muted-foreground transition hover:text-foreground">
              Audit Score
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground hover:bg-muted"
            >
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>GitHub</span>
            </a>
            <a
              href="#install"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground transition hover:brightness-110 shadow-sm"
            >
              <span>Install Skill</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-border/70 px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-[1000px] text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-primary shadow-[0_0_15px_-3px_var(--primary)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Engineering Discipline for Coding Agents</span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.08]">
            Teach AI to work like a{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
              senior engineering team.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-[760px] text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
            AI can already write code. <strong>AICraft</strong> is the discipline that ensures it writes code that belongs — respecting your architecture, matching your conventions, and verifying every claim with real evidence.
          </p>

          {/* Dynamic Quick Install Terminal */}
          <div className="mx-auto mb-10 max-w-[720px] text-left">
            <div className="flex flex-wrap items-center gap-1.5 rounded-t-xl border border-b-0 border-border/80 bg-muted/70 px-3 py-2">
              <span className="mr-2 font-mono text-[11px] text-muted-foreground font-semibold">Quick Install:</span>
              {QUICK_INSTALL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuickTab(opt.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1 font-mono text-[11px] transition",
                    quickTab === opt.id
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <CopyBlock code={activeQuick.cmd} className="rounded-t-none border-t-0" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#constitution"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110 shadow-md"
            >
              <span>Explore the Constitution</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#generator"
              className="flex items-center gap-2 rounded-xl border border-border/80 bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <FileCode2 className="h-4 w-4 text-primary" />
              <span>Generate Agent Config</span>
            </a>
            <a
              href="#install"
              className="flex items-center gap-2 rounded-xl border border-border/80 bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <span>All Install Options ↓</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border/70 pt-10 sm:grid-cols-4 text-left">
            <div className="rounded-xl border border-border/60 bg-card/60 p-4">
              <span className="font-mono text-2xl font-extrabold text-primary">15</span>
              <p className="mt-1 text-xs font-semibold text-foreground">Constitution Rules</p>
              <p className="text-[11px] text-muted-foreground">Mandatory non-negotiables</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-4">
              <span className="font-mono text-2xl font-extrabold text-primary">7</span>
              <p className="mt-1 text-xs font-semibold text-foreground">Execution Phases</p>
              <p className="text-[11px] text-muted-foreground">From Receive to Complete</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-4">
              <span className="font-mono text-2xl font-extrabold text-primary">8</span>
              <p className="mt-1 text-xs font-semibold text-foreground">Scenario Playbooks</p>
              <p className="text-[11px] text-muted-foreground">Features, fixes, refactors, ADRs</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-4">
              <span className="font-mono text-2xl font-extrabold text-primary">100%</span>
              <p className="mt-1 text-xs font-semibold text-foreground">Evidence-Based</p>
              <p className="text-[11px] text-muted-foreground">Zero unverified test claims</p>
            </div>
          </div>
        </div>
      </header>

      {/* The 4 Pillars Section */}
      <section id="pillars" className="border-b border-border/70 px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <Layers className="h-3.5 w-3.5" /> Structured Reading Order
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              The 4 Pillars of AICraft
            </Reveal>
            <Reveal as="p" className="mt-3 text-sm text-muted-foreground">
              Regardless of the AI model being used — Antigravity, Claude, ChatGPT, Codex, or Gemini — every agent operates under this unified hierarchy.
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FOUR_PILLARS.map((pillar) => {
              const PIcon = pillar.icon;
              return (
                <Reveal key={pillar.n} className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-border">{pillar.n}</span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
                        <PIcon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">{pillar.title}</h3>
                    <span className="font-mono text-[11px] text-primary font-semibold">{pillar.subtitle}</span>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
                  </div>
                  <a
                    href={pillar.target}
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Inspect Pillar</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Constitution Section */}
      <section id="constitution" className="border-b border-border/70 px-6 py-24 bg-muted/[0.15]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Pillar 01 — Mandatory Rules
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              The AI Constitution
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              These rules are not recommendations; they are mandatory. If a user instruction conflicts with the Constitution, the Constitution always wins.
            </Reveal>
          </div>

          <Reveal>
            <ConstitutionViewer />
          </Reveal>
        </div>
      </section>

      {/* 7-Phase Workflow Section */}
      <section id="workflow" className="border-b border-border/70 px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <Workflow className="h-3.5 w-3.5" /> Pillar 02 — Standard Execution
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              Standard 7-Phase Workflow
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Every task follows the same gated lifecycle. Skipping workflow steps is a process violation.
            </Reveal>
          </div>

          <Reveal>
            <WorkflowStepper />
          </Reveal>

          {/* Visual GSAP Loop Component */}
          <div className="mt-16 border-t border-border/70 pt-16">
            <Reveal as="h3" className="mb-2 text-xl font-bold tracking-tight">
              Interactive Execution Loop
            </Reveal>
            <Reveal as="p" className="mb-8 text-xs text-muted-foreground">
              Hover over each stage to inspect the engineering transformation and feedback loops:
            </Reveal>
            <Reveal>
              <LoopStackInteractor />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scenario Playbook Section */}
      <section id="playbook" className="border-b border-border/70 px-6 py-24 bg-muted/[0.15]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <Boxes className="h-3.5 w-3.5" /> Pillar 03 — Scenario Runbooks
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              Engineering Playbooks
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Scenario-specific checklists, prohibited anti-patterns, escalation rules, and the 8-stage priority order for reviews.
            </Reveal>
          </div>

          <Reveal>
            <PlaybookExplorer />
          </Reveal>
        </div>
      </section>

      {/* Prompt Library Section */}
      <section id="prompt-library" className="border-b border-border/70 px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <Terminal className="h-3.5 w-3.5" /> Pillar 04 — Prompt Workbench
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              AI Prompt Engineering Library
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Deterministic, reusable prompt schemas that trigger the documented engineering process across all AI coding assistants.
            </Reveal>
          </div>

          <Reveal>
            <PromptLibraryBuilder />
          </Reveal>
        </div>
      </section>

      {/* Discipline vs Chaos Comparison Arena */}
      <section id="comparison" className="border-b border-border/70 px-6 py-24 bg-muted/[0.15]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 font-mono text-xs text-destructive mb-3">
              <Zap className="h-3.5 w-3.5" /> Real-World Engineering Scenarios
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              Discipline vs. Chaos
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              See what happens when a reckless agent tackles a task versus an AICraft-disciplined senior AI partner.
            </Reveal>
          </div>

          <Reveal>
            <ChaosComparison />
          </Reveal>
        </div>
      </section>

      {/* Ground Truth & Non-Negotiable Rules */}
      <section id="ground-rules" className="border-b border-border/70 px-6 py-24">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-10">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <Shield className="h-3.5 w-3.5" /> Zero-Hallucination Invariants
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              The AI must NEVER claim…
            </Reveal>
            <Reveal as="p" className="mt-2 text-sm text-muted-foreground">
              Evidence over assumption, always.
            </Reveal>
          </div>

          <Reveal as="ul" className="grid gap-3">
            {GROUND_RULES.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-card px-5 py-4 text-sm text-muted-foreground transition hover:border-destructive/40 hover:bg-card/90"
              >
                <span className="font-mono font-bold text-destructive text-base">✗</span>
                <span className="text-foreground/90 font-medium">The AI must never claim {rule}.</span>
              </li>
            ))}
          </Reveal>

          <Reveal as="div" className="mt-8 text-center font-mono text-sm font-bold text-primary">
            Evidence over assumption. Verify everything.
          </Reveal>
        </div>
      </section>

      {/* Agent Config Generator Section */}
      <section id="generator" className="border-b border-border/70 px-6 py-24 bg-muted/[0.15]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <FileCode2 className="h-3.5 w-3.5" /> Custom Configuration Builder
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              Universal Agent Config Generator
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Generate tailored AICraft rule files for Antigravity, Claude Code, Cursor, Windsurf, or Codex for any tech stack.
            </Reveal>
          </div>

          <Reveal>
            <AgentConfigGenerator />
          </Reveal>
        </div>
      </section>

      {/* Discipline Maturity Scorecard Section */}
      <section id="scorecard" className="border-b border-border/70 px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Interactive Self-Assessment
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              AI Engineering Discipline Audit
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Take the 60-second quiz to evaluate how disciplined your team's current AI coding workflow is.
            </Reveal>
          </div>

          <Reveal>
            <DisciplineScorecard />
          </Reveal>
        </div>
      </section>

      {/* Multi-Agent Install Hub Section */}
      <section id="install" className="border-b border-border/70 px-6 py-24 bg-muted/[0.15]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12">
            <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary mb-3">
              <Terminal className="h-3.5 w-3.5" /> Package & Installation
            </Reveal>
            <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
              Install the AICraft Skill
            </Reveal>
            <Reveal as="p" className="mt-2 max-w-2xl text-sm text-muted-foreground">
              AICraft is a pure Markdown specification standard with 1-line auto installers and zero runtime dependencies.
            </Reveal>
          </div>

          <Reveal>
            <MultiAgentInstallHub />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-[1000px] space-y-6">
          <div className="flex items-center justify-center gap-2 text-base font-bold text-foreground">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/20 text-primary border border-primary/40">
              <Cpu className="h-3 w-3" />
            </span>
            <span>AICraft — AI Engineering Discipline</span>
          </div>

          <p className="max-w-md mx-auto text-xs text-muted-foreground">
            An open standard for coding agents that work in real codebases. Understand first. Build second.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
            <a href="#constitution" className="hover:text-foreground">Constitution</a>
            <a href="#workflow" className="hover:text-foreground">Workflow</a>
            <a href="#playbook" className="hover:text-foreground">Playbook</a>
            <a href="#prompt-library" className="hover:text-foreground">Prompt Library</a>
            <a href="#comparison" className="hover:text-foreground">Discipline vs Chaos</a>
            <a href="#generator" className="hover:text-foreground">Config Generator</a>
            <a href="#install" className="hover:text-foreground">Install Hub</a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              GitHub Repository ↗
            </a>
          </div>

          <div className="pt-4 border-t border-border/50 text-[11px] text-muted-foreground">
            Released under MIT License. Designed for all AI coding agents & human engineers.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
