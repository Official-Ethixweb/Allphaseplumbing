import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import "./Masonry.css";

export type MasonryItem = {
  id: string | number;
  img: string;
  height: number;
  url: string;
  /** Short service category shown as a gold chip (e.g. "Water Heaters"). */
  category?: string;
  /** Human title shown on the tile and in the lightbox. */
  title?: string;
  /** 1–2 sentence description shown on hover and in the lightbox. */
  desc?: string;
  /** SEO alt text for the photo. Falls back to the title. */
  alt?: string;
};

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
}

export function Masonry({
  items,
  // Keep props in signature for backward compatibility
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.06,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = false,
}: MasonryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev === 0 ? items.length - 1 : prev! - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev === items.length - 1 ? 0 : prev! + 1));
  };

  const handleClose = () => {
    setActiveImageIndex(null);
  };

  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImageIndex]);

  return (
    <>
      <div className="flex flex-col gap-12 sm:gap-16 md:gap-24 w-full">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image Column */}
              <div className="w-full md:w-1/2">
                <div
                  onClick={() => setActiveImageIndex(index)}
                  className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 border-[6px] border-[#1E3A6E] cursor-pointer group/img shadow-[0_15px_35px_-10px_rgba(30,58,110,0.3)] hover:shadow-[0_20px_45px_-10px_rgba(30,58,110,0.45)] transition-all duration-300 active:scale-[0.99] rounded-none"
                >
                  <img
                    src={item.img}
                    alt={item.alt ?? item.title ?? ""}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />
                  {/* Navy gradient overlay on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0b1a35]/95 via-[#0b1a35]/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                  />
                  {/* Name popup overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-300 ease-out">
                    {item.category && (
                      <span className="inline-block self-start bg-[#F5C842] px-2.5 py-0.5 text-xs font-bold tracking-wider text-[#1E3A6E] mb-2 uppercase rounded-none">
                        {item.category}
                      </span>
                    )}
                    {item.title && (
                      <h4
                        className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-sm"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {item.title}
                      </h4>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                {item.category && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-1.5 w-1.5 bg-[#F5C842]" />
                    <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#3A66AD] uppercase">
                      {item.category}
                    </span>
                  </div>
                )}
                {item.title && (
                  <h3
                    className="text-2xl sm:text-3xl font-black text-[#1E3A6E] leading-tight mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                )}
                {item.desc && (
                  <p className="text-gray-600 leading-relaxed text-[15px] sm:text-[16px] mb-6">
                    {item.desc}
                  </p>
                )}
                <div>
                  <button
                    onClick={() => setActiveImageIndex(index)}
                    className="inline-flex items-center gap-2 text-[14px] font-extrabold text-[#1E3A6E] uppercase tracking-wider group/btn hover:text-[#3A66AD] transition-colors"
                  >
                    <span>View Project Details</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="size-4 transform group-hover/btn:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-4 right-4 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white lightbox-btn transition-colors active:scale-95 rounded-none"
            onClick={handleClose}
            aria-label="Close gallery"
          >
            <X className="size-6 sm:size-7" />
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white lightbox-btn transition-all active:scale-95 hover:translate-x-[-2px] disabled:opacity-50 rounded-none"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6 sm:size-8" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white lightbox-btn transition-all active:scale-95 hover:translate-x-[2px] disabled:opacity-50 rounded-none"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="size-6 sm:size-8" />
          </button>

          {/* Image + caption container */}
          <div
            className="relative max-w-[90vw] sm:max-w-[85vw] flex flex-col items-center animate-in zoom-in-95 duration-300 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[activeImageIndex].img}
              alt={
                items[activeImageIndex].alt ??
                items[activeImageIndex].title ??
                `Project gallery image ${activeImageIndex + 1}`
              }
              className="max-w-full max-h-[62vh] sm:max-h-[68vh] object-contain lightbox-img border border-white/10 shadow-2xl select-none rounded-none"
            />
            {/* Caption panel */}
            <div className="mt-3 w-full max-w-[720px] bg-white/10 backdrop-blur-md lightbox-badge border border-white/10 px-4 py-3.5 sm:px-5 sm:py-4 text-left rounded-none">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                  {items[activeImageIndex].category && (
                    <span className="bg-[#F5C842] px-2 py-0.5 text-[11px] font-bold tracking-wider text-[#1E3A6E] shrink-0 rounded-none">
                      {items[activeImageIndex].category}
                    </span>
                  )}
                  {items[activeImageIndex].title && (
                    <h3
                      className="text-[15px] sm:text-[17px] font-bold text-white leading-tight"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {items[activeImageIndex].title}
                    </h3>
                  )}
                </div>
                <span className="shrink-0 text-[11px] sm:text-xs font-bold tracking-widest text-white/70">
                  {activeImageIndex + 1} / {items.length}
                </span>
              </div>
              {items[activeImageIndex].desc && (
                <p className="mt-1.5 text-[13px] sm:text-[14px] leading-relaxed text-white/80">
                  {items[activeImageIndex].desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Masonry;
