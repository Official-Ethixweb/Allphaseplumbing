import { resolveIcon } from "@/lib/icon-map";
import { useSiteOptions } from "@/hooks/use-site-options";

export function WhyUs() {
  const opts = useSiteOptions();

  return (
    <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle plumbing-texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=60')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            {opts.why_us_eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {opts.why_us_heading}{" "}
            <span className="font-display-italic text-accent">{opts.why_us_italic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {opts.why_us_reasons.map((r) => {
            const Icon = resolveIcon(r.icon);
            return (
              <div
                key={r.title}
                className="flex gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="shrink-0 inline-flex items-center justify-center size-10 rounded-md bg-accent/20 text-accent">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{r.title}</h3>
                  <p className="text-sm text-primary-foreground/75 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
