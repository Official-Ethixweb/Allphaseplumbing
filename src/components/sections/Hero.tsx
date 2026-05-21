import { ShieldCheck, Clock, Star } from "lucide-react";
import mascot from "@/assets/mascot.png";
import { useSiteOptions } from "@/hooks/use-site-options";

const SERVICES = [
  "Plumbing Repair",
  "Drain Cleaning",
  "Water Heater",
  "Sewer Services",
  "Emergency Service",
  "Other",
];

export function Hero() {
  const opts = useSiteOptions();

  return (
    /* No overflow-hidden on section so mascot can peek above the form */
    <section className="relative">
      {/* Seattle skyline at 40% opacity — clipped inside this div only */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1438401171849-74ac270044ee?w=1600&q=75"
          alt=""
          className="w-full h-full object-cover object-top opacity-40 select-none"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Gradient so text stays readable over skyline */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-background/65 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left column ────────────────────────────────────── */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              {opts.hero_eyebrow}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-[1.05]">
              {opts.hero_title}{" "}
              <span className="font-display-italic text-accent">{opts.hero_italic}</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              {opts.hero_subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-border px-4 py-2 text-sm font-medium shadow-sm">
                <Clock className="size-4 text-accent" /> Same-Day Service
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-border px-4 py-2 text-sm font-medium shadow-sm">
                <ShieldCheck className="size-4 text-accent" /> Licensed Since 1989
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {opts.hero_stats.map((s) => (
                <div key={s.label} className="border-l-2 border-accent pl-3">
                  <div className="text-2xl font-bold text-primary">{s.number}</div>
                  <div className="text-xs text-muted-foreground leading-tight mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — form card ──────────────────────── */}
          <div className="relative pt-26 sm:pt-30">
            {/* Mascot — standing on top-right corner of the card */}
            <img
              src={mascot}
              alt="All Phase Plumbing technician"
              aria-hidden="true"
              className="absolute top-0 right-0 h-[120px] sm:h-[130px] w-auto object-contain
                         drop-shadow-xl pointer-events-none select-none z-20
                         translate-x-2 -translate-y-2"
              loading="eager"
              decoding="async"
            />

            {/* Glass form card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-[#1B3A6B]/20 p-6 sm:p-8 relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Request a Tech</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll be in touch within the hour.
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="flex gap-0.5 justify-end">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-semibold">
                    <span className="font-extrabold select-none">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                    </span>{" "}
                    Rated
                  </p>
                </div>
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="First Name" required
                    className="w-full rounded-md border border-input bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] transition-shadow" />
                  <input type="text" placeholder="Last Name" required
                    className="w-full rounded-md border border-input bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] transition-shadow" />
                </div>
                <input type="email" placeholder="Email" required
                  className="w-full rounded-md border border-input bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] transition-shadow" />
                <input type="tel" placeholder="Phone" required
                  className="w-full rounded-md border border-input bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] transition-shadow" />
                <select defaultValue="" required
                  className="w-full rounded-md border border-input bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] transition-shadow">
                  <option value="" disabled>Service Needed</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button type="submit"
                  className="w-full rounded-md bg-[#1B3A6B] hover:bg-[#152d54] px-4 py-3 text-sm font-semibold text-white transition-colors shadow-md active:scale-[0.98]">
                  Request a Tech
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
