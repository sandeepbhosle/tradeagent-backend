import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner({
  title = "Ready to scale your content operations globally?",
  description = "Talk to our team about moderation, localization, dubbing, or trust & safety coverage tailored to your platform.",
  primaryLabel = "Get a Quote",
  primaryHref = "/contact",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-600 px-8 py-16 text-center shadow-xl sm:px-16">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{description}</p>
          <div className="mt-8 flex justify-center">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
