import type { Stat } from "@/lib/content";

export default function StatTile({
  stat,
  tone = "light",
}: {
  stat: Stat;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <p
        className={`font-display text-2xl font-semibold sm:text-3xl ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {stat.value}
        {stat.verify && <span className="verify-badge">Verify</span>}
      </p>
      <p className={`mt-1 text-sm ${tone === "dark" ? "text-white/60" : "text-ink-soft/60"}`}>
        {stat.label}
      </p>
    </div>
  );
}
