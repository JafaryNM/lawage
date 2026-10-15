/** Centered section title, e.g. "Our Team of Experts" */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-3xl text-foreground md:text-[2.5rem]">
      {children}
    </h2>
  );
}
