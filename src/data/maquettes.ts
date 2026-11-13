/**
 * Concept mock-ups of restaurant sites. The restaurants are invented, and the
 * pages say so; they exist to show what a small business can get, not to
 * pretend to be client work.
 */
export interface Maquette {
  slug: string
  name: string
  video: string
  poster: string
  /** A live, scrollable copy of the page, served from /demos/. */
  demoUrl: string
  fr: { kind: string; points: string[] }
  en: { kind: string; points: string[] }
}

export const maquettes: Maquette[] = [
  {
    slug: 'odile',
    name: 'Odile',
    video: '/media/reel-odile.mp4',
    poster: '/media/reel-odile.jpg',
    demoUrl: '/demos/odile/',
    fr: {
      kind: 'Bistrot du soir',
      points: [
        "L'ardoise du jour mise à jour en deux minutes, sans passer par moi.",
        'Pensé d’abord pour le téléphone, puis adapté à l’ordinateur.',
        'Photos, horaires, adresse et réservation à portée du pouce.',
      ],
    },
    en: {
      kind: 'Evening bistro',
      points: [
        'A daily chalkboard menu that the owner can update in two minutes.',
        'Designed for the phone first, then adapted to the desktop.',
        'Photos, hours, address and booking within thumb reach.',
      ],
    },
  },
  {
    slug: 'sauce',
    name: 'Sauce.',
    video: '/media/reel-sauce.mp4',
    poster: '/media/reel-sauce.jpg',
    demoUrl: '/demos/sauce/',
    fr: {
      kind: 'Burgerie',
      points: [
        'Une carte courte, des prix lisibles, un bouton « Commander » toujours visible.',
        'Un ton et des couleurs choisis pour ce lieu, pas un modèle réutilisé.',
        'Chargement rapide, sans bibliothèque lourde.',
      ],
    },
    en: {
      kind: 'Burger joint',
      points: [
        'A short menu, readable prices, an “Order” button that is always in view.',
        'A tone and colours chosen for this place, not a reused template.',
        'Fast to load, with no heavy library.',
      ],
    },
  },
]
