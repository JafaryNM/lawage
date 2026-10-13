import companiesImg from "@/assets/post-companies.jpg";
import landImg from "@/assets/post-land.jpg";
import contractsImg from "@/assets/post-contracts.jpg";
import arbitrationImg from "@/assets/post-arbitration.jpg";
import estatesImg from "@/assets/post-estates.jpg";
import taxImg from "@/assets/post-tax.jpg";

export type Post = {
  slug: string;
  /** Slug of the practice area in SERVICES this post belongs to */
  area: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  author: string;
  /** ISO date, used for sorting */
  date: string;
};

// Sample articles — replace with the firm's published commentary.
export const POSTS: Post[] = [
  {
    slug: "companies-act-obligations-for-directors",
    area: "corporate-commercial",
    title: "Understanding the Companies Act obligations for directors",
    excerpt:
      "Key directors' duties under the Tanzanian Companies Act, including filing requirements and the liabilities that follow when they are missed.",
    body: [
      "Directors of Tanzanian companies carry duties that go well beyond attending board meetings. The Companies Act expects them to act in good faith, in the best interests of the company, and with the care a reasonably diligent person would show.",
      "In practice this means keeping proper records, filing annual returns on time and making sure conflicts of interest are declared. Missed filings can lead to penalties for the company and, in some cases, personal exposure for the directors themselves.",
      "A short annual governance review — checking registers, filings and board minutes — is one of the simplest ways for a board to stay compliant and spot issues early.",
    ],
    image: companiesImg,
    author: "Darton Attorneys",
    date: "2026-08-12",
  },
  {
    slug: "land-title-verification-dar-es-salaam",
    area: "land-property",
    title: "Land title verification in Dar es Salaam: what to check first",
    excerpt:
      "A practical guide to checking land registry records, planning details and title certificates before you buy property in Dar es Salaam.",
    body: [
      "Buying land in Dar es Salaam is a significant investment, and the title is where most disputes begin. Before any money changes hands, the seller's ownership should be verified against the official land registry records.",
      "Beyond the certificate itself, buyers should confirm the plot's planning use, check for existing mortgages or caveats, and make sure any spousal or family consents required for the sale have been obtained.",
      "A careful search at the outset costs far less than litigating a defective title later, and gives lenders the comfort they need to finance the purchase.",
    ],
    image: landImg,
    author: "Darton Attorneys",
    date: "2026-07-28",
  },
  {
    slug: "drafting-enforceable-commercial-contracts",
    area: "corporate-commercial",
    title: "Drafting enforceable commercial contracts under Tanzanian law",
    excerpt:
      "Critical elements that make commercial agreements binding and enforceable, and the clauses businesses most often overlook.",
    body: [
      "A contract is only as useful as your ability to enforce it. Clear identification of the parties, a precise description of obligations and an agreed price are the foundations of any enforceable agreement.",
      "Businesses frequently overlook dispute resolution, governing law and termination clauses until a problem arises. Deciding these points at the drafting stage avoids costly arguments about forum and procedure later.",
      "For cross-border deals, it is also worth considering currency, tax and regulatory approvals, so the contract works in practice as well as on paper.",
    ],
    image: contractsImg,
    author: "Darton Attorneys",
    date: "2026-07-09",
  },
  {
    slug: "arbitration-or-court-choosing-the-right-forum",
    area: "litigation-arbitration",
    title: "Arbitration or court? Choosing the right forum for your dispute",
    excerpt:
      "How confidentiality, speed, cost and enforceability should shape your choice between arbitration and litigation in Tanzania.",
    body: [
      "When a commercial relationship breaks down, the forum you choose can matter as much as the merits of your case. Arbitration and court litigation each offer distinct advantages.",
      "Arbitration is private, allows the parties to choose arbitrators with sector expertise and can move faster. Court proceedings, on the other hand, offer established appeal routes and may suit disputes that need urgent interim orders.",
      "The best time to make this choice is when the contract is drafted. A well-written dispute resolution clause saves months of procedural argument once a dispute begins.",
    ],
    image: arbitrationImg,
    author: "Darton Attorneys",
    date: "2026-06-18",
  },
  {
    slug: "planning-your-estate-wills-and-succession",
    area: "family-law",
    title: "Planning your estate: wills and succession in Tanzania",
    excerpt:
      "Why a properly drafted will protects your family, and what happens to an estate when there is none.",
    body: [
      "Many families only discover the importance of a will after a loved one has passed. Without one, the estate is distributed under the rules of succession that apply, which may not reflect the deceased's wishes.",
      "A properly drafted and witnessed will lets you choose your beneficiaries, appoint a trusted executor and make provision for children or dependants. It also shortens the probate process considerably.",
      "Reviewing your will after major life events — marriage, the birth of a child or the purchase of property — keeps it aligned with your circumstances.",
    ],
    image: estatesImg,
    author: "Darton Attorneys",
    date: "2026-05-30",
  },
  {
    slug: "responding-to-a-tra-tax-assessment",
    area: "tax-regulatory",
    title: "Responding to a TRA tax assessment: your options",
    excerpt:
      "What to do when you receive an assessment from the Tanzania Revenue Authority, and why deadlines matter.",
    body: [
      "Receiving a tax assessment from the Tanzania Revenue Authority can be unsettling, but taxpayers have clear rights to question an assessment they believe is wrong.",
      "The objection process is time-bound, so the first step is to note the deadline and gather the records that support your position. A well-reasoned objection, backed by documents, gives the best chance of resolving the matter without escalation.",
      "Where an objection is not resolved, further appeal routes are available. Early legal advice helps you choose the right strategy and avoid missing procedural requirements.",
    ],
    image: taxImg,
    author: "Darton Attorneys",
    date: "2026-05-14",
  },
];

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
