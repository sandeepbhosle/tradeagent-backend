import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { services } from "@/lib/content";

const service = services.find((s) => s.slug === "localization-dubbing")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.description,
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
