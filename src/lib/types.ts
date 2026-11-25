export type Lang = 'fr' | 'en'

export type ProjectCategory = 'ai-llm' | 'ml' | 'fullstack' | 'mobile' | 'infra'

export interface ProjectMetric {
  label: string
  value: string
}

/** Localised half of a project card. */
export interface ProjectCopy {
  tagline: string
  /** One dated line on the state of the project's CI, shown in the project index. */
  ci?: string
  problem: string
  highlights: string[]
  metrics: ProjectMetric[]
  /**
   * Provenance, stated in the card itself: an academic POC published without
   * saying why it is allowed reads as an NDA problem to a French reviewer.
   */
  provenance?: string
}

/** What the thing actually is — a recruiter reads this before the tagline. */
export type ProjectStatus = 'production' | 'professional' | 'academic' | 'takehome' | 'personal'

export interface Project {
  slug: string
  name: string
  category: ProjectCategory
  status: ProjectStatus
  /** Rendered as a full case study rather than an index row. */
  featured?: boolean
  stack: string[]
  repoUrl?: string
  liveUrl?: string
  /** A short scripted film of the running product; the case study then spans the full row. */
  film?: { video: string; poster: string; alt: { fr: string; en: string } }
  fr: ProjectCopy
  en: ProjectCopy
}

export interface ExperienceEntry {
  id: string
  /** A plain name, or a localised label when the name is not public. */
  company: string | { fr: string; en: string }
  /** Kept identical across languages — a stack is a stack. */
  stack: string[]
  period: { fr: string; en: string }
  role: { fr: string; en: string }
  bullets: { fr: string[]; en: string[] }
}

export interface EducationEntry {
  id: string
  school: string
  period: string
  degree: { fr: string; en: string }
  detail?: { fr: string; en: string }
  pdfUrl?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: { fr: string; en: string }
  verifyUrl?: string
  pdfUrl?: string
}

export interface SkillGroup {
  id: string
  label: { fr: string; en: string }
  items: string[]
}

export interface LanguageSkill {
  id: string
  name: { fr: string; en: string }
  level: { fr: string; en: string }
  /** 0–100, used for the proficiency bar. */
  proficiency: number
}

export type RoutePath = '/' | '/travaux' | '/parcours' | '/referentiel' | '/profil'

export interface NavItem {
  path: RoutePath
  label: string
}

export interface StatItem {
  value: string
  label: string
}

export interface PageCopy {
  title: string
  intro: string
}

/** href tokens (@cv, @saas, @github, @repo) are resolved at render time. */
export interface DiagLink {
  label: string
  note: string
  href: string
  external?: boolean
  download?: boolean
}

export type DiagAudience = 'recruiter' | 'jury' | 'dev'

export interface DiagOption {
  id: DiagAudience
  label: string
  heading: string
  links: DiagLink[]
}

export interface SiteCopy {
  meta: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
  }
  nav: NavItem[]
  hero: {
    availability: string
    name: string
    role: string
    headline: string
    subline: string
    terms: string
    ctaPrimary: string
    ctaSecondary: string
  }
  stats: StatItem[]
  about: {
    heading: string
    paragraphs: string[]
  }
  pages: Record<'travaux' | 'parcours' | 'referentiel' | 'profil', PageCopy>
  diag: {
    question: string
    hint: string
    explain: string
    options: DiagOption[]
  }
  contact: {
    heading: string
    body: string
    note: string
  }
  ui: Record<string, string>
  footer: string
}
