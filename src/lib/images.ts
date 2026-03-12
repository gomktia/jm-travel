/**
 * Gera URLs do Unsplash otimizadas para cada contexto.
 * Usa collection IDs curadas para garantir qualidade "luxury".
 * Todas as imagens passam por auto=format&fit=crop para performance.
 */

const UNSPLASH_BASE = "https://images.unsplash.com";

/* IDs de fotos curadas por destino — alta qualidade e luxo garantido */
export const destinationHeroes: Record<string, string> = {
  maldivas: "photo-1514282401047-d79a71a590e8",
  paris: "photo-1502602898657-3e91760cbb34",
  tokyo: "photo-1540959733332-eab4deabeeaf",
  "fernando-de-noronha": "photo-1643063239391-19c518f0d4f7",
  gramado: "photo-1551529488-bcfe644f1692",
  cancun: "photo-1510097467424-192d713fd8b2",
  tulum: "photo-1581710862235-eb6e05d8783f",
  jericoacoara: "photo-1641517827875-2bb2f73339d4",
  maceio: "photo-1630410139620-15d3a0791a5b",
  recife: "photo-1589394760151-b4c9890765fe",
  salvador: "photo-1641236485997-026d633a9e43",
  florianopolis: "photo-1588001832198-c15cff59b078",
};

/**
 * Retorna URL otimizada do Unsplash com dimensões específicas.
 * @param photoId - ID da foto Unsplash (ex: "photo-1514282401047-d79a71a590e8")
 * @param width - Largura desejada (default 1200 para banners)
 * @param quality - Qualidade JPEG 1-100 (default 80)
 */
export function getUnsplashUrl(photoId: string, width = 1200, quality = 80): string {
  return `${UNSPLASH_BASE}/${photoId}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/**
 * URL para cards menores (600px).
 */
export function getCardImageUrl(photoId: string): string {
  return getUnsplashUrl(photoId, 600, 75);
}

/**
 * URL para hero/banner (1920px, alta qualidade).
 */
export function getHeroImageUrl(photoId: string): string {
  return getUnsplashUrl(photoId, 1920, 85);
}

/**
 * Gera um placeholder base64 blur (cor sólida) para next/image.
 * Cor navy suave para manter a estética enquanto carrega.
 */
export const blurDataURL =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="#0A192F" opacity="0.3"/></svg>`
  ).toString("base64");
