import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Drain Cleaning",
  breadcrumbLabel: "Drain Cleaning",
  heroImage: "https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?w=1600&q=80",
  introHeading: "Seattle's Drain Cleaning Specialists: All Phase Plumbing",
  introBlocks: [
    {
      paragraphs: [
        "Slow drains, recurring clogs, or full backups? All Phase Plumbing's drain cleaning team clears your lines fast and confirms the fix with on-site camera inspection. We don't just snake the surface — we hydro-jet the buildup out so your drains stay clear.",
        "Serving homeowners and businesses across the Seattle metro area, our licensed plumbers diagnose the root cause and restore proper flow on the first visit.",
      ],
    },
    {
      heading: "Professional Drain Cleaning Services",
      paragraphs: [
        "From kitchen sinks to main sewer lines, we handle every type of drain blockage with the right tools for the job — mechanical snakes, hydro-jetters, and high-resolution sewer cameras.",
      ],
    },
    {
      heading: "Our drain cleaning services include:",
      list: [
        "High-pressure hydro-jetting",
        "Mechanical snaking & rooter service",
        "Kitchen, bath & laundry drain cleaning",
        "Main sewer line cleaning",
        "Sewer camera inspection",
        "Grease & root removal",
        "Floor drain & sump pit cleaning",
        "Preventative maintenance plans",
      ],
      paragraphs: [
        "We clear it, camera it, and leave you with footage of the cleared line so you know the job is done right.",
      ],
    },
    {
      heading: "24/7 Emergency Drain Cleaning",
      paragraphs: [
        "A backed-up main line can't wait until morning. Our emergency drain team responds 24/7 to clear sewer backups, flooded floors, and overflowing fixtures before they cause major damage.",
      ],
    },
    {
      heading: "Why Hydro-Jetting Beats Snaking",
      paragraphs: [
        "Snaking punches a hole through the clog — hydro-jetting scours the pipe walls clean. For grease, soap scum, mineral buildup, and tree roots, hydro-jetting delivers a longer-lasting fix.",
      ],
      list: [
        "Removes grease and soap buildup",
        "Cuts through tree root intrusion",
        "Restores full pipe diameter",
        "Reduces repeat callouts",
      ],
    },
    {
      heading: "Drain Cleaning Near Me in Seattle",
      paragraphs: [
        "Looking for a fast, reliable drain cleaning company near you? All Phase Plumbing serves Tukwila, Seattle, Bellevue, Renton, Kent, and the greater Puget Sound area with same-day service and upfront pricing.",
      ],
    },
  ],
  faqs: [
    {
      q: "How often should I have my drains professionally cleaned?",
      a: "For most homes, a professional drain cleaning every 18–24 months prevents buildup. Restaurants and high-use commercial sites should consider every 3–6 months.",
    },
    {
      q: "What's the difference between snaking and hydro-jetting?",
      a: "Snaking pushes through a clog mechanically. Hydro-jetting uses high-pressure water (up to 4,000 PSI) to scour the pipe walls — much more thorough and longer-lasting, especially for grease and roots.",
    },
    {
      q: "Why do my drains keep clogging?",
      a: "Repeat clogs usually mean buildup deeper in the line. We use camera inspection to find the real cause — grease, roots, scale, or a sagging pipe — and treat it at the source.",
    },
    {
      q: "Can I use chemical drain cleaners?",
      a: "We don't recommend them. They can damage older pipes, harm septic systems, and rarely fix the root cause. A one-time professional cleaning is safer and longer-lasting.",
    },
    {
      q: "Do you offer camera inspection?",
      a: "Yes — every hydro-jet job includes a before-and-after camera pass. We can also do standalone inspections to diagnose recurring issues or check the line before a home purchase.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Commercial", href: "/services" },
  ],
};

export const Route = createFileRoute("/services/drain-cleaning")({
  head: () => ({
    meta: [
      { title: "Drain Cleaning Seattle — Hydro-Jetting & Camera" },
      {
        name: "description",
        content:
          "Fast, lasting drain cleaning across Greater Seattle. Hydro-jetting, snaking, and camera inspection by licensed plumbers.",
      },
      { property: "og:title", content: "Drain Cleaning Seattle" },
      { property: "og:description", content: "Hydro-jetting, snaking, and camera inspection." },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />
      <CustomerQuote />
    </PageShell>
  ),
});
