"use client";

import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

import { useLogout } from "@/lib/api/queries";

export function LogoutButton() {
  const router = useRouter();
  const logout = useLogout();

  return (
    <button
      type="button"
      disabled={logout.isPending}
      onClick={() =>
        logout.mutate(undefined, {
          onSettled: () => {
            router.replace("/login");
            router.refresh();
          },
        })
      }
      className="inline-flex cursor-pointer items-center gap-2 border border-brand/20 px-4 py-2 text-xs uppercase tracking-[0.15em] text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white disabled:opacity-60"
    >
      {logout.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <LogOut className="size-3.5" />} Sign out
    </button>
  );
}
