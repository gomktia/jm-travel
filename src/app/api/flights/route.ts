import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/flights?origin=GRU&destination=FOR&date=2025-08-15
 *
 * Busca preços de voos via Amadeus API.
 * Requer AMADEUS_CLIENT_ID e AMADEUS_CLIENT_SECRET no .env.local.
 * Fallback: retorna estimativas curadas quando keys não estão configuradas.
 * Cache de 6h.
 */

const AMADEUS_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_SECRET = process.env.AMADEUS_CLIENT_SECRET;

/* IATA codes para cidades do site */
const cityToIata: Record<string, string> = {
  "Jericoacoara": "FOR",
  "Fernando de Noronha": "REC",
  "Maceió": "MCZ",
  "Recife": "REC",
  "Gramado": "POA",
  "Cancún": "CUN",
  "Tulum": "CUN",
  "Salvador": "SSA",
  "Florianópolis": "FLN",
  "Tokyo": "NRT",
  "Paris": "CDG",
  "Malé Atoll": "MLE",
};

/* Estimativas de preço curadas (ida e volta em USD) */
const fallbackPrices: Record<string, { from: string; price: number; airline: string; duration: string }[]> = {
  "FOR": [
    { from: "GRU", price: 680, airline: "LATAM", duration: "3h 30min" },
    { from: "GIG", price: 720, airline: "Gol", duration: "3h 50min" },
  ],
  "REC": [
    { from: "GRU", price: 620, airline: "LATAM", duration: "3h 10min" },
    { from: "GIG", price: 650, airline: "Azul", duration: "3h 20min" },
  ],
  "MCZ": [
    { from: "GRU", price: 590, airline: "Gol", duration: "3h 00min" },
    { from: "GIG", price: 630, airline: "LATAM", duration: "3h 15min" },
  ],
  "POA": [
    { from: "GRU", price: 420, airline: "Azul", duration: "1h 40min" },
    { from: "GIG", price: 480, airline: "LATAM", duration: "2h 00min" },
  ],
  "CUN": [
    { from: "GRU", price: 1200, airline: "LATAM", duration: "9h 30min" },
    { from: "GIG", price: 1350, airline: "Copa Airlines", duration: "11h 20min" },
  ],
  "SSA": [
    { from: "GRU", price: 540, airline: "Gol", duration: "2h 20min" },
    { from: "GIG", price: 480, airline: "LATAM", duration: "2h 10min" },
  ],
  "FLN": [
    { from: "GRU", price: 380, airline: "Azul", duration: "1h 20min" },
    { from: "GIG", price: 450, airline: "Gol", duration: "1h 40min" },
  ],
  "NRT": [
    { from: "GRU", price: 3200, airline: "LATAM / JAL", duration: "24h 30min" },
    { from: "GIG", price: 3400, airline: "Emirates", duration: "26h 00min" },
  ],
  "CDG": [
    { from: "GRU", price: 2800, airline: "Air France", duration: "11h 30min" },
    { from: "GIG", price: 2900, airline: "LATAM", duration: "11h 50min" },
  ],
  "MLE": [
    { from: "GRU", price: 4500, airline: "Emirates", duration: "22h 00min" },
    { from: "GIG", price: 4700, airline: "Qatar Airways", duration: "24h 00min" },
  ],
};

let amadeusToken: string | null = null;
let tokenExpiry = 0;

async function getAmadeusToken(): Promise<string | null> {
  if (amadeusToken && Date.now() < tokenExpiry) return amadeusToken;
  if (!AMADEUS_ID || !AMADEUS_SECRET) return null;

  try {
    const res = await fetch("https://api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${AMADEUS_ID}&client_secret=${AMADEUS_SECRET}`,
    });
    const data = await res.json();
    amadeusToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return amadeusToken;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const origin = searchParams.get("origin") || "GRU";
  const date = searchParams.get("date");

  if (!city) {
    return NextResponse.json({ error: "city parameter required" }, { status: 400 });
  }

  const iata = cityToIata[city] || "GRU";

  /* Tenta Amadeus real */
  const token = await getAmadeusToken();
  if (token && date) {
    try {
      const res = await fetch(
        `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${iata}&departureDate=${date}&adults=1&max=3&currencyCode=BRL`,
        {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 21600 },
        }
      );
      const data = await res.json();

      const results = (data.data || []).map((offer: Record<string, unknown>) => ({
        price: Number((offer.price as Record<string, string>)?.total) || 0,
        currency: (offer.price as Record<string, string>)?.currency || "BRL",
        airline: ((offer.validatingAirlineCodes as string[]) || [])[0] || "N/A",
        segments: offer.itineraries,
      }));

      return NextResponse.json({ city, iata, origin, results }, {
        headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=10800" },
      });
    } catch (err) {
      console.error("Amadeus API error:", err);
    }
  }

  /* Fallback: estimativas curadas */
  const flights = (fallbackPrices[iata] || []).filter(f => !origin || f.from === origin || origin === "GRU");
  const results = flights.length > 0 ? flights : (fallbackPrices[iata] || fallbackPrices["CUN"] || []);

  return NextResponse.json({ city, iata, origin, results, source: "estimated" }, {
    headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=10800" },
  });
}
