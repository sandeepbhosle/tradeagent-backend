export type Stat = { value: string; label: string; verify?: boolean };

export type BusinessUnit = {
  slug: string;
  name: string;
  accent: "teal" | "blue" | "coral";
  tagline: string;
  services: string[];
};

export const businessUnits: BusinessUnit[] = [
  {
    slug: "localization-services",
    name: "Localization Services",
    accent: "teal",
    tagline:
      "Translation, subtitling, captioning, dubbing and voice localization — single-vendor, human-validated.",
    services: [
      "Subtitling",
      "Closed Captioning & SDH",
      "Localization QA",
      "Voice Dubbing & Voice Casting",
      "Metadata Localization",
      "Accessibility Services",
      "Multilingual Project Management",
    ],
  },
  {
    slug: "media-analysis",
    name: "Media Analysis",
    accent: "blue",
    tagline:
      "Monitoring and localization across print, online, broadcast and social — measured, not just collected.",
    services: [
      "Media Monitoring",
      "Broadcast Monitoring",
      "Social Listening",
      "Sentiment Analysis",
      "Share of Voice",
      "PR Measurement",
      "Crisis Alerting",
      "Competitor Tracking",
      "Influencer Tracking",
      "Ad Intelligence",
      "Custom Dashboards",
      "Analyst Reporting",
    ],
  },
  {
    slug: "trust-and-safety",
    name: "Trust & Safety",
    accent: "coral",
    tagline:
      "Content moderation, risk operations and data quality control — with human-in-the-loop review.",
    services: [
      "Content Moderation",
      "Fraud & Risk Review",
      "Brand Safety",
      "Live-Stream Moderation",
      "Image & Video Review",
      "Text & Chat Review",
      "Data Annotation",
      "Policy Consulting",
      "Appeals Handling",
      "Crisis Response",
    ],
  },
];

export type Product = {
  slug: string;
  name: string;
  category: string;
  accent: "teal" | "blue" | "coral" | "violet";
  tagline: string;
  description: string;
  coverage: string;
  stats: Stat[];
};

export const products: Product[] = [
  {
    slug: "mtracker",
    name: "mTRACKER",
    category: "Enterprise Media Intelligence",
    accent: "blue",
    tagline: "Know what's being said, the moment it airs.",
    description:
      "AI-native media intelligence platform with analyst-verified sentiment and share of voice — monitoring broadcast, print, digital and social together, on one desk.",
    coverage: "TV · Radio · Print · Digital · Social",
    stats: [
      { value: "80+", label: "Languages monitored" },
      { value: "250K+", label: "Sources tracked daily" },
      { value: "<5 min", label: "Alert latency" },
      { value: "4.1x", label: "Faster time-to-detect on breaking coverage", verify: true },
      { value: "96.8%", label: "Sentiment-scoring accuracy, analyst-validated", verify: true },
    ],
  },
  {
    slug: "msubs",
    name: "mSUBS",
    category: "Localization at Scale",
    accent: "teal",
    tagline: "Every viewer, in their language — at the speed you distribute.",
    description:
      "mSUBS subtitles and captions your library into 80+ languages at distribution speed — broadcast-grade timing, low-latency live captions, and native-linguist accuracy built in. AI for scale; humans for the meaning machine translation drops.",
    coverage: "Subtitling · Captioning · Live · SDH",
    stats: [
      { value: "80+", label: "Languages, native-verified" },
      { value: "15M+", label: "Caption minutes delivered" },
      { value: "Δ0.8s", label: "Live caption latency target" },
      { value: "24×7", label: "Follow-the-sun delivery" },
    ],
  },
  {
    slug: "mdubs",
    name: "mDUBS",
    category: "Voice Localization",
    accent: "violet",
    tagline: "Every audience, in their own voice — at the speed you distribute.",
    description:
      "mDUBS dubs your library into 40+ languages with AI speed and human direction — casting, cast-sync and mixing that make a performance land, not just translate. AI for director-level speed; the craft stays human.",
    coverage: "Voice Casting · Dub-Direction · Lip-Sync & Timing · Mix & Master",
    stats: [
      { value: "$10.2B", label: "Global dubbing & localization market", verify: true },
      { value: "8.7%", label: "Market CAGR", verify: true },
      { value: "194", label: "Language & dialect variants covered", verify: true },
      { value: "60%+", label: "Faster turnaround vs. traditional dub houses", verify: true },
    ],
  },
  {
    slug: "mshield",
    name: "mSHIELD",
    category: "Trust & Safety",
    accent: "coral",
    tagline: "AI catches the volume. Humans catch the harm that hides in context.",
    description:
      "Moderation is largely automated across the industry — and that's exactly why the hard cases slip through. mSHIELD pairs AI triage at platform scale with trained human adjudication for the grey zone machines get wrong: context, culture, intent, satire and evolving policy.",
    coverage: "Text · Image · Video · Audio · Live streams",
    stats: [
      { value: "1.2B+", label: "Items reviewed monthly", verify: true },
      { value: "94%", label: "Auto-cleared by AI triage", verify: true },
      { value: "24×7", label: "Follow-the-sun coverage" },
      { value: "HITL", label: "Human-in-the-loop by default" },
    ],
  },
];

export const teamMembers = [
  {
    name: "Suresh Reddy",
    role: "Founder & Chief Executive",
    initial: "S",
    accent: "blue",
    bio: "Founded Infoesearch in 2007 after years helping brands grow across auto, insurance, real estate, tech and entertainment. Leads the AI & ML efforts behind proprietary technology.",
  },
  {
    name: "Aravind Rao",
    role: "Co-Founder & COO",
    initial: "A",
    accent: "violet",
    bio: "The operational and tactical force behind Infoesearch's growth since 2010. 17+ years across media, broadcasting and finance; sets the bar for service, efficiency and delivery.",
  },
  {
    name: "Todd Murphy",
    role: "Exec. Director — Global Media Insights",
    initial: "T",
    accent: "teal",
    bio: "Decades shaping media monitoring, PR measurement and corporate communications. President of FIBEP — 120+ organizations across 50 countries — and leads the World Media Intelligence Congress.",
  },
  {
    name: "Moin",
    role: "Director of Technology",
    initial: "M",
    accent: "coral",
    bio: "Leads Infoesearch's IT infrastructure and software, building proprietary technology across AI, ML, cloud and mobile. 20+ years previously building enterprise media solutions for Fox and Discovery.",
  },
];

export const aboutStats: Stat[] = [
  { value: "2007", label: "Founded" },
  { value: "1,500+", label: "Associates", verify: true },
  { value: "24×7", label: "Global operations" },
  { value: "AI+H", label: "Human-in-the-loop" },
];

export const strengthStats: Stat[] = [
  { value: "0.3B+", label: "Videos processed every month for moderation", verify: true },
  { value: "0B+", label: "Images moderated every month", verify: true },
  { value: "13M+", label: "Text / comments moderated" },
  { value: "0M+", label: "Videos served for closed captioning", verify: true },
  { value: "0+", label: "Skilled, innovative professionals", verify: true },
  { value: "24×7", label: "Operations across time zones" },
];

export const sixReasons = [
  { number: "01", title: "Deep industry expertise", description: "Spanning industries, verticals, technologies and consumer behaviours." },
  { number: "02", title: "Focused on outcomes", description: "Delivering the right results to meet your goals — no more outdated practices." },
  { number: "03", title: "Scalable & efficient", description: "A trained, qualified workforce ready to support evolving needs and diversification." },
  { number: "04", title: "Platform-agnostic", description: "Deploy seamlessly on any platform and achieve results in real time." },
  { number: "05", title: "AI-powered + human-controlled", description: "Advanced AI modules, supported by a team of certified media experts." },
  { number: "06", title: "Excellent customer support", description: "24×7 live assistance from a real, helpful human." },
];

export const industries = [
  "Media & Entertainment",
  "OTT Platforms",
  "Broadcast",
  "News & Publishing",
  "Sports",
  "Gaming",
  "E-learning",
  "Technology & SaaS",
  "BFSI",
  "Healthcare",
  "Government",
  "More coming",
];

export const outcomeTags = [
  "Multilingual Content Localization",
  "AI Subtitling & PR Measurement",
  "Media Intelligence & Brand Reputation Monitoring",
  "Content Moderation & Trust & Safety",
  "Accessibility & Compliance",
];

export const complianceStandards = ["FCC", "CVAA", "AODA", "WCAG 2.0", "ADA", "Section 508"];

export const industryRecognition = [
  { name: "ISO Certified", tag: "VERIFY" },
  { name: "DCMP", tag: "PLATFORM STANDARD" },
  { name: "NSEZ", tag: "" },
  { name: "EGA Member", tag: "CERT NO." },
];

export const officeLocations = [
  {
    city: "Hyderabad",
    country: "India · HQ",
    address:
      "Infoesearch ITES Pvt. Ltd. — IT Block 1, Wing A, III Floor, NSL Arena (SEZ), IDA, Uppal, Hyderabad 500039, Telangana, India.",
    phone: "+91 40 6786 9999",
    email: "connect@infoesearch.com",
  },
  {
    city: "Texas",
    country: "USA",
    address:
      "Infoesearch Inc. — 325 North St. Paul Street, Suite 3100 #6689, Dallas, Texas 75201, USA.",
    phone: "+1 (248) 690 2217",
    email: "info.global@infoesearch.com",
  },
  {
    city: "Omaha",
    country: "USA",
    address: "Infoesearch Inc. — 4601 Catalyst Court, Omaha, Nebraska 68106, USA.",
    phone: "+1 (972) 210 6802",
    email: "info.global@infoesearch.com",
  },
];

export const knowledgeHubPosts = [
  {
    title: "Infoesearch at Media InSite's 15th Anniversary Conference: From Insight to Impact",
    category: "Media Analysis",
  },
  {
    title: "GEO for PR Measurement: In Simple Terms",
    category: "Media Analysis",
  },
  {
    title: "Balancing AI-Driven Media Monitoring and Analysis",
    category: "Media Analysis",
  },
];

export const homeOutcomes = [
  {
    segment: "OTT · Media Intelligence",
    value: "3.0x",
    label: "faster PR measurement cycle after moving to mTRACKER with human-verified content",
    verify: true,
  },
  {
    segment: "Broadcast · Localization",
    value: "74+",
    label: "languages subtitled per title with mSUBS and broadcast-grade QC",
    verify: true,
  },
  {
    segment: "Marketplace · Trust & Safety",
    value: "91.7%",
    label: "policy-enforcement accuracy with AI + human adjudication",
    verify: true,
  },
];

export const aiPipelineSteps = [
  { step: "01", title: "Input", description: "Content is ingested from every source and format, in real time." },
  { step: "02", title: "Process", description: "AI models triage, transcribe, translate and score at volume." },
  { step: "03", title: "Verify", description: "Linguists and analysts review, correct and validate every output — the human-in-the-loop step that guarantees accuracy and judgement." },
  { step: "04", title: "Deliver", description: "Results are packaged and delivered in the format your workflow expects." },
];
