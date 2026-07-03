// Vercel Serverless Function — wraps the TanStack Start SSR server bundle

import server from "../dist/server/server.js";

/**
 * Recover the request body from the Node request. Vercel's Node runtime may
 * have already parsed/consumed the stream into `req.body`; if so we re-serialize
 * it, otherwise we read the raw stream. Without this, POST server functions
 * (lead email, reCAPTCHA verify) reach the SSR handler with an empty body.
 */
async function readBody(req) {
  // Already parsed/consumed by the platform.
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string" || Buffer.isBuffer(req.body)) return req.body;
    // Parsed object (e.g. application/json) — re-serialize to bytes.
    return JSON.stringify(req.body);
  }
  // Stream already drained with nothing parsed out → no body to forward.
  if (req.readableEnded || req.complete) return undefined;
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

export default async function handler(req, res) {
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const proto = req.headers["x-forwarded-proto"] || "https";
  const url = `${proto}://${host}${req.url}`;

  const method = req.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  // Build a Fetch-API Request from the Node.js IncomingMessage
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    const lower = key.toLowerCase();
    // Drop hop-by-hop / length headers: the forwarded body may be re-serialized
    // to a different byte length, so let the Request derive content-length.
    if (lower === "content-length" || lower === "transfer-encoding") continue;
    headers[key] = Array.isArray(value) ? value.join(", ") : value;
  }

  const body = hasBody ? await readBody(req) : undefined;

  const fetchRequest = new Request(url, {
    method,
    headers,
    ...(body !== undefined ? { body, duplex: "half" } : {}),
  });

  // Run the SSR handler
  const response = await server.fetch(fetchRequest);

  // Forward status + headers
  res.status(response.status);
  for (const [key, value] of response.headers.entries()) {
    if (key.toLowerCase() !== "transfer-encoding") {
      res.setHeader(key, value);
    }
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
