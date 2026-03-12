"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blurDataURL } from "@/lib/images";

interface Hotel {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  address: string;
  priceLevel: number;
  photo: string | null;
}

const labels = {
  pt: { title: "Hotéis de Luxo", reviews: "avaliações", loading: "Buscando hotéis..." },
  en: { title: "Luxury Hotels", reviews: "reviews", loading: "Searching hotels..." },
  es: { title: "Hoteles de Lujo", reviews: "reseñas", loading: "Buscando hoteles..." },
};

/* Renderiza estrelas preenchidas/vazias baseado no rating */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.round(rating) ? "text-gold fill-gold" : "text-navy/20"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-medium text-navy/70">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function HotelCards({ city }: { city: string }) {
  const { locale } = useLanguage();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/hotels?city=${encodeURIComponent(city)}&query=luxury+hotel`)
      .then((r) => r.json())
      .then((data) => setHotels(data.results || []))
      .catch(() => setHotels([]))
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

  if (!hotels.length) return null;

  return (
    <div className="py-16">
      <h3 className="font-serif text-2xl sm:text-3xl text-navy font-bold mb-8 text-center">
        {l.title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, i) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 group"
          >
            {/* Foto do hotel via Google Places com blur placeholder */}
            <div className="relative h-48 overflow-hidden bg-navy/5">
              {hotel.photo ? (
                <Image
                  src={hotel.photo}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-gold/40" />
                </div>
              )}
            </div>

            <div className="p-5">
              <h4 className="font-serif text-lg font-bold text-navy mb-2 line-clamp-1">
                {hotel.name}
              </h4>
              <StarRating rating={hotel.rating} />
              <p className="text-xs text-navy/40 mt-1">
                {hotel.totalReviews.toLocaleString()} {l.reviews}
              </p>
              <p className="text-sm text-navy/60 mt-3 flex items-start gap-1.5 line-clamp-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-gold/60 shrink-0" />
                {hotel.address}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
