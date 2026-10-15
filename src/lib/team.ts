import stephen from "@/assets/team/stephen-msechu.jpg";
import robert from "@/assets/team/robert-majige.jpg";
import derick from "@/assets/team/derick-olotu.jpg";
import oliver from "@/assets/team/oliver-costa.jpg";
import innocent from "@/assets/team/innocent-mongi.jpg";
import davis from "@/assets/team/davis-komba.jpg";
import secilia from "@/assets/team/secilia-john.jpg";
import hamasa from "@/assets/team/hamasa-group.jpg";

export type TeamMember = {
  /** URL of the profile page: /team/<slug> */
  slug: string;
  name: string;
  /** Department heading the person is listed under on the Team page */
  department: Department;
  /** Department-style title shown under the name, e.g. "Head of … Department" */
  title?: string;
  photo: string;
  credentials?: string;
  /** Short biography for the profile page, one string per paragraph */
  bio?: string[];
  /** Degrees and professional qualifications, listed on the profile page */
  qualifications?: string[];
  /** Areas of expertise, listed on the profile page */
  expertise?: string[];
  /** Downloadable CV (e.g. a PDF in public/cv/), shown as a button on the profile page */
  cvUrl?: string;
  /** Full LinkedIn profile URL; until set, the LinkedIn icon shows but is not clickable */
  linkedin?: string;
  /** Personal work email; falls back to the firm inbox */
  email?: string;
  /** Photo is a company logo: shown whole on a tinted background rather than cropped */
  logo?: boolean;
};

export const FIRM_EMAIL = "info@lawage.co.tz";

// DRAFT department headings, grouped by each person's current work; the client confirms or renames
// them (meeting October 2026). Order here is the order on the Team page.
export const DEPARTMENTS = [
  "Advocates",
  "Technology, Digital Rights, Policy & Litigation",
  "Governance, Compliance & Investment",
  "Consultancy & Business Development",
  "Legal Support & Administration",
  "Information Technology",
] as const;
export type Department = (typeof DEPARTMENTS)[number];

// Bios, expertise and CVs come from the documents the client is sending
export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "stephen-msechu",
    name: "Stephen Wilbard Msechu",
    department: "Advocates",
    photo: stephen.src,
  },
  {
    slug: "robert-majige",
    name: "Robert Sylivester Majige",
    department: "Technology, Digital Rights, Policy & Litigation",
    title: "Head of Technology, Digital Rights, Policy & Litigation Department",
    credentials: "Advocate of the High Court of Tanzania",
    photo: robert.src,
    linkedin: "https://www.linkedin.com/in/robert-sylivester-majige-7a265a204/",
    bio: [
      "Adv. Robert Sylivester Majige is an Advocate of the High Court of Tanzania with expertise spanning legal practice, technology, public policy and digital governance.",
      "Robert has experience in legal research and drafting, policy analysis, strategic litigation, digital rights, data protection, Internet governance and emerging technology regulation. His work focuses particularly on the intersection between law and technology, including artificial intelligence governance, privacy and data protection, cybersecurity, digital rights and regulatory policy.",
      "He has worked extensively with civil society organisations, policymakers, journalists and other stakeholders on legal and policy reform initiatives. He also brings practical experience in developing legal and policy documents, conducting regulatory analysis, supporting advocacy initiatives and applying technology and AI tools to improve legal and professional practice.",
      "At LawAge Advocates, Robert contributes to the firm's legal practice with a particular focus on technology-related legal issues, litigation, corporate and regulatory advisory, legal research and drafting, policy and compliance matters, and emerging areas of law created by technological change.",
    ],
    qualifications: [
      "LL.B. (Hons), University of Dar es Salaam",
      "Postgraduate Diploma in Legal Practice, Law School of Tanzania",
      "Postgraduate Diploma in Internet Governance",
    ],
    expertise: [
      "Technology Law & Emerging Technology Regulation",
      "Artificial Intelligence Governance",
      "Privacy & Data Protection",
      "Cybersecurity",
      "Digital Rights & Internet Governance",
      "Strategic Litigation",
      "Corporate & Regulatory Advisory",
      "Policy Analysis & Compliance",
      "Legal Research & Drafting",
    ],
  },
  { slug: "derick-olotu", name: "Derick Daudi Olotu", department: "Advocates", photo: derick.src },
  {
    slug: "oliver-costa",
    name: "Oliver Balilo Costa",
    credentials: "CMgr MCMI",
    department: "Consultancy & Business Development",
    photo: oliver.src,
  },
  {
    slug: "innocent-mongi",
    name: "Innocent James Mongi",
    department: "Consultancy & Business Development",
    photo: innocent.src,
  },
  {
    slug: "davis-komba",
    name: "Davis Betram Komba",
    department: "Governance, Compliance & Investment",
    title: "Head of Governance, Compliance and Investment Department",
    photo: davis.src,
    linkedin: "https://tz.linkedin.com/in/davis-betram-komba-jr-a70875113",
    bio: [
      "Davis Betram Komba is a Tanzanian lawyer, governance and human-rights practitioner, researcher, and youth leadership advocate with experience spanning legal practice, civil society, policy advocacy, organisational leadership, and community development.",
      "His professional interests and practice areas include land and real estate law, corporate and commercial law, human rights, data protection, digital governance, regulatory compliance, policy development, and access to justice.",
      "Beyond legal practice, Davis has extensive experience working with civil society organisations and youth-led initiatives, with a particular focus on youth civic participation, climate justice, governance, human rights, research, and institutional strengthening. He has held leadership and governance roles within several organisations and has participated in national and international initiatives addressing youth empowerment, democratic participation, climate action, and public policy.",
      "Davis combines legal knowledge with research, advocacy, leadership, and strategic communication to support institutions, communities, young people, and businesses in navigating complex legal, governance, and policy challenges.",
    ],
    qualifications: [
      "LL.B., Mzumbe University",
      "Postgraduate Diploma in Legal Practice, Law School of Tanzania",
    ],
    expertise: [
      "Land & Real Estate Law",
      "Corporate & Commercial Law",
      "Regulatory Compliance",
      "Governance & Institutional Strengthening",
      "Data Protection & Digital Governance",
      "Human Rights & Access to Justice",
      "Policy Development & Advocacy",
      "Legal Research",
    ],
  },
  {
    slug: "secilia-john",
    name: "Secilia Dominick John",
    department: "Legal Support & Administration",
    photo: secilia.src,
  },
  {
    slug: "sidaga-waziri",
    name: "Sidaga Waziri",
    credentials: "Hamasa Group",
    department: "Information Technology",
    photo: hamasa.src,
  },
];

/** Team members grouped under their department headings, in DEPARTMENTS order */
export const TEAM_BY_DEPARTMENT = DEPARTMENTS.map((department) => ({
  department,
  members: TEAM_MEMBERS.filter((m) => m.department === department),
})).filter((group) => group.members.length > 0);

/** The firm's lead team, featured on the home page */
const FEATURED_DEPARTMENTS: Department[] = [
  "Advocates",
  "Technology, Digital Rights, Policy & Litigation",
  "Governance, Compliance & Investment",
  "Consultancy & Business Development",
];
export const FEATURED_TEAM = TEAM_MEMBERS.filter((m) =>
  FEATURED_DEPARTMENTS.includes(m.department),
);

export const findTeamMember = (slug: string) => TEAM_MEMBERS.find((m) => m.slug === slug);
