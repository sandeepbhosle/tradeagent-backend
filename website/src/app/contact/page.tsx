import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import DemoRequestForm from "@/components/DemoRequestForm";
import { officeLocations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Infoesearch about localization, media analysis, or trust & safety services, or request a live demo of mSUBS, mTRACKER, mDUBS, or mSHIELD.",
};

const contactCards = [
  {
    label: "Sales",
    title: "Contact Sales",
    description: "Scope a rollout across products and services.",
    email: "sales@infoesearch.com",
  },
  {
    label: "Demo",
    title: "Request a Demo",
    description: "See the hybrid workflow on your own content.",
    email: null,
  },
  {
    label: "Support",
    title: "Customer Support",
    description: "Existing customer? Reach the support desk directly.",
    email: "support@infoesearch.com",
  },
  {
    label: "Careers",
    title: "Careers",
    description: "Join the team building AI + human intelligence.",
    email: "careers@infoesearch.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display mt-2 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Let&apos;s talk about your media.
        </h1>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {contactCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-ink/10 bg-white p-5">
                <p className="eyebrow text-teal-600">{card.label}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">{card.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft/70">{card.description}</p>
                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="mt-2 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    {card.email} →
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <DemoRequestForm />
          </div>
        </div>
      </section>

      <section className="bg-cream-deep py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Eyebrow>Office locations</Eyebrow>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {officeLocations.map((office) => (
              <div key={office.city} className="rounded-2xl border border-ink/10 bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">
                  {office.city}{" "}
                  <span className="text-xs font-medium uppercase tracking-wide text-teal-600">
                    {office.country}
                  </span>
                </h3>
                <p className="mt-3 text-sm text-ink-soft/70">{office.address}</p>
                <div className="mt-4 space-y-1 border-t border-ink/10 pt-3 text-sm">
                  <p className="text-ink-soft/70">{office.phone}</p>
                  <a href={`mailto:${office.email}`} className="text-teal-600 hover:text-teal-700">
                    {office.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
