/**
 * coupons.ts
 *
 * Single source of truth for the homeowner coupon offers. Rendered by the
 * on-page Coupons section (home + /coupons) and the right-edge CouponsSidePopout
 * drawer — both import this list so the two can never drift out of sync.
 *
 * These are residential-only, new-customer offers: the eligibility fine print
 * ("Residential homeowners only…") is baked into CouponCard as the default
 * `terms` line, so every coupon carries it automatically. The coupons page and
 * these offers are intentionally NOT linked from commercial-facing pages
 * (see isCommercialPath in src/lib/page-type.ts).
 */

import type { CouponCardProps } from "@/components/sections/CouponCard";

export type Coupon = CouponCardProps & { alt: string };

export const COUPONS: Coupon[] = [
  {
    headline: "$100",
    headlineSuffix: "OFF",
    description: "Drain Cleaning — Includes a Free Camera Inspection of the Mainline Sewer",
    alt: "$100 off drain cleaning, includes a free camera inspection of the mainline sewer",
  },
  {
    headline: "10%",
    headlineSuffix: "OFF",
    description: "Your Next Residential Plumbing Service Call — Maximum Discount $250",
    alt: "10% off your next residential plumbing service call, maximum discount $250",
  },
  {
    headline: "$250",
    headlineSuffix: "OFF",
    description: "Any Residential Water Heater",
    alt: "$250 off any residential water heater",
  },
];
