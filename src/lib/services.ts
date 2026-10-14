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

// Practice areas as listed on lawage.co.tz
export const SERVICES: Service[] = [
  {
    slug: "litigation-dispute-resolution",
    icon: "gavel",
    title: "Litigation & Dispute Resolution",
    text: "Strategic, results-oriented representation in civil and commercial litigation, arbitration, mediation and regulatory disputes.",
    image: litigationImg,
    headline: "Strategic, Results-Oriented Representation",
    intro: [
      "When disputes arise, LawAge Advocates & Consult delivers strategic, results-oriented representation before courts, tribunals and arbitral panels.",
      "We advise corporates, investors, governments and development partners on the route that best protects their position, from negotiation and mediation through to trial and enforcement.",
    ],
    scope: [
      "Civil and commercial litigation",
      "Arbitration and mediation",
      "Regulatory and financial disputes",
      "Debt recovery and enforcement",
    ],
    approach:
      "We assess every dispute early and honestly, so clients can make informed decisions on cost, risk and strategy at each stage.",
  },
  {
    slug: "corporate-business-investment-law",
    icon: "building",
    title: "Corporate, Business & Investment Law",
    text: "Company formation and structuring, corporate governance and compliance, M&A, joint ventures and investment advisory.",
    image: corporateImg,
    headline: "Legal Foundations for Growing Businesses",
    intro: [
      "We support local and foreign businesses from incorporation to expansion, advising on the structures, governance and transactions that underpin their growth.",
      "Our team works with corporates, investors and development partners to navigate Tanzania's legal, regulatory and commercial environment with confidence.",
    ],
    scope: [
      "Company formation and structuring",
      "Corporate governance and compliance",
      "Mergers, acquisitions and joint ventures",
      "Investment advisory for local and foreign investors",
    ],
    approach:
      "We align legal compliance with your business strategy, so the advice we give supports growth rather than slowing it down.",
  },
  {
    slug: "mining-extractives-law",
    icon: "compass-alt",
    title: "Mining & Extractives Law",
    text: "Specialised advisory on mining operations and licensing, regulatory compliance, supply chain governance and transparency.",
    image: landImg,
    headline: "Specialised Advisory for the Extractives Sector",
    intro: [
      "Tanzania's mining and extractives sector is tightly regulated and closely scrutinised. We provide specialised advisory to operators, investors and stakeholders across the value chain.",
      "From licensing to supply chain governance, we help clients operate responsibly and meet the transparency and accountability standards the sector demands.",
    ],
    scope: [
      "Mining operations and licensing",
      "Regulatory compliance",
      "Supply chain governance",
      "Transparency and accountability",
    ],
    approach:
      "We combine regulatory precision with an understanding of development frameworks, helping clients reduce operational and legal risk.",
  },
  {
    slug: "energy-law",
    icon: "bullseye-arrow",
    title: "Energy Law",
    text: "Supporting clients in navigating Africa's evolving energy landscape, from oil and gas to renewable and off-grid energy.",
    image: taxImg,
    headline: "Navigating Africa's Evolving Energy Landscape",
    intro: [
      "Energy is central to Africa's development, and its legal framework continues to evolve. We support clients navigating oil and gas, renewable and off-grid energy projects.",
      "Our advice covers licensing, regulation and compliance, helping investors and operators bring projects forward with clarity and confidence.",
    ],
    scope: [
      "Oil and gas",
      "Renewable and off-grid energy",
      "Energy regulation and compliance",
    ],
    approach:
      "We keep pace with regulatory change across the sector, so our clients can plan long-term projects on solid legal ground.",
  },
  {
    slug: "insurance-claims-advisory",
    icon: "handshake-trust",
    title: "Insurance Claims & Advisory",
    text: "Expert support in insurance claims recovery, policy interpretation, disputes with insurers and risk assessment.",
    image: employmentImg,
    headline: "Expert Support on Insurance Claims",
    intro: [
      "Insurance should protect you when it matters most. We provide expert support to policyholders and businesses pursuing claims and managing risk.",
      "We interpret policy terms, assess liability and represent clients in disputes with insurers to secure the recovery they are entitled to.",
    ],
    scope: [
      "Insurance claims recovery",
      "Policy interpretation",
      "Dispute resolution with insurers",
      "Risk and liability assessment",
    ],
    approach:
      "We read the fine print closely and act quickly, giving clients a clear view of their entitlements and the best route to recovery.",
  },
  {
    slug: "debt-recovery-financial-claims",
    icon: "calculator-math-tax",
    title: "Debt Recovery & Financial Claims",
    text: "Structured solutions in commercial debt recovery, negotiation and settlement, and legal enforcement.",
    image: taxImg,
    headline: "Structured Solutions for Debt Recovery",
    intro: [
      "Unpaid debts weigh on cash flow and growth. We deliver structured solutions that help businesses and financial institutions recover what they are owed.",
      "We pursue negotiated settlements where possible and move decisively to legal enforcement when needed.",
    ],
    scope: [
      "Commercial debt recovery",
      "Negotiation and settlement",
      "Legal enforcement",
    ],
    approach:
      "We balance firmness with commercial sense, protecting client relationships while securing results.",
  },
  {
    slug: "real-estate-conveyancing",
    icon: "house-chimney",
    title: "Real Estate & Conveyancing",
    text: "Land acquisition and due diligence, property transfers and registration, lease structuring and real estate investments.",
    image: landImg,
    headline: "Secure Every Step of Your Property Transaction",
    intro: [
      "Land and property are often the most valuable assets our clients hold. We help individuals, developers and investors acquire, transfer and protect property with confidence.",
      "Our team carries out due diligence, prepares and registers transaction documents and structures leases and investments so ownership is clear and enforceable.",
    ],
    scope: [
      "Land acquisition and due diligence",
      "Property transfers and registration",
      "Lease structuring",
      "Real estate investments",
    ],
    approach:
      "We check the details before you sign, reducing the risk of costly disputes after a transaction closes.",
  },
  {
    slug: "intellectual-property-law",
    icon: "award",
    title: "Intellectual Property Law",
    text: "Protecting and commercialising your assets through trademark and copyright registration, enforcement and licensing.",
    image: corporateImg,
    headline: "Protect and Commercialise Your Ideas",
    intro: [
      "Brands, creative works and know-how are valuable business assets. We help clients protect and commercialise them.",
      "From registration to enforcement and licensing, we make sure your intellectual property works for your business.",
    ],
    scope: [
      "Trademark and copyright registration",
      "IP enforcement",
      "Licensing and commercialisation",
    ],
    approach:
      "We secure protection early and enforce it firmly, so your intellectual property keeps its value as your business grows.",
  },
  {
    slug: "social-justice-research-project-support",
    icon: "users-alt",
    title: "Social Justice, Research & Project Support",
    text: "Bridging law, development and impact for NGOs and institutions through compliance, advisory, projects and research.",
    image: familyImg,
    headline: "Bridging Law, Development and Impact",
    intro: [
      "We support NGOs and institutions working to create lasting social impact, bridging law, development and impact.",
      "Our team provides regulatory compliance support, legal advisory and research, and helps design and implement development projects.",
    ],
    scope: [
      "Regulatory compliance support",
      "Legal advisory (NGO, tax and HR law)",
      "Design and implementation of development projects",
      "Research and advocacy",
    ],
    approach:
      "We integrate business and human rights, risk mitigation and sustainability into practical solutions aligned with international standards.",
  },
];
