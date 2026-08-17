import { Reveal } from "@/components/reveal";
import { CopyBlock } from "@/components/copy-block";
import { LoopStackInteractor } from "@/components/ui/loop-stack-interactor";

const REPO = "https://github.com/bishoy-bishai/AICraft.git";

const claudeCodeInstall = `git clone --depth 1 --filter=blob:none --sparse ${REPO} /tmp/aicraft-skill
cd /tmp/aicraft-skill && git sparse-checkout set skill

mkdir -p ~/.claude/skills/aicraft
cp -R skill/. ~/.claude/skills/aicraft/

# then, inside Claude Code:
# /aicraft`;

const codexInstall = `git clone --depth 1 --filter=blob:none --sparse ${REPO} /tmp/aicraft-skill
cd /tmp/aicraft-skill && git sparse-checkout set skill

# Codex has no skill picker — it reads AGENTS.md as standing
# instructions. Append AICraft globally (every project) or drop the
# same lines into a single project's AGENTS.md instead. The tail
# strips SKILL.md's Claude-only frontmatter (the first 4 lines).
mkdir -p ~/.codex
tail -n +5 skill/SKILL.md >> ~/.codex/AGENTS.md
cat skill/skills/*.md >> ~/.codex/AGENTS.md`;

const principles = [
  {
    n: "01",
    title: "Learn Before You Change",
    body: "Before writing code, understand how the codebase is structured, how code is written, how responsibilities are divided, how APIs are designed, how data is persisted, how tests are written, and what conventions already exist.",
    quote: "Existing code is the first source of truth.",
  },
  {
    n: "02",
    title: "Match the Codebase",
    body: "AI must learn the project's existing style before generating new code — naming conventions, file organization, architectural patterns, error handling, testing patterns, typing conventions, dependency patterns. Do not impose your preferred style on an existing project.",
    quote: "Learn the style. Do not blindly copy defects.",
  },
  {
    n: "03",
    title: "Understand Before Planning",
    body: "Before creating tasks or implementation plans, identify the actual requirement, affected areas, existing primitives, ownership boundaries, constraints, dependencies, and risks.",
    quote: "No guessing.",
  },
  {
    n: "04",
    title: "Decide Before Coding",
    body: "Architecture decisions come before implementation. Ask: do we really need a new entity? A new abstraction? Can an existing primitive solve this? Is this capability actually an entity? What's the simplest design that satisfies the requirement?",
  },
  {
    n: "05",
    title: "Smallest Correct Change",
    body: "AICraft prefers the smallest change that correctly solves the problem — not the most sophisticated implementation possible.",
    quote: "No speculative features. No unnecessary abstractions. No unrelated refactoring.",
  },
  {
    n: "06",
    title: "Code Should Tell the Story",
    body: "Good code should make the flow obvious. The reader shouldn't need to understand the entire system to understand one feature.",
    flow: ["Request", "Authorization", "Validation", "Business Rule", "Persistence", "Response"],
  },
  {
    n: "07",
    title: "Every Abstraction Must Earn Its Existence",
    body: "Before introducing a service, repository, interface, factory, adapter, manager, helper, utility, wrapper, or generic base class — ask what problem it solves today.",
    quote: 'If the answer is "future flexibility" — don\'t add it.',
  },
  {
    n: "08",
    title: "Capabilities Are Not Entities",
    body: "First ask whether a capability can operate over existing primitives, before modeling it as a new one.",
    notEntities: [
      ["Search", "doesn't automatically need a Search entity."],
      ["Upload", "doesn't automatically need another knowledge model."],
      ["Caching", "doesn't automatically need a Cache entity."],
    ],
  },
  {
    n: "09",
    title: "Ownership Must Be Explicit",
    body: "Every responsibility has an owner. Don't let responsibilities leak across boundaries.",
    owners: [
      ["Presentation", "UI behavior"],
      ["Application", "Orchestration"],
      ["Domain", "Business meaning / rules"],
      ["Data", "Persistence"],
      ["Infrastructure", "External systems"],
    ],
  },
  {
    n: "10",
    title: "Testing Is Part of Engineering",
    body: "A feature isn't complete because the implementation exists. The appropriate behavior must be verified through unit, integration, API, or E2E tests, depending on the feature boundary.",
  },
  {
    n: "11",
    title: "Review the Engineering, Not Personal Preference",
    body: 'Reviews should be based on requirements, architecture, correctness, security, data integrity, maintainability, and testing — not "I would have written it differently."',
  },
  {
    n: "12",
    title: "AI Must Not Pretend",
    body: "Evidence over assumption, always.",
  },
];

const neverClaims = [
  "tests passed when they weren't run",
  "an integration works when it wasn't verified",
  "a requirement exists when it wasn't specified",
  "a file was changed when it wasn't",
  "an architecture decision was approved when it wasn't",
];

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1040px] items-center justify-between px-6">
          <div className="flex items-center gap-2.5 text-[15px] font-bold tracking-tight">
            <span className="h-2 w-2 rounded-[2px] bg-primary shadow-[0_0_12px_var(--primary)]" />
            AICraft
          </div>
          <div className="flex gap-7 text-sm">
            <a href="#loop" className="font-medium text-muted-foreground hover:text-foreground">
              The Loop
            </a>
            <a href="#philosophy" className="font-medium text-muted-foreground hover:text-foreground">
              Philosophy
            </a>
            <a href="#never" className="font-medium text-muted-foreground hover:text-foreground">
              Ground Rules
            </a>
            <a href="#install" className="font-medium text-primary hover:text-primary/80">
              Install
            </a>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden border-b border-border/70 px-6 py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-28 left-[8%] h-72 w-72 rounded-full bg-primary/25 blur-[80px]" />
          <div className="absolute top-4 right-[6%] h-56 w-56 rounded-full bg-primary/20 blur-[80px]" />
        </div>
        <div className="mx-auto max-w-[880px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary">
            ● AI Engineering Discipline
          </div>
          <h1 className="mb-5 text-[2.4rem] leading-[1.08] font-bold tracking-tight md:text-6xl">
            Teach AI to work
            <br />
            like an{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              experienced
            </span>
            <br />
            engineering team.
          </h1>
          <p className="mb-9 max-w-[620px] text-lg text-muted-foreground md:text-xl">
            AI can already write code. AICraft is the discipline that makes it write code that
            belongs — in your architecture, your conventions, your codebase.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#install"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 hover:-translate-y-0.5"
            >
              Install the Skill
            </a>
            <a
              href="#loop"
              className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold transition hover:border-muted-foreground hover:-translate-y-0.5"
            >
              See the Loop ↓
            </a>
          </div>
        </div>
      </header>

      <section id="problem" className="border-b border-border/70 px-6 py-20">
        <div className="mx-auto max-w-[880px]">
          <Reveal as="p" className="mb-3 font-mono text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            The Problem
          </Reveal>
          <Reveal as="h2" className="mb-4 text-3xl font-bold tracking-tight">
            Writing code isn't the hard part anymore.
          </Reveal>
          <Reveal as="p" className="mb-10 max-w-[640px] text-[1.05rem] text-muted-foreground">
            AI can write code. The hard part is making AI write code that belongs in an existing
            codebase — matching its style, respecting its boundaries, and not quietly making it
            worse.
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[10px] border border-border/70 bg-card p-5 transition hover:border-muted-foreground hover:-translate-y-0.5">
              <div className="mb-1.5 font-mono text-xs text-muted-foreground">WITHOUT DISCIPLINE</div>
              <p className="text-muted-foreground">
                Agents invent new patterns next to the old ones, bolt on abstractions nobody
                asked for, and claim things work without checking.
              </p>
            </div>
            <div className="rounded-[10px] border border-primary/40 bg-primary/10 p-5 transition hover:border-primary hover:-translate-y-0.5">
              <div className="mb-1.5 font-mono text-xs text-muted-foreground">WITH AICRAFT</div>
              <p>
                Agents learn the codebase first, decide before coding, ship the smallest correct
                change, and verify before claiming done.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="loop" className="border-b border-border/70 px-6 py-20">
        <div className="mx-auto max-w-[1040px]">
          <Reveal as="p" className="mb-3 font-mono text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            The AICraft Loop
          </Reveal>
          <Reveal as="h2" className="mb-4 text-3xl font-bold tracking-tight">
            Nine stages, one discipline.
          </Reveal>
          <Reveal as="p" className="mb-14 max-w-[640px] text-[1.05rem] text-muted-foreground">
            Every change — from a one-line fix to a new feature — moves through the same loop.
            Hover a stage to see it built. No stage is optional.
          </Reveal>
          <Reveal>
            <LoopStackInteractor />
          </Reveal>
          <Reveal as="p" className="mt-10 text-center font-mono text-xs text-muted-foreground">
            ↻ back to LEARN on the next change
          </Reveal>
        </div>
      </section>

      <section id="philosophy" className="border-b border-border/70 px-6 py-20">
        <div className="mx-auto max-w-[880px]">
          <Reveal as="p" className="mb-3 font-mono text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            The Philosophy
          </Reveal>
          <Reveal as="h2" className="mb-4 text-3xl font-bold tracking-tight">
            Twelve principles.
          </Reveal>
          <Reveal as="p" className="mb-6 max-w-[640px] text-[1.05rem] text-muted-foreground">
            Together they form the operating discipline AICraft gives to coding agents.
          </Reveal>

          {principles.map((p) => (
            <Reveal
              as="div"
              key={p.n}
              className="grid grid-cols-[64px_1fr] gap-6 border-t border-border/70 py-8 first:border-t-0"
            >
              <div className="font-mono text-2xl font-bold leading-none text-border">{p.n}</div>
              <div>
                <h3 className="mb-2.5 text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mb-3 text-muted-foreground">{p.body}</p>
                {p.quote && (
                  <p className="mt-3 border-l-2 border-primary/50 pl-3 font-mono text-sm text-primary">
                    {p.quote}
                  </p>
                )}
                {p.flow && (
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5 rounded-lg border border-border/70 bg-card px-4 py-3.5 font-mono text-sm text-muted-foreground">
                    {p.flow.map((step, i) => (
                      <span key={step} className="flex items-center gap-1.5">
                        <span className={step === "Request" || step === "Response" ? "text-primary" : ""}>
                          {step}
                        </span>
                        {i < p.flow!.length - 1 && <span className="text-muted-foreground/50">→</span>}
                      </span>
                    ))}
                  </div>
                )}
                {p.notEntities && (
                  <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {p.notEntities.map(([term, rest]) => (
                      <div
                        key={term}
                        className="flex items-baseline gap-2.5 rounded-lg border border-border/70 bg-card px-3.5 py-2.5 text-sm text-muted-foreground"
                      >
                        <span className="font-mono text-xs text-destructive">✗</span>
                        <span>
                          <b className="font-semibold text-foreground">{term}</b> {rest}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {p.owners && (
                  <div className="mt-3.5 overflow-hidden rounded-lg border border-border/70">
                    {p.owners.map(([role, desc]) => (
                      <div
                        key={role}
                        className="grid grid-cols-[180px_1fr] border-t border-border/70 text-sm first:border-t-0"
                      >
                        <div className="bg-card px-4 py-3 font-mono text-primary">{role}</div>
                        <div className="px-4 py-3 text-muted-foreground">{desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="never" className="border-b border-border/70 px-6 py-20">
        <div className="mx-auto max-w-[880px]">
          <Reveal as="p" className="mb-3 font-mono text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            Ground Rules
          </Reveal>
          <Reveal as="h2" className="mb-5 text-3xl font-bold tracking-tight">
            The AI must never claim…
          </Reveal>
          <Reveal as="ul" className="grid gap-2.5">
            {neverClaims.map((claim) => (
              <li
                key={claim}
                className="flex items-start gap-3 rounded-lg border border-border/70 bg-card px-4 py-3.5 text-[14.5px] text-muted-foreground transition hover:border-primary/50 hover:translate-x-0.5"
              >
                <span className="font-mono font-bold text-destructive">✗</span>
                {claim}
              </li>
            ))}
          </Reveal>
          <Reveal as="div" className="mt-6 text-center font-mono text-sm tracking-wide text-primary">
            Evidence over assumption.
          </Reveal>
        </div>
      </section>

      <section id="install" className="border-b border-border/70 px-6 py-20">
        <div className="mx-auto max-w-[880px]">
          <Reveal as="p" className="mb-3 font-mono text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            Get It
          </Reveal>
          <Reveal as="h2" className="mb-4 text-3xl font-bold tracking-tight">
            Install the skill.
          </Reveal>
          <Reveal as="p" className="mb-10 max-w-[640px] text-[1.05rem] text-muted-foreground">
            AICraft ships as a plain package of Markdown — a <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em]">SKILL.md</code> entry
            point plus nine focused guides under <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em]">skill/skills/</code>. No
            runtime, no dependencies. Pull it straight from this repo.
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <h3 className="mb-1 text-lg font-bold tracking-tight">Claude Code</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Copies the package into <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em]">~/.claude/skills/aicraft/</code>,
                where Claude Code's skill picker finds it automatically.
              </p>
              <CopyBlock code={claudeCodeInstall} />
            </Reveal>

            <Reveal>
              <h3 className="mb-1 text-lg font-bold tracking-tight">Codex</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Codex has no skill picker, so AICraft folds into{" "}
                <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em]">AGENTS.md</code> as
                standing instructions instead — global or per-project.
              </p>
              <CopyBlock code={codexInstall} />
            </Reveal>
          </div>

          <Reveal as="p" className="mt-8 text-sm text-muted-foreground">
            Prefer to read it first?{" "}
            <a
              href={`${REPO.replace(/\.git$/, "")}/tree/main/skill`}
              className="text-primary hover:underline"
            >
              Browse the skill source on GitHub ↗
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="px-6 py-16 text-center">
        <Reveal className="flex items-center justify-center gap-2.5 text-[15px] font-bold tracking-tight">
          <span className="h-2 w-2 rounded-[2px] bg-primary shadow-[0_0_12px_var(--primary)]" />
          AICraft
        </Reveal>
        <p className="mt-4 text-sm text-muted-foreground">
          An AI engineering discipline for coding agents that work in real codebases.
        </p>
        <div className="mt-4 flex justify-center gap-5 text-sm">
          <a href="#loop" className="text-primary hover:underline">The Loop</a>
          <a href="#philosophy" className="text-primary hover:underline">Philosophy</a>
          <a href="#never" className="text-primary hover:underline">Ground Rules</a>
          <a href="#install" className="text-primary hover:underline">Install</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
