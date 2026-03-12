"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CalendarDays, Users, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import destinos from "@/data/destinos.json";

export default function BookingForm() {
  const { locale, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="reservar" className="py-24 bg-navy relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-offwhite font-bold mb-4">
            {t("book.title")}
          </h2>
          <p className="text-offwhite/60 max-w-xl mx-auto text-lg">
            {t("book.subtitle")}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Nome */}
            <div className="sm:col-span-2">
              <label className="block text-offwhite/70 text-sm mb-2 tracking-wide">
                {t("book.name")}
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-white/5 border border-gold/15 rounded-lg text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-offwhite/70 text-sm mb-2 tracking-wide">
                {t("book.email")}
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-gold/15 rounded-lg text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-offwhite/70 text-sm mb-2 tracking-wide">
                {t("book.phone")}
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 bg-white/5 border border-gold/15 rounded-lg text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Seletor de destino com ícone */}
            <div>
              <label className="block text-offwhite/70 text-sm mb-2 tracking-wide">
                <MapPin className="w-4 h-4 inline mr-1" />
                {t("book.destination")}
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-white/5 border border-gold/15 rounded-lg text-offwhite focus:outline-none focus:border-gold/50 transition-colors appearance-none"
              >
                <option value="" className="bg-navy">
                  {t("book.select")}
                </option>
                {destinos.destinos.map((d) => (
                  <option key={d.id} value={d.id} className="bg-navy">
                    {d.titulo[locale]}
                  </option>
                ))}
              </select>
            </div>

            {/* Date picker nativo estilizado */}
            <div>
              <label className="block text-offwhite/70 text-sm mb-2 tracking-wide">
                <CalendarDays className="w-4 h-4 inline mr-1" />
                {t("book.date")}
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 bg-white/5 border border-gold/15 rounded-lg text-offwhite focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Número de viajantes */}
            <div>
              <label className="block text-offwhite/70 text-sm mb-2 tracking-wide">
                <Users className="w-4 h-4 inline mr-1" />
                {t("book.travelers")}
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-white/5 border border-gold/15 rounded-lg text-offwhite focus:outline-none focus:border-gold/50 transition-colors appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-navy">
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensagem opcional */}
            <div className="sm:col-span-2">
              <label className="block text-offwhite/70 text-sm mb-2 tracking-wide">
                {t("book.message")}
              </label>
              <textarea
                rows={4}
                placeholder={t("book.messagePlaceholder")}
                className="w-full px-4 py-3 bg-white/5 border border-gold/15 rounded-lg text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
            </div>

            {/* Botão de envio */}
            <div className="sm:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 bg-gold/10 rounded-lg text-gold"
                >
                  {t("book.success")}
                </motion.div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] flex items-center justify-center gap-2 tracking-wide uppercase text-sm"
                >
                  <Send className="w-4 h-4" />
                  {t("book.submit")}
                </button>
              )}
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
