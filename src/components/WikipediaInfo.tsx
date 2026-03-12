"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blurDataURL } from "@/lib/images";

interface WikiData {
  title: string;
  extract: string;
  image: string | null;
  url: string | null;
}

const labels = {
  pt: { about: "Sobre", readMore: "Ler mais na Wikipedia", loading: "Carregando informações..." },
  en: { about: "About", readMore: "Read more on Wikipedia", loading: "Loading information..." },
  es: { about: "Sobre", readMore: "Leer más en Wikipedia", loading: "Cargando información..." },
};

export default function WikipediaInfo({ city }: { city: string }) {
  const { locale } = useLanguage();
  const [wiki, setWiki] = useState<WikiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/wikipedia?city=${encodeURIComponent(city)}&lang=${locale}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.extract) setWiki(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [city, locale]);

  const l = labels[locale];

  if (loading) {
    return (
      <div className="bg-offwhite rounded-xl p-6 border border-navy/8 animate-pulse">
        <div className="h-4 bg-navy/10 rounded w-32 mb-4" />
        <div className="space-y-2">
          <div className="h-3 bg-navy/10 rounded w-full" />
          <div className="h-3 bg-navy/10 rounded w-5/6" />
          <div className="h-3 bg-navy/10 rounded w-4/6" />
        </div>
      </div>
    );
  }

  if (!wiki) return null;

  /* Trunca extrato em ~400 chars */
  const shortExtract = wiki.extract.length > 400
    ? wiki.extract.slice(0, 400).replace(/\s+\S*$/, "") + "..."
    : wiki.extract;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-offwhite rounded-xl overflow-hidden border border-navy/8 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex flex-col sm:flex-row">
        {wiki.image && (
          <div className="relative w-full sm:w-48 h-36 sm:h-auto shrink-0">
            <Image
              src={wiki.image}
              alt={wiki.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 192px"
              placeholder="blur"
              blurDataURL={blurDataURL}
              unoptimized
            />
          </div>
        )}
        <div className="p-4 sm:p-6 flex-1">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <BookOpen className="w-4 h-4 text-gold shrink-0" />
            <h4 className="font-serif text-base sm:text-lg font-bold text-navy line-clamp-1">{l.about} {wiki.title}</h4>
          </div>
          <p className="text-sm text-navy/60 leading-relaxed mb-4">{shortExtract}</p>
          {wiki.url && (
            <a
              href={wiki.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              {l.readMore}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
