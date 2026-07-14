import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import StatTile from "@/components/StatTile";
import CTABanner from "@/components/CTABanner";
import { accentClasses } from "@/lib/accent";
import {
  businessUnits,
  products,
  industries,
  outcomeTags,
  homeOutcomes,
  knowledgeHubPosts,
  aiPipelineSteps,
} from "@/lib/content";

const aboutStrip = [
  { value: "2", label: "Business units, one platform" },
  { value: "3", label: "Flagship & emerging products" },
  { value: "AI+H", label: "Human-in-the-loop by default" },
];

const placeholderClients = Array.from({ length: 6 }, (_, i) => `Client ${i + 1}`);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <span className="eyebrow inline-flex rounded-full border border-ink/10 bg-white px-4 py-1.5 text-teal-600">
          Content operations · AI + human judgment · Since 2007
        </span>
        <h1 className="font-display mt-8 text-6xl font-semibold text-ink sm:text-7xl">
          Hello
        </h1>
        <p className="font-display mt-6 text-3xl leading-snug text-ink sm:text-4xl">
          Make content <span className="text-teal-500">global.</span>
          <br />
          Make media <span className="text-blue-500">measurable.</span>
          <br />
          Make platforms <span className="text-coral-500">safe.</span>
        </p>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft/70">
          Infoesearch runs content operations for broadcasters, streaming
          platforms, media intelligence firms and online communities —
          combining proprietary AI with expert human judgment, 24 hours a
          day, since 2007.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
          >
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#solutions"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
          >
            Explore solutions
          </Link>
        </div>
      </section>

      {/* About strip */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>About Infoesearch</Eyebrow>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              From a media-services company to a content operations company.
            </h2>
          </div>
          <p className="text-lg text-ink-soft/70">
            We help organisations solve multilingual communication, media
            intelligence and trust &amp; safety challenges. Our
            differentiator is the synergy of technology and human expertise —
            AI for speed and scale, humans for accuracy and judgment.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
          {aboutStrip.map((stat) => (
            <StatTile key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Business units */}
      <section id="solutions" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              Three business units, one hybrid model.
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {businessUnits.map((unit) => (
            <div
              key={unit.slug}
              className={`rounded-2xl border border-ink/10 border-t-4 bg-white p-6 ${accentClasses[unit.accent].border}`}
            >
              <h3 className="text-lg font-semibold text-ink">{unit.name}</h3>
              <p className="mt-2 text-sm text-ink-soft/70">{unit.tagline}</p>
              <ul className="mt-5 space-y-1.5">
                {unit.services.slice(0, 4).map((service) => (
                  <li key={service} className="text-xs text-ink-soft/60">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-cream-deep py-20">
        <div className="mx-auto max-w-7xl scroll-mt-24 px-6 lg:px-8">
          <Eyebrow>Products</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            Enterprise platforms, powered by GLIP.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.slug} className="rounded-2xl border border-ink/10 bg-white p-6">
                <span
                  className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${accentClasses[product.accent].bg} ${accentClasses[product.accent].text}`}
                >
                  {product.name}
                </span>
                <p className="mt-3 text-sm font-medium text-ink">{product.category}</p>
                <p className="mt-2 text-sm text-ink-soft/70">{product.tagline}</p>
                <span
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${accentClasses[product.accent].text}`}
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organised around outcomes */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow tone="dark">Built to serve</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">
            Organised around your outcomes, not our org chart.
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                By industry
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.slice(0, 8).map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                By outcome
              </p>
              <div className="flex flex-wrap gap-2">
                {outcomeTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/industries"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            See all solutions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Industries grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Eyebrow>Industries we serve</Eyebrow>
        <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          Built for the industries media touches.
        </h2>
        <p className="mt-3 max-w-xl text-ink-soft/70">
          A modular framework — new industries slot in without a redesign.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry) => (
            <div
              key={industry}
              className="flex items-center justify-center rounded-xl border border-ink/10 bg-white px-3 py-5 text-center text-sm font-medium text-ink-soft"
            >
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* AI + Human pipeline */}
      <section className="bg-cream-deep py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>The AI + human-in-the-loop approach</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            Where AI accelerates, humans guarantee.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiPipelineSteps.map((step) => (
              <div
                key={step.step}
                className={`rounded-2xl border p-6 ${
                  step.title === "Verify"
                    ? "border-teal-500 bg-white ring-1 ring-teal-500"
                    : "border-ink/10 bg-white"
                }`}
              >
                <span className="eyebrow text-ink-soft/40">{step.step}</span>
                <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-soft/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink-soft/40">
          Trusted by teams who can&apos;t afford to be wrong
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {placeholderClients.map((client) => (
            <div
              key={client}
              className="flex items-center justify-center rounded-xl border border-dashed border-ink/15 py-6 text-xs text-ink-soft/40"
            >
              {client} logo
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-soft/40">
          Placeholder tiles — swap in confirmed client logos before launch.
        </p>
      </section>

      {/* Outcomes measured */}
      <section className="bg-cream-deep py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Outcomes, measured</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            Outcomes, measured.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {homeOutcomes.map((outcome) => (
              <div key={outcome.segment} className="rounded-2xl border border-ink/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/40">
                  {outcome.segment}
                </p>
                <p className="font-display mt-3 text-3xl font-semibold text-teal-600">
                  {outcome.value}
                  {outcome.verify && <span className="verify-badge">Verify</span>}
                </p>
                <p className="mt-2 text-sm text-ink-soft/70">{outcome.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge hub teaser */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Latest insights</Eyebrow>
            <h2 className="font-display mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              From the Knowledge Hub.
            </h2>
          </div>
          <a
            href="https://blog.infoesearch.com"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-sm font-semibold text-teal-600 sm:inline-flex"
          >
            Visit blog.infoesearch.com
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {knowledgeHubPosts.map((post) => (
            <a
              key={post.title}
              href="https://blog.infoesearch.com"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-28 rounded-xl bg-gradient-to-br from-teal-50 to-blue-50" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal-600">
                {post.category}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
                {post.title}
              </h3>
            </a>
          ))}
        </div>
      </section>

      <CTABanner
        title="See the hybrid approach on your own content."
        description="Book a 30-minute demo and we'll run mSUBS or mTRACKER against a sample of your media — as processed, human-verified, live."
        primaryLabel="Book a demo"
        secondaryLabel="Contact sales"
        secondaryHref="/contact"
      />
    </>
  );
}
