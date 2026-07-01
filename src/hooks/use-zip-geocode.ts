import { useEffect, useState } from "react";
import { SERVICE_AREA_POLYGON, pointInPolygon, type ZipLocation } from "@/lib/service-area-geo";

/* ── ZIP geocoder hook (Nominatim, debounced) ───────────────── */
type NominatimResult = {
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    suburb?: string;
    county?: string;
    state?: string;
  };
};

export type ZipGeocodeStatus = "idle" | "loading" | "ok" | "out" | "error";

/**
 * Debounced ZIP -> lat/lon lookup (Nominatim) that also classifies the
 * result as inside or outside SERVICE_AREA_POLYGON. Pass an empty string
 * to reset to idle.
 */
export function useZipGeocode(zip: string) {
  const [state, setState] = useState<{
    status: ZipGeocodeStatus;
    location: ZipLocation | null;
  }>({ status: "idle", location: null });

  useEffect(() => {
    if (!/^\d{5}$/.test(zip)) {
      setState({ status: "idle", location: null });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, status: "loading" }));

    const t = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json&addressdetails=1&limit=1`,
        { headers: { Accept: "application/json" } },
      )
        .then((r) => r.json())
        .then((data: NominatimResult[]) => {
          if (cancelled) return;
          if (!data || data.length === 0) {
            setState({ status: "error", location: null });
            return;
          }
          const hit = data[0];
          const a = hit.address ?? {};
          const city = a.city || a.town || a.village || a.hamlet || a.suburb || a.county || "";
          const state_ = a.state || "";
          const label = [city, state_, zip].filter(Boolean).join(", ");
          const lat = parseFloat(hit.lat);
          const lon = parseFloat(hit.lon);
          const served = pointInPolygon(lat, lon, SERVICE_AREA_POLYGON);
          setState({
            status: served ? "ok" : "out",
            location: { lat, lon, label },
          });
        })
        .catch(() => {
          if (!cancelled) setState({ status: "error", location: null });
        });
    }, 450);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [zip]);

  return state;
}
