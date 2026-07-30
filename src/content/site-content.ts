import type {
  BusinessDetails,
  GalleryImage,
  Highlight,
  NavItem,
} from "@/types/site";

export const siteConfig = {
  name: "G.O.A.T.",
  fullName: "G.O.A.T. Argentine Grill & Bakery",
  siteUrl: "https://example.com",
  locale: "es_CL",
  description:
    "Parrilla argentina, panadería artesanal y café reunidos alrededor del fuego, la mesa y los buenos momentos.",
  reservationCta: {
    label: "Reserva tu mesa",
    // TODO(client): Replace with the approved external reservation URL when available.
    href: "#visitanos",
  },
  hero: {
    eyebrow: "Argentine Grill & Bakery",
    title: "El sabor argentino empieza en el fuego.",
    description:
      "Parrilla, panadería y café hechos con tiempo, oficio y ese espíritu que convierte cada mesa en un encuentro.",
  },
  experience: {
    eyebrow: "Nuestra esencia",
    title: "Fuego, harina y tiempo.",
    body: "Celebramos una cocina honesta que nace de las brasas y continúa en el horno. Una experiencia cercana para compartir cortes a la parrilla, empanadas, panes artesanales, café y mate.",
  },
  story: {
    eyebrow: "Una mesa para compartir",
    title: "Tradición argentina, servida a nuestra manera.",
    body: "G.O.A.T. reúne el carácter de la parrilla con la calidez de una panadería de barrio. Cada detalle está pensado para bajar el ritmo, comer bien y sentirse parte.",
  },
} as const;

// TODO(client): Replace all null values and openingHours before launch.
export const businessDetails: BusinessDetails = {
  address: null,
  phone: null,
  email: null,
  mapUrl: null,
  openingHours: [],
  instagram: null,
  facebook: null,
  tiktok: null,
};

export const navigation: NavItem[] = [
  { label: "Esencia", href: "#esencia" },
  { label: "Sabores", href: "#sabores" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Visítanos", href: "#visitanos" },
];

export const highlights: Highlight[] = [
  {
    name: "Parrilla",
    eyebrow: "01 · A las brasas",
    description:
      "Cortes con carácter, fuego vivo y el punto justo. La parrilla es el corazón de nuestra cocina.",
    image: "/images/hero-grill.png",
    alt: "Corte de carne a la parrilla servido sobre una tabla de madera",
    position: "70% center",
  },
  {
    name: "Empanadas",
    eyebrow: "02 · Hechas a mano",
    description:
      "Masa dorada, rellenos generosos y ese primer bocado que siempre pide otro.",
    image: "/images/bakery-table.png",
    alt: "Empanadas argentinas artesanales sobre una mesa",
    position: "55% 75%",
  },
  {
    name: "Bakery",
    eyebrow: "03 · Recién horneado",
    description:
      "Panes y medialunas con tiempos lentos, corteza crujiente y aroma a panadería de barrio.",
    image: "/images/bakery-table.png",
    alt: "Medialunas y pan artesanal recién horneados",
    position: "64% 25%",
  },
  {
    name: "Café & mate",
    eyebrow: "04 · La sobremesa",
    description:
      "Un buen café, un mate compartido y ninguna prisa para levantarse de la mesa.",
    image: "/images/bakery-table.png",
    alt: "Mate y café servidos junto a panadería artesanal",
    position: "20% 55%",
  },
];

export const gallery: GalleryImage[] = [
  {
    src: "/images/hero-grill.png",
    alt: "Carne argentina cocinada sobre brasas",
    position: "75% center",
  },
  {
    src: "/images/bakery-table.png",
    alt: "Mesa con empanadas, medialunas, café y mate",
    position: "center",
  },
  {
    src: "/images/restaurant-experience.png",
    alt: "Amigos compartiendo una comida frente a la parrilla",
    position: "center",
  },
  {
    src: "/images/bakery-table.png",
    alt: "Pan artesanal y piezas de panadería",
    position: "75% 25%",
  },
  {
    src: "/images/hero-grill.png",
    alt: "Detalle de un corte grillado y empanadas",
    position: "90% 65%",
  },
];
