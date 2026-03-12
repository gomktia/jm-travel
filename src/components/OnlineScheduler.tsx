"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  User,
  CalendarDays,
  Sparkles,
  Video,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const labels = {
  pt: {
    title: "Agenda de Consultoria",
    subtitle: "Agende uma consultoria gratuita com nossos especialistas e comece a planejar a viagem dos seus sonhos.",
    available: "Disponível",
    booked: "Ocupado",
    selectTime: "Selecione uma data no calendário",
    confirm: "Confirmar Agendamento",
    confirmed: "Agendamento confirmado! Entraremos em contato.",
    specialist: "Especialista",
    duration: "45 min — Consultoria gratuita",
    noSlots: "Sem horários neste dia",
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    badge: "Consultoria Gratuita",
    features: [
      { icon: Video, text: "Videochamada ou presencial" },
      { icon: Clock, text: "45 minutos de duração" },
      { icon: MapPin, text: "Roteiro personalizado" },
    ],
    chooseTime: "Horários disponíveis",
  },
  en: {
    title: "Consultation Schedule",
    subtitle: "Book a free consultation with our specialists and start planning your dream trip.",
    available: "Available",
    booked: "Booked",
    selectTime: "Select a date on the calendar",
    confirm: "Confirm Booking",
    confirmed: "Booking confirmed! We will contact you.",
    specialist: "Specialist",
    duration: "45 min — Free consultation",
    noSlots: "No slots on this day",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    badge: "Free Consultation",
    features: [
      { icon: Video, text: "Video call or in-person" },
      { icon: Clock, text: "45-minute session" },
      { icon: MapPin, text: "Custom itinerary" },
    ],
    chooseTime: "Available times",
  },
  es: {
    title: "Agenda de Consultoría",
    subtitle: "Agenda una consultoría gratuita con nuestros especialistas y empieza a planificar el viaje de tus sueños.",
    available: "Disponible",
    booked: "Ocupado",
    selectTime: "Selecciona una fecha en el calendario",
    confirm: "Confirmar Cita",
    confirmed: "¡Cita confirmada! Te contactaremos.",
    specialist: "Especialista",
    duration: "45 min — Consultoría gratuita",
    noSlots: "Sin horarios este día",
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    weekdays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    badge: "Consultoría Gratuita",
    features: [
      { icon: Video, text: "Videollamada o presencial" },
      { icon: Clock, text: "45 minutos de duración" },
      { icon: MapPin, text: "Itinerario personalizado" },
    ],
    chooseTime: "Horarios disponibles",
  },
};

const specialists = [
  { name: "Juliana Mendes", role: { pt: "Caribe & México", en: "Caribbean & Mexico", es: "Caribe & México" }, avatar: "JM", color: "from-rose-400 to-pink-500" },
  { name: "Carlos Duarte", role: { pt: "Europa & Ásia", en: "Europe & Asia", es: "Europa & Asia" }, avatar: "CD", color: "from-blue-400 to-indigo-500" },
  { name: "Ana Luísa", role: { pt: "Brasil Premium", en: "Brazil Premium", es: "Brasil Premium" }, avatar: "AL", color: "from-emerald-400 to-teal-500" },
];

function generateSlots(day: number) {
  const hours = ["09:00", "09:45", "10:30", "11:15", "14:00", "14:45", "15:30", "16:15", "17:00"];
  const seed = day * 7;
  return hours.map((time, i) => ({
    time,
    available: (seed + i) % 3 !== 0,
    specialist: specialists[(seed + i) % specialists.length],
  }));
}

export default function OnlineScheduler() {
  const { locale } = useLanguage();
  const l = labels[locale];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const todayDate = today.getDate();
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const slots = useMemo(
    () => (selectedDay ? generateSlots(selectedDay) : []),
    [selectedDay]
  );

  const selectedSlotData = slots.find((s) => s.time === selectedSlot);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else { setCurrentMonth(currentMonth - 1); }
    setSelectedDay(null); setSelectedSlot(null); setConfirmed(false);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else { setCurrentMonth(currentMonth + 1); }
    setSelectedDay(null); setSelectedSlot(null); setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 4000);
  };

  return (
    <section id="roteiros" className="py-24 bg-gradient-to-b from-offwhite via-white to-offwhite">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {l.badge}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy font-bold mb-4">
            {l.title}
          </h2>
          <p className="text-navy/50 max-w-2xl mx-auto text-base lg:text-lg">{l.subtitle}</p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {l.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy/[0.03] border border-navy/[0.06] text-navy/60 text-sm">
                <feat.icon className="w-4 h-4 text-gold" />
                {feat.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl shadow-navy/[0.06] border border-navy/[0.06] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Calendar */}
            <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-8">
                <button onClick={prevMonth} className="p-2.5 hover:bg-navy/5 rounded-xl transition-colors">
                  <ChevronLeft className="w-5 h-5 text-navy/60" />
                </button>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-xl font-bold text-navy">
                    {l.months[currentMonth]} {currentYear}
                  </h3>
                </div>
                <button onClick={nextMonth} className="p-2.5 hover:bg-navy/5 rounded-xl transition-colors">
                  <ChevronRight className="w-5 h-5 text-navy/60" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {l.weekdays.map((day) => (
                  <div key={day} className="text-center text-xs text-navy/40 font-semibold py-2 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isPast = isCurrentMonth && day < todayDate;
                  const isWeekend = new Date(currentYear, currentMonth, day).getDay() === 0;
                  const isSelected = selectedDay === day;
                  const isToday = isCurrentMonth && day === todayDate;

                  return (
                    <button
                      key={day}
                      disabled={isPast || isWeekend}
                      onClick={() => { setSelectedDay(day); setSelectedSlot(null); setConfirmed(false); }}
                      className={`aspect-square rounded-xl text-sm font-medium transition-all duration-200 relative ${
                        isSelected
                          ? "bg-gradient-to-br from-navy to-navy/90 text-gold shadow-lg shadow-navy/20 scale-105"
                          : isPast || isWeekend
                          ? "text-navy/15 cursor-not-allowed"
                          : isToday
                          ? "bg-gold/10 text-navy font-bold ring-2 ring-gold/30 hover:bg-gold/20"
                          : "text-navy/70 hover:bg-gold/10 hover:text-navy"
                      }`}
                    >
                      {day}
                      {!isPast && !isWeekend && !isSelected && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 mt-6 pt-5 border-t border-navy/5">
                <div className="flex items-center gap-2 text-xs text-navy/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  {l.available}
                </div>
                <div className="flex items-center gap-2 text-xs text-navy/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-navy/15" />
                  {l.booked}
                </div>
              </div>
            </div>

            {/* Time slots panel */}
            <div className="lg:col-span-2 bg-gradient-to-b from-navy/[0.02] to-navy/[0.05] border-t lg:border-t-0 lg:border-l border-navy/[0.06] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {selectedDay ? (
                  <motion.div
                    key={selectedDay}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <p className="text-xs text-navy/40 uppercase tracking-widest mb-1">{l.chooseTime}</p>
                    <p className="font-serif text-xl font-bold text-navy mb-5">
                      {selectedDay} {l.months[currentMonth]}
                    </p>

                    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
                      {slots.map((slot) => (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200 ${
                            selectedSlot === slot.time
                              ? "bg-gradient-to-r from-navy to-navy/90 text-offwhite shadow-lg shadow-navy/20"
                              : slot.available
                              ? "bg-white border border-navy/[0.06] hover:border-gold/30 hover:shadow-md text-navy"
                              : "bg-navy/[0.03] text-navy/25 cursor-not-allowed"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            selectedSlot === slot.time
                              ? "bg-gold/20 text-gold"
                              : slot.available
                              ? `bg-gradient-to-br ${slot.specialist.color} text-white`
                              : "bg-navy/10 text-navy/30"
                          }`}>
                            {slot.specialist.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">{slot.time}</span>
                              {!slot.available && <span className="text-[10px] line-through">{l.booked}</span>}
                            </div>
                            {slot.available && (
                              <p className={`text-[11px] truncate ${selectedSlot === slot.time ? "text-offwhite/60" : "text-navy/40"}`}>
                                {slot.specialist.name} — {slot.specialist.role[locale]}
                              </p>
                            )}
                          </div>
                          {selectedSlot === slot.time && (
                            <Check className="w-5 h-5 text-gold shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Selected specialist info + confirm */}
                    <div className="mt-5 pt-5 border-t border-navy/[0.06]">
                      {selectedSlotData && (
                        <div className="flex items-center gap-3 mb-4 p-3 bg-gold/[0.06] rounded-xl">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedSlotData.specialist.color} flex items-center justify-center text-white text-xs font-bold`}>
                            {selectedSlotData.specialist.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy">{selectedSlotData.specialist.name}</p>
                            <p className="text-[11px] text-navy/40">{selectedSlotData.specialist.role[locale]}</p>
                          </div>
                        </div>
                      )}

                      <p className="text-[11px] text-navy/30 mb-3 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        {l.duration}
                      </p>

                      {confirmed ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-3.5 bg-emerald-500/10 text-emerald-600 text-sm text-center rounded-xl font-medium"
                        >
                          <Check className="w-4 h-4 inline mr-1.5" />
                          {l.confirmed}
                        </motion.div>
                      ) : (
                        <button
                          disabled={!selectedSlot}
                          onClick={handleConfirm}
                          className={`w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                            selectedSlot
                              ? "bg-gradient-to-r from-gold to-amber-500 text-navy hover:shadow-[0_0_24px_rgba(197,160,89,0.35)] hover:scale-[1.02]"
                              : "bg-navy/10 text-navy/30 cursor-not-allowed"
                          }`}
                        >
                          {l.confirm}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-navy/[0.04] flex items-center justify-center mb-5">
                      <CalendarDays className="w-8 h-8 text-navy/15" />
                    </div>
                    <p className="text-navy/35 text-sm font-medium">{l.selectTime}</p>
                    <p className="text-navy/20 text-xs mt-1">{l.duration}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
