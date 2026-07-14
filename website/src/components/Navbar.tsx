"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { businessUnits, products } from "@/lib/content";
import { accentClasses } from "@/lib/accent";

type DropdownKey = "solutions" | "products" | "company" | null;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownKey>(null);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 rounded-full border border-ink/10 bg-white/80 px-2 py-2 shadow-sm lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setDropdown("solutions")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream">
              Solutions
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {dropdown === "solutions" && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-2 shadow-xl">
                  {businessUnits.map((unit) => (
                    <Link
                      key={unit.slug}
                      href={`/#solutions`}
                      className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm hover:bg-cream"
                    >
                      <span
                        className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${accentClasses[unit.accent].dot}`}
                      />
                      <span>
                        <span className="block font-medium text-ink">{unit.name}</span>
                        <span className="mt-0.5 block text-xs text-ink-soft/70">
                          {unit.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/industries"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream"
          >
            Industries
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDropdown("products")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream">
              Products
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {dropdown === "products" && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-2 shadow-xl">
                  {products.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/#products`}
                      className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm hover:bg-cream"
                    >
                      <span
                        className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${accentClasses[product.accent].dot}`}
                      />
                      <span>
                        <span className="block font-medium text-ink">
                          {product.name}
                          <span className="ml-1.5 font-normal text-ink-soft/60">
                            {product.category}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-soft/70">
                          {product.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="https://blog.infoesearch.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream"
          >
            Resources
          </a>

          <div
            className="relative"
            onMouseEnter={() => setDropdown("company")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream">
              Company
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {dropdown === "company" && (
              <div className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-2 shadow-xl">
                  <Link href="/about" className="block rounded-xl px-4 py-2.5 text-sm text-ink hover:bg-cream">
                    About
                  </Link>
                  <Link href="/contact" className="block rounded-xl px-4 py-2.5 text-sm text-ink hover:bg-cream">
                    Contact
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cream"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
          >
            Book a demo →
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink/10 bg-white px-6 py-4 lg:hidden">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft/50">
            Solutions
          </p>
          <div className="mb-4 flex flex-col gap-1">
            {businessUnits.map((unit) => (
              <Link
                key={unit.slug}
                href="/#solutions"
                className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-cream"
                onClick={() => setMobileOpen(false)}
              >
                {unit.name}
              </Link>
            ))}
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft/50">
            Products
          </p>
          <div className="mb-4 flex flex-col gap-1">
            {products.map((product) => (
              <Link
                key={product.slug}
                href="/#products"
                className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-cream"
                onClick={() => setMobileOpen(false)}
              >
                {product.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 border-t border-ink/10 pt-3">
            {[
              { href: "/industries", label: "Industries" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-cream"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-full bg-teal-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Book a demo →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
