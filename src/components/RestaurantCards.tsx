"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  price: string;
  address: string;
}

const labels = {
  pt: { loading: "Buscando restaurantes..." },
  en: { loading: "Searching restaurants..." },
  es: { loading: "Buscando restaurantes..." },
};

export default function RestaurantCards({ city }: { city: string }) {
  const { locale } = useLanguage();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/restaurants?city=${encodeURIComponent(city)}&limit=6`)
      .then((r) => r.json())
      .then((data) => setRestaurants(data.results || []))
      .catch(() => setRestaurants([]))
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

  if (!restaurants.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {restaurants.map((rest, i) => (
        <motion.div
          key={rest.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-xl p-5 border border-navy/5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-serif text-base font-bold text-navy">{rest.name}</h4>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gold/10 rounded-full shrink-0">
              <Star className="w-3 h-3 text-gold fill-gold" />
              <span className="text-xs font-medium text-gold">{rest.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-navy/5 text-navy/60 text-xs rounded-full">{rest.cuisine}</span>
            <span className="text-xs text-emerald-600 font-medium">{rest.price}</span>
          </div>
          <p className="text-xs text-navy/40 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {rest.address}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
