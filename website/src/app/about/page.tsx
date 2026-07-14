import type { Metadata } from "next";
import { ShieldCheck, Globe2, Users2, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import StatsBar from "@/components/StatsBar";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Since 2007, infoesearch has delivered scalable, multilingual, compliance-first content moderation, localization, and trust & safety services.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Compliance-first",
    description:
      "Every workflow is built around FCC, CVAA, AODA, WCAG 2.0, and ADA standards from day one, not bolted on afterward.",
  },
  {
    icon: Globe2,
    title: "Truly multilingual",
    description:
      "Native-language teams handle translation, dubbing, and moderation with real cultural context, not machine output alone.",
  },
  {
    icon: Users2,
    title: "In-house, not outsourced",
    description:
      "Our moderation, safety, and localization specialists are our own certified employees, working under strict confidentiality and NDA.",
  },
  {
    icon: Clock,
    title: "Always on",
    description:
      "A 24/7/365 operating model means coverage doesn't stop at time zones or launch windows.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-grid-light">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
            Since 2007
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            A global content partner built for scale
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            For over 17 years, infoesearch has delivered scalable, multilingual,
            compliance-first services — from real-time media intelligence and
            localization to trust &amp; safety operations — for entertainment,
            streaming, and platform companies around the world.
          </p>
        </div>
      </section>

      <StatsBar />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="What we stand for"
          title="How we work"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600">
                <value.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-ink">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Our story"
            title="Two decades of content operations experience"
            description="What started as a media analysis and captioning partner has grown into a full-service content operations partner — spanning content moderation, trust & safety, and localization & dubbing — serving clients across the United States, United Kingdom, and Canada."
          />
        </div>
      </section>

      <CTABanner
        title="Want to learn more about working with us?"
        description="Tell us about your platform and content operations needs — our team will follow up within one business day."
      />
    </>
  );
}
