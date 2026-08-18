import { Reveal } from "@/components/reveal";
import { BookOpen, ExternalLink, Sparkles, Award, Terminal } from "lucide-react";
import creatorImg from "@/assets/creator.jpg";

export function CreatorSection() {
  return (
    <section id="creator" className="border-b border-border/70 px-6 py-24 relative overflow-hidden bg-muted/[0.12]">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1000px]">
        <div className="text-center mb-16">
          <Reveal as="div" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-xs text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Architect Behind AICraft</span>
          </Reveal>
          <Reveal as="h2" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Meet the Creator
          </Reveal>
          <Reveal as="p" className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Pioneering engineering discipline for AI coding agents and sovereign AI operating systems.
          </Reveal>
        </div>

        <Reveal>
          <div className="relative rounded-3xl border border-border/80 bg-card/90 p-8 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Photo Column (5 cols) */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-emerald-400 to-teal-200 opacity-60 blur-md group-hover:opacity-100 transition duration-500" />
                  <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-zinc-900">
                    <img
                      src={creatorImg}
                      alt="Bishoy Bishai"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                  Bishoy Bishai
                </h3>
                <p className="text-xs sm:text-sm font-mono text-primary font-semibold mt-1 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5" /> AI Systems Architect & Engineer
                </p>

                {/* Social Links */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/bishoybishai/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-card shadow-sm"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>

                  <a
                    href="https://medium.com/@bishoy-bishai"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-emerald-400 hover:text-emerald-400 hover:bg-card shadow-sm"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Medium</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>

                  <a
                    href="https://github.com/bishoy-bishai"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-foreground hover:bg-card shadow-sm"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Bio & Vision Column (7 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-mono text-primary font-bold">
                    <Award className="h-3.5 w-3.5" /> Founder & Engineering Lead
                  </div>

                  <p>
                    <strong className="text-foreground">Bishoy Bishai</strong> designed the <strong className="text-primary">AICraft</strong> engineering discipline to solve the most critical problem in agentic software development: <em>making AI coding assistants behave like senior software engineers who respect domain boundaries, existing architecture, and evidence-based verification.</em>
                  </p>

                  <p>
                    Through deep architectural explorations and production systems engineering across Bishoy OS, he establishes standard operating procedures, non-negotiable constitutions, and deterministic workflows that prevent AI hallucination, speculative refactoring, and domain decay.
                  </p>
                </div>

                {/* Creator Quote Card */}
                <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 relative">
                  <span className="font-serif text-3xl text-primary/40 leading-none select-none absolute top-3 left-4">“</span>
                  <p className="italic text-xs sm:text-sm text-foreground/90 pl-6 leading-relaxed">
                    AI can already write code. The missing layer is engineering discipline — understanding the system before touching it, respecting architectural invariants, and proving every single claim with executable evidence.
                  </p>
                  <p className="mt-3 text-right text-[11px] font-mono text-primary font-bold">
                    — Bishoy Bishai
                  </p>
                </div>

                {/* Highlights tags */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-[11px] font-mono">
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 text-center">
                    <span className="text-foreground font-bold block">15 Rules</span>
                    <span className="text-muted-foreground text-[10px]">AI Constitution</span>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 text-center">
                    <span className="text-foreground font-bold block">7 Phases</span>
                    <span className="text-muted-foreground text-[10px]">Execution Standard</span>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 text-center col-span-2 sm:col-span-1">
                    <span className="text-foreground font-bold block">Multi-Agent</span>
                    <span className="text-muted-foreground text-[10px]">Cross-IDE Protocol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
