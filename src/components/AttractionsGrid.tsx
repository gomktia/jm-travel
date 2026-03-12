"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Landmark, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blurDataURL } from "@/lib/images";

interface Attraction {
  id: string;
  name: string;
  kinds: string[];
  description: string;
  image: string | null;
  coordinates: { lat: number; lng: number };
  address: string;
}

const labels = {
  pt: { title: "Pontos Turísticos", loading: "Buscando atrações...", map: "Ver no mapa" },
  en: { title: "Tourist Attractions", loading: "Searching attractions...", map: "View on map" },
  es: { title: "Puntos Turísticos", loading: "Buscando atracciones...", map: "Ver en mapa" },
};

/* Traduz categorias do OpenTripMap para labels amigáveis */
const kindLabels: Record<string, string> = {
  cultural: "Cultural",
  architecture: "Arquitetura",
  historic: "Histórico",
  museums: "Museu",
  religion: "Religioso",
  natural: "Natural",
};

export default function AttractionsGrid({ city }: { city: string }) {
  const { locale } = useLanguage();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/attractions?city=${encodeURIComponent(city)}&limit=8`)
      .then((r) => r.json())
      .then((data) => setAttractions(data.results || []))
      .catch(() => setAttractions([]))
      .finally(() => setLoading(false));
  }, [city]);

  const l = labels[locale];

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        <p className="mt-3 text-navy/50 text-sm">{l.loading}</p>
      </div>
    );
  }

  if (!attractions.length) return null;

  return (
    <div className="py-16">
      <h3 className="font-serif text-2xl sm:text-3xl text-navy font-bold mb-8 text-center">
        <Landmark className="w-7 h-7 inline mr-2 text-gold" />
        {l.title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {attractions.map((attr, i) => (
          <motion.div
            key={attr.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-400 group"
          >
            {/* Imagem da atração via OpenTripMap ou fallback elegante */}
            <div className="relative h-36 overflow-hidden bg-navy/5">
              {attr.image ? (
                <Image
                  src={attr.image}
                  alt={attr.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gold/5 to-navy/5 flex items-center justify-center">
                  <Landmark className="w-8 h-8 text-gold/30" />
                </div>
              )}

              {/* Badges de categoria */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {attr.kinds.slice(0, 2).map((kind) => (
                  <span
                    key={kind}
                    className="px-2 py-0.5 bg-navy/70 backdrop-blur-sm text-offwhite text-[10px] rounded-full"
                  >
                    {kindLabels[kind] || kind}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-serif text-sm font-bold text-navy mb-1 line-clamp-1">
                {attr.name}
              </h4>
              {attr.description && (
                <p className="text-xs text-navy/50 line-clamp-3 mb-3 leading-relaxed">
                  {attr.description}
                </p>
              )}
              {/* Link para Google Maps com coordenadas */}
              <a
                href={`https://www.google.com/maps?q=${attr.coordinates.lat},${attr.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {l.map}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
