import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { trackConsentChoice } from "@/lib/analytics";

/* ──────────────────────────────────────────────────────────────────────────
 * Cookie / tracking consent manager.
 *
 * Shows a compact banner anchored to the lower-left corner on the visitor's
 * first session and records their choice in localStorage so it never nags a
 * returning visitor. The choice is also pushed to the GTM dataLayer (see
 * analytics.trackConsentChoice) so tags can be gated on it. Styled to match the
 * navy hero form card — not the default bright-blue consent plugin look.
 * ────────────────────────────────────────────────────────────────────────── */

const STORAGE_KEY = "app-consent";
type ConsentChoice = "granted" | "denied";

export function ConsentWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // drives the enter transition

  // Only surface the banner when no prior choice is stored (client only).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== "granted" && stored !== "denied") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  // Trigger the fade/scale-in one frame after mount.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  const decide = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage blocked — choice still applies for this session */
    }
    trackConsentChoice(choice);
    setVisible(false);
    // let the exit transition play before unmounting
    window.setTimeout(() => setOpen(false), 200);
  };

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[70] w-[calc(100vw-2rem)] max-w-[400px]"
      role="dialog"
      aria-labelledby="consent-title"
    >
      {/* Card */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white transition-all duration-200"
        style={{
          boxShadow: "0 24px 60px -12px rgba(11,26,53,0.55)",
          border: "1px solid rgba(30,58,110,0.12)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#1E3A6E]/10 px-6 py-4 sm:px-7">
          <h2
            id="consent-title"
            className="text-[19px] sm:text-[21px] font-bold text-[#1E3A6E]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Manage Consent
          </h2>
          <button
            type="button"
            onClick={() => decide("denied")}
            aria-label="Close and opt out"
            className="grid size-9 place-items-center rounded-full text-[#1E3A6E]/70 transition-colors hover:bg-[#1E3A6E]/10 hover:text-[#1E3A6E]"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 sm:px-7 sm:py-6">
          <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-[#334155]">
            To provide the best experience, we use technologies like cookies to store and/or access
            device information. Consenting to these technologies lets us process data such as
            browsing behavior or unique IDs on this site. Not consenting, or withdrawing consent,
            may adversely affect certain features and functions.
          </p>

          {/* Accept — navy gradient to match the hero form card */}
          <button
            type="button"
            onClick={() => decide("granted")}
            className="mt-6 w-full rounded-xl px-6 py-3.5 text-[16px] font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
            style={{
              background: "linear-gradient(150deg, #25497f 0%, #1E3A6E 45%, #15294e 100%)",
              boxShadow: "0 8px 20px -6px rgba(30,58,110,0.55)",
            }}
          >
            Accept
          </button>

          {/* Secondary actions */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="text-[14px] font-semibold text-[#1E3A6E] underline underline-offset-2 hover:text-[#15294e]"
            >
              Opt-Out
            </button>
            <a
              href="/about"
              className="text-[14px] font-semibold text-[#1E3A6E] underline underline-offset-2 hover:text-[#15294e]"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
