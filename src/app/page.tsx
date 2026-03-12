"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import UsefulLinks from "@/components/UsefulLinks";
import OnlineScheduler from "@/components/OnlineScheduler";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

/**
 * Página principal - Single Page Application com seções âncora.
 * Fluxo: Hero > Destinos > Links Úteis > Agenda > Formulário > Footer
 */
export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <HeroSection />
        <DestinationsSection />
        <UsefulLinks />
        <OnlineScheduler />
        <BookingForm />
      </main>
      <Footer />
      <WhatsAppWidget />
    </LanguageProvider>
  );
}
