"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Hotel,
  Car,
  ShieldCheck,
  Ticket,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const links = [
  {
    icon: Plane,
    label: { pt: "Passagens Aéreas", en: "Flights", es: "Vuelos" },
    desc: {
      pt: "Encontre as melhores tarifas para o seu destino dos sonhos",
      en: "Find the best fares to your dream destination",
      es: "Encuentra las mejores tarifas para tu destino soñado",
    },
    url: "https://www.google.com/travel/flights",
    gradient: "from-sky-500 to-blue-600",
    bgGlow: "bg-sky-500/10",
  },
  {
    icon: Hotel,
    label: { pt: "Hotéis de Luxo", en: "Luxury Hotels", es: "Hoteles de Lujo" },
    desc: {
      pt: "Resorts 5 estrelas e experiências únicas de hospedagem",
      en: "5-star resorts and unique lodging experiences",
      es: "Resorts 5 estrellas y experiencias únicas de alojamiento",
    },
    url: "https://www.booking.com",
    gradient: "from-amber-500 to-yellow-600",
    bgGlow: "bg-amber-500/10",
  },
  {
    icon: Car,
    label: { pt: "Aluguel de Carro", en: "Car Rental", es: "Alquiler de Auto" },
    desc: {
      pt: "Liberdade para explorar cada canto do destino",
      en: "Freedom to explore every corner of your destination",
      es: "Libertad para explorar cada rincón del destino",
    },
    url: "https://www.discovercars.com",
    gradient: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-500/10",
  },
  {
    icon: ShieldCheck,
    label: { pt: "Seguro Viagem", en: "Travel Insurance", es: "Seguro de Viaje" },
    desc: {
      pt: "Viaje com total tranquilidade e proteção completa",
      en: "Travel with complete peace of mind and full protection",
      es: "Viaja con total tranquilidad y protección completa",
    },
    url: "https://www.melhorseguro.com.br",
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/10",
  },
  {
    icon: Ticket,
    label: { pt: "Passeios & Ingressos", en: "Tours & Tickets", es: "Tours y Entradas" },
    desc: {
      pt: "Experiências exclusivas e atividades imperdíveis",
      en: "Exclusive experiences and unmissable activities",
      es: "Experiencias exclusivas y actividades imperdibles",
    },
    url: "https://www.civitatis.com/br/",
    gradient: "from-rose-500 to-pink-600",
    bgGlow: "bg-rose-500/10",
  },
  {
    icon: Smartphone,
    label: { pt: "Chip Internacional", en: "International SIM", es: "Chip Internacional" },
    desc: {
      pt: "Conectado em qualquer lugar do mundo",
      en: "Connected anywhere in the world",
      es: "Conectado en cualquier lugar del mundo",
    },
    url: "https://simpremium.com.br",
    gradient: "from-cyan-500 to-teal-600",
    bgGlow: "bg-cyan-500/10",
  },
];

const sectionLabels = {
  pt: { title: "Planeje Cada Detalhe", subtitle: "Serviços essenciais selecionados pela nossa equipe para uma viagem perfeita." },
  en: { title: "Plan Every Detail", subtitle: "Essential services curated by our team for the perfect trip." },
  es: { title: "Planifica Cada Detalle", subtitle: "Servicios esenciales seleccionados por nuestro equipo para un viaje perfecto." },
};

export default function UsefulLinks() {
  const { locale } = useLanguage();
  const l = sectionLabels[locale];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {locale === "en" ? "Services" : locale === "es" ? "Servicios" : "Serviços"}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy font-bold mb-4">
            {l.title}
          </h2>
          <p className="text-navy/50 max-w-lg mx-auto text-base">{l.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link, i) => (
            <motion.a
              key={link.label.pt}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative flex items-start gap-5 p-6 rounded-2xl bg-white border border-navy/[0.06] hover:border-navy/10 hover:shadow-xl hover:shadow-navy/[0.04] transition-all duration-500 overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 ${link.bgGlow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center shadow-lg shadow-navy/5`}>
                <link.icon className="w-6 h-6 text-white" strokeWidth={1.8} />
              </div>

              {/* Content */}
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-navy text-[15px] leading-tight">
                    {link.label[locale]}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-navy/30 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <p className="text-[13px] text-navy/45 leading-relaxed">
                  {link.desc[locale]}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
