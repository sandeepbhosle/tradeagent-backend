import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with infoesearch about content moderation, trust & safety, localization & dubbing, or closed captioning & subtitling services.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        align="center"
        eyebrow="Contact"
        title="Let's talk about your content operations"
        description="Tell us about your platform, volume, and markets — our team will follow up with a tailored plan."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <Mail className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <a
                  href="mailto:hello@infoesearch.com"
                  className="text-sm text-slate-600 hover:text-brand-600"
                >
                  hello@infoesearch.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <Clock className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Availability</p>
                <p className="text-sm text-slate-600">24/7/365 operations</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <MapPin className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Coverage</p>
                <p className="text-sm text-slate-600">
                  Serving clients across the US, UK &amp; Canada
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
