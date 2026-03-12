"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blurDataURL } from "@/lib/images";
import destinos from "@/data/destinos.json";
import DestinationDetail from "./DestinationDetail";

const continents = ["all", ...Array.from(new Set(destinos.destinos.map((d) => d.continente)))];

const categoryColors: Record<string, string> = {
  Luxo: "bg-gold/20 text-gold",
  Aventura: "bg-emerald-500/20 text-emerald-400",
  Gastronomia: "bg-rose-500/20 text-rose-400",
};

type Destino = (typeof destinos.destinos)[number];

export default function DestinationsSection() {
  const { locale, t } = useLanguage();
  const [activeContinent, setActiveContinent] = useState("all");
  const [selectedDestino, setSelectedDestino] = useState<Destino | null>(null);

  const filtered = useMemo(
    () =>
      activeContinent === "all"
        ? destinos.destinos
        : destinos.destinos.filter((d) => d.continente === activeContinent),
    [activeContinent]
  );

  const formatPrice = (price: number, currency: string) => {
    const localeMap = { pt: "pt-BR", en: "en-US", es: "es-ES" } as const;
    return new Intl.NumberFormat(localeMap[locale], {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <section id="destinos" className="py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy font-bold mb-4">
              {t("dest.title")}
            </h2>
            <p className="text-navy/60 max-w-2xl mx-auto text-lg">
              {t("dest.subtitle")}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {continents.map((c) => (
              <button
                key={c}
                onClick={() => setActiveContinent(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeContinent === c
                    ? "bg-navy text-gold shadow-lg"
                    : "bg-white text-navy/60 hover:bg-navy/5 border border-navy/10"
                }`}
              >
                {c === "all" ? t("continent.all") : t(`continent.${c}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((destino, i) => (
              <motion.article
                key={destino.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-b-2 hover:border-gold transition-shadow duration-500 cursor-pointer"
                onClick={() => setSelectedDestino(destino)}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={destino.imagem}
                    alt={destino.titulo[locale]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <div className="absolute inset-0 shadow-[inset_0_-40px_40px_-20px_rgba(10,25,47,0.3)]" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    {destino.categoria.map((cat) => (
                      <span
                        key={cat}
                        className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${categoryColors[cat]}`}
                      >
                        {t(`cat.${cat}`)}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-offwhite/90 text-sm">
                    <MapPin className="w-4 h-4" />
                    {destino.cidade}, {destino.pais}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-navy mb-2">
                    {destino.titulo[locale]}
                  </h3>
                  <p className="text-navy/60 text-sm mb-4 line-clamp-2">
                    {destino.descricao[locale]}
                  </p>

                  <div className="flex items-center gap-2 text-navy/50 text-sm mb-4">
                    <Clock className="w-4 h-4" />
                    {destino.duracao}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-navy/5">
                    <div>
                      <span className="text-xs text-navy/40 block">{t("dest.from")}</span>
                      <span className="text-xl font-bold text-gold">
                        {formatPrice(destino.preco, destino.moeda)}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-navy/60 group-hover:text-gold transition-colors">
                      {t("dest.details")}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de detalhe do destino com APIs integradas */}
      <AnimatePresence>
        {selectedDestino && (
          <DestinationDetail
            destino={selectedDestino}
            onClose={() => setSelectedDestino(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
