"use client";

import { useState, type FormEvent } from "react";
import { products } from "@/lib/content";

export default function DemoRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-ink">Thanks — we&apos;ll be in touch</h3>
        <p className="mt-2 text-sm text-ink-soft/70">
          This is a demo form and isn&apos;t connected to an inbox yet — wire it
          up to your CRM or a form backend before launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-ink/10 bg-white p-8">
      <div>
        <h2 className="text-lg font-semibold text-ink">Request a demo</h2>
        <p className="mt-1 text-sm text-ink-soft/60">
          We&apos;ll run mSUBS or mTRACKER against a sample of your content — live.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-ink/15 px-3.5 py-2.5 text-sm text-ink focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium text-ink">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-1.5 w-full rounded-lg border border-ink/15 px-3.5 py-2.5 text-sm text-ink focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-lg border border-ink/15 px-3.5 py-2.5 text-sm text-ink focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <div>
        <label htmlFor="interest" className="text-sm font-medium text-ink">I&apos;m interested in</label>
        <select
          id="interest"
          name="interest"
          className="mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        >
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name} — {product.category}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">What are you solving?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1.5 w-full rounded-lg border border-ink/15 px-3.5 py-2.5 text-sm text-ink focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600 sm:w-auto"
      >
        Request my demo →
      </button>
      <p className="text-xs text-ink-soft/50">
        Prefer email? sales@infoesearch.com
      </p>
    </form>
  );
}
