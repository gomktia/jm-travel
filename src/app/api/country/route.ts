import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/country?name=França
 *
 * Busca dados do país via Rest Countries API.
 * Retorna: bandeira, capital, fuso horário, moeda, idiomas, população.
 * Cache de 24h — dados raramente mudam.
 */

interface CountryData {
  name: { common: string; official: string };
  capital?: string[];
  region: string;
  subregion: string;
  population: number;
  flags: { svg: string; png: string; alt?: string };
  timezones: string[];
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  maps?: { googleMaps: string };
}

/* Mapa de nomes em português → nome em inglês para a Rest Countries API */
const nameMap: Record<string, string> = {
  "México": "Mexico",
  "França": "France",
  "Japão": "Japan",
  "Brasil": "Brazil",
  "Maldivas": "Maldives",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "name parameter required" }, { status: 400 });
  }

  const searchName = nameMap[name] || name;

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(searchName)}?fields=name,capital,region,subregion,population,flags,timezones,currencies,languages,maps`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    const data: CountryData[] = await res.json();
    const country = data[0];

    /* Formata moedas e idiomas como listas legíveis */
    const currencies = country.currencies
      ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol})`)
      : [];

    const languages = country.languages ? Object.values(country.languages) : [];

    return NextResponse.json(
      {
        name: country.name.common,
        officialName: country.name.official,
        capital: country.capital?.[0] || "",
        region: country.region,
        subregion: country.subregion,
        population: country.population,
        flag: country.flags.svg,
        flagAlt: country.flags.alt || `Flag of ${country.name.common}`,
        timezones: country.timezones,
        currencies,
        languages,
        googleMapsUrl: country.maps?.googleMaps || "",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (err) {
    console.error("Country API error:", err);
    return NextResponse.json({ error: "Failed to fetch country data" }, { status: 500 });
  }
}
