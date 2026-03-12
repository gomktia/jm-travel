import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/restaurants?city=Recife&limit=6
 *
 * Busca restaurantes via Yelp Fusion API.
 * Requer YELP_API_KEY no .env.local.
 * Fallback: retorna dados curados quando key não está configurada.
 * Cache de 24h.
 */

const YELP_KEY = process.env.YELP_API_KEY;

const fallbackData: Record<string, Array<{ name: string; cuisine: string; rating: number; price: string; address: string }>> = {
  "Jericoacoara": [
    { name: "Tamarindo", cuisine: "Contemporânea", rating: 4.7, price: "$$$$", address: "Rua Principal, Jericoacoara" },
    { name: "Carcará", cuisine: "Frutos do Mar", rating: 4.5, price: "$$$", address: "Praia de Jericoacoara" },
    { name: "Restaurante do Neno", cuisine: "Regional", rating: 4.4, price: "$$", address: "Rua do Forró, Jericoacoara" },
    { name: "Dona Amélia", cuisine: "Baiana", rating: 4.6, price: "$$$", address: "Rua São Francisco, Jericoacoara" },
  ],
  "Fernando de Noronha": [
    { name: "Mergulhão", cuisine: "Frutos do Mar", rating: 4.8, price: "$$$$", address: "Porto de Santo Antônio" },
    { name: "Varanda", cuisine: "Contemporânea", rating: 4.6, price: "$$$$", address: "BR-363, Noronha" },
    { name: "Cacimba Bistrô", cuisine: "Bistrô", rating: 4.5, price: "$$$", address: "Vila dos Remédios" },
  ],
  "Maceió": [
    { name: "Wanchako", cuisine: "Frutos do Mar", rating: 4.7, price: "$$$", address: "Av. Álvaro Otacílio, Ponta Verde" },
    { name: "Massarella", cuisine: "Italiana", rating: 4.5, price: "$$$", address: "Jatiúca, Maceió" },
    { name: "Divina Gula", cuisine: "Regional", rating: 4.6, price: "$$", address: "Rua Eng. Paulo B. Nogueira" },
    { name: "Imperador dos Camarões", cuisine: "Frutos do Mar", rating: 4.4, price: "$$", address: "Pajuçara, Maceió" },
  ],
  "Recife": [
    { name: "Leite", cuisine: "Fine Dining", rating: 4.8, price: "$$$$", address: "Praça Joaquim Nabuco, Santo Antônio" },
    { name: "Ponte Nova", cuisine: "Regional", rating: 4.5, price: "$$$", address: "Rua do Brum, Recife Antigo" },
    { name: "Chica Pitanga", cuisine: "Contemporânea", rating: 4.6, price: "$$$", address: "Rua Petrolina, Boa Viagem" },
    { name: "Oficina do Sabor", cuisine: "Nordestina", rating: 4.7, price: "$$$", address: "Rua do Amparo, Olinda" },
  ],
  "Gramado": [
    { name: "Belle du Valais", cuisine: "Fondue", rating: 4.8, price: "$$$$", address: "Av. das Hortênsias, Gramado" },
    { name: "Josephina Café", cuisine: "Café Colonial", rating: 4.6, price: "$$$", address: "Av. Borges de Medeiros" },
    { name: "Mamma Pasta", cuisine: "Italiana", rating: 4.5, price: "$$$", address: "Rua Coberta, Gramado" },
    { name: "Cantina 28", cuisine: "Italiana", rating: 4.4, price: "$$", address: "Av. das Hortênsias, Gramado" },
  ],
  "Cancún": [
    { name: "Cochinita & Co", cuisine: "Mexican Gourmet", rating: 4.7, price: "$$$$", address: "Blvd. Kukulcán, Zona Hotelera" },
    { name: "Harry's Prime", cuisine: "Steakhouse", rating: 4.8, price: "$$$$", address: "Blvd. Kukulcán Km 14.2" },
    { name: "Puerto Madero", cuisine: "Seafood", rating: 4.6, price: "$$$$", address: "Blvd. Kukulcán Km 14.1" },
    { name: "Tacos Rigo", cuisine: "Street Food", rating: 4.5, price: "$", address: "Av. Cobá, SM 22" },
  ],
  "Tulum": [
    { name: "Hartwood", cuisine: "Farm-to-table", rating: 4.9, price: "$$$$", address: "Carretera Tulum-Boca Paila" },
    { name: "Arca", cuisine: "Mexican Fine Dining", rating: 4.8, price: "$$$$", address: "Carretera Tulum-Boca Paila" },
    { name: "Kitchen Table", cuisine: "International", rating: 4.6, price: "$$$", address: "Av. Tulum, Centro" },
  ],
  "Salvador": [
    { name: "Casa de Tereza", cuisine: "Baiana Fine Dining", rating: 4.8, price: "$$$$", address: "Largo do Terreiro de Jesus" },
    { name: "Paraíso Tropical", cuisine: "Frutos do Mar", rating: 4.5, price: "$$$", address: "Praia do Rio Vermelho" },
    { name: "Restaurante Amado", cuisine: "Contemporânea", rating: 4.7, price: "$$$$", address: "Av. Lafayete Coutinho, Comércio" },
    { name: "Acarajé da Dinha", cuisine: "Street Food", rating: 4.6, price: "$", address: "Largo de Santana, Rio Vermelho" },
  ],
  "Florianópolis": [
    { name: "Ostradamus", cuisine: "Oyster Bar", rating: 4.7, price: "$$$$", address: "Rod. Baldicero Filomeno, Ribeirão" },
    { name: "Marisqueira", cuisine: "Frutos do Mar", rating: 4.5, price: "$$$", address: "Rod. Baldicero Filomeno" },
    { name: "Black Sheep", cuisine: "Gastropub", rating: 4.4, price: "$$$", address: "Lagoa da Conceição" },
  ],
  "Tokyo": [
    { name: "Sukiyabashi Jiro", cuisine: "Sushi", rating: 4.9, price: "$$$$", address: "Ginza, Chuo City, Tokyo" },
    { name: "Narisawa", cuisine: "Innovative", rating: 4.8, price: "$$$$", address: "Minami-Aoyama, Minato" },
    { name: "Ichiran Ramen", cuisine: "Ramen", rating: 4.5, price: "$$", address: "Shinjuku, Tokyo" },
  ],
  "Paris": [
    { name: "Le Jules Verne", cuisine: "Fine Dining", rating: 4.8, price: "$$$$", address: "Tour Eiffel, Av. Gustave Eiffel" },
    { name: "Le Comptoir du Panthéon", cuisine: "Bistrô", rating: 4.5, price: "$$$", address: "Quartier Latin, Paris" },
    { name: "Le Bouillon Chartier", cuisine: "Traditional", rating: 4.4, price: "$$", address: "7 Rue du Faubourg Montmartre" },
  ],
  "Malé Atoll": [
    { name: "Ithaa Undersea Restaurant", cuisine: "Fine Dining", rating: 4.9, price: "$$$$", address: "Conrad Maldives Rangali Island" },
    { name: "Sunset Grill", cuisine: "Seafood", rating: 4.6, price: "$$$$", address: "Kurumba Maldives" },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const limit = Math.min(Number(searchParams.get("limit") || "6"), 12);

  if (!city) {
    return NextResponse.json({ error: "city parameter required" }, { status: 400 });
  }

  if (YELP_KEY) {
    try {
      const res = await fetch(
        `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(city)}&categories=restaurants&sort_by=rating&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${YELP_KEY}`, Accept: "application/json" },
          next: { revalidate: 86400 },
        }
      );
      const data = await res.json();

      const results = (data.businesses || []).map((biz: Record<string, unknown>) => ({
        name: biz.name,
        cuisine: ((biz.categories as Array<{ title: string }>)?.[0])?.title || "Restaurant",
        rating: biz.rating || 4.0,
        price: biz.price || "$$",
        address: ((biz.location as Record<string, string>)?.display_address as unknown as string[])?.join(", ") || "",
      }));

      return NextResponse.json({ city, results }, {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
      });
    } catch (err) {
      console.error("Yelp API error:", err);
    }
  }

  const results = (fallbackData[city] || fallbackData["Cancún"] || []).slice(0, limit);
  return NextResponse.json({ city, results, source: "curated" }, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" },
  });
}
