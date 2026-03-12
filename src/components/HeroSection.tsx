"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blurDataURL } from "@/lib/images";

const heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80",
];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Imagem de fundo com overlay gradiente para legibilidade do texto */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <Image
            src={heroImages[0]}
            alt="Luxury travel destination"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/30 to-navy/70" />
      </div>

      {/* Conteúdo centralizado com animações staggered para entrada elegante */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Linha decorativa dourada acima do tagline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-gold mx-auto mb-8"
          />

          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-offwhite font-bold leading-tight mb-6">
            {t("hero.tagline")}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-offwhite/80 max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Decorative compass element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="w-8 h-[1px] bg-gold/50" />
            <div className="w-2 h-2 border border-gold/60 rotate-45" />
            <div className="w-8 h-[1px] bg-gold/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* CTA primário: botão dourado com hover sofisticado */}
            <a
              href="#reservar"
              className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] tracking-wide uppercase text-sm"
            >
              {t("hero.cta")}
            </a>
            {/* CTA secundário: bordas douradas, fundo transparente */}
            <a
              href="#destinos"
              className="px-8 py-4 border border-gold/50 text-gold rounded-lg hover:bg-gold/10 transition-all duration-300 tracking-wide uppercase text-sm"
            >
              {t("hero.explore")}
            </a>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll animado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-24 sm:bottom-28"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-gold/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Ondas animadas na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        {/* Onda 1 - mais escura, lenta */}
        <svg
          className="w-full h-20 sm:h-28 animate-wave-slow"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            className="fill-offwhite/20"
          />
        </svg>
        {/* Onda 2 - média */}
        <svg
          className="w-full h-16 sm:h-24 -mt-12 sm:-mt-16 animate-wave-mid"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 C360,30 720,110 1080,50 C1260,20 1380,60 1440,40 L1440,120 L0,120 Z"
            className="fill-offwhite/30"
          />
        </svg>
        {/* Onda 3 - frente, sólida */}
        <svg
          className="w-full h-14 sm:h-20 -mt-10 sm:-mt-14 animate-wave-fast"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C180,80 360,10 540,50 C720,90 900,30 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z"
            className="fill-offwhite"
          />
        </svg>
      </div>
    </section>
  );
}
