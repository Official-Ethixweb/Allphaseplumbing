import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";


/* ── SVG Plumbing tool icons ──────────────────────────────────────────────── */
function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M62 8 C55 2 44 4 40 12 C37 18 38 24 42 28 L18 54 C14 58 14 64 18 68 C22 72 28 72 32 68 L58 44 C62 46 68 46 72 42 C78 36 78 24 72 18 L64 26 L58 20 L66 12 Z"
        fill="#1E3A6E" stroke="#F5C842" strokeWidth="2.5" strokeLinejoin="round"
      />
      <circle cx="23" cy="61" r="4" fill="#F5C842" />
    </svg>
  );
}

function PlierIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M10 70 L30 40 L35 20 C36 14 42 10 48 12 L42 22 C44 26 48 26 50 22 L56 14 C60 20 58 30 52 34 L44 42 L18 66 Z"
        fill="#1E3A6E" stroke="#F5C842" strokeWidth="2.5" strokeLinejoin="round"
      />
      <path
        d="M70 70 L50 40 L32 50 L58 66 Z"
        fill="#1E3A6E" opacity="0.7" stroke="#F5C842" strokeWidth="2" strokeLinejoin="round"
      />
    </svg>
  );
}

export function CustomerQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">

      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #1E3A6E 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Left plumbing tool — slides in from left */}
      <div
        className="absolute left-0 top-1/2 pointer-events-none select-none"
        style={{
          transform: `translateY(-50%) translateX(${visible ? "0px" : "-150px"})`,
          opacity: visible ? 0.65 : 0,
          transition: "transform 0.95s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease",
          transitionDelay: "0.1s",
        }}
        aria-hidden="true"
      >
        <WrenchIcon className="w-32 h-32 sm:w-44 sm:h-44 drop-shadow-xl" />
      </div>

      {/* Right plumbing tool — slides in from right */}
      <div
        className="absolute right-0 top-1/2 pointer-events-none select-none"
        style={{
          transform: `translateY(-50%) translateX(${visible ? "0px" : "150px"})`,
          opacity: visible ? 0.65 : 0,
          transition: "transform 0.95s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease",
          transitionDelay: "0.2s",
        }}
        aria-hidden="true"
      >
        <PlierIcon className="w-32 h-32 sm:w-44 sm:h-44 drop-shadow-xl" />
      </div>

      {/* ── Centre content ── */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center max-w-3xl">

        {/* Opening quote mark */}
        <span
          className="text-[7rem] leading-none text-[#F5C842] font-serif select-none drop-shadow"
          style={{ lineHeight: 0.75 }}
          aria-hidden="true"
        >
          "
        </span>

        {/* Quote text */}
        <p
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3A6E] leading-snug mt-4"
          style={{
            fontFamily: "'Merriweather', Georgia, serif",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            textShadow: "none",
          }}
        >
          At All Phase Plumbing, nothing speaks louder than the words of our
          satisfied customers.
        </p>

        {/* Gold divider */}
        <div className="mt-8 w-16 h-1 rounded-full bg-[#F5C842] shadow" />

        {/* ⭐⭐⭐⭐⭐  Read our reviews — gradient box */}
        <div
          className="mt-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}
        >
          <Link
            to="/about"
            className="inline-flex justify-center rounded-xl px-12 py-4 text-lg font-bold text-white
                       shadow-lg hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #1E3A6E 0%, #4A7BC4 55%, #6B9FE4 100%)",
            }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
