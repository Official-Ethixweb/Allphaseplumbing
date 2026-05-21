import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

const FIRST_COL = ["Auburn","Bellevue","Bonney Lake","Des Moines","Federal Way","Fife","Kent","Lakewood","Mercer Island"];
const SECOND_COL = ["Puyallup","Renton","Seattle","South Hill","Spanaway","Summit","Summit View","Tacoma","Tukwila"];

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative bg-[#6B9FE4] text-white text-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-0 h-12 relative">

        {/* Left — tagline */}
        <p className="hidden sm:block font-semibold tracking-wide text-white/90 text-[13px]">
          Licensed &amp; Insured · Serving Greater Seattle Since 1989
        </p>
        <p className="block sm:hidden font-semibold tracking-wide text-white/90 text-[13px]">
          Serving Greater Seattle Since 1989
        </p>

        {/* Right — action tabs */}
        <div className="flex items-end h-full gap-1.5 sm:gap-2">

          {/* Read Our Reviews */}
          <a
            href="https://www.google.com/search?q=All+Phase+Plumbing+Tukwila+WA+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1E3A6E] text-white font-bold px-4 py-2.5 hover:bg-[#162e58] transition-all duration-200 flex items-center gap-1.5 select-none rounded-t-md text-xs sm:text-sm tracking-wide uppercase border-t border-x border-[#1E3A7B]"
          >
            <Star className="size-3.5 fill-[#FFB800] text-[#FFB800]" />
            Read Our Reviews ›
          </a>

          {/* Find All Phase Near Me */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className={`font-bold px-4 py-2.5 flex items-center gap-1.5 select-none rounded-t-md text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 border-t border-x ${
              isOpen
                ? "bg-[#1E3A6E] text-[#FFB800] shadow-inner border-[#1E3A7B]"
                : "bg-[#1E3A6E]/80 text-white hover:bg-[#1E3A6E] border-[#1E3A7B]/50"
            }`}
          >
            Find All Phase Near Me
            {isOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-4 z-50 w-[calc(100vw-32px)] sm:w-[540px] bg-white border-2 border-[#1E3A7B] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-5 mt-0 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-2 gap-x-8 text-sm">
              <div className="flex flex-col">
                {FIRST_COL.map((city) => (
                  <Link key={city} to="/service-area" onClick={() => setIsOpen(false)}
                    className="border-b border-[#1E3A7B]/20 py-2.5 px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:bg-slate-50/50 hover:pl-2.5 transition-all duration-200 text-xs sm:text-sm tracking-wide flex justify-between items-center"
                  >
                    <span>{city}</span>
                    <span className="text-slate-300 text-xs font-normal">WA</span>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col">
                {SECOND_COL.map((city) => (
                  <Link key={city} to="/service-area" onClick={() => setIsOpen(false)}
                    className="border-b border-[#1E3A7B]/20 py-2.5 px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:bg-slate-50/50 hover:pl-2.5 transition-all duration-200 text-xs sm:text-sm tracking-wide flex justify-between items-center"
                  >
                    <span>{city}</span>
                    <span className="text-slate-300 text-xs font-normal">WA</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-medium italic">
                Same-day plumbing dispatch across King &amp; Pierce counties
              </span>
              <a href="tel:+12067726077"
                className="text-xs font-extrabold text-[#F5C842] hover:text-[#d4a835] transition-colors uppercase tracking-wider">
                Call (206) 772-6077 ✆
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
