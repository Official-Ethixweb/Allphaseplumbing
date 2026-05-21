import { Link } from "@tanstack/react-router";
import { Phone, MapPin } from "lucide-react";
import logo from "@/assets/app-logo.png";
import mascot from "@/assets/mascot.png";

export function Footer() {
  return (
    <footer className="relative w-full bg-[#1B3A6B] text-white pt-16 overflow-hidden">
      
      {/* City Skyline Outline Backdrop */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[320px] pointer-events-none opacity-[0.06] select-none z-0 fill-white"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        <path d="M0,300 L0,220 L30,220 L30,240 L50,240 L50,200 L80,200 L80,180 L110,180 L110,120 L130,120 L130,150 L150,150 L150,250 L170,250 L170,180 L200,180 L200,90 L220,90 L220,130 L240,130 L240,240 L260,240 L260,170 L290,170 L290,140 L310,140 L310,180 L330,180 L330,270 L360,270 L360,160 L390,160 L390,80 L410,80 L410,40 L415,40 L415,80 L430,80 L430,160 L450,160 L450,190 L480,190 L480,130 L510,130 L510,240 L530,240 L530,150 L560,150 L560,90 L580,90 L580,220 L600,220 L600,170 L630,170 L630,110 L660,110 L660,260 L680,260 L680,180 L710,180 L710,140 L730,140 L730,80 L750,80 L750,150 L770,150 L770,210 L800,210 L800,160 L830,160 L830,70 L850,70 L850,30 L855,30 L855,70 L870,70 L870,190 L890,190 L890,240 L920,240 L920,130 L950,130 L950,90 L970,90 L970,160 L1000,160 L1000,220 L1030,220 L1030,180 L1060,180 L1060,120 L1090,120 L1090,250 L1120,250 L1120,170 L1150,170 L1150,140 L1180,140 L1180,270 L1200,270 L1200,300 Z" />
      </svg>

      {/* Main Grid Container with reserved right space for Mascot on Desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:pr-48 lg:pr-64 xl:pr-80 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1 — APP Logo (Span 3) */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <Link to="/" className="inline-block transition-transform hover:scale-[1.02]">
              <img
                src={logo}
                alt="All Phase Plumbing"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-200/60 leading-relaxed max-w-[200px]">
              Providing reliable residential and commercial plumbing solutions since 1989.
            </p>
          </div>

          {/* Column 2 — Services Area Grid (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-base font-bold tracking-wider text-slate-100 uppercase border-b border-white/10 pb-2">
              Services Area
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <ul className="space-y-2 text-slate-200/90">
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Seattle
                  </Link>
                </li>
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Tacoma
                  </Link>
                </li>
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Renton
                  </Link>
                </li>
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Bellevue
                  </Link>
                </li>
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Mercer Island
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2 text-slate-200/90">
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Redmond
                  </Link>
                </li>
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Kirkland
                  </Link>
                </li>
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Puyallup
                  </Link>
                </li>
                <li>
                  <Link to="/service-area" className="hover:text-amber-400 transition-colors uppercase text-xs font-semibold tracking-wide">
                    Tukwila
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3 — Services (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-base font-bold tracking-wider text-slate-100 uppercase border-b border-white/10 pb-2">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-200/90 font-semibold tracking-wide">
              <li>
                <Link to="/services/plumbing" className="hover:text-amber-400 transition-colors uppercase text-xs">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services/sewer-services" className="hover:text-amber-400 transition-colors uppercase text-xs">
                  Sewers
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors uppercase text-xs">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — About (Span 1.5) */}
          <div className="lg:col-span-1.5 flex flex-col gap-4">
            <h3 className="text-base font-bold tracking-wider text-slate-100 uppercase border-b border-white/10 pb-2">
              About
            </h3>
            <ul className="space-y-2 text-sm text-slate-200/90 font-semibold tracking-wide">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors uppercase text-xs">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-amber-400 transition-colors uppercase text-xs">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/coupons" className="hover:text-amber-400 transition-colors uppercase text-xs">
                  Coupons
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 — Contact Us (Span 1.5) */}
          <div className="lg:col-span-1.5 flex flex-col gap-4">
            <h3 className="text-base font-bold tracking-wider text-slate-100 uppercase border-b border-white/10 pb-2">
              Contact Us
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+12067726077"
                className="flex items-center gap-2 text-base font-bold text-white hover:text-amber-400 transition-colors whitespace-nowrap"
              >
                <Phone className="size-4 shrink-0 fill-white stroke-none text-white" />
                (206) 772-6077
              </a>
              <div className="flex items-start gap-2 text-xs text-slate-200/80 leading-relaxed max-w-[200px]">
                <MapPin className="size-4 shrink-0 fill-white stroke-none text-white mt-0.5" />
                <span>
                  14101 Interurban Ave S
                  <br />
                  Unit 78-A Tukwila, WA,
                  <br />
                  98168 United States
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- CARTOON PLUMBER MASCOT --- */}
      {/* Positioned absolutely on the right side of the footer */}
      <img
        src={mascot}
        alt="All Phase Plumbing Plumber Mascot"
        className="hidden md:block absolute bottom-0 right-0 h-[260px] lg:h-[320px] xl:h-[380px] z-10 pointer-events-none select-none object-contain drop-shadow-[-8px_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300"
      />

      {/* Sky Blue Copyright Centered Bottom Bar */}
      <div className="relative z-10 bg-[#93c5fd] py-4 text-center">
        <p className="text-xs font-bold tracking-widest text-[#1B3A6B]">
          © 2026 ALL PHASE PLUMBING
        </p>
      </div>

    </footer>
  );
}