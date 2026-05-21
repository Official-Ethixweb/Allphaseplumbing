import { resolveIcon } from "@/lib/icon-map";
import { useSiteOptions } from "@/hooks/use-site-options";

export function WhyUs() {
  const opts = useSiteOptions();

  return (
    <section className="relative py-20 bg-[#1E3A6E] overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            {opts.why_us_eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {opts.why_us_heading}{" "}
            <span className="font-display-italic text-[#F5C842]">{opts.why_us_italic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {opts.why_us_reasons.map((r) => {
            const Icon = resolveIcon(r.icon);
            return (
              <div key={r.title} className="flex gap-4">
                {/* Icon bubble — no card, just a floating accent dot */}
                <div className="shrink-0 mt-0.5 inline-flex items-center justify-center size-12 rounded-full bg-[#F5C842]/20 text-[#F5C842]">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3
                    className="font-extrabold text-2xl text-white mb-2 leading-snug"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
