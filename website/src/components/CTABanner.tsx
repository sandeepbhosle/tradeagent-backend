import Link from "next/link";

export default function CTABanner({
  title,
  description,
  primaryLabel = "Book a demo →",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center sm:px-16">
        <div className="bg-grid-dark absolute inset-0" aria-hidden />
        <div className="relative">
          <h2 className="font-display mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-white/60">{description}</p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
