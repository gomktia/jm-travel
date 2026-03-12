"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Venue {
  name: string;
  category: string;
  address: string;
  rating: number;
}

const labels = {
  pt: { title: "Vida Noturna", loading: "Buscando bares e baladas..." },
  en: { title: "Nightlife", loading: "Searching bars and clubs..." },
  es: { title: "Vida Nocturna", loading: "Buscando bares y discotecas..." },
};

export default function NightlifeGrid({ city }: { city: string }) {
  const { locale } = useLanguage();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/nightlife?city=${encodeURIComponent(city)}&limit=6`)
      .then((r) => r.json())
      .then((data) => setVenues(data.results || []))
      .catch(() => setVenues([]))
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

  if (!venues.length) return null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {venues.map((venue, i) => (
          <motion.div
            key={venue.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl p-5 border border-navy/5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <Music className="w-4 h-4 text-purple-500" />
                </div>
                <h4 className="font-serif text-base font-bold text-navy">{venue.name}</h4>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gold/10 rounded-full">
                <Star className="w-3 h-3 text-gold fill-gold" />
                <span className="text-xs font-medium text-gold">{venue.rating}</span>
              </div>
            </div>
            <span className="inline-block px-2.5 py-0.5 bg-navy/5 text-navy/60 text-xs rounded-full mb-2">
              {venue.category}
            </span>
            <p className="text-xs text-navy/40 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {venue.address}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
