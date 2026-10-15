import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, Handshake, Lightbulb, MessagesSquare, type LucideIcon } from "lucide-react";

// "Our Service Approach" from the firm profile
const APPROACH: { title: string; icon: LucideIcon; text: string }[] = [
  {
    title: "Understand",
    icon: MessagesSquare,
    text: "We begin by understanding your objectives, challenges, and the commercial realities surrounding your matter.",
  },
  {
    title: "Strategize",
    icon: Lightbulb,
    text: "Our team develops practical legal solutions tailored to your specific needs while identifying risks and opportunities.",
  },
  {
    title: "Execute",
    icon: ClipboardCheck,
    text: "We implement agreed strategies efficiently, keeping you informed throughout the process.",
  },
  {
    title: "Partner",
    icon: Handshake,
    text: "Beyond resolving today's legal issues, we aim to become your trusted legal partner for future growth and success.",
  },
];

/** Curved arrow drawn between two steps; `down` flips it to arc underneath */
function CurvedArrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 90 44"
      fill="none"
      className={`h-11 w-[90px] text-gold ${down ? "-scale-y-100" : ""}`}
    >
      <path d="M3 40 C 20 2, 62 -2, 84 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M76 28 L 84 31 L 86 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Our Service Approach": icon steps joined by curved arrows */
export function WorkProcess() {
  return (
    <section className="bg-[#f4f3f8] pb-[70px] md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <span className="inline-block bg-white px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
            Our Service Approach
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.15] text-foreground md:text-5xl">
            Understanding Our <span className="text-brand">Work Process</span>
          </h2>
        </div>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {APPROACH.map(({ title, icon: Icon, text }, i) => (
            <li key={title} className="group relative text-center">
              <span className="mx-auto flex size-[88px] items-center justify-center rounded-full bg-brand/10 transition-colors duration-300 group-hover:bg-gold/15">
                <span className="flex size-[66px] items-center justify-center rounded-full bg-brand text-white transition-colors duration-300 group-hover:bg-gold">
                  <Icon className="size-7" strokeWidth={1.6} />
                </span>
              </span>

              {/* Arrow to the next step, alternating over and under (desktop) */}
              {i < APPROACH.length - 1 && (
                <span
                  className={`absolute -right-[60px] hidden lg:block ${i % 2 ? "top-[130px]" : "top-3"}`}
                >
                  <CurvedArrow down={i % 2 === 1} />
                </span>
              )}

              <p className="mt-6 text-[0.7rem] uppercase tracking-[0.22em] text-gold">Step {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-2xl text-foreground">{title}</h3>
              <p className="mx-auto mt-3 max-w-[250px] text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-[0.78rem] uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand"
          >
            Let's Work Together <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
