import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Plus, Minus, ChevronRight } from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";
import { StarBorder } from "@/components/ui/StarBorder";

export type ServiceFAQ = { q: string; a: string };

export type ServiceContentBlock = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type RelatedService = { label: string; href: string };

export type ServicePageContent = {
  title: string;
  breadcrumbLabel: string;
  introHeading: string;
  introBlocks: ServiceContentBlock[];
  faqs: ServiceFAQ[];
  related: RelatedService[];
  heroImage?: string;
};

/* ───── Big hero with title and background image at 30% opacity ───── */
function ServicePageHero({ title, heroImage }: { title: string; heroImage?: string }) {
  return (
    <section className="relative bg-[#eef4fb] pt-20 pb-15 sm:pt-28 sm:pb-21 overflow-hidden border-b border-[#1E3A6E]/10">
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ opacity: 0.3 }}
        />
      )}

      <div className="relative container mx-auto px-4 text-center">
        <h1
          className="text-[33px] sm:text-[54px] lg:text-[66px] font-black tracking-tight text-[#1E3A6E]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 4px 12px rgba(147, 197, 253, 0.9)",
          }}
        >
          {title.toUpperCase()}
        </h1>
      </div>
    </section>
  );
}

/* ───── Sidebar contact form ───── */
function SidebarContactCard() {
  const opts = useSiteOptions();
  return (
    <div className="bg-[#6B9EF8] rounded-xl shadow-xl border-2 border-[#1E3A6E] overflow-hidden">
      <div className="px-6 py-6 text-white">
        <h3 className="text-[28px] font-bold text-center" style={{ fontFamily: "Inter, sans-serif" }}>
          Contact Us Today
        </h3>
        <p className="text-[#FFB800] font-semibold text-[18px] mt-1">Same Day Service</p>
        <p className="text-white text-[14px] mt-1">Plumbing and Drain Cleaning</p>
        <p className="text-white/85 text-[13px]">When booked before 2pm, Monday – Friday</p>
      </div>

      <form className="px-5 pb-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="FIRST NAME*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[13px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="text"
            placeholder="LAST NAME*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[13px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="email"
            placeholder="EMAIL*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[13px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="tel"
            placeholder="PHONE*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[13px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
        </div>
        <select
          required
          defaultValue=""
          className="w-full rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[13px] font-semibold text-[#1E3A6E] focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
        >
          <option value="" disabled>
            SERVICE NEEDED*
          </option>
          <option>Plumbing Repair</option>
          <option>Drain Cleaning</option>
          <option>Water Heater</option>
          <option>Sewer Service</option>
          <option>Other</option>
        </select>
        <p className="text-[11px] text-white/85 leading-snug">
          By submitting this form and signing up for texts, you consent to receive messages from All
          Phase Plumbing. Msg &amp; data rates may apply. Reply STOP to unsubscribe. Reply HELP for
          help.
        </p>
        <button
          type="submit"
          className="w-full bg-[#F5C842] text-[#1E3A6E] font-bold text-[15px] py-3 rounded-md border-2 border-[#1E3A6E] hover:bg-[#f0c030] transition-colors"
        >
          CONTACT US
        </button>
      </form>
    </div>
  );
}

/* ───── Sidebar related services ───── */
function SidebarServicesMenu({ related }: { related: RelatedService[] }) {
  return (
    <div>
      <h3 className="text-[20px] font-bold uppercase tracking-wider text-[#1E3A6E] text-center mb-4">
        Services
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {related.map((r) => (
          <Link
            key={r.href + r.label}
            to={r.href}
            className="group flex flex-col items-center justify-center bg-[#1E3A6E] text-white rounded-md aspect-square p-4 text-center hover:bg-[#2d5fa8] transition-colors"
          >
            <span className="text-[14px] font-bold uppercase tracking-wide leading-tight group-hover:underline">
              {r.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ───── Sidebar coupon ───── */
function SidebarCoupon() {
  return (
    <div className="border-2 border-dashed border-[#1E3A6E] rounded-md p-5 text-center bg-white">
      <p className="text-[13px] font-semibold text-[#1E3A6E] tracking-widest mb-2">SPECIAL</p>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-[64px] font-black text-[#1E3A6E] leading-none">10</span>
        <span className="text-[20px] font-bold text-[#1E3A6E]">%</span>
      </div>
      <p className="text-[16px] font-bold text-[#1E3A6E] uppercase mt-1">Off</p>
      <p className="text-[13px] text-gray-700 mt-3 leading-snug">
        Your Next Service Call Up to $100
      </p>
      <p className="text-[11px] text-gray-500 mt-3 leading-snug">
        Offer not valid with any other offers or discounts. Expires 10/31/2026
      </p>
    </div>
  );
}

/* ───── Inline "Call Us" CTA bar ───── */
function CallUsLine() {
  const opts = useSiteOptions();
  return (
    <p className="text-[16px] font-bold text-[#1E3A6E] my-5">
      Call Us:{" "}
      <a href={opts.phone_href} className="text-[#4A7BC4] hover:underline">
        {opts.phone}
      </a>
    </p>
  );
}

/* ───── FAQ accordion ───── */
function ServiceFAQ({ faqs, title }: { faqs: ServiceFAQ[]; title: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="mt-8">
      <h2
        className="text-[28px] sm:text-[32px] font-black text-[#1E3A6E] mb-5"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {title} FAQs
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const open = openIdx === i;
          return (
            <div
              key={f.q}
              className="border border-[#1E3A6E]/20 rounded-md overflow-hidden bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-[#eef4fb] hover:bg-[#dde9f6] transition-colors"
              >
                <span className="font-semibold text-[#4A7BC4] text-[16px]">{f.q}</span>
                {open ? (
                  <Minus className="size-5 text-[#4A7BC4] shrink-0" />
                ) : (
                  <Plus className="size-5 text-[#4A7BC4] shrink-0" />
                )}
              </button>
              {open && (
                <div className="px-5 py-4 text-[15px] text-gray-700 leading-relaxed">{f.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───── Main template ───── */
export function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  return (
    <>
      <ServicePageHero title={content.title} heroImage={content.heroImage} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto px-4 max-w-[1305px]">
          {/* Breadcrumb */}
          <nav className="text-[15px] mb-6">
            <Link to="/" className="text-[#1E3A6E] hover:text-[#4A7BC4] font-semibold">
              Home
            </Link>
            <ChevronRight className="inline size-4 mx-1 text-gray-400" />
            <span className="text-[#1E3A6E] font-semibold">{content.breadcrumbLabel}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            {/* Main content */}
            <div>
              <h2
                className="text-[32px] sm:text-[40px] lg:text-[44px] font-black text-[#1E3A6E] leading-tight mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {content.introHeading}
              </h2>

              {content.introBlocks.map((block, idx) => (
                <div key={idx}>
                  {block.heading && (
                    <h2
                      className="text-[26px] sm:text-[30px] font-black text-[#1E3A6E] mt-10 mb-4 leading-tight"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {block.heading}
                    </h2>
                  )}
                  {block.paragraphs?.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[16px] text-gray-700 leading-relaxed mb-4"
                    >
                      {p}
                    </p>
                  ))}
                  {block.list && (
                    <ul className="list-disc list-inside text-[16px] text-gray-700 space-y-1.5 my-4 marker:text-[#1E3A6E] pl-2">
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {(block.heading || block.list) && <CallUsLine />}
                </div>
              ))}

              <ServiceFAQ faqs={content.faqs} title={content.breadcrumbLabel} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <SidebarContactCard />
              <SidebarServicesMenu related={content.related} />
              <SidebarCoupon />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
