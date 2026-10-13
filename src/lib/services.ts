import type { FlatIconName } from "@/components/site/FlatIcon";

import corporateImg from "@/assets/service-corporate.jpg";
import litigationImg from "@/assets/service-litigation.jpg";
import familyImg from "@/assets/service-family.jpg";
import landImg from "@/assets/service-land.jpg";
import employmentImg from "@/assets/service-employment.jpg";
import taxImg from "@/assets/service-tax.jpg";

export type Service = {
  slug: string;
  icon: FlatIconName;
  title: string;
  /** One-line summary used on cards */
  text: string;
  image: string;
  headline: string;
  intro: string[];
  /** What the firm handles within this practice area */
  scope: string[];
  approach: string;
};

export const SERVICES: Service[] = [
  {
    slug: "corporate-commercial",
    icon: "building",
    title: "Corporate & Commercial",
    text: "Company formation, governance, contracts, mergers and regulatory compliance for Tanzanian and foreign businesses.",
    image: corporateImg,
    headline: "Corporate Advice That Keeps Your Business Moving",
    intro: [
      "From incorporation to expansion, we advise Tanzanian and foreign businesses on the legal structure, governance and contracts that underpin their growth.",
      "Our corporate team works alongside management and boards to anticipate risk, negotiate on strong terms and keep every transaction compliant from the first filing to completion.",
    ],
    scope: [
      "Company formation and registration",
      "Shareholder and joint venture agreements",
      "Mergers, acquisitions and due diligence",
      "Board governance and company secretarial support",
      "Commercial contracts and supply agreements",
      "Foreign investment and regulatory approvals",
    ],
    approach:
      "We take time to understand your commercial goals, so our advice is practical, timely and focused on getting the deal done.",
  },
  {
    slug: "litigation-arbitration",
    icon: "gavel",
    title: "Litigation & Arbitration",
    text: "Robust representation before Tanzanian courts and tribunals, and in commercial arbitration proceedings.",
    image: litigationImg,
    headline: "Strong Representation When Disputes Arise",
    intro: [
      "When a dispute cannot be resolved at the table, our advocates represent clients before Tanzanian courts, tribunals and arbitral panels with careful preparation and clear strategy.",
      "We assess the merits early, explain the options plainly and pursue the route — negotiation, mediation, arbitration or trial — that best protects your position.",
    ],
    scope: [
      "Commercial and contractual disputes",
      "Debt recovery and enforcement of judgments",
      "Domestic and international arbitration",
      "Appeals and judicial review",
      "Injunctions and urgent applications",
      "Mediation and settlement negotiations",
    ],
    approach:
      "Every matter starts with an honest assessment of risk and cost, so you can make informed decisions at each stage of the dispute.",
  },
  {
    slug: "land-property",
    icon: "house-chimney",
    title: "Land & Property Law",
    text: "Title verification, conveyancing, leases, land disputes and real estate transaction structuring.",
    image: landImg,
    headline: "Secure Every Step of Your Property Transaction",
    intro: [
      "Land is often the most valuable asset our clients hold. We help individuals, developers and lenders acquire, use and protect property with confidence.",
      "Our team verifies title, drafts and reviews transaction documents and represents clients in land disputes, so ownership is clear and enforceable.",
    ],
    scope: [
      "Title searches and verification",
      "Sale, purchase and transfer of land",
      "Leases and tenancy agreements",
      "Mortgages and security over property",
      "Land disputes and tribunal representation",
      "Real estate development structuring",
    ],
    approach:
      "We check the details others miss before you sign, reducing the risk of costly disputes after a transaction closes.",
  },
  {
    slug: "family-law",
    icon: "family",
    title: "Family Law",
    text: "Matrimonial matters, custody, succession and estate administration handled with discretion and care.",
    image: familyImg,
    headline: "Sensitive Family Matters, Handled With Care",
    intro: [
      "Family matters are personal and often difficult. We guide clients through them with discretion, empathy and a clear view of their rights.",
      "Whether you are planning your estate or facing a separation, we explain the process, protect your interests and aim for outcomes that respect everyone involved.",
    ],
    scope: [
      "Divorce and separation",
      "Child custody and maintenance",
      "Matrimonial property division",
      "Wills and estate planning",
      "Probate and estate administration",
      "Adoption and guardianship",
    ],
    approach:
      "We favour resolution through negotiation and mediation where possible, while standing ready to protect you in court when needed.",
  },
  {
    slug: "employment-labour",
    icon: "handshake-trust",
    title: "Employment & Labour",
    text: "Contracts, disciplinary processes, restructuring and representation at the Commission for Mediation.",
    image: employmentImg,
    headline: "Workplace Advice for Employers and Employees",
    intro: [
      "Employment relationships work best when rights and obligations are clear. We advise employers and employees on contracts, policies and disputes under Tanzanian labour law.",
      "From drafting compliant contracts to managing restructuring and representing clients at the Commission for Mediation and Arbitration, we help resolve workplace issues fairly and efficiently.",
    ],
    scope: [
      "Employment contracts and HR policies",
      "Disciplinary and grievance procedures",
      "Retrenchment and restructuring",
      "Work permits for foreign staff",
      "Representation at the CMA and Labour Court",
      "Workplace investigations",
    ],
    approach:
      "We help you get the process right from the start, which is the surest way to avoid disputes and protect your organisation.",
  },
  {
    slug: "tax-regulatory",
    icon: "calculator-math-tax",
    title: "Tax & Regulatory",
    text: "Tax planning, TRA disputes, licensing and advisory on Tanzania's evolving regulatory framework.",
    image: taxImg,
    headline: "Navigate Tax and Regulation With Confidence",
    intro: [
      "Tanzania's tax and regulatory landscape continues to evolve. We help businesses plan efficiently, stay compliant and respond effectively when issues arise.",
      "Our team advises on tax structuring, licensing and sector regulation, and represents clients in objections and appeals involving the Tanzania Revenue Authority.",
    ],
    scope: [
      "Tax planning and structuring",
      "TRA audits, objections and appeals",
      "Business licensing and permits",
      "Sector-specific regulatory compliance",
      "Customs and excise advisory",
      "Regulatory investigations",
    ],
    approach:
      "We combine legal precision with commercial awareness, so compliance supports your business rather than slowing it down.",
  },
];
