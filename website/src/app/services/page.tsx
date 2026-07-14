import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Content moderation, trust & safety, localization & dubbing, and closed captioning & subtitling services from infoesearch.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-grid-light">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Services"
            title="Everything your content operations need, in one partner"
            description="From keeping platforms safe to helping content land naturally in every language and market — our in-house teams cover the full lifecycle."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <ServiceIcon icon={service.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-ink">
                {service.name}
              </h2>
              <p className="mt-2 text-slate-600">{service.tagline}</p>
              <ul className="mt-5 space-y-2">
                {service.capabilities.slice(0, 3).map((c) => (
                  <li key={c} className="text-sm text-slate-500">
                    &middot; {c}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                Learn more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
