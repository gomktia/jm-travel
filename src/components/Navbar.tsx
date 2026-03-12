"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Locale, localeFlags, localeNames } from "@/lib/i18n";

const mainLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.destinations", href: "#destinos" },
  { key: "nav.itineraries", href: "#roteiros" },
  { key: "nav.booking", href: "#reservar" },
];

const moreLinks = [
  { key: "nav.blog", href: "#blog" },
  { key: "nav.about", href: "#sobre" },
  { key: "nav.faq", href: "#faq" },
  { key: "nav.contact", href: "#contato" },
];

const locales: Locale[] = ["pt", "en", "es"];

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <Compass className="w-8 h-8 text-gold transition-transform group-hover:rotate-45 duration-500" />
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-gold tracking-wider">
                JM
              </span>
              <span className="text-[10px] tracking-[0.3em] text-offwhite/70 uppercase">
                Travel Experience
              </span>
            </div>
          </a>

          {/* Links de navegação - Desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {mainLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-offwhite/80 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
              >
                {t(link.key)}
              </a>
            ))}

            {/* Dropdown "Mais" */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 200)}
                className="flex items-center gap-1 text-sm text-offwhite/80 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
              >
                {locale === "en" ? "More" : locale === "es" ? "Más" : "Mais"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-3 bg-navy border border-gold/20 rounded-xl shadow-2xl overflow-hidden min-w-[180px]"
                  >
                    {moreLinks.map((link) => (
                      <a
                        key={link.key}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-5 py-3 text-sm text-offwhite/70 hover:bg-gold/5 hover:text-gold transition-colors tracking-wide"
                      >
                        {t(link.key)}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Language + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 text-offwhite/80 hover:border-gold/60 transition-colors text-sm"
                aria-label="Select language"
              >
                <span className="text-lg">{localeFlags[locale]}</span>
                <span className="hidden sm:inline">{localeNames[locale]}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 bg-navy border border-gold/20 rounded-xl shadow-2xl overflow-hidden min-w-[160px]"
                  >
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocale(loc);
                          setLangOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                          locale === loc
                            ? "bg-gold/10 text-gold"
                            : "text-offwhite/70 hover:bg-gold/5 hover:text-offwhite"
                        }`}
                      >
                        <span className="text-lg">{localeFlags[loc]}</span>
                        {localeNames[loc]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="md:hidden text-offwhite"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-md border-t border-gold/10 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {[...mainLinks, ...moreLinks].map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-offwhite/80 hover:text-gold transition-colors py-2 text-lg tracking-wide"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
