import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import CTABanner from "@/components/CTABanner";
import { accentClasses, type Accent } from "@/lib/accent";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Infoesearch is organised around your outcomes, not our org chart — start from the industry you operate in, or the business need you're solving.",
};

const industryCards: {
  code: string;
  name: string;
  accent: Accent;
  description: string;
  tags: string[];
}[] = [
  {
    code: "M&E",
    name: "Media & Entertainment",
    accent: "blue",
    description: "Localize, monitor and protect content across the whole distribution chain.",
    tags: ["OTT", "Broadcast", "News & Publishing", "Sports", "Gaming"],
  },
  {
    code: "OTT",
    name: "OTT Platforms",
    accent: "teal",
    description: "Ship multilingual catalogues at launch scale with broadcast-grade QC.",
    tags: ["Subtitling", "Dubbing", "Metadata localization"],
  },
  {
    code: "BRD",
    name: "Broadcast",
    accent: "blue",
    description: "Live captioning, compliance and real-time media monitoring.",
    tags: ["Live Captioning", "SDH", "Broadcast Monitoring"],
  },
  {
    code: "NWS",
    name: "News & Publishing",
    accent: "violet",
    description: "Measure coverage and reputation across every channel.",
    tags: ["Media Intelligence", "PR Measurement", "Sentiment"],
  },
  {
    code: "SPT",
    name: "Sports",
    accent: "violet",
    description: "Protect rights, grow reach and track reputation globally.",
    tags: ["Localization", "Brand Monitoring", "Moderation"],
  },
  {
    code: "GAM",
    name: "Gaming",
    accent: "coral",
    description: "Localize experiences and keep communities safe at scale.",
    tags: ["Localization", "Community Moderation", "Trust & Safety"],
  },
  {
    code: "SaaS",
    name: "Technology & SaaS",
    accent: "teal",
    description: "Localize product, docs and marketing for global launch.",
    tags: ["Software", "App", "Documentation Localization"],
  },
  {
    code: "BFSI",
    name: "BFSI",
    accent: "coral",
    description: "Compliance-grade accuracy for regulated communication.",
    tags: ["Localization", "Risk Ops", "Fraud Investigation"],
  },
  {
    code: "GOV",
    name: "Healthcare & Government",
    accent: "coral",
    description: "Sensitive-content review and public-sector trust.",
    tags: ["Accessibility", "Content Review", "Compliance"],
  },
];

const templateSections = [
  "Industry / need overview",
  "Business challenges",
  "Our AI-powered hybrid solution",
  "Human-in-the-loop process",
  "Industries served",
  "Technology used",
  "Workflow",
  "Business benefits",
  "Case studies (future)",
  "Call to action",
];

export default function IndustriesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Eyebrow>Solutions</Eyebrow>
        <h1 className="font-display mt-2 max-w-2xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Organised around your outcomes, not our org chart.
        </h1>
        <p className="mt-5 max-w-2xl text-ink-soft/70">
          Start from the industry you operate in, or the business need
          you&apos;re solving. Either path leads to the same AI + human-in-the-loop
          capability — mapped to the right services and products.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industryCards.map((industry) => (
            <div key={industry.code} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span
                className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${accentClasses[industry.accent].bg} ${accentClasses[industry.accent].text}`}
              >
                {industry.code}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-ink">{industry.name}</h2>
              <p className="mt-2 text-sm text-ink-soft/70">{industry.description}</p>
              <p className="mt-4 text-xs text-ink-soft/50">{industry.tags.join(" · ")}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-ink/10 bg-cream-deep px-5 py-4 text-sm text-ink-soft/70">
          <span className="eyebrow mr-2 text-teal-600">Modular</span>
          New industries slot into the same template as our Industry
          Intelligence Framework rolls out — no redesign required.
        </p>
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow tone="dark">The solution page template</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">
            Every solution &amp; industry page tells the same, complete story.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {templateSections.map((section, i) => (
              <div key={section} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="eyebrow text-teal-500">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm text-white/80">{section}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-white/40">
            Structured with semantic headings, FAQ blocks and schema — built
            for SEO and GEO discoverability.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-cream-deep px-6 py-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-ink">Not sure where you fit?</h3>
            <p className="mt-1 text-sm text-ink-soft/70">
              Tell us your challenge and we&apos;ll map the right solution.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Talk to us →
          </Link>
        </div>
      </section>

      <CTABanner
        title="Let's map your solution."
        description="Tell us about your platform, volume, and markets — our team will follow up with a tailored plan."
        primaryLabel="Book a demo"
      />
    </>
  );
}
