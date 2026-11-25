/**
 * Interface demonstrations with invented data: the businesses do not exist, and
 * the pages say so. Each card carries one line on what was built, read off the
 * demo's own source in public/demos/, rather than a sales pitch.
 */
export interface Demo {
  slug: string
  name: string
  video: string
  poster: string
  /** A live copy of the interface, served from /demos/. */
  demoUrl: string
  fr: { kind: string; tech: string; alt: string }
  en: { kind: string; tech: string; alt: string }
}

/** Clickable apps: real interactions, wide films. */
export const apps: Demo[] = [
  {
    slug: 'couvert',
    name: 'Couvert',
    video: '/media/app-couvert.mp4',
    poster: '/media/app-couvert.jpg',
    demoUrl: '/demos/service/',
    fr: {
      kind: 'Accueil de restaurant',
      tech: 'Plan de salle en SVG : l’état de chaque table se calcule à partir de l’heure simulée, et la table libre la plus ajustée est attribuée automatiquement.',
      alt: 'Film de 28 secondes : on clique sur une table en retard, on installe le client, on fait défiler la soirée, on crée une réservation, puis on répond à un avis Google',
    },
    en: {
      kind: 'Restaurant host stand',
      tech: 'SVG floor plan: each table’s state is derived from the simulated clock, and the best-fitting free table is assigned automatically.',
      alt: '28-second film: clicking a late table, seating the guests, scrubbing through the evening, creating a booking, then replying to a Google review',
    },
  },
  {
    slug: 'coulisses',
    name: 'Coulisses',
    video: '/media/app-coulisses.mp4',
    poster: '/media/app-coulisses.jpg',
    demoUrl: '/demos/backstage/',
    fr: {
      kind: 'Organisation d’un défilé',
      tech: 'Glisser-déposer sur un plan à l’échelle, détection des éléments qui bloquent une issue de secours ou le podium, remplissage automatique des rangs.',
      alt: 'Film de 31 secondes : on pose un mange-debout sur le plan, une chaise bloque une sortie de secours et l’outil le signale, on ajoute un rang, on place les invités, puis on lance le défilé',
    },
    en: {
      kind: 'Fashion show planning',
      tech: 'Drag and drop on a to-scale plan, detection of items blocking an emergency exit or the runway, and automatic row filling.',
      alt: '31-second film: dropping a cocktail table on the plan, a chair blocking an emergency exit gets flagged, adding a row, seating the guests, then starting the show',
    },
  },
  {
    slug: 'seve',
    name: 'Maison Sève',
    video: '/media/app-seve.mp4',
    poster: '/media/app-seve.jpg',
    demoUrl: '/demos/seve/',
    fr: {
      kind: 'Site de marque de mode',
      tech: 'Collection qui défile à l’horizontale au rythme du défilement vertical, tailles épuisées et panier modifiable, en JavaScript natif.',
      alt: 'Film de 28 secondes : la page d’accueil, la collection qui défile à l’horizontale, une taille choisie, le panier, puis une demande d’invitation au défilé',
    },
    en: {
      kind: 'Fashion label website',
      tech: 'A collection that scrolls sideways in step with vertical scrolling, sold-out sizes and an editable bag, in plain JavaScript.',
      alt: '28-second film: the home page, the collection scrolling sideways, picking a size, the bag, then requesting an invitation to the show',
    },
  },
]

/** Phone-first pages: short vertical films, shown smaller. */
export const reels: Demo[] = [
  {
    slug: 'odile',
    name: 'Odile',
    video: '/media/reel-odile.mp4',
    poster: '/media/reel-odile.jpg',
    demoUrl: '/demos/odile/',
    fr: {
      kind: 'Page de bistrot, pensée pour le téléphone',
      tech: 'Moteur d’animation écrit sans bibliothèque : chaque valeur dépend du temps et du défilement, ce qui permet aussi de rendre une page image par image.',
      alt: 'Odile : film de dix-huit secondes présentant la page',
    },
    en: {
      kind: 'Bistro page, phone first',
      tech: 'An animation engine written without a library: every value is a function of time and scroll, which also lets a page be rendered frame by frame.',
      alt: 'Odile: eighteen-second film presenting the page',
    },
  },
  {
    slug: 'sauce',
    name: 'Sauce.',
    video: '/media/reel-sauce.mp4',
    poster: '/media/reel-sauce.jpg',
    demoUrl: '/demos/sauce/',
    fr: {
      kind: 'Page de burgerie, pensée pour le téléphone',
      tech: 'Même moteur, direction artistique opposée : la typographie, le rythme et les couleurs changent, la logique d’animation reste.',
      alt: 'Sauce. : film de dix-huit secondes présentant la page',
    },
    en: {
      kind: 'Burger page, phone first',
      tech: 'Same engine, opposite art direction: type, pacing and colour change while the animation logic stays.',
      alt: 'Sauce.: eighteen-second film presenting the page',
    },
  },
]
