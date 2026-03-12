"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const PHONE = "5511999990000";
const MESSAGE = encodeURIComponent(
  "Olá, vim pelo site JM Travel Experience e gostaria de informações sobre um roteiro de luxo."
);

export default function WhatsAppWidget() {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-white rounded-xl shadow-xl p-4 w-64 border border-navy/5"
          >
            <button
              onClick={() => setTooltip(false)}
              className="absolute top-2 right-2 text-navy/40 hover:text-navy"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-navy text-sm font-medium mb-1">JM Travel Experience</p>
            <p className="text-navy/60 text-xs mb-3">
              Olá! Como podemos ajudar você a planejar sua viagem dos sonhos?
            </p>
            <a
              href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 bg-[#25D366] text-white text-center text-sm rounded-lg hover:bg-[#20BD5A] transition-colors"
            >
              Iniciar conversa
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão flutuante minimalista com pulse animation */}
      <motion.button
        onClick={() => setTooltip(!tooltip)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </motion.button>
    </div>
  );
}
