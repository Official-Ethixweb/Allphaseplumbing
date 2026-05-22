import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import Particles from "@/components/ui/Particles";

/* ─────────────────────────────────────────────────────────────────────────────
   Wrench icon — orange/peach body, dark-navy outline, yellow stripe
   Matches the uploaded icon exactly.
───────────────────────────────────────────────────────────────────────────── */
function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* ── Head: crescent / open-end jaw ── */}
      {/* Outer head fill */}
      <path
        d="M14 58 C14 28 34 8 60 8 C86 8 106 28 106 58 C106 72 100 84 90 92 L90 104 L30 104 L30 92 C20 84 14 72 14 58 Z"
        fill="#F4A05A" stroke="#1E3A7B" strokeWidth="7" strokeLinejoin="round"
      />
      {/* Inner jaw gap (the opening of the wrench) */}
      <path
        d="M14 52 C14 44 18 38 26 34 L26 80 C18 76 14 68 14 58 Z"
        fill="#ffffff" stroke="#1E3A7B" strokeWidth="3"
      />
      {/* Jaw gap top notch */}
      <path d="M26 34 L38 34 L38 80 L26 80" fill="white" stroke="#1E3A7B" strokeWidth="3"/>

      {/* ── Handle ── */}
      <rect x="30" y="102" width="60" height="148" rx="16"
        fill="#F4A05A" stroke="#1E3A7B" strokeWidth="7"/>

      {/* Yellow accent stripe across handle */}
      <rect x="30" y="148" width="60" height="18" rx="0"
        fill="#FFD700" stroke="#1E3A7B" strokeWidth="3"/>

      {/* Handle shine */}
      <rect x="44" y="108" width="16" height="130" rx="8"
        fill="#F7BA80" fillOpacity="0.5"/>

      {/* ── Bottom of handle — rounded cap ── */}
      {/* Already covered by the rect's rx */}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Elbow Pipe icon — 90° L-shaped, orange body, navy outline,
   yellow stripe, blue threaded fitting at outlet.
───────────────────────────────────────────────────────────────────────────── */
function PipeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* ── Vertical section (top) ── */}
      <rect x="56" y="4" width="68" height="110" rx="10"
        fill="#F4A05A" stroke="#1E3A7B" strokeWidth="7"/>
      {/* Top cap */}
      <rect x="46" y="4" width="88" height="22" rx="10"
        fill="#F4A05A" stroke="#1E3A7B" strokeWidth="6"/>
      {/* Vertical shine */}
      <rect x="70" y="10" width="20" height="98" rx="8"
        fill="#F7BA80" fillOpacity="0.5"/>

      {/* Yellow stripe on vertical section */}
      <rect x="46" y="62" width="88" height="16" rx="0"
        fill="#FFD700" stroke="#1E3A7B" strokeWidth="4"/>

      {/* ── Elbow body (the curved corner) ── */}
      <path
        d="M56 110 Q56 168 116 168 L180 168"
        stroke="#F4A05A" strokeWidth="68" strokeLinecap="round" fill="none"
      />
      {/* Elbow outline - outer */}
      <path
        d="M52 108 Q48 172 116 172 L214 172"
        stroke="#1E3A7B" strokeWidth="7" fill="none" strokeLinecap="round"
      />
      {/* Elbow outline - inner */}
      <path
        d="M124 108 Q124 136 148 136 L214 136"
        stroke="#1E3A7B" strokeWidth="7" fill="none" strokeLinecap="round"
      />
      {/* Elbow shine */}
      <path
        d="M64 112 Q64 154 100 158"
        stroke="#F7BA80" strokeWidth="20" strokeLinecap="round" fill="none" strokeOpacity="0.5"
      />

      {/* ── Horizontal section (outlet going right) ── */}
      <rect x="112" y="136" width="100" height="68" rx="10"
        fill="#F4A05A" stroke="#1E3A7B" strokeWidth="7"/>
      {/* Horizontal shine */}
      <rect x="118" y="142" width="88" height="20" rx="8"
        fill="#F7BA80" fillOpacity="0.5"/>

      {/* ── Blue threaded fitting at the outlet end ── */}
      {/* Thread body */}
      <rect x="186" y="132" width="30" height="76" rx="8"
        fill="#5B9BD5" stroke="#1E3A7B" strokeWidth="6"/>
      {/* Thread rings */}
      <line x1="186" y1="150" x2="216" y2="150" stroke="#1E3A7B" strokeWidth="4"/>
      <line x1="186" y1="162" x2="216" y2="162" stroke="#1E3A7B" strokeWidth="4"/>
      <line x1="186" y1="174" x2="216" y2="174" stroke="#1E3A7B" strokeWidth="4"/>
      <line x1="186" y1="186" x2="216" y2="186" stroke="#1E3A7B" strokeWidth="4"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────────────────────── */
export function CustomerQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
        minHeight: 340,
      }}
    >
      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Particles
          particleCount={500}
          particleSpread={20}
          speed={1}
          particleBaseSize={150}
          sizeRandomness={1.1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff", "#aac8f0", "#7ab3e0"]}
          className="w-full h-full"
        />
      </div>

      {/* ── Left: Wrench — slides in from left ── */}
      <div
        className="absolute bottom-4 left-4 pointer-events-none select-none z-10"
        style={{
          transform: `translateX(${visible ? "0px" : "-160px"})`,
          opacity: visible ? 1 : 0,
          transition: "transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease",
          transitionDelay: "0.1s",
        }}
        aria-hidden="true"
      >
        <WrenchIcon className="w-[72px] sm:w-[88px] lg:w-[100px] h-auto drop-shadow-xl" />
      </div>

      {/* ── Right: Elbow Pipe — slides in from right ── */}
      <div
        className="absolute bottom-4 right-4 pointer-events-none select-none z-10"
        style={{
          transform: `translateX(${visible ? "0px" : "160px"})`,
          opacity: visible ? 1 : 0,
          transition: "transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease",
          transitionDelay: "0.2s",
        }}
        aria-hidden="true"
      >
        <PipeIcon className="w-[88px] sm:w-[108px] lg:w-[124px] h-auto drop-shadow-xl" />
      </div>

      {/* ── Centre content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 py-20 sm:py-24 max-w-3xl mx-auto">
        <p
          className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-white leading-snug"
          style={{
            fontFamily: "'Poppins', Inter, sans-serif",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.85s ease 0.25s, transform 0.85s ease 0.25s",
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          }}
        >
          At All Phase Plumbing, nothing speaks louder than the words of our satisfied customers.
        </p>

        <div
          className="mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.85s ease 0.45s, transform 0.85s ease 0.45s",
          }}
        >
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-12 py-3.5
                       border-2 border-white text-white font-extrabold text-base tracking-widest uppercase
                       hover:bg-white hover:text-[#1E3A6E] transition-all duration-200 rounded-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
