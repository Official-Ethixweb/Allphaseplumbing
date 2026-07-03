import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/* Google's published test site key: always renders + always passes.
   Safe to ship as a fallback so the widget works before real keys are set;
   swap in a real key via VITE_RECAPTCHA_SITE_KEY before going live.
   https://developers.google.com/recaptcha/docs/faq */
const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || TEST_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    __recaptchaOnLoad?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }
    window.__recaptchaOnLoad = () => resolve();
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export type RecaptchaHandle = { reset: () => void };

/**
 * Google reCAPTCHA v2 "I'm not a robot" checkbox, rendered explicitly so React
 * controls its lifecycle.
 *
 * The Google script is NOT loaded on mount — it costs ~12s of mobile main-thread
 * time and several forms mount per page. It loads on the first user interaction
 * with the surrounding form (focus/click/touch), which always happens before the
 * checkbox is needed at submit time.
 */
export const Recaptcha = forwardRef<RecaptchaHandle, { onVerify: (token: string) => void }>(
  function Recaptcha({ onVerify }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<number | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      let cancelled = false;
      const load = () => {
        loadRecaptchaScript().then(() => {
          if (!cancelled) setReady(true);
        });
      };

      // If the script is already on the page (another form was used), render now
      if (window.grecaptcha || scriptPromise) {
        load();
        return () => {
          cancelled = true;
        };
      }

      const trigger = el.closest("form") ?? el.parentElement ?? el;
      const arm = () => {
        trigger.removeEventListener("focusin", arm);
        trigger.removeEventListener("pointerdown", arm);
        load();
      };
      trigger.addEventListener("focusin", arm);
      trigger.addEventListener("pointerdown", arm);
      return () => {
        cancelled = true;
        trigger.removeEventListener("focusin", arm);
        trigger.removeEventListener("pointerdown", arm);
      };
    }, []);

    useEffect(() => {
      if (!ready || !containerRef.current || widgetId.current !== null || !window.grecaptcha)
        return;
      widgetId.current = window.grecaptcha.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: onVerify,
        "expired-callback": () => onVerify(""),
      });
    }, [ready, onVerify]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
        onVerify("");
      },
    }));

    // min-h reserves the checkbox footprint so the deferred render doesn't shift the form
    return <div ref={containerRef} className="min-h-[78px] min-w-[304px]" />;
  },
);
