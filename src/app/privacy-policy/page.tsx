import type { ReactNode } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy & Terms | LawAge Advocates",
  description:
    "Terms & Conditions and Personal Data Protection & Privacy Statement of LawAge Advocates, in line with the Tanzania Personal Data Protection Act, 2022.",
});

const EFFECTIVE_DATE = "1st October 2026";
const EMAIL = "info@lawage.co.tz";

type Section = { title: string; body: ReactNode };
type Part = { id: string; label: string; title: string; sections: Section[] };

const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
);

function Items({ items, ordered }: { items: [string, string][]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <List
      className={`mt-4 space-y-3 pl-6 text-muted-foreground ${ordered ? "list-[lower-roman]" : "list-disc"}`}
    >
      {items.map(([lead, text]) => (
        <li key={lead || text} className="pl-1 leading-relaxed marker:text-gold">
          {lead && <strong className="font-semibold text-foreground">{lead}. </strong>}
          {text}
        </li>
      ))}
    </List>
  );
}

const PARTS: Part[] = [
  {
    id: "terms",
    label: "Part I",
    title: "Terms and Conditions of Use",
    sections: [
      {
        title: "No Legal Advice and No Advocate-Client Relationship",
        body: (
          <P>
            The information and materials provided on this website are for general informational
            purposes only and do not constitute legal or professional advice. Accessing this
            website, downloading materials, or contacting us through our online forms does not
            create an advocate-client relationship. Always seek the advice of a qualified legal
            professional regarding your specific legal matters before taking any action.
          </P>
        ),
      },
      {
        title: "Intellectual Property Rights",
        body: (
          <P>
            All content on this website including articles, legal updates, logos, graphics, and
            design is the property of LawAge Advocates and is protected by applicable copyright and
            trademark laws. You may read, download, and print materials for personal, non-commercial
            use only. Any other reproduction, distribution, or modification is strictly prohibited
            without our prior written consent.
          </P>
        ),
      },
      {
        title: "Limitation of Liability",
        body: (
          <P>
            While we strive to keep the information on this website accurate and up to date, we make
            no warranties regarding its completeness, accuracy, or current relevance. LawAge
            Advocates will not be liable for any direct, indirect, incidental, or consequential
            damages arising from your use of, or inability to use, this website or its content.
          </P>
        ),
      },
    ],
  },
  {
    id: "privacy",
    label: "Part II",
    title: "Personal Data Protection and Privacy Statement",
    sections: [
      {
        title: "Commitment to Data Protection",
        body: (
          <P>
            We respect your privacy and are committed to protecting your personal data in strict
            compliance with the Tanzania Personal Data Protection Act, 2022 (PDPA), its subsidiary
            regulations, and international data protection standards.
          </P>
        ),
      },
      {
        title: "Information We Collect",
        body: (
          <>
            <P>
              We may collect and process the following personal data when you interact with our
              website:
            </P>
            <Items
              items={[
                [
                  "Identity and Contact Data",
                  "Name, email address, phone number, and organization name (if provided via contact forms or newsletter subscriptions).",
                ],
                [
                  "Technical Data",
                  "IP address, browser type, time zone, and operating system collected automatically through cookies and similar tracking technologies to ensure website functionality.",
                ],
                [
                  "Communication Data",
                  "Information you provide when requesting legal services, seeking employment, or communicating with our team.",
                ],
              ]}
            />
          </>
        ),
      },
      {
        title: "Purpose and Legal Basis for Processing",
        body: (
          <>
            <P>
              We process your personal data lawfully, fairly, and transparently for the following
              purposes:
            </P>
            <Items
              ordered
              items={[
                [
                  "",
                  "To respond to your inquiries and provide requested legal or advisory services.",
                ],
                [
                  "",
                  "To send you legal updates, newsletters, or event invitations (only with your explicit consent).",
                ],
                [
                  "",
                  "To analyze website traffic and improve our user experience (legitimate interest).",
                ],
                ["", "To comply with statutory and regulatory obligations."],
              ]}
            />
          </>
        ),
      },
      {
        title: "Data Sharing and Cross-Border Transfers",
        body: (
          <P>
            We do not sell or rent your personal data to third parties. We may share your data with
            trusted third-party service providers (e.g., secure IT and hosting partners) who act on
            our strict instructions and are bound by confidentiality agreements. Should your data
            need to be transferred outside the United Republic of Tanzania, we will only do so in
            strict compliance with the PDPA and ensure that appropriate safeguards are in place.
          </P>
        ),
      },
      {
        title: "Data Security and Retention",
        body: (
          <P>
            We implement robust technical and organizational security measures to protect your
            personal data from negligent loss, unauthorized access, alteration, or disclosure. We
            retain your data only for as long as necessary to fulfill the purposes for which it was
            collected, or as required by Tanzanian laws and legal record-keeping obligations.
          </P>
        ),
      },
      {
        title: "Your Rights as a Data Subject",
        body: (
          <>
            <P>Under the Tanzanian PDPA, you have the right to:</P>
            <Items
              ordered
              items={[
                ["Access", "Request a copy of the personal data we hold about you."],
                ["Correction", "Request the correction of any inaccurate or incomplete data."],
                [
                  "Erasure",
                  "Request the deletion of your personal data under certain legal conditions.",
                ],
                [
                  "Withdraw Consent",
                  "Withdraw your consent for data processing (e.g., unsubscribing from marketing emails) at any time.",
                ],
                [
                  "Lodge a Complaint",
                  "File a complaint with the Personal Data Protection Commission (PDPC) of Tanzania if you believe your data privacy rights have been violated.",
                ],
              ]}
            />
          </>
        ),
      },
      {
        title: "Cookies",
        body: (
          <P>
            Our website uses cookies to enhance your browsing experience. You can choose to accept
            or decline cookies through your browser settings. Declining non-essential cookies may
            limit certain functionalities of the website.
          </P>
        ),
      },
    ],
  },
  {
    id: "general",
    label: "Part III",
    title: "General Provisions",
    sections: [
      {
        title: "Governing Law and Jurisdiction",
        body: (
          <P>
            These Terms and the Privacy Statement are governed by and construed in accordance with
            the laws of the United Republic of Tanzania. Any disputes arising in connection with
            this website shall be subject to the exclusive jurisdiction of the courts of Tanzania.
          </P>
        ),
      },
      {
        title: "Changes to this Policy",
        body: (
          <P>
            We reserve the right to amend these Terms &amp; Conditions and the Privacy Statement at
            any time to reflect changes in the law or our internal practices. Any updates will be
            posted on this page with a revised "Effective Date."
          </P>
        ),
      },
      {
        title: "Contact Us",
        body: (
          <>
            <P>
              If you have any questions about these Terms, the Privacy Statement, or wish to
              exercise your data protection rights, please contact us at:
            </P>
            <dl className="mt-5 grid gap-3 border-l-4 border-gold bg-brand/5 p-6 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
              <dt className="font-semibold text-foreground">Firm Name</dt>
              <dd className="text-muted-foreground">LawAge Advocates</dd>
              <dt className="font-semibold text-foreground">Physical Address</dt>
              <dd className="text-muted-foreground">
                Plot 33, Block AC, Medeli, Tambukareli, First Floor, P.O. Box 1909, Dodoma –
                Tanzania.
              </dd>
              <dt className="font-semibold text-foreground">Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="text-brand hover:underline">
                  {EMAIL}
                </a>
              </dd>
              <dt className="font-semibold text-foreground">Phone</dt>
              <dd>
                <a href="tel:+255713282263" className="text-brand hover:underline">
                  +255 713 282263
                </a>
              </dd>
            </dl>
          </>
        ),
      },
    ],
  },
];

export default function PrivacyPolicy() {
  // Sections are numbered continuously across parts, after "1. Introduction"
  let n = 1;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBanner title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />

      <main className="mx-auto max-w-[900px] px-6 py-[70px] md:py-24">
        <span className="inline-block border border-gold px-4 py-2 text-xs uppercase tracking-[0.12em] text-brand">
          Effective Date: {EFFECTIVE_DATE}
        </span>
        <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
          Terms &amp; Conditions and Personal Data Protection &amp; Privacy Statement
        </h2>

        <section className="mt-12">
          <h3 className="text-xl md:text-2xl">1. Introduction</h3>
          <P>
            Welcome to the website of LawAge Advocates ("LawAge Advocates," "we,"
            "us," or "our"). By accessing or using our website (www.lawage.co.tz), you agree to
            comply with these Terms &amp; Conditions and our Privacy Statement. If you do not agree,
            please do not use our website.
          </P>
        </section>

        {PARTS.map((part) => (
          <section key={part.id} id={part.id} className="mt-16 scroll-mt-32">
            <div className="border-b border-border pb-4">
              <span className="text-xs uppercase tracking-[0.22em] text-gold">{part.label}</span>
              <h2 className="mt-2 text-2xl md:text-3xl">{part.title}</h2>
            </div>
            {part.sections.map((s) => {
              n += 1;
              return (
                <div key={s.title} className="mt-10">
                  <h3 className="text-xl md:text-2xl">
                    {n}. {s.title}
                  </h3>
                  {s.body}
                </div>
              );
            })}
          </section>
        ))}

        <p className="mt-16 font-[var(--font-display)] text-2xl text-brand">Thank You.</p>
      </main>

      <Footer />
    </div>
  );
}
