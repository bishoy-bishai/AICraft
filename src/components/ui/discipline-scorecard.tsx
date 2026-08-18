import { useState } from "react";
import { Award, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentQuestion {
  id: string;
  question: string;
  description: string;
  points: number;
}

const QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q1",
    question: "Does your AI agent inspect 3–5 representative files before writing code?",
    description: "Builds an internal style profile to match naming, typing, error handling, and folder structure.",
    points: 20,
  },
  {
    id: "q2",
    question: "Are AI changes strictly bounded to atomic tasks without unsolicited refactoring?",
    description: "Ships the smallest correct change and avoids rewriting unrelated code or changing style.",
    points: 15,
  },
  {
    id: "q3",
    question: "Does the AI verify all test runs with real terminal evidence before claiming success?",
    description: "Never claims 'all tests passed' without executing the test runner and verifying output.",
    points: 20,
  },
  {
    id: "q4",
    question: "Do you prevent capabilities (search, cache, upload) from turning into unneeded database entities?",
    description: "Reuses existing primitives before introducing new tables, services, or abstractions.",
    points: 15,
  },
  {
    id: "q5",
    question: "Does your AI follow a mandatory pre-implementation gate and stop when unsure?",
    description: "Stops and asks clarifying questions if requirements conflict with architecture or domain rules.",
    points: 15,
  },
  {
    id: "q6",
    question: "Does your AI automatically sync living documentation and ADRs on behavior changes?",
    description: "Treats documentation as the single living source of truth for the entire system.",
    points: 15,
  },
];

export function DisciplineScorecard() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    q1: true,
    q2: false,
    q3: true,
    q4: false,
    q5: true,
    q6: false,
  });

  const toggleAnswer = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = QUESTIONS.reduce((sum, q) => (answers[q.id] ? sum + q.points : sum), 0);

  let tier = {
    title: "Level 1: Chaos Prompter",
    color: "text-destructive",
    badge: "border-destructive/40 bg-destructive/15 text-destructive",
    desc: "Your AI is generating speculative code, hallucinating test results, and creating architectural drift. Install AICraft immediately.",
  };

  if (totalScore >= 85) {
    tier = {
      title: "Level 4: AICraft Master",
      color: "text-primary",
      badge: "border-primary/40 bg-primary/20 text-primary",
      desc: "Outstanding engineering maturity. Your AI agents operate with senior-level discipline, zero-hallucination verification, and strict layer respect.",
    };
  } else if (totalScore >= 60) {
    tier = {
      title: "Level 3: Disciplined Engineer",
      color: "text-primary",
      badge: "border-primary/30 bg-primary/10 text-primary",
      desc: "Good discipline foundations in place. Adopt AICraft's 7-Phase Workflow and Playbook to eliminate remaining edge cases.",
    };
  } else if (totalScore >= 35) {
    tier = {
      title: "Level 2: Ad-Hoc Prompter",
      color: "text-amber-500",
      badge: "border-amber-500/40 bg-amber-500/15 text-amber-500",
      desc: "Inconsistent discipline. AI frequently leaks layer boundaries or makes unverified claims. Deploy AICraft Constitution to enforce standards.",
    };
  }

  return (
    <div className="space-y-8">
      {/* Score Summary Banner */}
      <div className="flex flex-col gap-6 rounded-2xl border border-border/80 bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-primary" /> AI Engineering Maturity Audit
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Your Discipline Score: <span className={tier.color}>{totalScore}%</span>
          </h3>
          <p className="max-w-xl text-xs text-muted-foreground leading-relaxed">
            {tier.desc}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-muted/30 p-6 text-center md:min-w-[220px]">
          <span className="font-mono text-xs text-muted-foreground uppercase">Maturity Rating</span>
          <span className={cn("mt-2 rounded-full px-3 py-1 font-mono text-xs font-bold", tier.badge)}>
            {tier.title}
          </span>
          <div className="mt-3 w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${totalScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Questionnaire */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {QUESTIONS.map((q) => {
          const isChecked = answers[q.id];
          return (
            <div
              key={q.id}
              onClick={() => toggleAnswer(q.id)}
              className={cn(
                "flex cursor-pointer items-start justify-between rounded-xl border p-4.5 transition-all duration-200",
                isChecked
                  ? "border-primary/40 bg-primary/[0.04] shadow-sm"
                  : "border-border/70 bg-card hover:border-border"
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <div>
                  <h4 className="text-xs font-bold text-foreground leading-snug">
                    {q.question}
                  </h4>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    {q.description}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] font-bold text-primary shrink-0 ml-2">
                +{q.points} pts
              </span>
            </div>
          );
        })}
      </div>

      {/* Actionable CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <span>Elevate your AI coding workflow to Level 4 with the complete AICraft skill.</span>
        </div>
        <a
          href="#install"
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 font-semibold text-primary-foreground text-xs hover:brightness-110 shrink-0"
        >
          <span>Install AICraft</span>
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
