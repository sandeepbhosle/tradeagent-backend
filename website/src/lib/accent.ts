export type Accent = "teal" | "blue" | "coral" | "violet";

export const accentClasses: Record<
  Accent,
  { border: string; bg: string; text: string; dot: string; ring: string }
> = {
  teal: {
    border: "border-t-teal-500",
    bg: "bg-teal-50",
    text: "text-teal-500",
    dot: "bg-teal-500",
    ring: "ring-teal-500",
  },
  blue: {
    border: "border-t-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-500",
    dot: "bg-blue-500",
    ring: "ring-blue-500",
  },
  coral: {
    border: "border-t-coral-500",
    bg: "bg-coral-50",
    text: "text-coral-500",
    dot: "bg-coral-500",
    ring: "ring-coral-500",
  },
  violet: {
    border: "border-t-violet-500",
    bg: "bg-violet-50",
    text: "text-violet-500",
    dot: "bg-violet-500",
    ring: "ring-violet-500",
  },
};
