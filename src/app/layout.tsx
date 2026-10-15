import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SITE_NAME } from "@/lib/seo";

import "@/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://lawage.vercel.app"),
  title: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  icons: { icon: { url: "/favicon.png", type: "image/png" }, apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Jost:wght@200;300;400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
