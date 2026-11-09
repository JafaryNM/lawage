import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/site/ServiceDetail";
import { getDbServiceBySlug, getDbServices, getDbSettings } from "@/lib/cms-server";
import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function findService(slug: string) {
  const dbService = getDbServiceBySlug(slug);
  if (dbService) return dbService;
  return SERVICES.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  const dbServices = getDbServices();
  if (dbServices.length) return dbServices.map(({ slug }) => ({ slug }));
  return SERVICES.map(({ slug }) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} | LawAge Advocates`,
    description: service.text,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) notFound();

  const allServices = getDbServices({ onlyActive: true });
  const services = allServices.length ? allServices : SERVICES;
  const settings = getDbSettings();

  return <ServiceDetail service={service} services={services} settings={settings} />;
}
