import { createFileRoute, notFound } from "@tanstack/react-router";

import { ServiceDetail } from "@/components/site/ServiceDetail";
import { SERVICES } from "@/lib/services";

import logo from "@/assets/lawage-logo.png";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} | LawAge Advocates & Consult` },
          { name: "description", content: loaderData.service.text },
          { property: "og:title", content: `${loaderData.service.title} | LawAge Advocates & Consult` },
          { property: "og:image", content: logo },
        ]
      : [],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  return <ServiceDetail service={service} />;
}
