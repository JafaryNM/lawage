import stephen from "@/assets/team/stephen-msechu.jpg";
import robert from "@/assets/team/robert-majige.jpg";
import derick from "@/assets/team/derick-olotu.jpg";
import oliver from "@/assets/team/oliver-costa.jpg";
import innocent from "@/assets/team/innocent-mongi.jpg";
import davis from "@/assets/team/davis-komba.jpg";
import secilia from "@/assets/team/secilia-john.jpg";
import sidaga from "@/assets/team/sidaga-kihongo.jpg";
import nassoro from "@/assets/team/nassoro-nassoro.jpg";

export type TeamMember = {
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
  "Commercial & Strategic Sectors",
  "Technology, Digital Rights, Policy & Litigation",
  "Advocates",
  "Governance, Compliance & Investment",
  "Consultancy & Business Development",
  "Legal Support & Administration",
  "Technology & Data",
] as const;
export type Department = (typeof DEPARTMENTS)[number];

// Bios, expertise and CVs come from the documents the client is sending
export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "stephen-msechu",
    name: "Stephen Wilbard Msechu",
    department: "Commercial & Strategic Sectors",
    title: "Managing Partner – Commercial & Strategic Sectors Department",
    credentials: "Co-Founder, LawAge Advocates",
    photo: stephen.src,
    bio: [
      "Stephen Wilbard Msechu is the Co-Founder and Managing Partner at LawAge Advocates, bringing over a decade of elite experience to Tanzania’s corporate, regulatory, and constitutional legal landscapes. Grounded in the firm’s core philosophy that the client’s best interest always comes first, Stephen guides businesses, international investors, individuals and non-profits through complex frameworks with seamless, results-driven clarity.",
      "His specialized practice spans Corporate Law, Foreign Investment, Real Estate & Conveyancing, and Mining & Extractives Law. A versatile practitioner, he is an accomplished Arbitrator adept at resolving complex commercial disputes outside the courtroom. Extending his expertise directly into the property sector, he also serves as a Director at Steady Estate Company Limited, driving strategic real estate investments and asset management.",
      "As a respected voice in natural resources governance, he co-founded HakiRasilimali and has frequently advised Parliamentary Committees on major economic legislation. A former Program Manager for the Tanganyika Law Society (TLS), he supervised the publication of the TLS Law Reports and was recognized as one of the 50 Most Influential Young Tanzanians. He is an active member of both the TLS and the East Africa Law Society (EALS).",
    ],
    qualifications: [
      "LL.M., University of Dar es Salaam",
      "LL.B., University of Dar es Salaam",
      "Member, Tanganyika Law Society (TLS)",
      "Member, East Africa Law Society (EALS)",
    ],
    expertise: [
      "Corporate Law",
      "Foreign Investment",
      "Real Estate & Conveyancing",
      "Mining & Extractives Law",
      "Arbitration & Commercial Disputes",
      "Regulatory & Constitutional Law",
      "Natural Resources Governance",
      "Legislative & Policy Advisory",
    ],
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
  {
    slug: "derick-olotu",
    name: "Adv. Derick Daudi Olotu",
    department: "Advocates",
    title: "Head of Insurance & Risk Advisory Department",
    credentials: "Advocate of the High Court of Tanzania",
    photo: derick.src,
    bio: [
      "Adv. Derick is an Advocate of the High Court of Tanzania with experience in legal advisory, litigation, regulatory compliance, and dispute resolution. At LawAge Advocates, his practice focuses on insurance law and insurance claims, assisting clients in addressing insurance-related disputes, understanding policy obligations, and pursuing appropriate legal remedies.",
      "Derick has practical experience in legal research, drafting legal opinions and pleadings, interpreting statutory and contractual obligations, and representing clients before courts and regulatory authorities. His broader background in commercial law, taxation, corporate governance, and regulatory compliance enables him to approach insurance matters with an understanding of their legal, contractual, and commercial implications.",
      "His professional experience includes working with LawAge Advocates, Lexmicus Attorneys, and the Tanzania Revenue Authority, where he gained valuable exposure to litigation, statutory interpretation, dispute management, and legal risk assessment. He holds a Bachelor of Laws (LL.B) from Saint Augustine University of Tanzania and a Postgraduate Diploma in Law from the Law School of Tanzania.",
      "As Head of the Insurance & Risk Advisory Department at LawAge Advocates, Derick contributes to the firm's insurance advisory and dispute resolution services, with a focus on insurance claims, policy interpretation, claims disputes, liability assessment, and insurance-related litigation. He is committed to helping individuals and businesses understand their legal rights and obligations, manage insurance-related risks, and pursue fair and legally sound outcomes when disputes arise.",
      "His approach combines careful legal analysis, attention to contractual and regulatory requirements, and practical client-focused advice to support effective claims resolution and the protection of clients' interests.",
    ],
    qualifications: [
      "LL.B., Saint Augustine University of Tanzania (SAUT)",
      "Postgraduate Diploma in Legal Practice, Law School of Tanzania",
      "Advocate of the High Court of Tanzania",
    ],
    expertise: [
      "Insurance Law & Insurance Claims",
      "Policy Interpretation & Liability Assessment",
      "Insurance Disputes & Litigation",
      "Commercial Law & Taxation",
      "Corporate Governance & Regulatory Compliance",
      "Legal Opinions & Dispute Resolution",
    ],
  },
  {
    slug: "nassoro-nassoro",
    name: "Nassoro Nassoro",
    department: "Advocates",
    title: "Legal Officer",
    credentials: "LL.B. (RUCU)",
    photo: nassoro.src,
    bio: [
      "Nassoro Nassoro is a Legal Officer at LawAge Advocates in Dodoma, with a professional focus on legal research, contract management, civil claims, litigation support, and client advisory services. He holds a Bachelor of Laws (LL.B) from Ruaha Catholic University of Iringa (RUCU), where he developed a strong foundation in legal analysis, advocacy, and the practical application of the law.",
      "Nassoro gained practical exposure to judicial processes through his legal field practice at the Resident Magistrate’s Court of Dodoma. His academic training in moot court and participation in moot court sessions further strengthened his skills in legal research, case analysis, oral advocacy, and the presentation of legal arguments. These experiences contribute to his approach to legal practice, which emphasises thorough preparation, attention to detail, and clear, practical advice.",
      "During his time at RUCU, Nassoro served as a member of the Electoral Commission of the RUCU Law Society (RULASO) and spent three years as a peer educator. These roles helped develop his leadership, communication, teamwork, and interpersonal skills, while reinforcing his appreciation for accountability, collaboration, and service to others.",
      "His professional interests include litigation and dispute resolution, commercial and contract law, legal research, advocacy, and the development of effective legal solutions to everyday business and personal challenges. He is particularly interested in continuous professional development, strengthening access to justice, and exploring how legal practice can respond to the evolving needs of individuals, businesses, and institutions.",
      "At LawAge Advocates, Nassoro supports clients in contractual matters, civil claims, legal documentation, and related advisory services. He contributes to the preparation and review of legal documents, legal research, and the development of practical approaches to resolving clients’ legal challenges.",
    ],
    qualifications: [
      "LL.B., Ruaha Catholic University of Iringa (RUCU)",
      "Former Member, Electoral Commission of RUCU Law Society (RULASO)",
    ],
    expertise: [
      "Litigation Support & Civil Claims",
      "Contract Management & Review",
      "Legal Research & Drafting",
      "Commercial Law Advisory",
      "Dispute Resolution & Advocacy",
    ],
  },
  {
    slug: "olivia-costa",
    name: "Olivia Costa",
    credentials: "CMgr MCMI | Executive Director, TATIC",
    department: "Consultancy & Business Development",
    title: "Head of International Trade & Investment Advisory",
    photo: oliver.src,
    bio: [
      "Ms Olivia Costa is a professional in international trade, investment advocacy, strategic partnerships, and institutional engagement, with extensive experience in coalition leadership and stakeholder coordination. Since 2018, she has served as Executive Director of the Tanzania Trade & Investment Coalition (TATIC), leading initiatives that bring together civil society organisations and other stakeholders to engage on trade and investment policies and promote inclusive participation in national and international economic decision-making.",
      "Olivia has undertaken leadership and management training in the United Kingdom, including programmes with the Chartered Management Institute and the Institute of Administrative Management. Her professional development also includes a PRINCE2 Project Management Practitioner course at Coventry University and executive training at Columbia University in New York, complemented by training in communications, advocacy, lobbying, project coordination, trade, and investment.",
      "Her international engagement includes participation in Bilateral Investment Treaty discussions, United Nations Conference on Trade and Development (UNCTAD) forums, and World Trade Organization (WTO) public dialogues. Through these platforms, she has gained experience in international economic policy discussions, stakeholder representation, strategic networking, and facilitating dialogue between civil society and other actors involved in shaping trade and investment frameworks.",
      "At LawAge Advocates, Olivia contributes to the International Trade & Investment Advisory function, drawing on her experience in institutional relations, stakeholder engagement, partnership development, and investment policy advocacy. Her work supports initiatives aimed at strengthening connections between investors, businesses, public institutions, civil society organisations, and other strategic partners, while identifying opportunities for collaboration and sustainable business development.",
      "Olivia brings a collaborative and strategic approach to international trade and investment engagement, with a particular interest in fostering productive partnerships, improving stakeholder coordination, and supporting an enabling environment for investment and cross-border economic cooperation.",
    ],
    qualifications: [
      "Chartered Management Institute (CMI), UK",
      "Institute of Administrative Management, UK",
      "PRINCE2 Project Management Practitioner, Coventry University",
      "Executive Training, Columbia University in New York",
    ],
    expertise: [
      "International Trade & Investment Advisory",
      "Investment Policy Advocacy & Bilateral Investment Treaties",
      "Strategic Partnerships & Coalition Leadership",
      "Institutional Relations & Stakeholder Engagement",
      "PRINCE2 Project Management",
      "Cross-Border Economic Cooperation",
    ],
  },
  {
    slug: "innocent-mongi",
    name: "Innocent Daniel Mongi",
    department: "Consultancy & Business Development",
    title: "Business Development Manager",
    credentials: "Business Development Manager",
    photo: innocent.src,
    bio: [
      "Innocent Daniel Mongi is a Business Development Manager at LawAge Advocates, responsible for identifying business opportunities, developing strategic partnerships, and strengthening relationships with clients, institutions, and other stakeholders. His role focuses on supporting the firm's growth, expanding its professional networks, and creating opportunities for collaboration across its legal and consultancy services.",
      "Innocent brings a relationship-driven approach to business development, emphasising effective communication, strategic planning, stakeholder engagement, and the identification of opportunities that align with the firm's objectives. He contributes to strengthening the firm's market presence, building lasting client relationships, and supporting initiatives that promote sustainable business growth.",
      "At LawAge Advocates, Innocent works to connect the firm's capabilities with emerging market opportunities, foster productive partnerships, and enhance its engagement with clients and strategic stakeholders. His professional approach is guided by integrity, accountability, innovation, professionalism, and collaboration, which he considers essential to building trusted relationships and achieving long-term business objectives.",
    ],
    expertise: [
      "Business Development & Growth Strategy",
      "Strategic Partnerships & Alliances",
      "Client Relationship Management",
      "Stakeholder Engagement",
      "Market Opportunity Identification",
    ],
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
    title: "Administrative Officer",
    credentials: "M.Sc., LL.B., B.A.",
    photo: secilia.src,
    bio: [
      "Secilia is an administrative professional at LawAge Advocates, bringing a multidisciplinary background in law, climate change and sustainable development, and mass communication. She holds a Master of Science in Climate Change and Sustainable Development from the University of Dar es Salaam (UDSM), a Bachelor of Laws (LL.B) from Mzumbe University, and a Bachelor's degree in Mass Communication from UDSM.",
      "Her professional experience encompasses legal documentation, land-related matters, office coordination, and administrative affairs. She has practical experience in preparing and reviewing legal documents, facilitating land title applications, coordinating office operations, and supporting the effective delivery of legal and administrative services.",
      "At LawAge Advocates, Secilia supports daily administrative operations, documentation management, office coordination, and general administrative functions. Her legal background contributes to the organised handling of legal records and documentation, while her training in communication and sustainable development broadens her capacity to support institutional coordination and professional engagement.",
      "Secilia is committed to professionalism, accuracy, effective communication, and efficient office management, contributing to a well-organised working environment and the smooth delivery of the firm's services.",
    ],
    qualifications: [
      "M.Sc. in Climate Change and Sustainable Development, University of Dar es Salaam (UDSM)",
      "Bachelor of Laws (LL.B), Mzumbe University",
      "Bachelor's Degree in Mass Communication, University of Dar es Salaam (UDSM)",
    ],
    expertise: [
      "Office Administration & Operations Coordination",
      "Legal Documentation & Records Management",
      "Land-Related Matters & Title Applications",
      "Institutional Coordination & Communication",
      "Sustainable Development & Climate Policy Insights",
    ],
  },
  {
    slug: "sidaga-kihongo",
    name: "Sidaga Waziri Kihongo",
    department: "Technology & Data",
    title: "Machine Learning Engineer | Data Scientist | AI & Backend Systems Specialist",
    credentials: "Hamasa Media Group",
    photo: sidaga.src,
    bio: [
      "Sidaga Waziri Kihongo is a Tanzanian technology professional specializing in data science, machine learning, artificial intelligence, and software development. He focuses on building data-driven solutions, intelligent systems, and backend applications that solve real-world problems.",
      "He works as a Machine Learning Engineer and Data Analyst at Hamasa Media Group, where he develops data processing, analytics, and automation solutions for media monitoring and evaluation. His expertise includes machine learning, statistical analysis, Python programming, database management, and enterprise software development.",
      "With a background in computer science and a degree in Data Science, Sidaga combines analytical thinking and technical expertise to transform data into actionable insights and develop innovative technology solutions that support digital transformation in Tanzania and across Africa.",
    ],
    expertise: [
      "Machine Learning & Artificial Intelligence",
      "Data Science & Analytics",
      "Statistical Analysis",
      "Python Programming",
      "Backend & Enterprise Software Development",
      "Database Management",
      "Data Processing & Automation",
    ],
  },
];

/** Team members grouped under their department headings, in DEPARTMENTS order */
export const TEAM_BY_DEPARTMENT = DEPARTMENTS.map((department) => ({
  department,
  members: TEAM_MEMBERS.filter((m) => m.department === department),
})).filter((group) => group.members.length > 0);

/** The firm's lead team, featured on the home page */
const FEATURED_DEPARTMENTS: Department[] = [
  "Commercial & Strategic Sectors",
  "Technology, Digital Rights, Policy & Litigation",
  "Advocates",
  "Governance, Compliance & Investment",
  "Consultancy & Business Development",
];
export const FEATURED_TEAM = TEAM_MEMBERS.filter((m) =>
  FEATURED_DEPARTMENTS.includes(m.department),
);

export const findTeamMember = (slug: string) =>
  TEAM_MEMBERS.find(
    (m) => m.slug === slug || (slug === "oliver-costa" && m.slug === "olivia-costa"),
  );
