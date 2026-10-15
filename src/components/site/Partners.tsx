import caspian from "@/assets/partners/caspian.jpg";
import nrgi from "@/assets/partners/nrgi.jpg";
import wetlands from "@/assets/partners/wetlands-international.jpg";
import agathor from "@/assets/partners/agathor.jpg";
import husk from "@/assets/partners/husk.jpg";
import wipa from "@/assets/partners/wipa.jpg";

// LawAge's partners and clients
const PARTNERS = [
  { name: "Caspian", logo: caspian.src },
  { name: "Natural Resource Governance Institute", logo: nrgi.src },
  { name: "Wetlands International", logo: wetlands.src },
  { name: "Agathor", logo: agathor.src },
  { name: "Husk Power Systems", logo: husk.src },
  { name: "Wajibu – Institute of Public Accountability", logo: wipa.src },
];

export function Partners() {
  return (
    <section id="partners" className="bg-white py-[70px]">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="text-center">
          <span className="rule-line eyebrow">Our Partners</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.15] text-foreground md:text-5xl">
            Trusted <span className="text-brand">Affiliations</span>
          </h2>
        </div>

        {/* Logo slideshow: the list is rendered twice so the loop is seamless */}
        <div className="partners-marquee mt-14 overflow-hidden">
          <div className="partners-track flex w-max items-center">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                aria-hidden={i >= PARTNERS.length}
                className="flex h-20 w-[180px] shrink-0 items-center justify-center px-6 md:w-[240px]"
              >
                <img
                  src={partner.logo}
                  alt={i < PARTNERS.length ? partner.name : ""}
                  className="max-h-16 w-auto max-w-full object-contain mix-blend-multiply grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
