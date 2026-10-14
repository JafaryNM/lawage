import { Fragment, useEffect, useMemo, useRef, useState } from "react";

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

  // Words, each split into tokens (characters, or the whole word); the index keeps the stagger running across words
  const words = useMemo(() => {
    let index = 0;
    return children.split(" ").map((word) =>
      (by === "word" ? [word] : word.split("")).map((token) => ({ token, index: index++ })),
    );
  }, [children, by]);

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={children}>
      {words.map((tokens, w) => (
        <Fragment key={w}>
          {/* Keep each word together so lines only wrap between words */}
          <span className="inline-block whitespace-nowrap">
            {tokens.map(({ token, index }) => (
              <span
                key={index}
                className="text-animate-char"
                data-animate={animation}
                data-trigger={shouldAnimate ? "true" : "false"}
                style={{
                  "--text-animate-index": index,
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
                {token}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

