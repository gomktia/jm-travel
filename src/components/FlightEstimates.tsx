"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plane, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Flight {
  from: string;
  price: number;
  airline: string;
  duration: string;
}

const labels = {
  pt: { title: "Estimativa de Voos", from: "Saindo de", roundTrip: "ida e volta", loading: "Buscando voos..." },
  en: { title: "Flight Estimates", from: "From", roundTrip: "round trip", loading: "Searching flights..." },
  es: { title: "Estimación de Vuelos", from: "Saliendo de", roundTrip: "ida y vuelta", loading: "Buscando vuelos..." },
};

const originNames: Record<string, string> = {
  GRU: "São Paulo (GRU)",
  GIG: "Rio de Janeiro (GIG)",
};

export default function FlightEstimates({ city }: { city: string }) {
  const { locale } = useLanguage();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/flights?city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((data) => setFlights(data.results || []))
      .catch(() => setFlights([]))
      .finally(() => setLoading(false));
  }, [city]);

  const l = labels[locale];

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        <p className="mt-3 text-navy/50 text-sm">{l.loading}</p>
      </div>
    );
  }

  if (!flights.length) return null;

  return (
    <div className="space-y-3">
      {flights.map((flight, i) => (
        <motion.div
          key={`${flight.from}-${flight.airline}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl p-5 border border-navy/5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-500/10 flex items-center justify-center">
                <Plane className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-navy/70">
                  <span className="font-medium">{originNames[flight.from] || flight.from}</span>
                  <ArrowRight className="w-3 h-3 text-navy/30" />
                  <span className="font-medium">{city}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-navy/40">
                  <span>{flight.airline}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {flight.duration}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-navy/40">{l.from}</p>
              <p className="text-xl font-bold text-navy">
                R$ {flight.price.toLocaleString()}
              </p>
              <p className="text-[10px] text-navy/30">{l.roundTrip}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
