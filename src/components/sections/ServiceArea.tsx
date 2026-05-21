import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";

export function ServiceArea() {
  const [open, setOpen] = useState(false);
  const opts = useSiteOptions();
  const cities = opts.service_area_cities;

  return (
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Service Area
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Proudly serving the{" "}
            <span className="font-display-italic text-accent">Puget Sound region.</span>
          </h2>
        </div>

        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex items-center gap-3 mb-6 px-5 py-3 rounded-xl border-2 border-[#1B3A6B]
                     bg-white/80 backdrop-blur-sm shadow-md cursor-pointer select-none
                     hover:shadow-[0_8px_30px_rgba(27,58,107,0.18)] hover:-translate-y-0.5
                     transition-all duration-300"
        >
          <MapPin className="size-5 text-[#1B3A6B] shrink-0" />
          <span className="font-semibold text-[#1B3A6B] text-sm tracking-wide">
            Find All Places Near Me
          </span>
          <ChevronDown
            className={`size-4 text-[#1B3A6B] ml-1 transition-transform duration-300 ${
              open ? "-rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
          style={{ maxHeight: open ? "900px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start pt-2 pb-2">
            {/* Google Map */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#1B3A6B] shadow-md bg-white/80 backdrop-blur-sm">
              <iframe
                title="All Phase Plumbing service area map"
                src="https://maps.google.com/maps?q=Tukwila,WA&t=&z=10&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* City list */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#1B3A6B] shadow-md p-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                {cities.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-1.5 border-b border-border py-2 text-foreground"
                  >
                    <MapPin className="size-3 text-accent shrink-0" />
                    {c}, WA
                  </div>
                ))}
              </div>
              <a
                href="#book"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity shadow-md"
              >
                Book Online Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
