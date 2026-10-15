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

// Legal updates published on lawage.co.tz (summarised; full versions on the firm's site)
export const POSTS: Post[] = [
  {
    slug: "aml-ctf-cfp-compliance-training",
    area: "corporate-business-investment-law",
    title: "Training on AML, CTF and CFP Compliance by Reporting Persons",
    excerpt:
      "A three-day course for reporting persons on complying with anti-money laundering, counter terrorist financing and counter financing of proliferation laws in light of recent amendments.",
    body: [
      "LawAge Advocates & Consult offers a three-day training on compliance with Anti-Money Laundering, Counter Terrorist Financing and Counter Financing of Proliferation obligations for reporting persons, in light of the recent amendments.",
      "The course covers both international and domestic enforcement mechanisms. Understanding the international framework helps reporting persons see why compliance with domestic AML, CTF and CFP laws and regulations matters.",
      "Institutions that want to strengthen their compliance systems can contact the firm for the full course outline.",
    ],
    image: companiesImg,
    author: "LawAge Advocates & Consult",
    date: "2022-11-16",
  },
  {
    slug: "zanzibar-companies-act-section-238-amendment",
    area: "corporate-business-investment-law",
    title: "The Amendment of Section 238 of the Zanzibar Companies Act, 2013",
    excerpt:
      "What the Zanzibar Finance Act amendment means for mainland companies holding a Zanzibar Certificate of Compliance, who must now seek fresh incorporation in Zanzibar.",
    body: [
      "On 21 September 2021, Zanzibar's Minister of Trade and Industrial Development announced an amendment to section 238 of the Companies Act, 2013, made through section 29 of the Zanzibar Finance Act, 2021.",
      "Companies first incorporated on Tanzania Mainland and holding a Zanzibar Certificate of Compliance must seek fresh incorporation in Zanzibar within 90 days. Those that do not comply will be removed from Zanzibar's Register of Companies and lose the right to operate there.",
      "The change is expected to raise revenue for Zanzibar and increase demand for Zanzibar-based accountants and lawyers. Companies operating in both parts of the Union may face higher compliance costs and should decide early how to structure their operations.",
    ],
    image: contractsImg,
    author: "Adv. Stephen Msechu",
    date: "2021-10-06",
  },
  {
    slug: "written-laws-miscellaneous-amendments-no-2-act-2021",
    area: "litigation-dispute-resolution",
    title: "A Critical Analysis of the Written Laws (Miscellaneous Amendments) (No. 2) Act, 2021",
    excerpt:
      "Our analysis of the proposed bill and its amendments to the Advocates Act, Cap 341, and what they mean for private legal practitioners in Tanzania.",
    body: [
      "The Government submitted the Written Laws (Miscellaneous Amendments) (No. 2) Bill, 2021, which among other things proposes amendments to the Advocates Act, Cap 341 (R.E. 2019).",
      "Our analysis examines the proposed changes and their legal implications for private legal practitioners in Tanzania.",
    ],
    image: arbitrationImg,
    author: "LawAge Advocates & Consult",
    date: "2021-05-20",
  },
  {
    slug: "ruling-preliminary-objections-constitutional-petition",
    area: "litigation-dispute-resolution",
    title: "Briefing on the Ruling of Preliminary Objections on a Constitutional Petition",
    excerpt:
      "A briefing on the constitutional petition over the Ndanda parliamentary seat and the Attorney General's preliminary objections.",
    body: [
      "Cecil David Mwambe was elected Member of Parliament for Ndanda in 2015 on a CHADEMA ticket. On 15 February 2020 he left CHADEMA to join CCM.",
      "CHADEMA's Secretary General wrote to the Speaker stating that Mwambe had lost his qualification as an MP under Article 71(1)(f) of the Constitution, but the Speaker declined to declare the seat vacant.",
      "Paul Revocatus Kaunda challenged the Speaker's decision through a constitutional petition. The Attorney General raised preliminary objections, and this briefing discusses the court's ruling on them.",
    ],
    image: estatesImg,
    author: "LawAge Advocates & Consult",
    date: "2020-06-20",
  },
  {
    slug: "regulations-banning-plastic-carrier-bags",
    area: "ngos-development-partners-public-sector",
    title: "Know the Regulations Banning Plastic Carrier Bags",
    excerpt:
      "How to avoid financial loss and imprisonment under the Environmental Management (Prohibition of Plastic Carrier Bags) Regulations, 2019.",
    body: [
      "The Environmental Management (Prohibition of Plastic Carrier Bags) Regulations, 2019 were issued under section 230(2)(f) of the Environmental Management Act and took effect on 1 June 2019.",
      "They impose a total ban on the manufacture, export, import, supply and use of prohibited plastic carrier bags, protect human and animal health, and support businesses producing alternative carrier bags on Tanzania Mainland.",
      "Authorities may no longer register, license or permit anyone to import, export, sell or manufacture prohibited bags. Businesses should review their packaging to avoid penalties.",
    ],
    image: landImg,
    author: "LawAge Advocates & Consult",
    date: "2019-05-08",
  },
];

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
