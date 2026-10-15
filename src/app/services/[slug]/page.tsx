import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/site/ServiceDetail";
import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} | LawAge Advocates & Consult`,
    description: service.text,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
