import Link from "next/link";
import Logo from "@/components/Logo";
import { businessUnits, products } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream-deep">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-teal-600">Newsletter</p>
            <h3 className="font-display mt-2 text-2xl font-semibold text-ink">
              Intelligence, in your inbox.
            </h3>
            <p className="mt-2 max-w-sm text-sm text-ink-soft/70">
              Monthly notes on localization, media intelligence and trust &amp;
              safety. No noise — just the signal.
            </p>
            <form className="mt-5 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-teal-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600"
              >
                Subscribe →
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold text-ink">Solutions</h4>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft/70">
                {businessUnits.map((unit) => (
                  <li key={unit.slug}>
                    <Link href="/#solutions" className="hover:text-ink">
                      {unit.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink">Products</h4>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft/70">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link href="/#products" className="hover:text-ink">
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink">Company</h4>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft/70">
                <li>
                  <Link href="/about" className="hover:text-ink">About</Link>
                </li>
                <li>
                  <Link href="/industries" className="hover:text-ink">Industries</Link>
                </li>
                <li>
                  <a href="https://blog.infoesearch.com" target="_blank" rel="noreferrer" className="hover:text-ink">
                    Blog
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-ink">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo variant="lockup" />
            <p className="mt-4 text-xs text-ink-soft/60">Powered by GLIP</p>
            <p className="text-xs text-ink-soft/60">Hyderabad · Dallas · Omaha</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft/60">
            <a href="#" className="hover:text-ink">Privacy Policy</a>
            <a href="#" className="hover:text-ink">Cookie Settings</a>
            <a href="#" className="hover:text-ink">Terms of Service</a>
            <a href="#" className="hover:text-ink">Security</a>
          </div>
        </div>
        <p className="mt-6 text-xs text-ink-soft/50">
          &copy; {new Date().getFullYear()} Infoesearch IT Solutions Pvt. Ltd. · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
