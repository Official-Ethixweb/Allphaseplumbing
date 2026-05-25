import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Sewer Services",
  breadcrumbLabel: "Sewer Services",
  heroImage: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?w=1600&q=80",
  introHeading: "Seattle's Sewer Line Specialists: All Phase Plumbing",
  introBlocks: [
    {
      paragraphs: [
        "Seattle's mature trees and aging clay sewer lines don't mix. When you've got a sewer line problem — backups, smells, sinkholes, or roots — All Phase Plumbing diagnoses it with camera inspection and gives you flat-rate options for repair or replacement.",
        "We've been keeping Seattle's underground plumbing flowing since 1989. No surprise dig-ups, no scare tactics — just an honest look at your line and the right fix.",
      ],
    },
    {
      heading: "Complete Sewer Line Services",
      paragraphs: [
        "From a single root intrusion to a full trenchless replacement of a century-old clay line, our licensed plumbers handle every type of sewer job — including permits, locates, and coordination with the city.",
      ],
    },
    {
      heading: "Our sewer services include:",
      list: [
        "Sewer line repair & spot repair",
        "Trenchless sewer replacement (pipe bursting & lining)",
        "Traditional sewer line excavation & replacement",
        "Sewer camera inspection & locating",
        "Root removal & root treatment",
        "Sewer scopes for home buyers",
        "Hydro-jetting of main sewer lines",
        "Side sewer permits & city coordination",
        "Septic-to-sewer conversions",
      ],
    },
    {
      heading: "Trenchless Sewer Replacement",
      paragraphs: [
        "Trenchless methods let us replace a failed sewer line without tearing up your driveway, lawn, or landscaping. We use pipe bursting and CIPP lining where conditions allow, saving you thousands in restoration costs.",
      ],
      list: [
        "No major excavation needed",
        "Lasts 50+ years",
        "Often completes in 1–2 days",
        "Saves your hardscape & trees",
      ],
    },
    {
      heading: "Sewer Camera Inspection",
      paragraphs: [
        "Before any major sewer work, we run a sewer camera the full length of your line and show you the footage on a tablet. You'll see exactly what we see — no guesswork, no upsells. We also offer pre-purchase sewer scopes for home buyers across the Seattle area.",
      ],
    },
    {
      heading: "24/7 Emergency Sewer Service",
      paragraphs: [
        "A sewer backup is a real emergency. Our team is available 24/7 to clear backups, stop water damage, and get your home back to normal.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if my sewer line is failing?",
      a: "Common signs: repeated drain backups across multiple fixtures, gurgling toilets, sewage smells in the yard, slow-draining tubs and sinks, or wet/sunken spots in the yard above the line. A camera inspection confirms it.",
    },
    {
      q: "What's the cost of a trenchless sewer replacement?",
      a: "Most Seattle residential replacements run $8,000–$20,000 depending on length, depth, and conditions. We give a flat-rate quote after camera inspection — no per-foot surprises.",
    },
    {
      q: "How long does trenchless replacement take?",
      a: "Most residential trenchless jobs complete in 1–2 days, including permitting and inspection. Traditional dig-and-replace can take a week or more.",
    },
    {
      q: "Do you handle the city permit?",
      a: "Yes — side sewer work in Seattle requires a permit, and we pull it, coordinate the inspection, and close it out as part of every job.",
    },
    {
      q: "Should I get a sewer scope before buying a home?",
      a: "Yes, especially for homes built before 1980. A $300 sewer scope can save you tens of thousands by catching a failing line before closing. We do scopes Monday–Saturday across the Seattle area.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Commercial", href: "/services" },
  ],
};

export const Route = createFileRoute("/services/sewer-services")({
  head: () => ({
    meta: [
      { title: "Sewer Repair & Trenchless Sewer Seattle — All Phase Plumbing" },
      {
        name: "description",
        content:
          "Sewer line repair, replacement, and trenchless solutions across Greater Seattle. Free camera inspection with qualifying work.",
      },
      { property: "og:title", content: "Sewer Services — All Phase Plumbing" },
      { property: "og:description", content: "Sewer repair and trenchless replacement." },
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
