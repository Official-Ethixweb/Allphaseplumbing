import { useCallback, useRef, useState } from "react";
import { verifyRecaptcha } from "@/lib/recaptcha.functions";
import type { RecaptchaHandle } from "@/components/ui/Recaptcha";

/**
 * Shared reCAPTCHA gating logic for lead-gen forms across the site. Renders
 * a <Recaptcha ref={captcha.ref} onVerify={captcha.setToken} /> alongside the
 * form, then call `captcha.verify()` from the submit handler before treating
 * the submission as accepted.
 */
export function useRecaptchaGate() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const ref = useRef<RecaptchaHandle>(null);

  const verify = useCallback(async () => {
    if (!token) {
      setError(true);
      return false;
    }
    const result = await verifyRecaptcha({ data: { token } });
    ref.current?.reset();
    setToken("");
    setError(!result.success);
    return result.success;
  }, [token]);

  return { token, setToken, error, ref, verify };
}
