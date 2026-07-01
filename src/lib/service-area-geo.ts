/**
 * service-area-geo.ts
 *
 * Shared geo helpers for the ZIP-based service-availability check used on
 * both the home page map section and the Contact page. Keeping the polygon
 * and point-in-polygon test in one place ensures both surfaces always agree
 * on what counts as "in our service area."
 */

export type ZipLocation = { lat: number; lon: number; label: string };

/* Approximate boundary of the Greater Seattle service area (King + southern Pierce). */
export const SERVICE_AREA_POLYGON: [number, number][] = [
  [47.77, -122.42],
  [47.77, -122.05],
  [47.68, -122.04],
  [47.6, -121.97],
  [47.49, -122.03],
  [47.32, -122.03],
  [47.24, -122.13],
  [47.22, -122.32],
  [47.26, -122.52],
  [47.35, -122.58],
  [47.48, -122.55],
  [47.62, -122.52],
  [47.73, -122.48],
  [47.77, -122.42],
];

/** Standard ray-casting point-in-polygon test. */
export function pointInPolygon(lat: number, lon: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i];
    const [yj, xj] = poly[j];
    const intersect = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
