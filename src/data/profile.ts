import type {
  Certification,
  EducationEntry,
  ExperienceEntry,
  LanguageSkill,
  SkillGroup,
} from '@/lib/types'

export const profile = {
  name: 'Andrii Zhmuryk',
  initials: 'AZ',
  email: 'andrijzmurik@gmail.com',
  phone: '+33 7 57 58 46 14',
  phoneHref: '+33757584614',
  photo: '/andrii-zhmuryk.jpg',
  city: { fr: 'Paris, France', en: 'Paris, France' },
  github: 'https://github.com/Nostradam4ik',
  githubHandle: 'Nostradam4ik',
  linkedin: 'https://www.linkedin.com/in/andrii-zhmuryk-5a3a972b4/',
  linkedinHandle: 'andrii-zhmuryk',
  product: 'https://aireviewresponder.dev',
  productName: 'aireviewresponder.dev',
  cvUrl: { fr: '/cv/Andrii-Zhmuryk-CV-FR.pdf', en: '/cv/Andrii-Zhmuryk-CV-EN.pdf' },
  siteUrl: 'https://andrii-zhmuryk.vercel.app',
} as const

/**
 * Employment status, stated plainly because it is the first thing a French
 * recruiter checks on a junior profile and the one that silently kills
 * applications when left unanswered.
 */
export const availability = {
  contracts: ['CDI', 'CDD'],
  fr: {
    status: 'Disponible immédiatement',
    contract: 'CDI ou CDD',
    zone: 'Paris / Île-de-France — présentiel ou hybride',
    workRight: 'Autorisé à travailler en France sans restriction',
  },
  en: {
    status: 'Available immediately',
    contract: 'Permanent or fixed-term contract',
    zone: 'Paris / Île-de-France — on-site or hybrid',
    workRight: 'Authorised to work in France without restriction',
  },
}

export const experience: ExperienceEntry[] = [
  {
    id: 'zen-leakia',
    company: 'Assurance Zen Dépannage',
    stack: [
      'Mistral AI',
      'RAG (Qdrant)',
      'spaCy',
      'Python',
      'FastAPI',
      'React',
      'TypeScript',
      'Playwright',
      'Docker',
    ],
    period: { fr: 'Juin — Sept. 2026', en: 'Jun — Sep 2026' },
    role: {
      fr: 'Développeur IA & Fullstack',
      en: 'AI & Full-Stack Developer',
    },
    bullets: {
      fr: [
        "Projet Leakia, mené en solo : agent IA conversationnel de pré-diagnostic de fuite d'eau pour assureurs, de la conception du protocole métier jusqu'au rapport PDF.",
        'Architecture fiable, « le modèle ne décide rien » : le protocole de 85 questions et le scoring (niveau, origine) sont exécutés par du code ; le LLM rédige, le code décide.',
        'RAG et vision : pipeline RAG sur Qdrant nourri de rapports réels anonymisés (spaCy, RGPD), analyse des photos par un modèle de vision.',
        'Qualité, testé en conditions réelles : plus de 5 000 tests automatisés, suite Playwright E2E rejouée à chaque livraison, 286 réponses du protocole vérifiées.',
      ],
      en: [
        'Leakia project, built solo: a conversational AI agent that pre-diagnoses water leaks for insurers, from designing the business protocol through to the PDF report.',
        'Reliable architecture, "the model decides nothing": the 85-question protocol and the scoring (severity, origin) run as code; the LLM writes, the code decides.',
        'RAG and vision: a RAG pipeline on Qdrant fed with real anonymised reports (spaCy, GDPR), plus photo analysis through a vision model.',
        'Quality, tested in real conditions: over 5,000 automated tests, a Playwright E2E suite replayed on every release, 286 protocol answers verified.',
      ],
    },
  },
  {
    id: 'nexus-atos',
    company: 'Nexus IA & Atos',
    stack: ['Python', 'TypeScript', 'PostgreSQL', 'Docker', 'MidPoint', 'LDAP'],
    period: { fr: 'Sept. 2025 — Mars 2026', en: 'Sep 2025 — Mar 2026' },
    role: {
      fr: 'Développeur Fullstack IAM',
      en: 'Full-Stack IAM Developer',
    },
    bullets: {
      fr: [
        'Passerelle IAM intelligente multi-cibles : MidPoint, annuaire ApacheDS (LDAP) et Odoo, déployés avec Docker.',
        'Moteur de règles assisté par IA pour automatiser le provisionnement des comptes.',
        'APIs REST sécurisées assurant l’interopérabilité entre systèmes hétérogènes.',
      ],
      en: [
        'Smart multi-target IAM gateway: MidPoint, an ApacheDS (LDAP) directory and Odoo, deployed with Docker.',
        'AI-assisted rules engine automating account provisioning.',
        'Secured REST APIs ensuring interoperability between heterogeneous systems.',
      ],
    },
  },
  {
    id: 'adp-olga',
    company: 'Groupe ADP (Aéroports de Paris)',
    stack: ['Node.js', 'Pydantic', 'Mistral AI'],
    period: { fr: 'Avril — Juin 2025', en: 'Apr — Jun 2025' },
    role: {
      fr: 'Développeur Fullstack',
      en: 'Full-Stack Developer',
    },
    bullets: {
      fr: [
        "Projet OLGA : API REST sécurisée pour l'échange de données entre systèmes.",
        'Intégration de Mistral AI pour automatiser des tâches métiers, en équipe Agile/Scrum.',
      ],
      en: [
        'OLGA project: a secured REST API for data exchange between internal systems.',
        'Mistral AI integration to automate business tasks, working in an Agile/Scrum team.',
      ],
    },
  },
  {
    id: 'lissi-upec',
    company: 'Laboratoire LISSI (UPEC)',
    stack: ['Flutter', 'Dart'],
    period: { fr: 'Juil. — Août 2024', en: 'Jul — Aug 2024' },
    role: {
      fr: 'Développeur',
      en: 'Developer',
    },
    bullets: {
      fr: [
        "Application mobile multiplateforme d'analyse de données médicales par IA.",
        'Conformité RGPD, en collaboration avec des professionnels de santé.',
      ],
      en: [
        'Cross-platform mobile app for AI-based medical data analysis.',
        'GDPR compliance, in collaboration with healthcare professionals.',
      ],
    },
  },
]

export const education: EducationEntry[] = [
  {
    id: 'but-info',
    school: 'UPEC — Créteil',
    period: '2023 — 2026',
    degree: {
      fr: 'BUT Informatique (Bac+3)',
      en: "Bachelor's degree in Computer Science (BUT)",
    },
  },
  {
    id: 'bac-sti2d',
    school: 'Lycée A. Chérioux',
    period: '2021 — 2023',
    degree: {
      fr: 'Bac STI2D, spécialité SIN',
      en: 'French baccalaureate STI2D, digital systems',
    },
  },
]

export const certifications: Certification[] = [
  {
    id: 'stanford-ml',
    name: 'Fundamentals of Machine Learning for Healthcare',
    issuer: 'Stanford University — Coursera',
    date: { fr: 'Juillet 2026', en: 'July 2026' },
    verifyUrl: 'https://coursera.org/verify/94VMSNGP4A74',
    pdfUrl: '/cv/Certificat-Stanford-ML-Healthcare.pdf',
  },
  {
    id: 'oci-ai',
    name: 'Oracle Cloud Infrastructure AI Foundations',
    issuer: 'Oracle — Coursera',
    date: { fr: 'Mai 2026', en: 'May 2026' },
    verifyUrl: 'https://coursera.org/verify/68EXG4ZCHKFX',
    pdfUrl: '/cv/Certificat-Oracle-OCI-AI-Foundations.pdf',
  },
  {
    id: 'toeic',
    name: 'TOEIC Listening & Reading — 740/990',
    issuer: 'ETS Global',
    date: { fr: 'Juin 2026', en: 'June 2026' },
    // The score report carries a date of birth and an ETS ID, so it is not
    // published; the score itself is stated and can be shown on request.
  },
]

export const award = {
  fr: {
    name: 'Hackathon cybersécurité UPEC',
    result: '4ᵉ place sur 40 équipes',
    detail: 'Cryptanalyse et exploitation de failles de sécurité.',
  },
  en: {
    name: 'UPEC Cybersecurity Hackathon',
    result: '4th place out of 40 teams',
    detail: 'Cryptanalysis and security vulnerability exploitation.',
  },
}

/**
 * Tiered rather than listed: a flat wall of thirty logos is the single most
 * cited complaint in French recruiter write-ups on junior portfolios.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    label: { fr: 'IA et données', en: 'AI and data' },
    items: [
      'LLM (Mistral AI, OpenAI, Groq)',
      'RAG',
      'Embeddings',
      'Qdrant',
      'LangChain',
      'Vision (Pixtral)',
      'spaCy',
      'scikit-learn',
      'XGBoost',
      'SHAP',
    ],
  },
  {
    id: 'languages',
    label: { fr: 'Langages', en: 'Languages' },
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    id: 'frameworks',
    label: { fr: 'Back-end et front-end', en: 'Back end and front end' },
    items: ['FastAPI', 'Django', 'Flask', 'Node.js', 'React', 'Flutter', 'Stripe'],
  },
  {
    id: 'quality',
    label: { fr: 'Qualité et DevOps', en: 'Quality and DevOps' },
    items: [
      'Playwright',
      'Tests automatisés',
      'Docker',
      'CI/CD (GitHub Actions)',
      'Linux',
      'nginx',
    ],
  },
  {
    id: 'data',
    label: { fr: 'Bases de données', en: 'Databases' },
    items: ['PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    id: 'security',
    label: { fr: 'Sécurité et API', en: 'Security and APIs' },
    items: ['API REST', 'OAuth 2.0', 'JWT', 'IAM (MidPoint, LDAP)'],
  },
  {
    id: 'basics',
    label: { fr: 'Notions', en: 'Basic knowledge' },
    items: ['Java', 'Kubernetes', 'AWS', 'C++'],
  },
]

export const spokenLanguages: LanguageSkill[] = [
  {
    id: 'fr',
    name: { fr: 'Français', en: 'French' },
    level: { fr: 'C2 — bilingue', en: 'C2 — bilingual' },
    proficiency: 100,
  },
  {
    id: 'uk',
    name: { fr: 'Ukrainien', en: 'Ukrainian' },
    level: { fr: 'Langue maternelle', en: 'Native' },
    proficiency: 100,
  },
  {
    id: 'ru',
    name: { fr: 'Russe', en: 'Russian' },
    level: { fr: 'C2 — bilingue', en: 'C2 — bilingual' },
    proficiency: 100,
  },
  {
    id: 'en',
    name: { fr: 'Anglais', en: 'English' },
    // Reported as measured: the TOEIC total maps to B1, listening alone to B2.
    level: { fr: 'TOEIC 740/990 — écoute B2', en: 'TOEIC 740/990 — listening B2' },
    proficiency: 70,
  },
]
