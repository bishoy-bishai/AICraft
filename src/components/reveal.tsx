import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import type { ElementType, ReactNode } from "react";

export function Reveal({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className
      )}
    >
      {children}
    </Tag>
  );
}
