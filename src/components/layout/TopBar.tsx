import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const firstCol = [
    "Auburn",
    "Bellevue",
    "Bonney Lake",
    "Des Moines",
    "Federal Way",
    "Fife",
    "Kent",
    "Lakewood",
    "Mercer Island",
  ];

  const secondCol = [
    "Puyallup",
    "Renton",
    "Seattle",
    "South Hill",
    "Spanaway",
    "Summit",
    "Summit View",
    "Tacoma",
    "Tukwila",
  ];

  return (
    <div className="relative bg-[#0d1e36] text-white text-xs z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-0 h-11 relative">
        {/* Left message - hidden on small mobile screen */}
        <p className="hidden md:block font-medium tracking-wide text-slate-300">
          Licensed &amp; Insured · Serving Greater Seattle Since 1989
        </p>
        <p className="block md:hidden font-medium tracking-wide text-slate-300">
          Serving Greater Seattle Since 1989
        </p>

        {/* Right Action Tabs */}
        <div className="flex items-end h-full gap-1.5 sm:gap-2">
          {/* Tab 1: Read Our Reviews */}
          <a
            href="https://www.google.com/search?q=All+Phase+Plumbing+Tukwila+WA+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4285F4] text-white font-bold px-3 sm:px-4 py-2 hover:bg-[#357ae8] transition-all duration-200 flex items-center gap-1.5 select-none rounded-t-md text-[10px] sm:text-xs tracking-wider uppercase border-t border-x border-[#4285F4]/30"
          >
            <Star className="size-3 fill-white text-white" />
            Read Our Reviews ›
          </a>

          {/* Tab 2: Find All Phase Near Me Toggle */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`font-bold px-3 sm:px-4 py-2 flex items-center gap-1.5 select-none rounded-t-md text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-200 border-t border-x border-[#1B3A6B]/30 ${
              isOpen
                ? "bg-[#1B3A6B] text-amber-400 shadow-inner"
                : "bg-[#152e55] text-white hover:bg-[#1f4277]"
            }`}
          >
            Find All Phase Near Me
            {isOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>
        </div>

        {/* 18-City Dropdown Directory */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-4 z-50 w-[calc(100vw-32px)] sm:w-[540px] bg-white border-2 border-[#1B3A6B] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 mt-0 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-2 gap-x-8 text-sm">
              {/* Left Column of Cities */}
              <div className="flex flex-col">
                {firstCol.map((city) => (
                  <Link
                    key={city}
                    to="/service-area"
                    onClick={() => setIsOpen(false)}
                    className="border-b border-[#1B3A6B]/25 py-2.5 px-1 font-bold text-[#1B3A6B] hover:text-amber-500 hover:bg-slate-50/50 hover:pl-2.5 transition-all duration-200 text-xs sm:text-sm tracking-wide flex justify-between items-center"
                  >
                    <span>{city}</span>
                    <span className="text-slate-300 text-xs font-normal">WA</span>
                  </Link>
                ))}
              </div>

              {/* Right Column of Cities */}
              <div className="flex flex-col">
                {secondCol.map((city) => (
                  <Link
                    key={city}
                    to="/service-area"
                    onClick={() => setIsOpen(false)}
                    className="border-b border-[#1B3A6B]/25 py-2.5 px-1 font-bold text-[#1B3A6B] hover:text-amber-500 hover:bg-slate-50/50 hover:pl-2.5 transition-all duration-200 text-xs sm:text-sm tracking-wide flex justify-between items-center"
                  >
                    <span>{city}</span>
                    <span className="text-slate-300 text-xs font-normal">WA</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Call Action Link in Dropdown */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-medium italic">
                Same-day plumbing dispatch across King & Pierce counties
              </span>
              <a
                href="tel:+12067726077"
                className="text-xs font-extrabold text-[#F97316] hover:text-amber-600 transition-colors uppercase tracking-wider"
              >
                Call (206) 772-6077 ✆
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}