/**
 * recaptcha.functions.ts
 *
 * Server-side verification of Google reCAPTCHA v2 tokens. Runs only on the
 * server so the secret key is never sent to the browser.
 *
 * Environment variable required: RECAPTCHA_SECRET_KEY
 * Falls back to Google's published test secret (always passes, for local
 * dev only) so the flow works out of the box before real keys are set.
 * See: https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha-what-should-i-do
 */

import { createServerFn } from "@tanstack/react-start";

const TEST_SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

export const verifyRecaptcha = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    if (!data.token) return { success: false };

    const secret = process.env.RECAPTCHA_SECRET_KEY || TEST_SECRET_KEY;

    try {
      const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: data.token }),
        signal: AbortSignal.timeout(8_000),
      });
      const json = (await res.json()) as { success: boolean };
      return { success: !!json.success };
    } catch {
      return { success: false };
    }
  });
