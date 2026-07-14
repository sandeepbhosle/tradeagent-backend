import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import StatTile from "@/components/StatTile";
import CTABanner from "@/components/CTABanner";
import {
  aboutStats,
  sixReasons,
  strengthStats,
  teamMembers,
  industryRecognition,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Since 2007, Infoesearch has run the high-volume, accuracy-critical work behind modern media — localization, media intelligence and trust & safety.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Eyebrow>About Infoesearch</Eyebrow>
        <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:items-start">
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Content operations, since 2007.
          </h1>
          <p className="text-lg text-ink-soft/70">
            Since 2007, Infoesearch has run the high-volume, accuracy-critical
            work behind modern media — localization, media intelligence and
            trust &amp; safety — combining proprietary AI with expert human
            judgment, backed by
            <span className="font-semibold text-ink"> 1,500+ specialists</span>
            <span className="verify-badge">Verify</span> operating 24×7.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
          {aboutStats.map((stat) => (
            <StatTile key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              Seeking excellence in a fragmented industry.
            </h2>
            <p className="mt-5 text-ink-soft/70">
              The specialized content operations landscape is massively
              fragmented, and further affected by a gig-based format. We seek
              to disrupt that by being a partner who does more than get the
              job done.
            </p>
            <p className="mt-4 text-ink-soft/70">
              Our mission is to provide a centralized platform that
              strengthens your core operations, manages your workflows, and
              ultimately helps you succeed and reach your business goals.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-teal-500 p-8" style={{ minHeight: 320 }}>
            <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
                One centralized platform
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink">
                Localization · Media Analysis · Trust &amp; Safety — operated
                as one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Six reasons */}
      <section className="bg-cream-deep py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Why global brands work with us</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            Six reasons the world&apos;s media teams stay.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sixReasons.map((reason, i) => (
              <div key={reason.number} className="rounded-2xl border border-ink/10 bg-white p-6">
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    ["bg-blue-50 text-blue-500", "bg-teal-50 text-teal-600", "bg-violet-50 text-violet-500", "bg-coral-50 text-coral-500"][
                      i % 4
                    ]
                  }`}
                >
                  {reason.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{reason.title}</h3>
                <p className="mt-2 text-sm text-ink-soft/70">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>The team</Eyebrow>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              From a 2007 startup to a content operations company.
            </h2>
          </div>
          <Link href="/contact" className="hidden text-sm font-semibold text-teal-600 sm:inline-flex">
            Full leadership →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  {
                    blue: "bg-blue-50 text-blue-500",
                    violet: "bg-violet-50 text-violet-500",
                    teal: "bg-teal-50 text-teal-600",
                    coral: "bg-coral-50 text-coral-500",
                  }[member.accent]
                }`}
              >
                {member.initial}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{member.name}</h3>
              <p className="text-xs font-medium text-teal-600">{member.role}</p>
              <p className="mt-3 text-sm text-ink-soft/70">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strength in numbers */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow tone="dark">Strength in numbers</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">
            Scale you can hand your hardest workloads to.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-3">
            {strengthStats.map((stat) => (
              <StatTile key={stat.label} stat={stat} tone="dark" />
            ))}
          </div>
        </div>
      </section>

      {/* Industry recognised */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Industry recognised</Eyebrow>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              Accredited, certified, and trusted where it counts.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {industryRecognition.map((badge) => (
              <span
                key={badge.name}
                className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {badge.name}
                {badge.tag && <span className="verify-badge">{badge.tag}</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Let's strengthen your core operations."
        description="See how one managed platform for localization, media analysis, and trust & safety changes your workflow."
        primaryLabel="Book a demo"
        secondaryLabel="Explore services"
        secondaryHref="/#solutions"
      />
    </>
  );
}
