import Link from "next/link";
import { services, complianceStandards } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-ink text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
                iE
              </span>
              <span className="text-lg font-semibold text-white">infoesearch</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Global content localization, trust &amp; safety, and media
              intelligence partner since 2007.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white">
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">About</Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white">Industries</Link>
              </li>
              <li>
                <a href="https://blog.infoesearch.com" target="_blank" rel="noreferrer" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="mailto:hello@infoesearch.com" className="hover:text-white">
                  hello@infoesearch.com
                </a>
              </li>
              <li className="text-slate-400">Serving clients across the US, UK &amp; Canada</li>
              <li className="text-slate-400">Operations available 24/7/365</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} infoesearch. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {complianceStandards.map((c) => (
              <span
                key={c}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
