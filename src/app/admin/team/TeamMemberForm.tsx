"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSaveTeamMember } from "@/lib/api/queries";
import type { CmsTeamMember } from "@/lib/cms-server";
import { DEPARTMENTS, type Department } from "@/lib/team";

export function TeamMemberForm({ member }: { member: CmsTeamMember | null }) {
  const router = useRouter();
  const saveMutation = useSaveTeamMember(member ? member.id : null);

  const [name, setName] = useState(member?.name ?? "");
  const [slug, setSlug] = useState(member?.slug ?? "");
  const [department, setDepartment] = useState<Department>(
    (member?.department as Department) ?? DEPARTMENTS[0]!,
  );
  const [title, setTitle] = useState(member?.title ?? "");
  const [credentials, setCredentials] = useState(member?.credentials ?? "");
  const [email, setEmail] = useState(member?.email ?? "");
  const [linkedin, setLinkedin] = useState(member?.linkedin ?? "");
  const [cvUrl, setCvUrl] = useState(member?.cvUrl ?? "");
  const [photo, setPhoto] = useState(member?.photo ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(member?.photo ?? "");
  const [bioText, setBioText] = useState(member?.bio ? member.bio.join("\n\n") : "");
  const [qualificationsText, setQualificationsText] = useState(
    member?.qualifications ? member.qualifications.join("\n") : "",
  );
  const [expertiseText, setExpertiseText] = useState(
    member?.expertise ? member.expertise.join("\n") : "",
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleNameChange = (val: string) => {
    setName(val);
    if (!member && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/adv\.?\s*/gi, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("department", department);
    formData.append("title", title);
    formData.append("credentials", credentials);
    formData.append("email", email);
    formData.append("linkedin", linkedin);
    formData.append("cvUrl", cvUrl);
    formData.append("bio", bioText);
    formData.append("qualifications", qualificationsText);
    formData.append("expertise", expertiseText);
    formData.append("photo", photo);
    if (photoFile) {
      formData.append("photoFile", photoFile);
    }

    saveMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(
          member ? "Team member updated successfully." : "Team member added successfully.",
        );
        router.push("/admin/team");
        router.refresh();
      },
      onError: (err: any) => {
        if (err?.fieldErrors) {
          setFieldErrors(err.fieldErrors);
        }
        toast.error(err.message || "Failed to save team member.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between border-b border-black/5 pb-6">
        <div>
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-brand"
          >
            <ArrowLeft className="size-3.5" /> Back to Team
          </Link>
          <h1 className="mt-2 text-2xl font-normal text-foreground md:text-3xl">
            {member ? "Edit Team Profile" : "Add Team Member"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" type="button">
            <Link href="/admin/team">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-brand text-white hover:bg-brand-deep"
          >
            {saveMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {member ? "Save Changes" : "Save Profile"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 rounded-[8px] bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Full Name *</label>
            <Input
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Stephen Wilbard Msechu"
              className="mt-2 text-base"
            />
            {fieldErrors["name"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["name"]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">URL Slug *</label>
            <Input
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. stephen-msechu"
              className="mt-2 text-sm font-mono"
            />
            {fieldErrors["slug"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["slug"]}</p>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Department *</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as Department)}
              className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {fieldErrors["department"] && (
              <p className="mt-1 text-xs text-destructive">{fieldErrors["department"]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Position / Title *</label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Managing Partner – Commercial & Strategic Sectors"
              className="mt-2 text-sm"
            />
            {fieldErrors["title"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["title"]}</p>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Credentials / Degrees</label>
            <Input
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              placeholder="e.g. LL.M, LL.B (Hons), Dip. Law"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Direct Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. smsechu@lawage.co.tz"
              className="mt-2 text-sm"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">LinkedIn URL</label>
            <Input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://www.linkedin.com/in/..."
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">CV / Profile Link</label>
            <Input
              value={cvUrl}
              onChange={(e) => setCvUrl(e.target.value)}
              placeholder="https://..."
              className="mt-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Profile Photo</label>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload a professional portrait photo (JPG, PNG or WebP).
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="size-28 rounded-[4px] object-cover object-top border border-border"
              />
            )}
            <div className="flex-1 space-y-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <Upload className="size-4" />
                Upload New Photo
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <div className="text-xs text-muted-foreground">Or enter an image URL:</div>
              <Input
                value={photo}
                onChange={(e) => {
                  setPhoto(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://... or /assets/..."
                className="text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground">Biography</label>
            <span className="text-xs text-muted-foreground">Separate paragraphs with blank lines</span>
          </div>
          <Textarea
            rows={8}
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Detailed professional bio and background..."
            className="mt-2 text-sm leading-relaxed"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-foreground">Qualifications &amp; Education</label>
              <span className="text-xs text-muted-foreground">One per line</span>
            </div>
            <Textarea
              rows={6}
              value={qualificationsText}
              onChange={(e) => setQualificationsText(e.target.value)}
              placeholder="Master of Laws (LL.M)&#10;Postgraduate Diploma in Legal Practice (LST)&#10;Bachelor of Laws (LL.B)"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-foreground">Key Expertise</label>
              <span className="text-xs text-muted-foreground">One per line</span>
            </div>
            <Textarea
              rows={6}
              value={expertiseText}
              onChange={(e) => setExpertiseText(e.target.value)}
              placeholder="Corporate & Commercial Law&#10;Banking & Finance&#10;Mergers & Acquisitions"
              className="mt-2 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-black/5 pt-6">
          <Button asChild variant="outline" type="button">
            <Link href="/admin/team">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-brand text-white hover:bg-brand-deep"
          >
            {saveMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {member ? "Save Changes" : "Save Profile"}
          </Button>
        </div>
      </div>
    </form>
  );
}

