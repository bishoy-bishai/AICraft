import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stage {
  num: string;
  name: string;
  sub: string;
  clipId: string;
  detail: string;
}

const STAGES: Stage[] = [
  { num: "01", name: "Learn", sub: "Codebase & style", clipId: "mac-clip-learn", detail: "Inspect 3–5 representative modules. Build style profile." },
  { num: "02", name: "Understand", sub: "Requirements & architecture", clipId: "mac-clip-understand", detail: "Read Constitution, ADRs, and domain boundaries." },
  { num: "03", name: "Impact", sub: "What changes", clipId: "mac-clip-impact", detail: "Map boundaries: API, domain, persistence, tests." },
  { num: "04", name: "Decide", sub: "Simplest design", clipId: "mac-clip-decide", detail: "Decide before coding: capabilities are not entities." },
  { num: "05", name: "Plan", sub: "Small tasks", clipId: "mac-clip-plan", detail: "Create bounded atomic tasks with acceptance criteria." },
  { num: "06", name: "Implement", sub: "Match style", clipId: "mac-clip-implement", detail: "Smallest correct change. No unsolicited refactoring." },
  { num: "07", name: "Verify", sub: "Tests / E2E", clipId: "mac-clip-verify", detail: "Evidentiary proof: compiler, linter, test runner." },
  { num: "08", name: "Review", sub: "Engineering, not preference", clipId: "mac-clip-review", detail: "8-stage priority order: Architecture down to Docs." },
  { num: "09", name: "Simplify", sub: "Remove noise", clipId: "mac-clip-simplify", detail: "Eliminate unused abstractions and speculative code." },
];

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Physical Skeuomorphic Materials */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #0f2b20 0%, #06120e 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(0, 255, 160, 0.1);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .mac-bezel {
      background: linear-gradient(180deg, #23272d 0%, #15181d 100%);
      box-shadow: 
          inset 0 0 0 1px #484f58, 
          inset 0 0 0 6px #0d1117, 
          0 45px 90px -15px rgba(0,0,0,0.95),
          0 20px 30px -5px rgba(0,0,0,0.85);
      transform-style: preserve-3d;
  }

  .mac-chin {
      background: linear-gradient(180deg, #1b1f24 0%, #0d1117 100%);
      box-shadow: 
          0 4px 8px rgba(0,0,0,0.8),
          inset 0 1px 1px rgba(255,255,255,0.1);
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 50%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  brandName = "AICRAFT",
  tagline1 = "Understand first.",
  tagline2 = "Build second.",
  cardHeading = "Interactive Execution Loop",
  cardDescription = (
    <>
      <span className="text-white font-semibold">Hover each stage</span> to inspect the state machine and real-time execution transformation. No stage is optional.
    </>
  ),
  metricValue = 100,
  metricLabel = "% Evidence Verified",
  ctaHeading = "Adopt Senior AI Discipline.",
  ctaDescription = "Install the AICraft skill into Antigravity, Claude Code, Cursor, Windsurf, or Codex in under 60 seconds.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const brickTlRef = useRef<gsap.core.Timeline | null>(null);

  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const activeStage = STAGES[activeStageIdx];

  // Brick Animation Loop for the Active Stage
  const createBrickLoop = (index: number) => {
    const stage = STAGES[index];
    const selector = `#${stage.clipId} .brick`;

    if (brickTlRef.current) brickTlRef.current.kill();

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

    brickTlRef.current = tl;
  };

  const handleStageHover = (index: number) => {
    if (index === activeStageIdx) return;
    setActiveStageIdx(index);
    createBrickLoop(index);
  };

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    createBrickLoop(0);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 10,
            rotationX: -yVal * 10,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      if (brickTlRef.current) brickTlRef.current.kill();
    };
  }, []);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".mac-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 45, rotationY: -20, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".mac-widget", { y: 30, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 80, autoAlpha: 0, scale: 0.7, rotationZ: -8 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#install" className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group font-semibold text-sm">
            <span>Install AICraft Skill</span>
          </a>
          <a href="#constitution" className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group font-semibold text-sm">
            <span>Read 15 Rules</span>
          </a>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Emerald / Dark Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-10 flex flex-col justify-evenly lg:grid lg:grid-cols-12 items-center lg:gap-6 z-10 py-6 lg:py-0">
            
            {/* 1. LEFT COLUMN: HEADING & ACTIVE STAGE SUMMARY */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 lg:col-span-3 flex flex-col justify-center text-center lg:text-left z-20 w-full px-2 lg:px-0">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">
                9-Stage State Machine
              </span>
              <h3 className="text-white text-2xl md:text-3xl lg:text-3.5xl font-bold mb-2 tracking-tight">
                {cardHeading}
              </h3>
              <p className="text-emerald-100/70 text-xs md:text-sm font-normal leading-relaxed mb-4">
                {cardDescription}
              </p>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-left">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
                  <span>STAGE {activeStage.num}</span>
                  <span className="text-white uppercase">{activeStage.name}</span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-300 font-sans">
                  {activeStage.detail}
                </p>
              </div>
            </div>

            {/* 2. CENTER: MACBOOK SCREEN WITH EMBEDDED 9-STAGE INSPECTOR */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 lg:col-span-6 relative w-full h-[340px] sm:h-[400px] md:h-[450px] flex items-center justify-center z-10" style={{ perspective: "1200px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.70] sm:scale-85 md:scale-95 lg:scale-100">
                
                {/* MacBook Hardware Enclosure */}
                <div
                  ref={mockupRef}
                  className="relative w-[520px] sm:w-[600px] md:w-[640px] h-[330px] sm:h-[370px] md:h-[410px] rounded-[18px] mac-bezel flex flex-col will-change-transform transform-style-3d border border-white/20"
                >
                  {/* Top Camera Notch */}
                  <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[60px] h-[14px] bg-[#0d1117] rounded-b-lg z-50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1b222c] border border-white/10 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Inner Screen Display */}
                  <div className="absolute inset-[6px] bg-[#080d12] rounded-[12px] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10 flex flex-col font-mono text-left">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* macOS Window Title Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#0d131a] px-3.5 py-2 z-20">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                        <span className="ml-2 text-[10px] text-zinc-400 font-sans font-medium">
                          AICraft Inspector — [{activeStage.num} {activeStage.name.toUpperCase()}]
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[9px] text-zinc-500">
                        <span className="rounded bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 font-bold">STATE MACHINE LIVE</span>
                        <span>main ⚡</span>
                      </div>
                    </div>

                    {/* Mac IDE Workspace Layout */}
                    <div className="grid grid-cols-12 flex-1 overflow-hidden text-[10px]">
                      
                      {/* Left: 9 Stages Nav (5 cols) */}
                      <div className="col-span-5 border-r border-white/10 bg-[#070b10] p-2 overflow-y-auto space-y-0.5">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block px-1.5 py-0.5">
                          Stages (Hover to Switch)
                        </span>
                        {STAGES.map((s, idx) => {
                          const isSelected = activeStageIdx === idx;
                          return (
                            <div
                              key={s.num}
                              onMouseEnter={() => handleStageHover(idx)}
                              className={cn(
                                "flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition text-[9.5px]",
                                isSelected
                                  ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                              )}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className={isSelected ? "text-emerald-400 font-bold" : "text-zinc-600"}>
                                  {s.num}
                                </span>
                                <span className="truncate">{s.name}</span>
                              </div>
                              <span className="text-[8px] font-mono opacity-70 truncate max-w-[65px]">
                                {s.sub}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: SVG Animated Brick Loop + Live State Machine (7 cols) */}
                      <div className="col-span-7 p-3 flex flex-col justify-between bg-[#080d12] relative overflow-hidden">
                        
                        {/* SVG ClipPath Defs for all 9 stages */}
                        <svg className="absolute w-0 h-0" aria-hidden="true">
                          <defs>
                            {STAGES.map((stage, i) => {
                              const cols = 4 + (i % 3);
                              const w = 240 / cols;
                              const h = 180 / (7 - (i % 2));
                              const rows = Math.ceil(180 / h);
                              const bricks: { row: number; col: number }[] = [];
                              for (let row = 0; row < rows; row++) {
                                const offset = row % 2 === 0 ? 0 : w / 2;
                                for (let col = -1; col < cols + 1; col++) {
                                  const x = col * w + offset;
                                  if (x < -w || x > 240) continue;
                                  if ((row + col + i * 2) % 5 === 0) continue;
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
                                        width={Math.max(w - 4, 6)}
                                        height={Math.max(h - 4, 6)}
                                        rx="2"
                                      />
                                    );
                                  })}
                                </clipPath>
                              );
                            })}
                            <linearGradient id="mac-loop-fill" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[9px] text-zinc-400 pb-1 border-b border-white/5">
                            <span className="text-emerald-400 font-bold">● Active Stage: {activeStage.num} {activeStage.name}</span>
                            <span className="text-zinc-500 font-mono">{activeStage.sub}</span>
                          </div>

                          {/* Animated Brick Transformation Display */}
                          <div className="relative w-full h-[120px] rounded-lg bg-[#05080c] border border-emerald-500/20 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-500/5 blur-xl pointer-events-none" />
                            <svg viewBox="0 0 240 180" className="w-[180px] h-[110px] z-10">
                              <g clipPath={`url(#${activeStage.clipId})`}>
                                <rect x="0" y="0" width="240" height="180" fill="url(#mac-loop-fill)" />
                              </g>
                              <rect x="2" y="2" width="236" height="176" rx="4" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
                            </svg>
                            <div className="absolute bottom-1 text-[8.5px] font-mono text-emerald-300/80">
                              {activeStage.num} · {activeStage.name.toUpperCase()} STATE
                            </div>
                          </div>

                          {/* Live Heuristic Box */}
                          <div className="mac-widget rounded-md bg-[#0d141d] border border-emerald-500/30 p-1.5 flex items-center justify-between text-[8.5px]">
                            <div className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-zinc-300 font-sans">{activeStage.detail}</span>
                            </div>
                            <span className="text-emerald-400 font-bold">[READY]</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-1.5 text-[8px] text-zinc-500">
                          <span>AICraft Loop State Machine</span>
                          <span>↻ back to LEARN on next change</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MacBook Bottom Chassis Lip & Hinge Indent */}
                  <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[560px] sm:w-[640px] md:w-[680px] h-[10px] mac-chin rounded-b-xl border-t border-white/15 flex items-center justify-center">
                    <div className="w-[80px] h-[3px] bg-black/70 rounded-full" />
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-2 md:top-4 left-[-10px] md:left-[-35px] floating-ui-badge rounded-xl p-2.5 md:p-3 items-center gap-2.5 z-30">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30">
                    <span className="text-sm">🛡️</span>
                  </div>
                  <div>
                    <p className="text-white text-[11px] font-bold tracking-tight">15 Rules Enforced</p>
                    <p className="text-emerald-200/50 text-[9px] font-medium">Constitution Active</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-2 md:bottom-4 right-[-10px] md:right-[-35px] floating-ui-badge rounded-xl p-2.5 md:p-3 items-center gap-2.5 z-30">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-b from-primary/20 to-emerald-900/10 flex items-center justify-center border border-primary/30">
                    <span className="text-sm">⚡</span>
                  </div>
                  <div>
                    <p className="text-white text-[11px] font-bold tracking-tight">Zero Hallucination</p>
                    <p className="text-emerald-200/50 text-[9px] font-medium">Evidentiary Proof</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. RIGHT COLUMN: BRAND & VERIFIED GAUGE */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 lg:col-span-3 flex flex-col items-center lg:items-end justify-center z-20 w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-card-silver-matte">
                {brandName}
              </h2>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold">100% Verified Evidence</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CinematicHero;
