/**
 * analytics.ts
 *
 * Thin, typed wrapper over the GTM dataLayer. GA4 (G-32603H5BWW) is configured
 * inside GTM (GTM-P68HPFVD); this file never talks to GA4 directly — it only
 * pushes semantic events that GTM triggers listen for. Keeping every push in one
 * place means one GTM trigger per event type instead of a tag per form/button.
 *
 * All functions are SSR-safe (no-op on the server) and never throw, so an
 * analytics hiccup can never break a form submit or a page render.
 *
 * Events pushed:
 *   form_submit  { form_location, form_type, page_path }   fired only on a
 *                validated, captcha-passed submission (see lead-form.ts)
 *   phone_click  { phone, link_location, page_path }        inside pages only
 *   cta_click    { click_text, click_id, page_path }        any [data-gtm-cta]
 *   page_view_spa{ page_type, page_path }                   on client route change
 *
 * Google Ads (AW-10953093685) is the one integration that does NOT go through
 * GTM: its gtag.js tag is loaded in __root.tsx and conversions are sent via the
 * global gtag() command queue (trackAdsLeadConversion below). gtag pushes
 * Arguments objects onto the shared dataLayer, which GTM triggers ignore — the
 * two stacks coexist without seeing each other's events.
 */

type DataLayerObject = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerObject[];
    /** Defined by the inline gtag.js bootstrap in __root.tsx. */
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push a raw object onto the GTM dataLayer. No-op during SSR. */
export function pushToDataLayer(obj: DataLayerObject): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

export function trackFormSubmit(params: {
  form_location: string;
  form_type: string;
  page_path: string;
}): void {
  pushToDataLayer({ event: "form_submit", ...params });
}

export function trackPhoneClick(params: {
  phone: string;
  link_location: string;
  page_path: string;
}): void {
  pushToDataLayer({ event: "phone_click", ...params });
}

export function trackCtaClick(params: {
  click_text: string;
  click_id: string;
  page_path: string;
}): void {
  pushToDataLayer({ event: "cta_click", ...params });
}

/**
 * SPA route change. Pushes the current page_type so GTM triggers can split
 * landing vs. inside pages, plus page_path for GA4 virtual pageviews.
 */
export function trackPageView(params: { page_type: string; page_path: string }): void {
  pushToDataLayer({ event: "page_view_spa", ...params });
}

/**
 * Cookie/tracking consent choice from the consent banner. Pushes both a
 * semantic `consent_update` event (for a GTM trigger) and a `consent_state`
 * variable so tags can be gated on the visitor's choice.
 */
export function trackConsentChoice(choice: "granted" | "denied"): void {
  pushToDataLayer({ event: "consent_update", consent_state: choice });
}

/* Google Ads conversion label for a submitted lead form ("Submit lead form"
   conversion action). Phone-click conversions would need their OWN label from
   Google Ads — never reuse this one for calls. */
const ADS_LEAD_CONVERSION_LABEL = "AW-10953093685/5A30CPTwj9YDELXk6-Yo";

/**
 * Google Ads lead conversion. Called from lead-form.ts only after the lead
 * has actually reached the server (validation + reCAPTCHA passed AND the
 * server function reported success) — never on click, page load, or a failed
 * submit. Must go through the gtag() command queue (gtag.js only processes
 * Arguments-object pushes, so pushToDataLayer would be silently ignored).
 * No-op during SSR or if the gtag bootstrap didn't run (e.g. blocked script).
 */
export function trackAdsLeadConversion(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: ADS_LEAD_CONVERSION_LABEL });
}
