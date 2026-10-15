import type { FlatIconName } from "@/components/site/FlatIcon";

import corporateImg from "@/assets/service-corporate.jpg";
import litigationImg from "@/assets/service-litigation.jpg";
import familyImg from "@/assets/service-family.jpg";
import landImg from "@/assets/service-land.jpg";
import employmentImg from "@/assets/service-employment.jpg";
import miningImg from "@/assets/practice/mining.jpg";
import energyImg from "@/assets/practice/energy.jpg";
import ipImg from "@/assets/practice/intellectual-property.jpg";
import dataImg from "@/assets/practice/data-protection.jpg";
import taxImg from "@/assets/practice/tax.jpg";
import debtImg from "@/assets/practice/debt-recovery.jpg";
import insuranceImg from "@/assets/practice/insurance.jpg";

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

// Practice areas as described in the LawAge Advocates firm profile
export const SERVICES: Service[] = [
  {
    slug: "corporate-business-investment-law",
    icon: "building",
    title: "Corporate & Commercial Law",
    text: "Incorporation, governance, commercial contracts, restructuring, mergers and acquisitions, and investment advisory.",
    image: corporateImg,
    headline: "Legal Foundations for Growing Businesses",
    intro: [
      "We support companies with incorporation, governance, commercial contracts, restructuring, mergers and acquisitions, and ongoing corporate advisory services.",
      "We understand that legal decisions are also business decisions. Our advice is practical, commercially focused, and designed to support growth while protecting our clients' interests.",
    ],
    scope: [
      "Corporate establishment, restructuring and governance",
      "Commercial contract drafting and negotiation",
      "Mergers and acquisitions",
      "Investment facilitation for local and foreign investors",
    ],
    approach:
      "We combine legal expertise, commercial understanding and strategic thinking to deliver practical solutions that help clients achieve their objectives while managing legal and regulatory risks.",
  },
  {
    slug: "litigation-dispute-resolution",
    icon: "gavel",
    title: "Litigation & Dispute Resolution",
    text: "Representation in complex civil, commercial, labour and land litigation, and the resolution of disputes.",
    image: litigationImg,
    headline: "Strategic, Results-Oriented Representation",
    intro: [
      "We advise and represent clients in complex civil, commercial, labour and land disputes, before courts and through negotiated settlement.",
      "Every matter is handled with meticulous attention to detail, sound legal analysis, and an unwavering commitment to protecting our clients' interests.",
    ],
    scope: [
      "Complex civil and commercial litigation",
      "Labour and employment disputes",
      "Land disputes",
      "Judgment enforcement",
    ],
    approach:
      "We begin by understanding your objectives and the commercial realities surrounding your matter, then develop a strategy that identifies risks and opportunities.",
  },
  {
    slug: "mining-natural-resources",
    icon: "compass-alt",
    title: "Mining & Natural Resources",
    text: "Licensing, mineral rights, local content compliance, mining agreements, regulatory advisory and project development support.",
    image: miningImg,
    headline: "Specialised Advisory for the Extractives Sector",
    intro: [
      "As Tanzania's legal and regulatory landscape continues to evolve, we provide specialised legal solutions that address sector-specific requirements in mining and natural resources.",
      "We provide legal support throughout the lifecycle of major projects, including licensing, regulatory approvals, commercial agreements, land acquisition, and compliance.",
    ],
    scope: [
      "Licensing and mineral rights",
      "Local content compliance",
      "Mining agreements",
      "Regulatory advisory",
      "Project development support",
    ],
    approach:
      "We draw on a strong understanding of Tanzania's legal and regulatory landscape and close engagement with key government institutions and regulators.",
  },
  {
    slug: "energy-infrastructure",
    icon: "bullseye-arrow",
    title: "Energy & Infrastructure",
    text: "Legal advisory for energy projects, utilities, infrastructure development, renewable energy investments and PPPs.",
    image: energyImg,
    headline: "Legal Support for Energy and Infrastructure Projects",
    intro: [
      "We provide legal advisory for energy projects, utilities, infrastructure development, regulatory approvals, renewable energy investments, and public-private partnerships.",
      "From licensing to commercial agreements, we support clients throughout the lifecycle of major projects.",
    ],
    scope: [
      "Energy projects and utilities",
      "Infrastructure development",
      "Regulatory approvals",
      "Renewable energy investments",
      "Public-private partnerships",
    ],
    approach:
      "We keep pace with regulatory change across the sector, so our clients can plan long-term projects on solid legal ground.",
  },
  {
    slug: "intellectual-property-law",
    icon: "award",
    title: "Intellectual Property",
    text: "Protection, registration, commercialization, licensing and enforcement of trademarks, copyrights, patents and designs.",
    image: ipImg,
    headline: "Protect and Commercialise Your Ideas",
    intro: [
      "We advise on the protection, registration, commercialization, licensing, enforcement, and management of trademarks, copyrights, patents, industrial designs, and related intellectual assets.",
      "We help growing businesses establish strong legal foundations, including the protection of the brands and ideas they build.",
    ],
    scope: [
      "Trademarks and copyrights",
      "Patents and industrial designs",
      "Registration and licensing",
      "Enforcement and commercialization",
    ],
    approach:
      "We secure protection early and enforce it firmly, so your intellectual property keeps its value as your business grows.",
  },
  {
    slug: "data-protection-privacy",
    icon: "balance-scale-right",
    title: "Data Protection & Privacy",
    text: "Compliance with the Personal Data Protection Act, privacy policies, data security, compliance audits and regulatory engagement.",
    image: dataImg,
    headline: "Compliance with Tanzania's Data Protection Law",
    intro: [
      "We advise organizations on compliance with the Personal Data Protection Act, governance frameworks, privacy policies, data security, compliance audits, and regulatory engagement.",
      "We help clients put the right policies and systems in place to protect personal data and meet their obligations.",
    ],
    scope: [
      "Personal Data Protection Act compliance",
      "Governance frameworks and privacy policies",
      "Data security",
      "Compliance audits",
      "Regulatory engagement",
    ],
    approach:
      "We leverage modern legal technology and secure digital systems ourselves, and bring that practical understanding to the advice we give.",
  },
  {
    slug: "tax-regulatory-compliance",
    icon: "calculator-math-tax",
    title: "Tax & Regulatory Compliance",
    text: "Legal support on tax disputes, regulatory compliance, licensing, corporate governance and dealings with regulators.",
    image: taxImg,
    headline: "Navigating Tax and Regulatory Requirements",
    intro: [
      "We provide legal support on tax disputes, regulatory compliance, licensing requirements, corporate governance, and interactions with regulatory authorities.",
      "With an office in Dodoma, Tanzania's administrative capital, we maintain close engagement with key government institutions and regulators.",
    ],
    scope: [
      "Tax disputes",
      "Regulatory compliance and licensing",
      "Corporate governance",
      "Engagement with regulatory authorities",
    ],
    approach:
      "Our advice is risk-conscious and practical, helping clients stay compliant while focusing on their business.",
  },
  {
    slug: "debt-recovery-insolvency",
    icon: "briefcase-blank",
    title: "Debt Recovery & Insolvency",
    text: "Debt recovery strategies, negotiated settlements, judgment enforcement, insolvency advisory and business recovery.",
    image: debtImg,
    headline: "Structured Solutions for Debt Recovery",
    intro: [
      "We develop effective debt recovery strategies, negotiate settlements, enforce judgments, and provide insolvency advisory and business recovery solutions.",
      "We advise banks, microfinance institutions, SACCOs and other financial service providers on securities, debt recovery and regulatory compliance.",
    ],
    scope: [
      "Debt recovery strategies",
      "Negotiating settlements",
      "Enforcing judgments",
      "Insolvency advisory and business recovery",
    ],
    approach:
      "We balance firmness with commercial sense, protecting client relationships while securing results.",
  },
  {
    slug: "insurance-law",
    icon: "handshake-trust",
    title: "Insurance Law",
    text: "Advising insurers, businesses and policyholders on claims, policy interpretation, liability, compliance and disputes.",
    image: insuranceImg,
    headline: "Expert Support on Insurance Matters",
    intro: [
      "We advise insurers, businesses, and policyholders on insurance claims, policy interpretation, liability, regulatory compliance, and dispute resolution.",
    ],
    scope: [
      "Insurance claims",
      "Policy interpretation",
      "Liability",
      "Regulatory compliance",
      "Dispute resolution",
    ],
    approach:
      "We read the fine print closely and act quickly, giving clients a clear view of their position and the best route forward.",
  },
  {
    slug: "real-estate-conveyancing",
    icon: "house-chimney",
    title: "Real Estate & Conveyancing",
    text: "Property acquisition and conveyancing, land due diligence, transfers and registration, and real estate investments.",
    image: landImg,
    headline: "Secure Every Step of Your Property Transaction",
    intro: [
      "Land and property are often the most valuable assets our clients hold. We advise and represent clients on property acquisition and conveyancing.",
      "Our team carries out due diligence and prepares and registers transaction documents so ownership is clear and enforceable.",
    ],
    scope: [
      "Property acquisition and conveyancing",
      "Land due diligence",
      "Property transfers and registration",
      "Land acquisition for projects",
    ],
    approach:
      "We check the details before you sign, reducing the risk of costly disputes after a transaction closes.",
  },
  {
    slug: "employment-human-resources",
    icon: "user-headset",
    title: "Employment & Human Resources",
    text: "Employment and human resource advisory, employment matters for organizations, and labour disputes.",
    image: employmentImg,
    headline: "Practical Employment and HR Advice",
    intro: [
      "We provide employment and human resource advisory to businesses, institutions, development partners and NGOs.",
      "Where disputes arise, we represent clients in labour matters with the same practical, results-driven approach.",
    ],
    scope: [
      "Employment and human resource advisory",
      "Employment matters for organizations",
      "Labour litigation",
    ],
    approach:
      "We take the time to understand your organization before recommending solutions, so the advice fits how you actually operate.",
  },
  {
    slug: "ngos-development-partners-public-sector",
    icon: "users-alt",
    title: "NGOs, Development Partners & Public Sector Advisory",
    text: "Governance, legal compliance, policy development, institutional strengthening and project implementation.",
    image: familyImg,
    headline: "Supporting Institutions That Drive Development",
    intro: [
      "We support NGOs, development organizations, government institutions, and public entities in governance, legal compliance, policy development, institutional strengthening, and project implementation.",
      "For public sector entities we provide legal advisory, legislative drafting, regulatory compliance, institutional governance, and policy support.",
    ],
    scope: [
      "Governance and legal compliance",
      "Policy development and legislative drafting",
      "Institutional strengthening",
      "Project implementation",
      "Employment matters and legal risk management",
    ],
    approach:
      "We aim to create meaningful legal, commercial, and social outcomes that make a lasting difference.",
  },
];
