import northvale from "@/assets/partners/northvale.svg";
import asterion from "@/assets/partners/asterion.svg";
import kivuko from "@/assets/partners/kivuko.svg";
import lumora from "@/assets/partners/lumora.svg";
import vantera from "@/assets/partners/vantera.svg";
import oakline from "@/assets/partners/oakline.svg";

// Demo partner logos (fictional brands) — replace with the firm's real partners.
const PARTNERS = [
  { name: "Northvale Holdings", logo: northvale },
  { name: "Asterion Capital", logo: asterion },
  { name: "Kivuko Trust", logo: kivuko },
  { name: "Lumora", logo: lumora },
  { name: "Vantera Insurance", logo: vantera },
  { name: "Oakline & Co", logo: oakline },
];

export function Partners() {
  return (
    <section id="partners" className="bg-white py-[70px]">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="text-center">
          <span className="rule-line eyebrow">Our Partners</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.15] text-foreground md:text-5xl">
            Trusted Affiliations
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
                  className="max-h-16 w-auto max-w-full object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
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
