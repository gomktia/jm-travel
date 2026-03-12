"use client";

import {
  Compass,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Plane,
  Hotel,
  Car,
  ShieldCheck,
  Ticket,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const quickLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.destinations", href: "#destinos" },
  { key: "nav.itineraries", href: "#roteiros" },
  { key: "nav.booking", href: "#reservar" },
];

const usefulLinks = [
  { icon: Plane, label: { pt: "Passagens Aéreas", en: "Flights", es: "Vuelos" }, url: "https://www.google.com/travel/flights" },
  { icon: Hotel, label: { pt: "Hotéis", en: "Hotels", es: "Hoteles" }, url: "https://www.booking.com" },
  { icon: Car, label: { pt: "Aluguel de Carro", en: "Car Rental", es: "Alquiler de Auto" }, url: "https://www.discovercars.com" },
  { icon: ShieldCheck, label: { pt: "Seguro Viagem", en: "Travel Insurance", es: "Seguro de Viaje" }, url: "https://www.melhorseguro.com.br" },
  { icon: Ticket, label: { pt: "Passeios", en: "Tours", es: "Tours" }, url: "https://www.civitatis.com/br/" },
  { icon: Smartphone, label: { pt: "Chip Internacional", en: "International SIM", es: "Chip Internacional" }, url: "https://simpremium.com.br" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", url: "https://instagram.com/jmtravelexperience" },
  { icon: Facebook, label: "Facebook", url: "https://facebook.com/jmtravelexperience" },
  { icon: Youtube, label: "TikTok", url: "https://tiktok.com/@jmtravelexperience" },
];

const footerLabels = {
  pt: { useful: "Links Úteis" },
  en: { useful: "Useful Links" },
  es: { useful: "Enlaces Útiles" },
};

export default function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer id="contato" className="bg-navy border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Coluna da marca */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-7 h-7 text-gold" />
              <div>
                <span className="text-xl font-serif font-bold text-gold tracking-wider">
                  JM
                </span>
                <span className="block text-[9px] tracking-[0.25em] text-offwhite/60 uppercase">
                  Travel Experience
                </span>
              </div>
            </div>
            <p className="text-offwhite/50 text-sm leading-relaxed mb-6">
              {t("footer.description")}
            </p>

            {/* Redes sociais com ícones */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-offwhite/50 hover:text-gold hover:border-gold/50 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-serif text-gold text-lg mb-4">{t("footer.links")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-offwhite/50 hover:text-gold transition-colors text-sm"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links úteis — Passagens, Hotéis, etc */}
          <div>
            <h4 className="font-serif text-gold text-lg mb-4">
              {footerLabels[locale].useful}
            </h4>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.label.pt}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-offwhite/50 hover:text-gold transition-colors text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-3.5 h-3.5 text-gold/40" />
                    {link.label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-serif text-gold text-lg mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-offwhite/50 text-sm">
                <Phone className="w-4 h-4 text-gold/60" />
                +55 (11) 99999-0000
              </li>
              <li className="flex items-center gap-2 text-offwhite/50 text-sm">
                <Mail className="w-4 h-4 text-gold/60" />
                contato@jmtravelexperience.com
              </li>
              <li className="flex items-start gap-2 text-offwhite/50 text-sm">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5" />
                {t("footer.address")}
              </li>
            </ul>
          </div>

          {/* Mini-mapa do Instagram feed mockado */}
          <div>
            <h4 className="font-serif text-gold text-lg mb-4">
              <Instagram className="w-4 h-4 inline mr-1.5" />
              @jmtravelexperience
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                "photo-1510097467424-192d713fd8b2",
                "photo-1502602898657-3e91760cbb34",
                "photo-1540959733332-eab4deabeeaf",
                "photo-1514282401047-d79a71a590e8",
                "photo-1629637790799-96e939404cf7",
                "photo-1682553064442-dd4e141b0f16",
              ].map((id) => (
                <a
                  key={id}
                  href="https://instagram.com/jmtravelexperience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <img
                    src={`https://images.unsplash.com/${id}?w=150&h=150&fit=crop&q=60`}
                    alt="Instagram"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-offwhite/30 text-sm">
            &copy; {new Date().getFullYear()} JM Travel Experience. {t("footer.rights")}
          </p>
          <p className="text-offwhite/20 text-xs">
            www.jmtravelexperience.com
          </p>
        </div>
      </div>
    </footer>
  );
}
