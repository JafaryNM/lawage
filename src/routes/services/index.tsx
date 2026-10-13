import { createFileRoute, redirect } from "@tanstack/react-router";

import { SERVICES } from "@/lib/services";

// /services opens the detail view of the first practice area; the sidebar there lists them all
export const Route = createFileRoute("/services/")({
  beforeLoad: () => {
    throw redirect({ to: "/services/$slug", params: { slug: SERVICES[0]!.slug } });
  },
});
