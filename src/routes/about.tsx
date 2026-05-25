import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { TeamSection } from "@/components/sections/TeamSection";
import { Badges } from "@/components/sections/Badges";
import { CTABanner } from "@/components/sections/CTABanner";
import { StarBorder } from "@/components/ui/StarBorder";
import { useSiteOptions } from "@/hooks/use-site-options";
import { Play } from "lucide-react";
import skylineBg from "@/assets/seattle-skyline.jpg";
import teamImg from "@/assets/team.jpg";
import { Masonry } from "@/components/ui/Masonry";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About All Phase Plumbing — Seattle Family-Owned Since 1989" },
      {
        name: "description",
        content:
          "Family-owned plumbing company in Tukwila, WA. Licensed technicians serving Greater Seattle for over 35 years.",
      },
      { property: "og:title", content: "About All Phase Plumbing" },
      {
        property: "og:description",
        content: "Family-owned plumbing serving Greater Seattle since 1989.",
      },
    ],
  }),
  component: AboutPage,
});

/* ── 1. About Us Hero (Height reduced at the bottom by 20%) ── */
function AboutHero() {
  return (
    <section className="relative bg-[#eef4fb] pt-20 pb-9 sm:pt-28 sm:pb-12 overflow-hidden border-b border-[#1E3A6E]/10">
      <img
        src={skylineBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ opacity: 0.3, filter: "blur(1px) brightness(0.95)" }}
      />
      <div className="relative container mx-auto px-4 text-center">
        <h1
          className="text-[33px] sm:text-[54px] lg:text-[66px] font-black tracking-tight text-[#1E3A6E]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 4px 12px rgba(147, 197, 253, 0.9)",
          }}
        >
          ABOUT US
        </h1>
        <nav className="text-[16px] sm:text-[18px] mt-4 flex items-center justify-center font-bold text-[#1E3A6E]">
          <Link to="/" className="hover:underline text-[#4A7BC4]">
            Home
          </Link>
          <span className="mx-2 text-[#1E3A6E]/50">-</span>
          <span className="text-[#1E3A6E]">About Us</span>
        </nav>
      </div>
    </section>
  );
}

/* ── 2. Core Intro Section ("We Protect Your Home") ── */
function AboutIntro() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto px-4 max-w-[1305px] text-center">
        
        {/* Team Photo Card */}
        <div
          className="w-full max-w-[850px] mx-auto rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xl relative aspect-[1.5] sm:aspect-[1.7] flex items-center justify-center group hover:shadow-3xl transition-shadow duration-300"
        >
          <img
            src={teamImg}
            alt="All Phase Plumbing Crew"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Text Area */}
        <div className="mt-10 sm:mt-12 max-w-full mx-auto">
          <h2
            className="text-[32px] sm:text-[40px] font-black text-[#1E3A6E] leading-tight mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            We Protect Your Home as if It Were Our Own
          </h2>
          <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-gray-600 leading-relaxed mb-8 max-w-[1150px] mx-auto px-4">
            At All Phase Plumbing, nothing speaks louder than the words of our satisfied customers. We've proudly earned the trust of homeowners across the Greater Seattle Area by delivering fast, reliable, and affordable plumbing services every single time. From emergency repairs to full system installations, our clients appreciate our honesty, professionalism, and quality workmanship.
          </p>
          
          {/* Pointy Yellow CALL US Button */}
          <a
            href="tel:+12067726077"
            className="inline-block active:scale-[0.98] transition-all bg-[#F5C842] text-[#1E3A6E] border-2 border-[#1E3A6E] px-12 py-4 text-[18px] sm:text-[22px] font-black rounded-none hover:bg-[#eec136] tracking-widest uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            CALL US
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── 5. Interview Section ("Hear From Our Team Video") ── */
function AboutInterview() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-100">
      <div className="mx-auto px-4 max-w-[1305px]">
        <h2
          className="text-[32px] sm:text-[40px] font-black text-[#1E3A6E] text-center mb-10 leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Hear From Our Team
        </h2>

        {/* Video Card playing actual video with no borders, no timestamps */}
        <div
          className="w-full max-w-[1275px] mx-auto rounded-3xl overflow-hidden shadow-2xl relative aspect-[1.78] bg-slate-950 group"
        >
          <video
            src="/videos/seattle-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-100 group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}

/* ── 6. Standalone quote banner ("At All Phase Plumbing... CONTACT US") ── */
function AboutActionBanner() {
  return (
    <section className="bg-white py-12 w-full">
      {/* Full-width Blue Gradient Banner from total left to right */}
      <div
        className="w-full bg-gradient-to-r from-[#1E3A6E] via-[#244585] to-[#4A7BC4] py-16 px-6 sm:px-12 relative overflow-hidden text-center shadow-xl border-y border-white/10"
      >
        {/* Inline SVG Outline of Space Needle on the Left side */}
        <svg className="absolute left-[-20px] bottom-[-20px] h-[150px] sm:h-[220px] w-auto opacity-[0.08] text-white pointer-events-none select-none" viewBox="0 0 100 250" fill="currentColor">
          <path d="M45,250 L55,250 L55,100 L65,100 L55,80 L70,80 L55,70 L55,20 L45,20 L45,70 L30,70 L45,80 L35,80 L45,100 L45,250 Z" />
          <ellipse cx="50" cy="80" rx="25" ry="10" />
          <ellipse cx="50" cy="70" rx="15" ry="6" />
        </svg>

        {/* Inline SVG Outline of Water Heater on the Right side */}
        <svg className="absolute right-[-10px] top-[-10px] h-[140px] sm:h-[200px] w-auto opacity-[0.08] text-white pointer-events-none select-none" viewBox="0 0 100 200" fill="currentColor">
          <rect x="25" y="20" width="50" height="150" rx="25" />
          <rect x="45" y="5" width="10" height="15" />
          <circle cx="50" cy="80" r="10" />
          <circle cx="50" cy="120" r="10" />
        </svg>

        {/* Banner content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-white text-[20px] sm:text-[25px] font-bold leading-relaxed mb-8 drop-shadow-sm">
            At All Phase Plumbing, nothing speaks louder than the words of our satisfied customers.
          </p>
          
          {/* Pointy corners contact button */}
          <Link
            to="/contact"
            className="inline-block active:scale-[0.98] transition-all bg-[#F5C842] text-[#1E3A6E] border-2 border-[#1E3A6E] px-10 py-3.5 text-[16px] sm:text-[18px] font-black rounded-none hover:bg-[#eec136] tracking-widest uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 10. Reviews Banner ("What Our Customers Say About All Phase Plumbing") ── */
function CustomerReviewsBanner() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 text-center"
      style={{
        background: "linear-gradient(165deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2
          className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          What Our Customers Say About All Phase Plumbing
        </h2>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-block active:scale-[0.98] transition-all bg-[#F5C842] text-[#1E3A6E] border-2 border-[#1E3A6E] px-10 py-3.5 text-[16px] sm:text-[18px] font-black rounded-none hover:bg-[#eec136] tracking-widest uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            read more
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 11. Masonry Gallery items (12 plumbing-related images) ── */
const MASONRY_ITEMS = [
  { id: "1", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?w=600&q=80", height: 500, url: "#" },
  { id: "2", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", height: 700, url: "#" },
  { id: "3", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80", height: 600, url: "#" },
  { id: "4", img: "https://images.unsplash.com/photo-1542013936693-884638332954?w=600&q=80", height: 800, url: "#" },
  { id: "5", img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80", height: 550, url: "#" },
  { id: "6", img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&q=80", height: 650, url: "#" },
  { id: "7", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&q=80", height: 720, url: "#" },
  { id: "8", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", height: 500, url: "#" },
  { id: "9", img: "https://images.unsplash.com/photo-1613217788912-d7fc213ad76e?w=600&q=80", height: 620, url: "#" },
  { id: "10", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80", height: 750, url: "#" },
  { id: "11", img: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&q=80", height: 580, url: "#" },
  { id: "12", img: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&q=80", height: 690, url: "#" }
];

function RecentProjects() {
  return (
    <section className="bg-white py-16 sm:py-20 border-t border-slate-100">
      <div className="mx-auto px-4 max-w-[1305px]">
        <h2
          className="text-center text-[36px] sm:text-[44px] font-black text-[#1E3A6E] mb-12"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Our Recent Projects
        </h2>
        {/* Animated grid displaying the 12 popping image placeholders */}
        <div className="w-full max-w-[760px] mx-auto relative min-h-[500px]">
          <Masonry items={MASONRY_ITEMS} />
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell>
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. We Protect Your Home Intro */}
      <AboutIntro />

      {/* 3. Why Us from home page */}
      <WhyUs />

      {/* 4. Services cards from home page */}
      <Services />

      {/* 5. Team video */}
      <AboutInterview />

      {/* 6. Contact Us quotes banner */}
      <AboutActionBanner />

      {/* 7. TeamSection from home page */}
      <TeamSection />

      {/* 8. Badges */}
      <Badges />

      {/* 9. Van and contact us from home page (CTABanner) */}
      <CTABanner />

      {/* 10. Customer reviews quote */}
      <CustomerReviewsBanner />

      {/* 11. Our Recent Projects with 12 masonry popping images */}
      <RecentProjects />
    </PageShell>
  );
}
