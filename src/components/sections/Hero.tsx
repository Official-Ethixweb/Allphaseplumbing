import { ShieldCheck, Clock, Star } from "lucide-react";
import mascot from "@/assets/mascot.png";
import seattleBg from "@/assets/seattle-skyline.jpg";
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
    <section className="relative min-h-[680px] lg:min-h-[740px] overflow-hidden">

      {/* ── Background layers ── */}
      {/* 1. Full-bleed Seattle skyline photo */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover pointer-events-none select-none"
        style={{ backgroundImage: `url('${seattleBg}')` }}
        aria-hidden="true"
      />

      {/* 2. Dark gradient overlay — heavy on the left so text pops, lighter right */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,20,45,0.82) 0%, rgba(10,20,45,0.65) 45%, rgba(10,20,45,0.40) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Bottom fade for form card readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,20,45,0.55) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left column ────────────────────────────────────── */}
          <div>
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest text-[#6B9FE4] mb-4"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}
            >
              {opts.hero_eyebrow}
            </span>

            <h1
              className="text-5xl sm:text-6xl lg:text-[72px] text-white leading-[1.05]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 900,
                textShadow: "2px 2px 12px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.5)",
              }}
            >
              {opts.hero_title}{" "}
              <span
                className="text-[#F5C842]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  fontStyle: "italic",
                  textShadow: "2px 2px 12px rgba(0,0,0,0.85)",
                }}
              >
                {opts.hero_italic}
              </span>
            </h1>

            <p
              className="mt-5 text-xl sm:text-2xl text-white/90 max-w-xl leading-relaxed font-medium"
              style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.8)" }}
            >
              {opts.hero_subtitle}
            </p>

            {/* Trust pills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-lg">
                <Clock className="size-4 text-[#F5C842]" /> Same-Day Service
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-lg">
                <ShieldCheck className="size-4 text-[#F5C842]" /> Licensed Since 1989
              </span>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {opts.hero_stats.map((s) => (
                <div key={s.label} className="border-l-2 border-[#F5C842] pl-4">
                  <div
                    className="text-4xl font-black text-white"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                    }}
                  >
                    {s.number}
                  </div>
                  <div
                    className="text-sm text-white/75 leading-tight mt-1 font-medium"
                    style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Rated badge — sits directly below the stats row */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-[#FFB800] text-[#FFB800] drop-shadow" />
                ))}
              </div>
              <p className="text-sm font-semibold text-white/90" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}>
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

          {/* ── Right column — mascot + form card ─────────────── */}
          <div className="relative pt-[248px] sm:pt-[298px]">

            {/* Mascot — bottom edge rests exactly on the card's top border */}
            <img
              src={mascot}
              alt="All Phase Plumbing technician"
              aria-hidden="true"
              className="absolute top-0 right-4 h-[248px] sm:h-[298px] w-auto object-contain
                         drop-shadow-2xl pointer-events-none select-none z-20"
              loading="eager"
              decoding="async"
            />

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1E3A7B]/30 relative z-10 overflow-hidden">

              {/* Blue gradient header bar */}
              <div
                className="px-6 sm:px-8 py-4"
                style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)" }}
              >
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  Request a Tech
                </h2>
                <p className="text-sm text-white/75 mt-0.5">We'll be in touch within the hour.</p>
              </div>

              {/* Form body */}
              <div className="p-6 sm:p-8">
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="First Name" required
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />
                    <input type="text" placeholder="Last Name" required
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />
                  </div>
                  <input type="email" placeholder="Email" required
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />
                  <input type="tel" placeholder="Phone" required
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />
                  <select defaultValue="" required
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow text-gray-600">
                    <option value="" disabled>Service Needed</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button type="submit"
                    className="w-full rounded-md px-4 py-3 text-base font-bold text-white transition-all shadow-md active:scale-[0.98] hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)" }}>
                    Request a Tech →
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
