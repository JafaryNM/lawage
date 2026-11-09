"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Admin } from "@/lib/auth/session";
import type { AdminSlide } from "@/lib/slides";
import type { CmsPost, CmsTeamMember, CmsService } from "@/lib/cms-server";
import type { SiteSettings } from "@/lib/settings";
import type { Enquiry } from "@/lib/enquiries";
import { apiFetch } from "./client";

/** Query keys, kept together so invalidations stay in step with the queries */
export const queryKeys = {
  me: ["auth", "me"] as const,
  slides: ["admin", "slides"] as const,
  slide: (id: number) => ["admin", "slides", id] as const,
  posts: ["admin", "posts"] as const,
  post: (id: number) => ["admin", "posts", id] as const,
  team: ["admin", "team"] as const,
  teamMember: (id: number) => ["admin", "team", id] as const,
  services: ["admin", "services"] as const,
  service: (id: number) => ["admin", "services", id] as const,
  settings: ["admin", "settings"] as const,
  enquiries: ["admin", "enquiries"] as const,
};

// ── Auth ────────────────────────────────────────────────────────────────

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { username: string; password: string }) =>
      apiFetch<Admin>("/api/auth/login", { method: "POST", body }),
    onSuccess: (admin) => queryClient.setQueryData(queryKeys.me, admin),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiFetch<void>("/api/auth/logout", { method: "POST" }),
    onSuccess: () => queryClient.clear(),
  });
}

// ── Hero slides ─────────────────────────────────────────────────────────

export function useSlides() {
  return useQuery({
    queryKey: queryKeys.slides,
    queryFn: () => apiFetch<AdminSlide[]>("/api/admin/slides"),
  });
}

export function useSlide(id: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: queryKeys.slide(id),
    queryFn: () => apiFetch<AdminSlide>(`/api/admin/slides/${id}`),
    initialData: () =>
      queryClient.getQueryData<AdminSlide[]>(queryKeys.slides)?.find((s) => s.id === id),
  });
}

export function useSaveSlide(id: number | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: FormData) =>
      id === null
        ? apiFetch<AdminSlide>("/api/admin/slides", { method: "POST", body: form })
        : apiFetch<AdminSlide>(`/api/admin/slides/${id}`, { method: "PUT", body: form }),
    onSuccess: (slide) => {
      queryClient.setQueryData(queryKeys.slide(slide.id), slide);
      return queryClient.invalidateQueries({ queryKey: queryKeys.slides, exact: true });
    },
  });
}

function useOptimisticSlides<V>(
  mutationFn: (vars: V) => Promise<unknown>,
  apply: (slides: AdminSlide[], vars: V) => AdminSlide[],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onMutate: async (vars: V) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.slides });
      const previous = queryClient.getQueryData<AdminSlide[]>(queryKeys.slides);
      if (previous) queryClient.setQueryData(queryKeys.slides, apply(previous, vars));
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(queryKeys.slides, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.slides }),
  });
}

export const useToggleSlide = () =>
  useOptimisticSlides(
    ({ id, isActive }: { id: number; isActive: boolean }) =>
      apiFetch<AdminSlide>(`/api/admin/slides/${id}`, { method: "PATCH", body: { isActive } }),
    (slides, { id, isActive }) => slides.map((s) => (s.id === id ? { ...s, isActive } : s)),
  );

export const useMoveSlide = () =>
  useOptimisticSlides(
    ({ id, direction }: { id: number; direction: "up" | "down" }) =>
      apiFetch<AdminSlide[]>(`/api/admin/slides/${id}/move`, { method: "POST", body: { direction } }),
    (slides, { id, direction }) => {
      const next = [...slides];
      const i = next.findIndex((s) => s.id === id);
      const j = direction === "up" ? i - 1 : i + 1;
      if (i < 0 || !next[j]) return slides;
      [next[i], next[j]] = [next[j]!, next[i]!];
      return next;
    },
  );

export const useDeleteSlide = () =>
  useOptimisticSlides(
    (id: number) => apiFetch<void>(`/api/admin/slides/${id}`, { method: "DELETE" }),
    (slides, id) => slides.filter((s) => s.id !== id),
  );

// ── Posts (Legal Updates) ───────────────────────────────────────────────

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => apiFetch<CmsPost[]>("/api/admin/posts"),
  });
}

export function usePost(id: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => apiFetch<CmsPost>(`/api/admin/posts/${id}`),
    initialData: () => queryClient.getQueryData<CmsPost[]>(queryKeys.posts)?.find((p) => p.id === id),
  });
}

export function useSavePost(id: number | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: FormData) =>
      id === null
        ? apiFetch<{ id: number; slug: string }>("/api/admin/posts", { method: "POST", body: form })
        : apiFetch<{ id: number; slug: string }>(`/api/admin/posts/${id}`, { method: "PUT", body: form }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      if (id !== null) queryClient.invalidateQueries({ queryKey: queryKeys.post(id) });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch<void>(`/api/admin/posts/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.posts }),
  });
}

// ── Team Members ────────────────────────────────────────────────────────

export function useTeam() {
  return useQuery({
    queryKey: queryKeys.team,
    queryFn: () => apiFetch<CmsTeamMember[]>("/api/admin/team"),
  });
}

export function useTeamMember(id: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: queryKeys.teamMember(id),
    queryFn: () => apiFetch<CmsTeamMember>(`/api/admin/team/${id}`),
    initialData: () => queryClient.getQueryData<CmsTeamMember[]>(queryKeys.team)?.find((m) => m.id === id),
  });
}

export function useSaveTeamMember(id: number | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: FormData) =>
      id === null
        ? apiFetch<{ id: number; slug: string }>("/api/admin/team", { method: "POST", body: form })
        : apiFetch<{ id: number; slug: string }>(`/api/admin/team/${id}`, { method: "PUT", body: form }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.team });
      if (id !== null) queryClient.invalidateQueries({ queryKey: queryKeys.teamMember(id) });
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch<void>(`/api/admin/team/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.team }),
  });
}

// ── Practice Areas / Services ───────────────────────────────────────────

export function useServices() {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: () => apiFetch<CmsService[]>("/api/admin/services"),
  });
}

export function useService(id: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: queryKeys.service(id),
    queryFn: () => apiFetch<CmsService>(`/api/admin/services/${id}`),
    initialData: () => queryClient.getQueryData<CmsService[]>(queryKeys.services)?.find((s) => s.id === id),
  });
}

export function useSaveService(id: number | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: FormData) =>
      id === null
        ? apiFetch<{ id: number; slug: string }>("/api/admin/services", { method: "POST", body: form })
        : apiFetch<{ id: number; slug: string }>(`/api/admin/services/${id}`, { method: "PUT", body: form }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services });
      if (id !== null) queryClient.invalidateQueries({ queryKey: queryKeys.service(id) });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch<void>(`/api/admin/services/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.services }),
  });
}

// ── Site Settings ───────────────────────────────────────────────────────

export function useSiteSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => apiFetch<SiteSettings>("/api/admin/settings"),
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: Partial<SiteSettings>) =>
      apiFetch<SiteSettings>("/api/admin/settings", { method: "PUT", body: settings }),
    onSuccess: (updated) => queryClient.setQueryData(queryKeys.settings, updated),
  });
}

// ── Enquiries ───────────────────────────────────────────────────────────

export function useEnquiries() {
  return useQuery({
    queryKey: queryKeys.enquiries,
    queryFn: () => apiFetch<Enquiry[]>("/api/admin/enquiries"),
  });
}

export function useToggleEnquiryRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isRead }: { id: number; isRead: boolean }) =>
      apiFetch<{ id: number; isRead: boolean }>(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        body: { isRead },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.enquiries }),
  });
}

export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch<void>(`/api/admin/enquiries/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.enquiries }),
  });
}
