import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import SectionHeading from "@/components/SectionHeading";
import StatsBar from "@/components/StatsBar";
import CTABanner from "@/components/CTABanner";
import { services, industries, complianceStandards, testimonials } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid-light">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              Trusted global partner since 2007
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              Content Moderation, Localization &amp; Trust &amp; Safety —
              at global scale
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              infoesearch helps media, streaming, and platform companies moderate,
              localize, dub, caption, and protect their content in every market
              they operate in — with in-house teams, not black-box outsourcing.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition hover:bg-brand-700"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/content-moderation"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-ink transition hover:border-slate-400"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Industries */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-400">
          Built for the teams behind global content
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry) => (
            <div
              key={industry}
              className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-5 text-center text-sm font-medium text-slate-600"
            >
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="What we do"
            title="One partner for content operations, worldwide"
            description="Four in-house service lines that scale with you — from a single market launch to global, multilingual content operations."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <ServiceIcon icon={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">
                  {service.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why infoesearch */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Why infoesearch"
              title="Compliance-first, in-house, and built to scale"
              description="Every service is delivered end-to-end by our own certified teams — no unmanaged subcontractors, no quality drift as volume grows."
            />
            <ul className="mt-8 space-y-4">
              {[
                "1,000+ certified moderation & safety experts working in-house",
                "500+ captioning specialists with 24/7/365 coverage",
                "Three-tier quality control on every deliverable",
                "FCC, CVAA, AODA, WCAG 2.0 & ADA compliant workflows",
                "Support across 40+ media formats and multiple languages",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.slug}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600">
                  <ServiceIcon icon={service.icon} className="h-4 w-4" />
                </span>
                <p className="mt-3 text-sm font-semibold text-ink">
                  {service.stats[0].value}
                </p>
                <p className="text-xs text-slate-500">{service.stats[0].label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance strip */}
      <section className="border-y border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 lg:px-8">
          <span className="text-sm font-semibold text-slate-500">
            Compliant with
          </span>
          {complianceStandards.map((c) => (
            <span key={c} className="text-sm font-semibold text-slate-700">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="What clients say"
          title="Trusted by content, safety & localization teams"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.role}
              className="rounded-2xl border border-slate-200 bg-white p-8"
            >
              <blockquote className="text-lg leading-relaxed text-slate-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-ink">
                {t.role}
                <span className="block font-normal text-slate-500">{t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
