import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/hotels?city=Paris&query=luxury+hotel
 *
 * Busca hotéis de luxo via Google Places API (Text Search).
 * Retorna: nome, rating, endereço, foto (proxy via Places Photo API).
 * Cache de 24h via headers para evitar consumo excessivo da API.
 */

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
const PLACES_BASE = "https://maps.googleapis.com/maps/api/place";

interface PlaceResult {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_address?: string;
  photos?: { photo_reference: string; width: number; height: number }[];
  price_level?: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const query = searchParams.get("query") || "luxury hotel";

  if (!city) {
    return NextResponse.json({ error: "city parameter required" }, { status: 400 });
  }

  try {
    const searchUrl = `${PLACES_BASE}/textsearch/json?query=${encodeURIComponent(
      `${query} in ${city}`
    )}&type=lodging&key=${API_KEY}&language=pt-BR`;

    const res = await fetch(searchUrl, { next: { revalidate: 86400 } });
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: `Google Places error: ${data.status}`, results: [] },
        { status: 200 }
      );
    }

    /* Filtra top 6 com melhor rating e monta resposta limpa */
    const hotels = (data.results as PlaceResult[])
      .filter((p) => (p.rating || 0) >= 4.0)
      .slice(0, 6)
      .map((place) => ({
        id: place.place_id,
        name: place.name,
        rating: place.rating || 0,
        totalReviews: place.user_ratings_total || 0,
        address: place.formatted_address || "",
        priceLevel: place.price_level || 0,
        /* URL de foto via proxy do Google — evita expor a chave no client */
        photo: place.photos?.[0]
          ? `${PLACES_BASE}/photo?maxwidth=800&photo_reference=${place.photos[0].photo_reference}&key=${API_KEY}`
          : null,
      }));

    return NextResponse.json(
      { results: hotels },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (err) {
    console.error("Hotels API error:", err);
    return NextResponse.json({ error: "Failed to fetch hotels", results: [] }, { status: 500 });
  }
}
