import type { Metadata } from "next";

import logo from "@/assets/lawage-logo.png";

export const SITE_NAME = "LawAge Advocates";

/** Title, description and social-share tags for a page; the share image defaults to the logo */
export function pageMetadata({
  title,
  description,
  ogTitle = title,
  ogDescription = description,
  image = logo.src,
}: {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}
