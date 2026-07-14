export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  capabilities: string[];
  stats: { label: string; value: string }[];
  process: { title: string; description: string }[];
};

export const services: Service[] = [
  {
    slug: "content-moderation",
    name: "Content Moderation",
    shortName: "Content Moderation",
    tagline: "Keep every platform safe, compliant, and on-brand — at any scale.",
    description:
      "Our in-house moderation teams review text, image, video, chat, and live-stream content around the clock, enforcing your community guidelines with consistent, auditable judgment across every market you operate in.",
    icon: "shield-check",
    capabilities: [
      "Text, image, video & live-stream moderation",
      "Comments & product review moderation",
      "UGC and AI-assisted moderation workflows",
      "Social media monitoring & sentiment analysis",
      "Policy enforcement & escalation management",
      "Custom moderation guidelines per platform",
    ],
    stats: [
      { label: "Certified moderation experts", value: "1,000+" },
      { label: "Operating around the clock", value: "24/7/365" },
      { label: "Content types covered", value: "Text · Image · Video · Chat" },
    ],
    process: [
      { title: "Guideline mapping", description: "We translate your community standards into actionable, auditable moderation playbooks." },
      { title: "Human + AI triage", description: "AI pre-screens volume; trained specialists review edge cases and high-severity content." },
      { title: "Escalation & reporting", description: "Time-critical incidents route to senior reviewers with full audit trails for compliance." },
      { title: "Continuous calibration", description: "Regular quality audits keep accuracy and consistency high as policies evolve." },
    ],
  },
  {
    slug: "trust-and-safety",
    name: "Trust & Safety",
    shortName: "Trust & Safety",
    tagline: "Protect your users from fraud, abuse, and harm — in-house, end to end.",
    description:
      "From identity verification to fraud detection and incident response, our Trust & Safety operations protect your platform and its users while keeping you ahead of evolving regulatory requirements.",
    icon: "lock-shield",
    capabilities: [
      "Identity & age verification",
      "Fraud, phishing & account-takeover prevention",
      "Rapid incident response & escalation",
      "Community guideline & policy enforcement",
      "Data privacy & security safeguards",
      "Regulatory & compliance reporting",
    ],
    stats: [
      { label: "In-house safety specialists", value: "1,000+" },
      { label: "Incident response", value: "Rapid response" },
      { label: "Confidentiality", value: "NDA-backed teams" },
    ],
    process: [
      { title: "Risk assessment", description: "We map your platform's abuse vectors — fraud, harassment, impersonation, and beyond." },
      { title: "Verification & enforcement", description: "Identity checks and policy enforcement run continuously to keep bad actors out." },
      { title: "Incident response", description: "A dedicated response team investigates and resolves safety incidents quickly." },
      { title: "Compliance reporting", description: "Transparent audit trails and reporting keep you ready for regulators and partners." },
    ],
  },
  {
    slug: "localization-dubbing",
    name: "Localization & Dubbing",
    shortName: "Localization & Dubbing",
    tagline: "Take your content to any market, in any language, without losing its voice.",
    description:
      "Our localization studio handles translation, voice-over, dubbing, and audio description so your content lands naturally with audiences worldwide — without compromising tone, timing, or cultural nuance.",
    icon: "globe",
    capabilities: [
      "Voice-over & professional dubbing",
      "Translation & transcription",
      "Audio description for accessibility",
      "Cultural adaptation & script localization",
      "Multilingual quality control",
      "Digital marketing localization",
    ],
    stats: [
      { label: "Years localizing global content", value: "17+" },
      { label: "Markets served", value: "US · UK · Canada +more" },
      { label: "Formats supported", value: "40+" },
    ],
    process: [
      { title: "Script & context review", description: "Linguists and subject specialists prepare source material for translation and adaptation." },
      { title: "Translation & adaptation", description: "Native-language teams translate and culturally adapt scripts, not just words." },
      { title: "Voice-over & dubbing", description: "Professional voice talent records dubs matched to timing, tone, and character." },
      { title: "Multilingual QC", description: "A three-tier review process checks accuracy, sync, and cultural fit before delivery." },
    ],
  },
  {
    slug: "closed-captioning-subtitling",
    name: "Closed Captioning & Subtitling",
    shortName: "Captioning & Subtitling",
    tagline: "Accurate, compliant captions and subtitles — delivered fast, at any volume.",
    description:
      "We've delivered more than 15 million minutes of closed captions and subtitles across broadcast, streaming, and corporate media, meeting FCC, CVAA, AODA, WCAG 2.0, and ADA accessibility standards.",
    icon: "captions",
    capabilities: [
      "Closed captioning & broadcast captioning",
      "Subtitling in 40+ media formats",
      "Transcription & translation",
      "Three-tier quality control process",
      "FCC, CVAA, AODA, WCAG 2.0 & ADA compliance",
      "Fast turnaround for time-sensitive media",
    ],
    stats: [
      { label: "Minutes of captions delivered", value: "15M+" },
      { label: "Caption & subtitle accuracy", value: "99.5%" },
      { label: "Captioning specialists on call", value: "500+" },
    ],
    process: [
      { title: "Ingest & format check", description: "Media is ingested and validated across 40+ supported formats." },
      { title: "Caption & subtitle generation", description: "Trained specialists produce captions with precise timing and speaker accuracy." },
      { title: "Three-tier QC", description: "Every file passes three independent quality checks before delivery." },
      { title: "Compliant delivery", description: "Final files meet FCC, CVAA, AODA, WCAG 2.0, and ADA accessibility standards." },
    ],
  },
];

export const stats = [
  { label: "Years in business", value: "17+" },
  { label: "In-house moderation experts", value: "1,000+" },
  { label: "Captioning specialists", value: "500+" },
  { label: "Minutes of captions delivered", value: "15M+" },
  { label: "Caption & subtitle accuracy", value: "99.5%" },
  { label: "Operations coverage", value: "24/7/365" },
];

export const industries = [
  "Entertainment & Media",
  "OTT & Streaming Platforms",
  "Social & UGC Platforms",
  "Advertising Agencies",
  "PR & Corporate Communications",
  "Media Monitoring Companies",
];

export const complianceStandards = ["FCC", "CVAA", "AODA", "WCAG 2.0", "ADA"];

export const testimonials = [
  {
    quote:
      "Bringing moderation and captioning in-house with Infoesearch let us scale into new markets without scaling our own headcount. The quality control process is the most rigorous we've worked with.",
    role: "Head of Trust & Safety",
    context: "Global streaming platform",
  },
  {
    quote:
      "Their localization team doesn't just translate — they adapt. Dubs land the way the original was meant to feel, in every language we've launched in.",
    role: "VP of Content Operations",
    context: "Media & entertainment company",
  },
];
