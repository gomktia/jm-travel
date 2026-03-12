export type Locale = "pt" | "en" | "es";

export const localeFlags: Record<Locale, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const dictionary: Record<Locale, Record<string, string>> = {
  pt: {
    // Navbar
    "nav.home": "Início",
    "nav.destinations": "Destinos",
    "nav.itineraries": "Roteiros",
    "nav.booking": "Reservar",
    "nav.contact": "Contato",
    "nav.blog": "Blog",
    "nav.about": "Sobre Nós",
    "nav.faq": "FAQ",

    // Hero
    "hero.tagline": "Viva o Mundo dos Seus Sonhos",
    "hero.subtitle":
      "Viagens completas e sob medida para destinos extraordinários. Pacotes exclusivos pelo México, Brasil e Espanha.",
    "hero.cta": "Agendar Experiência",
    "hero.explore": "Explorar Destinos",

    // Destinations
    "dest.title": "Destinos Exclusivos",
    "dest.subtitle":
      "Cada destino foi cuidadosamente selecionado para oferecer experiências únicas e inesquecíveis.",
    "dest.all": "Todos",
    "dest.from": "A partir de",
    "dest.details": "Ver Detalhes",
    "dest.days": "dias",

    // Categories
    "cat.Luxo": "Luxo",
    "cat.Aventura": "Aventura",
    "cat.Gastronomia": "Gastronomia",

    // Booking
    "book.title": "Agende sua Experiência",
    "book.subtitle":
      "Preencha o formulário e nossa equipe entrará em contato para criar a viagem perfeita para você.",
    "book.name": "Nome Completo",
    "book.email": "E-mail",
    "book.phone": "Telefone",
    "book.destination": "Destino de Interesse",
    "book.select": "Selecione um destino",
    "book.date": "Data Desejada",
    "book.travelers": "Número de Viajantes",
    "book.message": "Mensagem (opcional)",
    "book.messagePlaceholder":
      "Conte-nos sobre suas preferências, interesses especiais ou dúvidas...",
    "book.submit": "Enviar Solicitação",
    "book.success": "Solicitação enviada com sucesso! Entraremos em contato em breve.",

    // Footer
    "footer.description":
      "Agência de turismo de luxo especializada em viagens sob medida para destinos extraordinários.",
    "footer.links": "Links Rápidos",
    "footer.contact": "Contato",
    "footer.social": "Redes Sociais",
    "footer.rights": "Todos os direitos reservados.",
    "footer.address": "Atendimento em Português & Español",

    // Continents
    "continent.all": "Todos",
    "continent.Asia": "Ásia",
    "continent.Europa": "Europa",
    "continent.América do Sul": "América do Sul",
    "continent.América do Norte": "América do Norte",
  },
  en: {
    "nav.home": "Home",
    "nav.destinations": "Destinations",
    "nav.itineraries": "Itineraries",
    "nav.booking": "Book Now",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.about": "About Us",
    "nav.faq": "FAQ",

    "hero.tagline": "Live the World of Your Dreams",
    "hero.subtitle":
      "Complete and tailor-made travel to extraordinary destinations. Exclusive packages to Mexico, Brazil, and Spain.",
    "hero.cta": "Book Experience",
    "hero.explore": "Explore Destinations",

    "dest.title": "Exclusive Destinations",
    "dest.subtitle":
      "Each destination has been carefully selected to offer unique and unforgettable experiences.",
    "dest.all": "All",
    "dest.from": "From",
    "dest.details": "View Details",
    "dest.days": "days",

    "cat.Luxo": "Luxury",
    "cat.Aventura": "Adventure",
    "cat.Gastronomia": "Gastronomy",

    "book.title": "Book Your Experience",
    "book.subtitle":
      "Fill in the form and our team will contact you to create the perfect trip.",
    "book.name": "Full Name",
    "book.email": "Email",
    "book.phone": "Phone",
    "book.destination": "Destination of Interest",
    "book.select": "Select a destination",
    "book.date": "Preferred Date",
    "book.travelers": "Number of Travelers",
    "book.message": "Message (optional)",
    "book.messagePlaceholder":
      "Tell us about your preferences, special interests, or questions...",
    "book.submit": "Send Request",
    "book.success": "Request sent successfully! We will contact you soon.",

    "footer.description":
      "Luxury tourism agency specializing in tailor-made travel to extraordinary destinations.",
    "footer.links": "Quick Links",
    "footer.contact": "Contact",
    "footer.social": "Social Media",
    "footer.rights": "All rights reserved.",
    "footer.address": "Service in Portuguese & Spanish",

    "continent.all": "All",
    "continent.Asia": "Asia",
    "continent.Europa": "Europe",
    "continent.América do Sul": "South America",
    "continent.América do Norte": "North America",
  },
  es: {
    "nav.home": "Inicio",
    "nav.destinations": "Destinos",
    "nav.itineraries": "Itinerarios",
    "nav.booking": "Reservar",
    "nav.contact": "Contacto",
    "nav.blog": "Blog",
    "nav.about": "Sobre Nosotros",
    "nav.faq": "FAQ",

    "hero.tagline": "Vive el Mundo de tus Sueños",
    "hero.subtitle":
      "Viajes completos y a medida hacia destinos extraordinarios. Paquetes exclusivos por México, Brasil y España.",
    "hero.cta": "Agendar Experiencia",
    "hero.explore": "Explorar Destinos",

    "dest.title": "Destinos Exclusivos",
    "dest.subtitle":
      "Cada destino ha sido cuidadosamente seleccionado para ofrecer experiencias únicas e inolvidables.",
    "dest.all": "Todos",
    "dest.from": "Desde",
    "dest.details": "Ver Detalles",
    "dest.days": "días",

    "cat.Luxo": "Lujo",
    "cat.Aventura": "Aventura",
    "cat.Gastronomia": "Gastronomía",

    "book.title": "Agenda tu Experiencia",
    "book.subtitle":
      "Completa el formulario y nuestro equipo te contactará para crear el viaje perfecto.",
    "book.name": "Nombre Completo",
    "book.email": "Correo Electrónico",
    "book.phone": "Teléfono",
    "book.destination": "Destino de Interés",
    "book.select": "Selecciona un destino",
    "book.date": "Fecha Deseada",
    "book.travelers": "Número de Viajeros",
    "book.message": "Mensaje (opcional)",
    "book.messagePlaceholder":
      "Cuéntanos sobre tus preferencias, intereses especiales o dudas...",
    "book.submit": "Enviar Solicitud",
    "book.success": "¡Solicitud enviada con éxito! Te contactaremos pronto.",

    "footer.description":
      "Agencia de turismo de lujo especializada en viajes a medida hacia destinos extraordinarios.",
    "footer.links": "Enlaces Rápidos",
    "footer.contact": "Contacto",
    "footer.social": "Redes Sociales",
    "footer.rights": "Todos los derechos reservados.",
    "footer.address": "Atención en Portugués & Español",

    "continent.all": "Todos",
    "continent.Asia": "Asia",
    "continent.Europa": "Europa",
    "continent.América do Sul": "Sudamérica",
    "continent.América do Norte": "Norteamérica",
  },
};
