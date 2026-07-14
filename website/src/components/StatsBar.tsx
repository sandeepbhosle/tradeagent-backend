import { stats } from "@/lib/content";

export default function StatsBar() {
  return (
    <section className="border-y border-slate-800 bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:text-left">
            <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
