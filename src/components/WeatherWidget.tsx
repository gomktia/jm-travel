"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Wind } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  emoji: string;
  condition: Record<string, string>;
  isDay: boolean;
}

const labels = {
  pt: { title: "Clima Agora", humidity: "Umidade", wind: "Vento", loading: "Carregando clima..." },
  en: { title: "Weather Now", humidity: "Humidity", wind: "Wind", loading: "Loading weather..." },
  es: { title: "Clima Ahora", humidity: "Humedad", wind: "Viento", loading: "Cargando clima..." },
};

export default function WeatherWidget({ lat, lon }: { lat: number; lon: number }) {
  const { locale } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setWeather(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [lat, lon]);

  const l = labels[locale];

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-navy/5 to-gold/5 rounded-2xl p-5 animate-pulse">
        <div className="h-4 bg-navy/10 rounded w-24 mb-3" />
        <div className="h-8 bg-navy/10 rounded w-16" />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-offwhite to-gold/5 rounded-2xl p-4 sm:p-5 border border-navy/8"
    >
      <p className="text-[10px] sm:text-xs font-medium text-navy/40 uppercase tracking-wider mb-2 sm:mb-3">{l.title}</p>

      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-3xl sm:text-4xl">{weather.emoji}</span>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold text-navy">{weather.temperature}</span>
            <span className="text-base sm:text-lg text-navy/50">°C</span>
          </div>
          <p className="text-sm text-navy/60">{weather.condition[locale] || weather.condition.pt}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4 pt-3 border-t border-navy/5">
        <div className="flex items-center gap-1.5 text-xs text-navy/50">
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          <span>{l.humidity}: {weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-navy/50">
          <Wind className="w-3.5 h-3.5 text-teal-400" />
          <span>{l.wind}: {weather.windSpeed} km/h</span>
        </div>
      </div>
    </motion.div>
  );
}

/** Versão compacta para card de destino */
export function WeatherBadge({ lat, lon }: { lat: number; lon: number }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((r) => r.json())
      .then((data) => { if (!data.error) setWeather(data); })
      .catch(() => {});
  }, [lat, lon]);

  if (!weather) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-navy/60 backdrop-blur-sm rounded-full text-offwhite text-xs">
      <span>{weather.emoji}</span>
      <span className="font-medium">{weather.temperature}°C</span>
    </div>
  );
}
