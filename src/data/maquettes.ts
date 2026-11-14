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

/** Clickable demos: real interactions, invented data, a scripted film each. */
export interface AppDemo {
  slug: string
  name: string
  image: string
  video: string
  demoUrl: string
  fr: { kind: string; alt: string; points: string[] }
  en: { kind: string; alt: string; points: string[] }
}

export const apps: AppDemo[] = [
  {
    slug: 'couvert',
    name: 'Couvert',
    image: '/media/app-couvert.jpg',
    video: '/media/app-couvert.mp4',
    demoUrl: '/demos/service/',
    fr: {
      kind: "Logiciel d'accueil pour restaurant",
      alt: 'Film de 28 secondes : on clique sur une table en retard, on installe le client, on fait défiler la soirée, on crée une réservation, puis on répond à un avis Google',
      points: [
        "Un plan de salle vivant : chaque table change de couleur au fil de la soirée, du client attendu jusqu'à l'addition.",
        'Une réservation en trois clics : la table libre la plus adaptée est choisie toute seule.',
        'Avis Google et fiches clients : une réponse proposée à relire, l’historique de chaque habitué.',
      ],
    },
    en: {
      kind: 'Host-stand software for a restaurant',
      alt: '28-second film: clicking a late table, seating the guests, scrubbing through the evening, creating a booking, then replying to a Google review',
      points: [
        'A live floor plan: each table changes colour through the evening, from expected guests to the bill.',
        'A booking in three clicks: the best free table is picked automatically.',
        'Google reviews and guest files: a suggested reply to proofread, each regular’s history.',
      ],
    },
  },
  {
    slug: 'coulisses',
    name: 'Coulisses',
    image: '/media/app-coulisses.jpg',
    video: '/media/app-coulisses.mp4',
    demoUrl: '/demos/backstage/',
    fr: {
      kind: 'Outil de défilé pour une marque de mode',
      alt: "Film de 31 secondes : on pose un mange-debout sur le plan, une chaise bloque une sortie de secours et l'outil le signale, on ajoute un rang, on place les invités, puis on lance le défilé",
      points: [
        'Un plan de salle à l’échelle : chaises, bancs, mange-debout, bar et décor se glissent sur le plan.',
        'Les rangs se remplissent seuls autour du podium, en laissant libres l’allée et les sorties de secours.',
        'La jauge, les invités placés par priorité et l’ordre de passage des looks, suivis en direct.',
      ],
    },
    en: {
      kind: 'Show-day tool for a fashion label',
      alt: '31-second film: dropping a cocktail table on the plan, a chair blocking an emergency exit gets flagged, adding a row, seating the guests, then starting the show',
      points: [
        'A floor plan to scale: chairs, benches, cocktail tables, bar and props are dragged onto it.',
        'Rows fill themselves around the runway, keeping the aisle and the emergency exits clear.',
        'Capacity, guests seated by priority and the running order of the looks, followed live.',
      ],
    },
  },
  {
    slug: 'seve',
    name: 'Maison Sève',
    image: '/media/app-seve.jpg',
    video: '/media/app-seve.mp4',
    demoUrl: '/demos/seve/',
    fr: {
      kind: 'Site de marque de mode',
      alt: "Film de 28 secondes : la page d'accueil, la collection qui défile à l'horizontale, une taille choisie, le panier, puis une demande d'invitation au défilé",
      points: [
        'Une collection de douze looks qui défile à l’horizontale quand on fait défiler la page.',
        'Fiche produit avec tailles épuisées, panier modifiable, demande d’invitation au défilé.',
        'Relié à l’outil Coulisses : la même marque, du site public jusqu’aux coulisses.',
      ],
    },
    en: {
      kind: 'Fashion label website',
      alt: '28-second film: the home page, the collection scrolling sideways, a size picked, the bag, then a request for a show invitation',
      points: [
        'A twelve-look collection that slides sideways as you scroll down the page.',
        'Product sheet with sold-out sizes, an editable bag, a request for a show invitation.',
        'Linked to the Coulisses tool: one label, from the public site to backstage.',
      ],
    },
  },
]
