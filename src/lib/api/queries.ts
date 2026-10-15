"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Admin } from "@/lib/auth/session";
import type { AdminSlide } from "@/lib/slides";
import { apiFetch } from "./client";

/** Query keys, kept together so invalidations stay in step with the queries */
export const queryKeys = {
  me: ["auth", "me"] as const,
  slides: ["admin", "slides"] as const,
  slide: (id: number) => ["admin", "slides", id] as const,
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
    // Show the row from the list straight away while the full slide loads
    initialData: () => queryClient.getQueryData<AdminSlide[]>(queryKeys.slides)?.find((s) => s.id === id),
  });
}

/** Create (no id) or update a slide from the slide form */
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

/**
 * Optimistic change to the slide list: applied immediately, rolled back if the API refuses,
 * then refetched so the list matches the server either way.
 */
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
