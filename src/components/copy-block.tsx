import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — user can still select the text manually
    }
  };

  return (
    <div className={cn("relative rounded-lg border border-border/70 bg-[#0b0d10] dark:bg-black/40", className)}>
      <button
        onClick={onCopy}
        aria-label="Copy to clipboard"
        className="absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-300 transition hover:bg-white/10"
      >
        {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-4 pr-20 font-mono text-[12.5px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
