"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Calendar, Utensils, Map, BookOpen, Music, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blurDataURL } from "@/lib/images";
import HotelCards from "./HotelCards";
import AttractionsGrid from "./AttractionsGrid";
import CountryInfo from "./CountryInfo";
import WeatherWidget, { WeatherBadge } from "./WeatherWidget";
import WikipediaInfo from "./WikipediaInfo";
import NightlifeGrid from "./NightlifeGrid";
import RestaurantCards from "./RestaurantCards";
import FlightEstimates from "./FlightEstimates";

interface Destino {
  id: string;
  continente: string;
  pais: string;
  cidade: string;
  lat?: number;
  lon?: number;
  titulo: Record<string, string>;
  descricao: Record<string, string>;
  duracao: string;
  categoria: string[];
  preco: number;
  moeda: string;
  imagem: string;
  galeria: string[];
  roteiros: {
    dia: number;
    titulo: Record<string, string>;
    descricao: Record<string, string>;
  }[];
  restaurantes: {
    nome: string;
    tipo: string;
    descricao: Record<string, string>;
  }[];
  pontosTuristicos: {
    nome: string;
    descricao: Record<string, string>;
  }[];
  guiaLocal: Record<string, string>;
}

type TabKey = "itinerary" | "restaurants" | "attractions" | "nightlife" | "hotels" | "flights" | "guide";

const tabLabels: Record<string, Record<TabKey, string>> = {
  pt: { itinerary: "Roteiro", restaurants: "Restaurantes", attractions: "Atrações", nightlife: "Vida Noturna", hotels: "Hotéis", flights: "Voos", guide: "Guia Local" },
  en: { itinerary: "Itinerary", restaurants: "Restaurants", attractions: "Attractions", nightlife: "Nightlife", hotels: "Hotels", flights: "Flights", guide: "Local Guide" },
  es: { itinerary: "Itinerario", restaurants: "Restaurantes", attractions: "Atracciones", nightlife: "Vida Nocturna", hotels: "Hoteles", flights: "Vuelos", guide: "Guía Local" },
};

export default function DestinationDetail({
  destino,
  onClose,
}: {
  destino: Destino;
  onClose: () => void;
}) {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("itinerary");
  const tabs = tabLabels[locale];

  const tabItems: { key: TabKey; label: string; icon: typeof Calendar }[] = [
    { key: "itinerary", label: tabs.itinerary, icon: Calendar },
    { key: "restaurants", label: tabs.restaurants, icon: Utensils },
    { key: "attractions", label: tabs.attractions, icon: Map },
    { key: "nightlife", label: tabs.nightlife, icon: Music },
    { key: "hotels", label: tabs.hotels, icon: BookOpen },
    { key: "flights", label: tabs.flights, icon: Plane },
    { key: "guide", label: tabs.guide, icon: BookOpen },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-navy/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 25 }}
        className="max-w-5xl mx-auto my-8 bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com imagem hero */}
        <div className="relative h-80 sm:h-[28rem]">
          <Image
            src={destino.imagem}
            alt={destino.titulo[locale]}
            fill
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-navy/50 backdrop-blur-sm rounded-full flex items-center justify-center text-offwhite hover:bg-navy/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Weather badge no hero */}
          {destino.lat && destino.lon && (
            <div className="absolute top-4 left-4">
              <WeatherBadge lat={destino.lat} lon={destino.lon} />
            </div>
          )}

          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-offwhite font-bold mb-2">
              {destino.titulo[locale]}
            </h2>
            <p className="text-offwhite/80 text-sm max-w-2xl">{destino.descricao[locale]}</p>
          </div>
        </div>

        {/* Country Info + Weather Widget side by side */}
        <div className="px-6 sm:px-10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <CountryInfo country={destino.pais} />
            </div>
            {destino.lat && destino.lon && (
              <WeatherWidget lat={destino.lat} lon={destino.lon} />
            )}
          </div>
        </div>

        {/* Wikipedia info */}
        <div className="px-6 sm:px-10 pt-6">
          <WikipediaInfo city={destino.cidade} />
        </div>

        {/* Galeria de fotos */}
        <div className="px-6 sm:px-10 pt-6">
          <div className="grid grid-cols-3 gap-3">
            {destino.galeria.slice(0, 3).map((img, i) => (
              <div key={i} className="relative h-36 sm:h-52 rounded-2xl overflow-hidden">
                <Image
                  src={img}
                  alt={`${destino.titulo[locale]} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tabs de conteúdo */}
        <div className="px-6 sm:px-10 pt-8">
          <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-navy/10 scrollbar-hide">
            {tabItems.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-navy text-gold"
                    : "text-navy/50 hover:text-navy hover:bg-navy/5"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="px-6 sm:px-10 py-8">
          <AnimatePresence mode="wait">
            {activeTab === "itinerary" && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                {destino.roteiros.map((r) => (
                  <div key={r.dia} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-gold font-serif font-bold text-lg shrink-0">
                      {r.dia}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-navy">{r.titulo[locale]}</h4>
                      <p className="text-navy/60 text-sm">{r.descricao[locale]}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "restaurants" && (
              <motion.div
                key="restaurants"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                {/* Restaurantes do JSON */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {destino.restaurantes.map((r) => (
                    <div key={r.nome} className="bg-white rounded-xl p-5 border border-navy/5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif text-lg font-bold text-navy">{r.nome}</h4>
                        <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full">{r.tipo}</span>
                      </div>
                      <p className="text-navy/60 text-sm">{r.descricao[locale]}</p>
                    </div>
                  ))}
                </div>
                {/* Restaurantes via API */}
                <RestaurantCards city={destino.cidade} />
              </motion.div>
            )}

            {activeTab === "attractions" && (
              <motion.div
                key="attractions"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {destino.pontosTuristicos.map((p) => (
                    <div key={p.nome} className="bg-white rounded-xl p-5 border border-navy/5">
                      <h4 className="font-serif text-lg font-bold text-navy mb-1">{p.nome}</h4>
                      <p className="text-navy/60 text-sm">{p.descricao[locale]}</p>
                    </div>
                  ))}
                </div>
                <AttractionsGrid city={destino.cidade} />
              </motion.div>
            )}

            {activeTab === "nightlife" && (
              <motion.div
                key="nightlife"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <NightlifeGrid city={destino.cidade} />
              </motion.div>
            )}

            {activeTab === "hotels" && (
              <motion.div
                key="hotels"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <HotelCards city={destino.cidade} />
              </motion.div>
            )}

            {activeTab === "flights" && (
              <motion.div
                key="flights"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <FlightEstimates city={destino.cidade} />
              </motion.div>
            )}

            {activeTab === "guide" && (
              <motion.div
                key="guide"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-white rounded-xl p-6 border border-navy/5"
              >
                <p className="text-navy/70 leading-relaxed">{destino.guiaLocal[locale]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

