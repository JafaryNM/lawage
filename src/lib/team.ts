import stephen from "@/assets/team/stephen-msechu.jpg";
import robert from "@/assets/team/robert-majige.jpg";
import derick from "@/assets/team/derick-olotu.jpg";
import oliver from "@/assets/team/oliver-costa.jpg";
import innocent from "@/assets/team/innocent-mongi.jpg";
import davis from "@/assets/team/davis-komba.jpg";
import secilia from "@/assets/team/secilia-john.jpg";
import hamasa from "@/assets/team/hamasa-group.jpg";

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  credentials?: string;
  /** Photo is a company logo: shown whole on a tinted background rather than cropped */
  logo?: boolean;
};

// Team as listed in the LawAge Advocates firm profile
export const TEAM: TeamMember[] = [
  { name: "Stephen Wilbard Msechu", role: "Managing Partner", photo: stephen },
  { name: "Robert Sylivester Majige", role: "Partner", photo: robert },
  { name: "Derick Daudi Olotu", role: "Partner", photo: derick },
  {
    name: "Oliver Balilo Costa",
    credentials: "CMgr MCMI",
    role: "International Trade & Investment Facilitation Consultant",
    photo: oliver,
  },
  { name: "Innocent James Mongi", role: "Business Development Manager", photo: innocent },
];

// "Our Professional Support Team"
export const SUPPORT_TEAM: TeamMember[] = [
  { name: "Davis Betram Komba", role: "Legal Officer", photo: davis },
  { name: "Secilia Dominick John", role: "Legal Officer & Administration Officer", photo: secilia },
  { name: "Hamasa Group", role: "Information Technology Consultants", photo: hamasa, logo: true },
];
