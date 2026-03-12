import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/attractions?city=Paris&limit=8
 *
 * Busca pontos turísticos via OpenTripMap API (geoname → radius).
 * Retorna: nome, tipo, descrição, coordenadas.
 * Cache de 24h (revalidate: 86400).
 */

const OTM_KEY = process.env.OPENTRIPMAP_API_KEY!;
const OTM_BASE = "https://api.opentripmap.com/0.1/en/places";

interface GeonameResult {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

interface OTMPlace {
  xid: string;
  name: string;
  kinds: string;
  point: { lat: number; lon: number };
  rate: number;
}

interface OTMDetail {
  xid: string;
  name: string;
  kinds: string;
  wikipedia_extracts?: { text: string };
  preview?: { source: string };
  point: { lat: number; lon: number };
  address?: { road?: string; city?: string; country?: string };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const limit = Math.min(Number(searchParams.get("limit") || "8"), 20);

  if (!city) {
    return NextResponse.json({ error: "city parameter required" }, { status: 400 });
  }

  try {
    /* Passo 1: Resolve coordenadas da cidade */
    const geoRes = await fetch(
      `${OTM_BASE}/geoname?name=${encodeURIComponent(city)}&apikey=${OTM_KEY}`,
      { next: { revalidate: 86400 } }
    );
    const geo: GeonameResult = await geoRes.json();

    if (!geo.lat || !geo.lon) {
      return NextResponse.json({ error: "City not found", results: [] }, { status: 200 });
    }

    /* Passo 2: Busca atrações num raio de 10km, filtra por cultural/architecture */
    const radiusRes = await fetch(
      `${OTM_BASE}/radius?radius=10000&lon=${geo.lon}&lat=${geo.lat}&kinds=cultural,architecture,historic,museums&rate=3&format=json&limit=${limit}&apikey=${OTM_KEY}`,
      { next: { revalidate: 86400 } }
    );
    const places: OTMPlace[] = await radiusRes.json();

    /* Passo 3: Busca detalhes de cada atração em paralelo */
    const details = await Promise.all(
      places
        .filter((p) => p.name)
        .slice(0, limit)
        .map(async (place) => {
          const detailRes = await fetch(
            `${OTM_BASE}/xid/${place.xid}?apikey=${OTM_KEY}`,
            { next: { revalidate: 86400 } }
          );
          const detail: OTMDetail = await detailRes.json();
          return {
            id: detail.xid,
            name: detail.name || place.name,
            kinds: detail.kinds?.split(",").slice(0, 3) || [],
            description: detail.wikipedia_extracts?.text || "",
            image: detail.preview?.source || null,
            coordinates: { lat: detail.point.lat, lng: detail.point.lon },
            address: detail.address
              ? `${detail.address.road || ""}, ${detail.address.city || ""}`.replace(
                  /^, |, $/g,
                  ""
                )
              : "",
          };
        })
    );

    return NextResponse.json(
      { city: geo.name, country: geo.country, results: details },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (err) {
    console.error("Attractions API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch attractions", results: [] },
      { status: 500 }
    );
  }
}
