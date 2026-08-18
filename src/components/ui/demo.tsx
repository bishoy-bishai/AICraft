import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Sparkles, Terminal, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-primary shadow-[0_0_15px_-3px_var(--primary)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Engineering Discipline for Coding Agents</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.08] text-foreground">
              Teach AI to work like a <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
                senior engineering team.
              </span>
            </h1>
            <p className="mx-auto max-w-[720px] text-sm text-muted-foreground sm:text-base md:text-lg">
              The unified engineering discipline for <strong>Antigravity</strong>, <strong>Claude Code</strong>, <strong>Cursor</strong>, <strong>Windsurf</strong>, and <strong>OpenAI Codex</strong>.
            </p>
          </div>
        }
      >
        {/* Inside the 3D Perspective Card: Interactive AICraft IDE & Agent Terminal Mock */}
        <div className="flex flex-col h-full w-full rounded-xl bg-[#0d1117] border border-white/10 text-left overflow-hidden shadow-2xl font-mono">
          {/* Window Title Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-zinc-400 font-sans font-medium flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-primary" />
                AICraft — Active Session: Phase 04 [Implement]
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <span className="rounded bg-primary/20 text-primary px-2 py-0.5 font-bold">15 RULES ACTIVE</span>
              <span>branch: main</span>
            </div>
          </div>

          {/* IDE Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden text-xs">
            {/* Sidebar / Reading Order */}
            <div className="hidden md:flex md:col-span-3 flex-col border-r border-white/10 bg-[#0d1117]/80 p-3 text-[11px] space-y-3">
              <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Pillars Loaded</span>
              <div className="space-y-1.5 text-zinc-300">
                <div className="flex items-center gap-1.5 text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>01_constitution.md</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>02_workflow.md</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>03_playbook.md</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>04_prompt_library.md</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Pre-Flight Gate</span>
                <div className="mt-2 space-y-1 text-[10px]">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Understand Problem [PASS]
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Architecture ADR [PASS]
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Domain Invariants [PASS]
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Bounded Task [PASS]
                  </div>
                </div>
              </div>
            </div>

            {/* Main Code & Agent Execution Terminal */}
            <div className="md:col-span-9 p-4 flex flex-col justify-between overflow-y-auto space-y-3 bg-[#0d1117]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                  <span className="text-primary font-bold">● AI Agent:</span>
                  <span>Executing 7-Phase Workflow (Step 5 of 7: Validate)</span>
                </div>

                <div className="rounded-lg bg-black/60 border border-white/10 p-3 text-zinc-300 font-mono text-[11.5px] leading-relaxed space-y-1.5">
                  <div className="text-zinc-500">// AICraft Mandatory Rule 06: Reuse before creating</div>
                  <div className="text-zinc-500">// Rule 07: Smallest correct change — no unsolicited refactoring</div>
                  <div className="text-emerald-400">
                    <span className="text-purple-400">export class</span> <span className="text-yellow-300">OrderApplicationService</span> &#123;
                  </div>
                  <div className="pl-4 text-zinc-300">
                    <span className="text-purple-400">async</span> cancelOrder(orderId: <span className="text-blue-300">OrderId</span>, reason: <span className="text-blue-300">string</span>) &#123;
                  </div>
                  <div className="pl-8 text-zinc-400">
                    const order = await this.orderRepo.findById(orderId);
                  </div>
                  <div className="pl-8 text-emerald-300">
                    order.assertCanBeCancelled(); <span className="text-zinc-500">// Domain invariant preserved</span>
                  </div>
                  <div className="pl-8 text-zinc-400">
                    await this.eventBus.publish(new OrderCancelledEvent(order.id, reason));
                  </div>
                  <div className="pl-4 text-zinc-300">&#125;</div>
                  <div className="text-emerald-400">&#125;</div>
                </div>

                <div className="rounded-lg bg-[#161b22] border border-primary/30 p-2.5 text-[11px] text-zinc-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 font-semibold">$ npm run test:boundaries</span>
                  </div>
                  <span className="text-primary font-bold">14 passed, 0 failed [100% EVIDENTIARY]</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-zinc-500">
                <span>Constitution: Understand first. Build second.</span>
                <span>Zero Hallucination Standard</span>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
