export type Lang = 'fr' | 'en'

export type ProjectCategory = 'ai-llm' | 'ml' | 'fullstack' | 'mobile' | 'infra'

export interface ProjectMetric {
  label: string
  value: string
}

/** Localised half of a project card. */
export interface ProjectCopy {
  tagline: string
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
  fr: ProjectCopy
  en: ProjectCopy
}

export interface ExperienceEntry {
  id: string
  company: string
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

export interface NavItem {
  key: string
  label: string
}

export interface StatItem {
  value: string
  label: string
}

export interface SectionCopy {
  key: string
  eyebrow: string
  heading: string
  intro: string
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
    ctaPrimary: string
    ctaSecondary: string
    location: string
  }
  stats: StatItem[]
  about: {
    eyebrow: string
    heading: string
    paragraphs: string[]
  }
  sections: Record<string, SectionCopy>
  experienceIntro: string
  contact: {
    heading: string
    body: string
    cta: string
    note: string
  }
  ui: Record<string, string>
  footer: string
}
