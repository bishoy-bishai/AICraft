import { cn } from "@/lib/utils";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

interface Stage {
  num: string;
  name: string;
  sub: string;
  clipId: string;
}

const defaultStages: Stage[] = [
  { num: "01", name: "Learn", sub: "Codebase & style", clipId: "clip-learn" },
  { num: "02", name: "Understand", sub: "Requirements & architecture", clipId: "clip-understand" },
  { num: "03", name: "Impact", sub: "What changes", clipId: "clip-impact" },
  { num: "04", name: "Decide", sub: "Simplest design", clipId: "clip-decide" },
  { num: "05", name: "Plan", sub: "Small tasks", clipId: "clip-plan" },
  { num: "06", name: "Implement", sub: "Match style", clipId: "clip-implement" },
  { num: "07", name: "Verify", sub: "Tests / E2E", clipId: "clip-verify" },
  { num: "08", name: "Review", sub: "Engineering, not preference", clipId: "clip-review" },
  { num: "09", name: "Simplify", sub: "Remove noise", clipId: "clip-simplify" },
];

export const LoopStackInteractor = ({
  stages = defaultStages,
  className,
}: {
  stages?: Stage[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const stage = stages[index];
    const selector = `#${stage.clipId} .brick`;

    if (masterTl.current) masterTl.current.kill();

    gsap.set(selector, { scale: 0, transformOrigin: "50% 100%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    tl.to(selector, {
      scale: 1,
      duration: 0.7,
      stagger: { amount: 0.35, from: "start" },
      ease: "back.out(1.6)",
    })
      .to(selector, {
        y: -4,
        duration: 1.2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      .to(selector, {
        scale: 0,
        duration: 0.5,
        stagger: { amount: 0.25, from: "end" },
        ease: "expo.in",
      });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  const active = stages[activeIndex];

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col md:flex-row items-center justify-between w-full gap-16 md:gap-8",
        className
      )}
    >
      {/* LEFT: STAGE LIST */}
      <nav className="z-10 w-full md:w-[46%]">
        <ul className="flex flex-col">
          {stages.map((stage, index) => (
            <li
              key={stage.num}
              onMouseEnter={() => handleHover(index)}
              className="group cursor-pointer border-t border-border first:border-t-0 py-3.5"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={cn(
                    "font-mono text-xs tracking-wider transition-colors duration-300 shrink-0 w-6",
                    activeIndex === index ? "text-primary" : "text-muted-foreground/50"
                  )}
                >
                  {stage.num}
                </span>
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "text-xl md:text-2xl font-bold tracking-tight transition-all duration-500",
                      activeIndex === index
                        ? "text-foreground translate-x-1"
                        : "text-muted-foreground/60 translate-x-0"
                    )}
                  >
                    {stage.name}
                  </h3>
                  <p
                    className={cn(
                      "text-xs font-mono transition-opacity duration-500",
                      activeIndex === index ? "opacity-100 text-primary" : "opacity-0 h-0"
                    )}
                  >
                    {stage.sub}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT: BRICK WALL BUILT FROM ANIMATED CLIP SHAPES */}
      <div className="relative w-full md:w-[46%] flex justify-center items-center">
        <div className="absolute w-[130%] h-[130%] bg-primary/5 blur-[100px] rounded-full" />

        <svg
          viewBox="0 0 400 460"
          className="w-full max-w-[380px] h-auto z-10"
          aria-label={`Active stage: ${active.name}`}
        >
          <defs>
            {stages.map((stage, i) => {
              const cols = 4 + (i % 3);
              const w = 400 / cols;
              const h = 460 / (9 - (i % 3));
              const rows = Math.ceil(460 / h);
              const bricks: { row: number; col: number }[] = [];
              for (let row = 0; row < rows; row++) {
                const offset = row % 2 === 0 ? 0 : w / 2;
                for (let col = -1; col < cols + 1; col++) {
                  const x = col * w + offset;
                  if (x < -w || x > 400) continue;
                  // skip bricks in a pattern unique to this stage index, like a coursing gap
                  if ((row + col + i * 2) % 7 === 0) continue;
                  bricks.push({ row, col });
                }
              }
              return (
                <clipPath id={stage.clipId} key={stage.clipId}>
                  {bricks.map(({ row, col }) => {
                    const offset = row % 2 === 0 ? 0 : w / 2;
                    return (
                      <rect
                        key={`${row}-${col}`}
                        className="brick"
                        x={col * w + offset}
                        y={row * h}
                        width={Math.max(w - 5, 8)}
                        height={Math.max(h - 5, 8)}
                        rx="3"
                      />
                    );
                  })}
                </clipPath>
              );
            })}
          </defs>

          <linearGradient id="loop-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" className="[stop-color:var(--primary)]" />
            <stop offset="100%" className="[stop-color:var(--foreground)]" stopOpacity="0.55" />
          </linearGradient>

          <g clipPath={`url(#${active.clipId})`}>
            <rect x="0" y="0" width="400" height="460" fill="url(#loop-fill)" />
          </g>

          <rect
            x="4"
            y="4"
            width="392"
            height="452"
            rx="8"
            className="fill-none stroke-border"
            strokeWidth="1.5"
          />
        </svg>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-muted-foreground">
          {active.num} · {active.name.toUpperCase()}
        </div>
      </div>
    </div>
  );
};
