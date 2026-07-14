import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { services, type Service } from "@/lib/content";

export default function ServicePageTemplate({ service }: { service: Service }) {
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-grid-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <ServiceIcon icon={service.icon} className="h-7 w-7" />
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {service.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition hover:bg-brand-700"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 bg-ink">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3 lg:px-8">
          {service.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title={`What's included in ${service.name}`}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {service.capabilities.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="Our delivery process"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Explore more"
          title="Other ways we support your content operations"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <ServiceIcon icon={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
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
