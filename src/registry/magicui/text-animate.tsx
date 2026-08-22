import { useEffect, useMemo, useRef, useState } from "react";

export interface TextAnimateProps {
  children: string;
  animation?: "blurInUp" | "blurInDown";
  by?: "character" | "word";
  once?: boolean;
  className?: string;
  duration?: number;
  stagger?: number;
  trigger?: boolean;
}

export function TextAnimate({
  children,
  animation = "blurInDown",
  by = "character",
  once = true,
  className = "",
  duration = 0.6,
  stagger = 0.04,
  trigger,
}: TextAnimateProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (trigger === true) {
      setShouldAnimate(true);
      return;
    }
    if (trigger === false) {
      setShouldAnimate(false);
      return;
    }
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAnimate(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setShouldAnimate(false);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, trigger]);

  const tokens = useMemo(
    () => (by === "word" ? children.split(" ") : children.split("")),
    [children, by],
  );

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={children}>
      {tokens.map((token, i) => (
        <span
          key={`${token}-${i}`}
          className="text-animate-char"
          data-animate={animation}
          style={{
            "--text-animate-index": i,
            "--text-animate-duration": `${duration}s`,
            "--text-animate-stagger": `${stagger}s`,
            animationName: shouldAnimate
              ? animation === "blurInUp"
                ? "blur-in-up"
                : "blur-in-down"
              : "none",
            opacity: shouldAnimate ? 1 : 0,
          } as React.CSSProperties}
        >
          {token === " " ? "\u00A0" : token}
          {by === "word" && i < tokens.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

