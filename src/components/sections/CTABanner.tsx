import { useState, useEffect, useRef } from "react";
import logo from "@/assets/app-logo.png";
import { useSiteOptions } from "@/hooks/use-site-options";

const SERVICE_OPTIONS = [
  "Plumbing Repair",
  "Drain Cleaning",
  "Water Heater",
  "Sewer Service",
  "Emergency Service",
  "Other",
];

export function CTABanner() {
  const opts = useSiteOptions();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsAnimated(true);
      },
      { threshold: 0.15 }
    );
    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* form submission handled externally */
  }

  const inputCls =
    "border border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] text-sm bg-white text-gray-800 transition-shadow hover:border-gray-300 focus:shadow-md";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[580px] sm:min-h-[660px] flex items-end overflow-hidden pt-16 sm:pt-20 pb-28 sm:pb-32 md:pb-36"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Dark premium indigo glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070f1e]/90 via-[#0a1628]/85 to-[#0d1e36]/90" />

      {/* Decorative ambient glowing grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

      {/* Ground road */}
      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-28 md:h-32 bg-[#1e293b] border-t-[6px] border-[#475569] z-0 shadow-[inset_0_8px_16px_rgba(0,0,0,0.4)] overflow-hidden flex items-center">
        <div className="w-full h-1 border-t-4 border-dashed border-[#facc15] opacity-60 relative">
          <div className="absolute inset-0 bg-repeat-x w-[200%] animate-[infinite-scroll_20s_linear_infinite]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">

          {/* Left Column — sliding service van */}
          <div className="lg:col-span-7 flex flex-col justify-end relative select-none">
            <div
              className={`w-full max-w-[420px] sm:max-w-[460px] mx-auto lg:mx-0 transition-opacity duration-300
                          mb-[-28px] sm:mb-[-30px] md:mb-[-32px] ${
                isAnimated ? "animate-van-slide opacity-100" : "opacity-0"
              }`}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Custom SVG Sprinter-Style Plumbing Service Van */}
              <svg
                viewBox="0 0 450 240"
                className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="lightBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
                    <stop offset="25%" stopColor="#fef08a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="vanBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="20%" stopColor="#f8fafc" />
                    <stop offset="75%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <radialGradient id="chromeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#64748b" />
                  </radialGradient>
                </defs>

                <polygon points="416,145 520,120 520,200 416,165" fill="url(#lightBeamGrad)"
                  className={isAnimated ? "animate-van-headlight" : "opacity-0"}
                  style={{ transformBox: "fill-box" }} />
                <ellipse cx="230" cy="192" rx="190" ry="14" fill="#090d16" opacity="0.65" />
                <path d="M 50 185 L 44 185 Q 38 185 38 178 L 38 72 Q 38 58 52 58 L 305 58
                         Q 318 58 328 72 L 368 114 Q 378 126 384 135 L 412 135
                         Q 420 135 420 144 L 420 166 Q 420 178 410 178 L 395 178
                         Q 390 178 390 185 Z"
                  fill="url(#vanBodyGrad)" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M 38 132 Q 150 170 290 132 T 420 148 L 420 174 L 390 174
                         Q 388 181 382 181 L 348 181 Q 342 181 338 185 L 142 185
                         Q 138 185 132 181 L 102 181 Q 96 181 92 185 L 38 185 Z"
                  fill="#1E3A6E" />
                <path d="M 38 122 Q 150 160 290 122 T 420 138 L 420 144
                         Q 290 128 150 166 T 38 128 Z" fill="#F5C842" />
                <image href={logo} x="72" y="70" width="135" height="45"
                  preserveAspectRatio="xMidYMid meet" />
                <circle cx="288" cy="92" r="10" fill="#1e293b" opacity="0.3" />
                <path d="M 282 108 C 282 100 294 100 294 108 Z" fill="#1e293b" opacity="0.3" />
                <path d="M 265 68 L 310 68 L 344 104 L 265 104 Z"
                  fill="url(#windowGrad)" stroke="#475569" strokeWidth="1.5" opacity="0.85" />
                <path d="M 275 72 L 305 100" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M 285 72 L 310 95" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                <path d="M 150 58 L 150 185" stroke="#cbd5e1" strokeWidth="1.5" />
                <path d="M 252 58 L 252 185" stroke="#cbd5e1" strokeWidth="1.5" />
                <rect x="416" y="142" width="4" height="14" rx="2" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
                <circle cx="418" cy="149" r="6" fill="#fef08a"
                  className={isAnimated ? "animate-van-headlight" : "opacity-0"}
                  style={{ filter: "blur(3px)" }} />
                <rect x="38" y="85" width="2" height="24" rx="1" fill="#ef4444" opacity="0.9" />
                <rect x="256" y="116" width="10" height="3" rx="1.5" fill="#475569" />
                <rect x="162" y="116" width="10" height="3" rx="1.5" fill="#475569" />
                <path d="M 390 174 L 420 174 L 420 180 Z" fill="#475569" />
                <rect x="412" y="162" width="8" height="4" rx="1" fill="#1e293b" />
                <g className={`${isAnimated ? "animate-van-wheel" : ""} origin-center`}>
                  <circle cx="118" cy="182" r="27" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                  <circle cx="118" cy="182" r="22" fill="#334155" />
                  <circle cx="118" cy="182" r="16" fill="url(#chromeGrad)" />
                  <circle cx="118" cy="182" r="6" fill="#1e293b" />
                  <line x1="118" y1="166" x2="118" y2="198" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="102" y1="182" x2="134" y2="182" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="107" y1="171" x2="129" y2="193" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="107" y1="193" x2="129" y2="171" stroke="#cbd5e1" strokeWidth="2.5" />
                </g>
                <g className={`${isAnimated ? "animate-van-wheel" : ""} origin-center`}>
                  <circle cx="366" cy="182" r="27" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                  <circle cx="366" cy="182" r="22" fill="#334155" />
                  <circle cx="366" cy="182" r="16" fill="url(#chromeGrad)" />
                  <circle cx="366" cy="182" r="6" fill="#1e293b" />
                  <line x1="366" y1="166" x2="366" y2="198" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="350" y1="182" x2="382" y2="182" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="355" y1="171" x2="377" y2="193" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="355" y1="193" x2="377" y2="171" stroke="#cbd5e1" strokeWidth="2.5" />
                </g>
              </svg>
            </div>

            <div className={`text-center lg:text-left mt-6 transition-all duration-700 delay-1000 ${
              isAnimated ? "opacity-75 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <p className="text-[#f8fafc] text-sm italic tracking-wide">
                {opts.dispatch_message}
              </p>
            </div>
          </div>

          {/* Right Column — contact card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end self-center">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1E3A7B]/20 w-full max-w-[520px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden">
              {/* Blue gradient header strip */}
              <div
                className="px-10 py-7"
                style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)" }}
              >
                <h2 className="text-3xl font-bold text-white">{opts.cta_heading}</h2>
                <p className="text-[#FFB800] font-semibold text-lg mt-1.5">{opts.cta_subheading}</p>
              </div>

              <div className="p-10">
              <p className="text-gray-600 text-base mb-6">{opts.cta_body}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text" name="name" placeholder="Full Name"
                  value={form.name} onChange={handleChange}
                  className={inputCls} required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email" name="email" placeholder="Email"
                    value={form.email} onChange={handleChange}
                    className={inputCls} required
                  />
                  <input
                    type="tel" name="phone" placeholder="Phone"
                    value={form.phone} onChange={handleChange}
                    className={inputCls}
                  />
                </div>
                <select
                  name="service" value={form.service} onChange={handleChange}
                  className={`${inputCls} text-gray-500`} required
                >
                  <option value="" disabled>Service Needed</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-gray-900">{opt}</option>
                  ))}
                </select>

                <p className="text-[11px] text-gray-400 leading-relaxed">
                  By submitting this form you consent to receive messages from All Phase
                  Plumbing. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
                </p>

                <button
                  type="submit"
                  className="w-full font-bold py-4 rounded-xl transition-all text-base tracking-widest active:scale-[0.98] text-white hover:opacity-90 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)" }}
                >
                  CONTACT US TODAY
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
