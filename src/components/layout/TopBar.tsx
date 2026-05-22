import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Star, Ticket, CalendarCheck } from "lucide-react";

const CITIES_COL1 = ["Auburn","Bellevue","Bonney Lake","Des Moines","Federal Way","Fife","Kent","Lakewood","Mercer Island"];
const CITIES_COL2 = ["Puyallup","Renton","Seattle","South Hill","Spanaway","Summit","Summit View","Tacoma","Tukwila"];

export function TopBar() {
  const [nearMeOpen, setNearMeOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setNearMeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative z-50 w-full">
      <div className="flex w-full text-sm font-semibold">

        {/* ── LEFT — Read Our Reviews ── */}
        <a
          href="https://www.google.com/search?q=All+Phase+Plumbing+Tukwila+WA+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-4 bg-[#6399ED] text-white hover:bg-[#5088dc] transition-colors duration-200 whitespace-nowrap"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-[#FFB800] text-[#FFB800]" />
            ))}
          </div>
          <span className="hidden sm:inline tracking-wide text-[21px] font-bold">Read Our Reviews ›</span>
        </a>

        {/* ── CENTER — Find All Phase Near Me ── */}
        <div ref={dropRef} className="relative shrink-0">
          <button
            onClick={() => setNearMeOpen((p) => !p)}
            className="flex items-center justify-center gap-2 w-full h-full px-6 py-4 bg-[#1E3A6E] text-white hover:bg-[#162e58] transition-colors duration-200 tracking-wide font-semibold text-[21px] whitespace-nowrap"
          >
            <span>Find All Phase Near Me</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${nearMeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* City dropdown */}
          {nearMeOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-[520px] max-w-[calc(100vw-32px)] bg-white border-2 border-[#1E3A7B] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5">
              <div className="grid grid-cols-2 gap-x-8 text-sm">
                <div className="flex flex-col">
                  {CITIES_COL1.map((city) => (
                    <Link
                      key={city}
                      to="/service-area"
                      onClick={() => setNearMeOpen(false)}
                      className="border-b border-[#1E3A7B]/15 py-2.5 px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:pl-3 transition-all duration-200 flex justify-between items-center"
                    >
                      <span>{city}</span>
                      <span className="text-gray-300 text-xs font-normal">WA</span>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col">
                  {CITIES_COL2.map((city) => (
                    <Link
                      key={city}
                      to="/service-area"
                      onClick={() => setNearMeOpen(false)}
                      className="border-b border-[#1E3A7B]/15 py-2.5 px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:pl-3 transition-all duration-200 flex justify-between items-center"
                    >
                      <span>{city}</span>
                      <span className="text-gray-300 text-xs font-normal">WA</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[11px] text-gray-400 italic">
                  Same-day dispatch across King &amp; Pierce counties
                </span>
                <a
                  href="tel:+12067726077"
                  className="text-xs font-extrabold text-[#F5C842] hover:text-[#d4a835] transition-colors uppercase tracking-wider"
                >
                  Call (206) 772-6077 ✆
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT — Coupons | Book Online Now ── */}
        <div className="flex flex-1 items-stretch bg-[#8BB8F5] divide-x divide-[#1E3A6E]/20">
          <Link
            to="/coupons"
            className="flex items-center justify-center gap-2 flex-1 px-6 py-4 text-[#1E3A6E] font-bold hover:bg-[#1E3A6E]/15 transition-colors duration-200 whitespace-nowrap text-[21px]"
          >
            <Ticket className="size-4 shrink-0" />
            <span className="hidden sm:inline">Coupons</span>
          </Link>
          <a
            href="tel:+12067726077"
            className="flex items-center justify-center gap-2 flex-1 px-6 py-4 text-[#1E3A6E] font-bold hover:bg-[#1E3A6E]/15 transition-colors duration-200 whitespace-nowrap text-[21px]"
          >
            <CalendarCheck className="size-4 shrink-0" />
            <span className="hidden sm:inline">Book Online Now</span>
          </a>
        </div>

      </div>
    </div>
  );
}
