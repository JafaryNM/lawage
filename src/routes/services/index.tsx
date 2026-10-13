import { createFileRoute } from "@tanstack/react-router";

import { ServiceDetail } from "@/components/site/ServiceDetail";
import { SERVICES } from "@/lib/services";

import logo from "@/assets/darton-logo.png";

// /services shows the first practice area in the full detail layout; the sidebar links to the rest
export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Practice Areas | Darton Attorneys" },
      {
        name: "description",
        content:
          "Corporate, litigation, land, family, employment and tax legal services from Darton Attorneys in Dar es Salaam, Tanzania.",
      },
      { property: "og:title", content: "Practice Areas | Darton Attorneys" },
      { property: "og:image", content: logo },
    ],
  }),
  component: () => <ServiceDetail service={SERVICES[0]!} />,
});
