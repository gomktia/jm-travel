import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

/* Sans-serif para corpo - legibilidade moderna */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Serifada para títulos - elegância "Quiet Luxury" */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

/* SEO: Metadata rica para indexação e compartilhamento social */
export const metadata: Metadata = {
  title: "JM Travel Experience | Viagens de Luxo Sob Medida",
  description:
    "Agência de turismo de luxo especializada em viagens sob medida para destinos extraordinários. Pacotes exclusivos pelo México, Brasil, Espanha e mais.",
  keywords: [
    "viagens de luxo",
    "turismo premium",
    "viagens sob medida",
    "JM Travel Experience",
    "pacotes de viagem",
    "Cancún",
    "Tulum",
    "Fernando de Noronha",
    "Paris",
    "Tokyo",
    "Maldivas",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "JM Travel Experience | Viagens de Luxo Sob Medida",
    description:
      "Viva o Mundo dos Seus Sonhos. Viagens completas e sob medida para destinos extraordinários.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    siteName: "JM Travel Experience",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "JM Travel Experience - Viagens de Luxo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JM Travel Experience | Viagens de Luxo Sob Medida",
    description:
      "Viva o Mundo dos Seus Sonhos. Viagens completas e sob medida para destinos extraordinários.",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* lang="pt" como idioma padrão - alterado dinamicamente pelo contexto i18n */
    <html lang="pt" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
