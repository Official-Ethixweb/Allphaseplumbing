import { useState, useEffect } from "react";
import { ShieldCheck, Clock, Star, Home, Building2 } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";
import mascot from "@/assets/mascot.png";
import { useSiteOptions } from "@/hooks/use-site-options";

export function Hero() {
  const opts = useSiteOptions();
  const [serviceType, setServiceType] = useState<"residential" | "commercial">("residential");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [mascotIn, setMascotIn] = useState(false);
  /* Mascot slides up on first paint */
  useEffect(() => {
    const t = setTimeout(() => setMascotIn(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#cdd9e8] min-h-[820px]">


      {/* ── Video background at 50% opacity ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.5 }}
        aria-hidden="true"
      >
        <source src="/videos/seattle-bg.mp4" type="video/mp4" />
      </video>

      {/* ── #6B9FE4 colour filter at 10% opacity ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#6B9FE4", opacity: 0.1 }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-0">

        {/* ── Two-column: text LEFT  ·  mascot RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">

          {/* LEFT — hero copy */}
          <div className="pb-20">

            <span className="text-[#1E3A6E] font-bold text-[17px] tracking-wide">
              {opts.hero_eyebrow}
            </span>

            <h1
              className="mt-3 text-5xl sm:text-6xl lg:text-[72px] text-[#1E3A6E] leading-[1.05]"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, textShadow: "0 8px 6px #6399ED" }}
            >
              {opts.hero_title}{" "}
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  fontStyle: "italic",
                  color: "#1E3A6E",
                }}
              >
                {opts.hero_italic}
              </span>
            </h1>

            <p className="mt-5 text-xl sm:text-2xl text-gray-700 max-w-lg leading-relaxed font-medium">
              {opts.hero_subtitle}
            </p>

            {/* Trust pills */}
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#1E3A6E]/25 px-5 py-2.5 text-base font-semibold text-[#1E3A6E] shadow-sm">
                <Clock className="size-5" /> Same-Day Service
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#1E3A6E]/25 px-5 py-2.5 text-base font-semibold text-[#1E3A6E] shadow-sm">
                <ShieldCheck className="size-5" /> Licensed Since 1989
              </span>
            </div>

            {/* Stats */}
            <div className="mt-8 flex gap-8 sm:gap-12">
              {opts.hero_stats.map((s) => (
                <div key={s.label} className="border-l-2 border-[#1E3A6E] pl-4">
                  <div
                    className="text-5xl font-black text-[#1E3A6E]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {s.number}
                  </div>
                  <div className="text-base text-gray-600 leading-tight mt-1.5 font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Google reviews */}
            <div className="mt-7">
              <p className="text-[38px] font-extrabold leading-none select-none">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </p>
              <div className="flex items-center gap-2.5 mt-1.5">
                <span className="text-lg font-semibold text-gray-700">5 Star Reviews</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-6 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — mascot, bottom-aligned, animates in on landing */}
          <div
            className="hidden lg:flex items-end justify-end"
            style={{
              opacity: mascotIn ? 1 : 0,
              transform: mascotIn ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <img
              src={mascot}
              alt="All Phase Plumbing technician"
              aria-hidden="true"
              className="h-[420px] xl:h-[480px] w-auto object-contain drop-shadow-2xl select-none pointer-events-none"
              loading="eager"
              decoding="async"
            />
          </div>

        </div>

        {/* ── Full-width form card — sits flush at the bottom of the hero ── */}
        <div className="mt-2">
          <div
            className="rounded-t-2xl overflow-hidden border-[6px] border-[#1E3A6E]"
            style={{ background: "#6B9FE4", boxShadow: "0 -4px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)" }}
          >
            {/* Residential / Commercial tabs */}
            <div className="flex border-b border-[#1E3A6E]/30">
              <button
                type="button"
                onClick={() => setServiceType("residential")}
                className={`flex items-center gap-2 px-8 py-4 text-[21px] font-semibold transition-all border-b-2 ${
                  serviceType === "residential"
                    ? "border-white text-white bg-white/20"
                    : "border-transparent text-white/70 hover:text-white bg-transparent"
                }`}
              >
                <Home className="size-4" /> Residential
              </button>
              <button
                type="button"
                onClick={() => setServiceType("commercial")}
                className={`flex items-center gap-2 px-8 py-4 text-[21px] font-semibold transition-all border-b-2 ${
                  serviceType === "commercial"
                    ? "border-white text-white bg-white/20"
                    : "border-transparent text-white/70 hover:text-white bg-transparent"
                }`}
              >
                <Building2 className="size-4" /> Commercial
              </button>
            </div>

            {/* Form body */}
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <h2 className="text-[36px] font-bold text-white mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                Let Us Call You
              </h2>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-stretch">

                  <input type="text" placeholder="FIRST NAME*" required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-4 py-4 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />

                  <input type="text" placeholder="LAST NAME*" required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-4 py-4 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />

                  <input type="email" placeholder="EMAIL*" required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-4 py-4 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />

                  <input type="tel" placeholder="PHONE*" required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-4 py-4 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />

                  <input type="text" placeholder="STREET ADDRESS*" required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-4 py-4 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />

                  <input type="text" placeholder="ZIP CODE*" required maxLength={10}
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-4 py-4 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow" />

                  <StarBorder
                    type="submit"
                    className="block w-full active:scale-[0.98] transition-all"
                    innerClassName="text-[16px] font-bold text-white w-full h-full"
                    innerStyle={{ background: "linear-gradient(135deg, #1E3A6E 0%, #4A7BC4 100%)", border: "none", padding: "16px 12px" }}
                  >
                    Submit
                  </StarBorder>
                </div>

                {/* SMS opt-in */}
                <div className="mt-5 flex items-start gap-2.5">
                  <input
                    id="sms-optin"
                    type="checkbox"
                    checked={smsOptIn}
                    onChange={(e) => setSmsOptIn(e.target.checked)}
                    className="mt-1 size-5 rounded border-white accent-[#1E3A6E] cursor-pointer shrink-0"
                  />
                  <label htmlFor="sms-optin" className="text-[14px] text-white cursor-pointer leading-relaxed">
                    By submitting this form and signing up for texts, you consent to receive messages from All Phase Plumbing at the number provided regarding your request, updates about appointments and services or promotions and offers, including messages sent by autodialer. Consent is not a condition of purchase. Msg &amp; data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP. Reply HELP for help.
                  </label>
                </div>

                <p className="mt-4 text-[18px] text-white/70 leading-relaxed border-t border-white/20 pt-4">
                  By entering your email address, you agree to receive emails about services, updates or promotions,
                  and you agree to our{" "}
                  <a href="/about" className="underline hover:text-[#F5C842]">Terms</a>{" "}and{" "}
                  <a href="/about" className="underline hover:text-[#F5C842]">Privacy Policy</a>.
                  {" "}You may unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
