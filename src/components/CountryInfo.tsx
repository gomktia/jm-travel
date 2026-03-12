"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Clock, Banknote, Languages, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CountryData {
  name: string;
  officialName: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  flag: string;
  flagAlt: string;
  timezones: string[];
  currencies: string[];
  languages: string[];
  googleMapsUrl: string;
}

const labels = {
  pt: {
    capital: "Capital",
    timezone: "Fuso Horário",
    currency: "Moeda",
    language: "Idiomas",
    population: "População",
    loading: "Carregando informações...",
  },
  en: {
    capital: "Capital",
    timezone: "Timezone",
    currency: "Currency",
    language: "Languages",
    population: "Population",
    loading: "Loading information...",
  },
  es: {
    capital: "Capital",
    timezone: "Zona Horaria",
    currency: "Moneda",
    language: "Idiomas",
    population: "Población",
    loading: "Cargando información...",
  },
};

export default function CountryInfo({ country }: { country: string }) {
  const { locale } = useLanguage();
  const [data, setData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!country) return;
    setLoading(true);
    fetch(`/api/country?name=${encodeURIComponent(country)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setData(null);
        else setData(d);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [country]);

  const l = labels[locale];

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        <p className="mt-2 text-navy/50 text-xs">{l.loading}</p>
      </div>
    );
  }

  if (!data) return null;

  /* Formata população de forma curta: 130.5M, 5.4M, etc */
  const formatPop = (n: number) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
  };

  /* Pega só o primeiro timezone para não quebrar layout */
  const mainTimezone = data.timezones[0] || "";

  /* Formata moeda de forma curta: "MXN ($)" em vez de "Mexican peso ($)" */
  const shortCurrency = data.currencies[0]?.replace(/\s*\(/, " (") || "";

  const infoItems = [
    { icon: Globe, label: l.capital, value: data.capital },
    { icon: Clock, label: l.timezone, value: mainTimezone },
    { icon: Banknote, label: l.currency, value: shortCurrency },
    { icon: Languages, label: l.language, value: data.languages.join(", ") },
    { icon: Users, label: l.population, value: formatPop(data.population) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-offwhite rounded-2xl border border-navy/8 p-4 sm:p-5 md:p-6"
    >
      {/* Cabeçalho com bandeira */}
      <div className="flex items-center gap-3 mb-3 sm:mb-5">
        <div className="relative w-10 h-7 rounded-sm overflow-hidden shadow-sm border border-navy/10">
          <Image
            src={data.flag}
            alt={data.flagAlt}
            fill
            className="object-cover"
            sizes="40px"
            unoptimized
          />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-navy leading-tight">{data.name}</h3>
          <p className="text-[11px] text-navy/40">{data.subregion}</p>
        </div>
      </div>

      {/* Info pills - layout horizontal que wrapa */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-navy/[0.06]"
          >
            <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-navy/35 whitespace-nowrap">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-navy whitespace-nowrap">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
