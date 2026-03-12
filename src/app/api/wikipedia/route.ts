import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/wikipedia?city=Jericoacoara&lang=pt
 *
 * Busca resumo da cidade via Wikipedia API (grátis, sem key).
 * Retorna: título, extrato, imagem, link.
 * Cache de 24h.
 */

interface WikiResponse {
  query?: {
    pages?: Record<string, {
      pageid: number;
      title: string;
      extract?: string;
      thumbnail?: { source: string; width: number; height: number };
      fullurl?: string;
    }>;
  };
}

const langMap: Record<string, string> = { pt: "pt", en: "en", es: "es" };

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const lang = langMap[searchParams.get("lang") || "pt"] || "pt";

  if (!city) {
    return NextResponse.json({ error: "city parameter required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(city)}&prop=extracts|pageimages|info&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=800&inprop=url&format=json&redirects=1`,
      { next: { revalidate: 86400 } }
    );
    const data: WikiResponse = await res.json();
    const pages = data.query?.pages;

    if (!pages) {
      return NextResponse.json({ title: city, extract: "", image: null, url: null });
    }

    const page = Object.values(pages)[0];

    if (!page || page.pageid === undefined || page.pageid === -1) {
      /* Fallback: tenta buscar em português se não encontrou no idioma pedido */
      if (lang !== "pt") {
        const fallbackRes = await fetch(
          `https://pt.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(city)}&prop=extracts|pageimages|info&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=800&inprop=url&format=json&redirects=1`,
          { next: { revalidate: 86400 } }
        );
        const fallbackData: WikiResponse = await fallbackRes.json();
        const fallbackPages = fallbackData.query?.pages;
        if (fallbackPages) {
          const fallbackPage = Object.values(fallbackPages)[0];
          if (fallbackPage && fallbackPage.pageid !== -1) {
            return NextResponse.json({
              title: fallbackPage.title,
              extract: fallbackPage.extract || "",
              image: fallbackPage.thumbnail?.source || null,
              url: fallbackPage.fullurl || null,
            }, {
              headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
            });
          }
        }
      }
      return NextResponse.json({ title: city, extract: "", image: null, url: null });
    }

    return NextResponse.json({
      title: page.title,
      extract: page.extract || "",
      image: page.thumbnail?.source || null,
      url: page.fullurl || null,
    }, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
    });
  } catch (err) {
    console.error("Wikipedia API error:", err);
    return NextResponse.json({ error: "Failed to fetch Wikipedia data" }, { status: 500 });
  }
}
