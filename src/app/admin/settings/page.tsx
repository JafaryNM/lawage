import type { Metadata } from "next";
import { getDbSettings } from "@/lib/cms-server";
import { SettingsManager } from "./SettingsManager";

export const metadata: Metadata = {
  title: "Site Settings | Admin | LawAge Advocates",
};

export default function SettingsPage() {
  const initialSettings = getDbSettings();
  return <SettingsManager initialSettings={initialSettings} />;
}

