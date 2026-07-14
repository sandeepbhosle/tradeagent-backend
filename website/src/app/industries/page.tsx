import type { Metadata } from "next";
import { Film, Radio, Users, Megaphone, Building2, Search } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { services } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "infoesearch serves entertainment, streaming, social platforms, advertising agencies, PR firms, and media monitoring companies worldwide.",
};

const industryDetails = [
  {
    name: "Entertainment & Media",
    icon: Film,
    description:
      "Studios and production companies rely on us for captioning, subtitling, dubbing, and content review across their libraries.",
  },
  {
    name: "OTT & Streaming Platforms",
    icon: Radio,
    description:
      "Multilingual localization and 24/7 moderation help streaming platforms launch into new markets without slowing down releases.",
  },
  {
    name: "Social & UGC Platforms",
    icon: Users,
    description:
      "In-house moderation teams review text, image, video, and live content at scale to enforce community guidelines consistently.",
  },
  {
    name: "Advertising Agencies",
    icon: Megaphone,
    description:
      "Localized, culturally adapted campaigns and creative assets that land the same way in every market you launch in.",
  },
  {
    name: "PR & Corporate Communications",
    icon: Building2,
    description:
      "Transcription, translation, and media analysis support fast-moving corporate communications and press operations.",
  },
  {
    name: "Media Monitoring Companies",
    icon: Search,
    description:
      "Sentiment analysis, competitive intelligence, and social listening built on accurate, multilingual content review.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-grid-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Industries"
            title="Built for the teams behind global content"
            description="From entertainment studios to social platforms, we support the organizations that create, distribute, and protect content at scale."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industryDetails.map((industry) => (
            <div
              key={industry.name}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <industry.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-ink">
                {industry.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{industry.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Relevant services"
            title="Services these industries rely on"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:border-brand-400 hover:text-brand-600"
              >
                {service.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
