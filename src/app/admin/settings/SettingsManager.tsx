"use client";

import { useState } from "react";
import { Building2, Globe, Loader2, Mail, MapPin, Phone, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSiteSettings, useUpdateSiteSettings } from "@/lib/api/queries";
import type { SiteSettings } from "@/lib/settings";

export function SettingsManager({ initialSettings }: { initialSettings: SiteSettings }) {
  const { data: settings = initialSettings } = useSiteSettings();
  const updateMutation = useUpdateSiteSettings();

  const [form, setForm] = useState<SiteSettings>({
    ...initialSettings,
    ...settings,
  });

  const update = (key: keyof SiteSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(form, {
      onSuccess: () => {
        toast.success("Site settings updated successfully.");
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to update settings.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Site <span className="text-brand">Settings</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Configure firm contact details, addresses, tagline, vision, mission, and social channels.
          </p>
        </div>

        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-brand text-white hover:bg-brand-deep"
        >
          {updateMutation.isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Save className="mr-2 size-4" />
          )}
          Save Settings
        </Button>
      </div>

      {/* FIRM IDENTITY */}
      <div className="rounded-[8px] bg-white p-6 shadow-sm md:p-8">
        <h2 className="flex items-center gap-2.5 text-xl text-foreground">
          <Building2 className="size-5 text-brand" /> Firm Identity
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Basic brand information displayed in the header, footer and hero.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Firm Name</label>
            <Input
              required
              value={form.firm_name}
              onChange={update("firm_name")}
              placeholder="LawAge Advocates"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Firm Tagline</label>
            <Input
              value={form.tagline}
              onChange={update("tagline")}
              placeholder="A Class Above Legal Excellence"
              className="mt-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground">Firm Vision</label>
            <Textarea
              rows={3}
              value={form.vision}
              onChange={update("vision")}
              placeholder="Our vision..."
              className="mt-2 text-sm leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Firm Mission</label>
            <Textarea
              rows={3}
              value={form.mission}
              onChange={update("mission")}
              placeholder="Our mission..."
              className="mt-2 text-sm leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* CONTACT DETAILS */}
      <div className="rounded-[8px] bg-white p-6 shadow-sm md:p-8">
        <h2 className="flex items-center gap-2.5 text-xl text-foreground">
          <Phone className="size-5 text-brand" /> Official Contacts
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Telephone, WhatsApp and email addresses used throughout the site and contact page.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-foreground">Call Phone</label>
            <Input
              value={form.phone_call}
              onChange={update("phone_call")}
              placeholder="+255 713 282263"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">WhatsApp Number</label>
            <Input
              value={form.phone_whatsapp}
              onChange={update("phone_whatsapp")}
              placeholder="+255 777 626294"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Primary Email</label>
            <Input
              type="email"
              value={form.email_primary}
              onChange={update("email_primary")}
              placeholder="info@lawage.co.tz"
              className="mt-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* PHYSICAL LOCATIONS */}
      <div className="rounded-[8px] bg-white p-6 shadow-sm md:p-8">
        <h2 className="flex items-center gap-2.5 text-xl text-foreground">
          <MapPin className="size-5 text-brand" /> Office Locations &amp; Maps
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Physical addresses for Dodoma headquarters and Dar es Salaam branch.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground">Dodoma Office Address</label>
            <Input
              value={form.address_dodoma}
              onChange={update("address_dodoma")}
              placeholder="Plot 33, Block AC, Medeli, Tambukareli, First Floor, P.O. Box 1909, Dodoma, Tanzania"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Dar es Salaam Office Address</label>
            <Input
              value={form.address_dar}
              onChange={update("address_dar")}
              placeholder="3rd Floor, Sukari House, Sokoine Drive/Ohio Street, P.O. Box 75841, Dar es Salaam"
              className="mt-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA */}
      <div className="rounded-[8px] bg-white p-6 shadow-sm md:p-8">
        <h2 className="flex items-center gap-2.5 text-xl text-foreground">
          <Globe className="size-5 text-brand" /> Social Media Links
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Links to official LawAge social media and public profiles.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">LinkedIn URL</label>
            <Input
              value={form.social_linkedin}
              onChange={update("social_linkedin")}
              placeholder="https://www.linkedin.com/company/lawage-advocates"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Instagram URL</label>
            <Input
              value={form.social_instagram}
              onChange={update("social_instagram")}
              placeholder="https://www.instagram.com/lawage_consult"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Facebook URL</label>
            <Input
              value={form.social_facebook}
              onChange={update("social_facebook")}
              placeholder="https://facebook.com/..."
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Twitter / X URL</label>
            <Input
              value={form.social_twitter}
              onChange={update("social_twitter")}
              placeholder="https://twitter.com/..."
              className="mt-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-brand text-white hover:bg-brand-deep"
        >
          {updateMutation.isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Save className="mr-2 size-4" />
          )}
          Save Settings
        </Button>
      </div>
    </form>
  );
}

