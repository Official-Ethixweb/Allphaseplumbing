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
 */

type DataLayerObject = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerObject[];
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
