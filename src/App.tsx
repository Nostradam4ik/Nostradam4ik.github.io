import { useEffect } from 'react'
import { StatusBar } from '@/components/StatusBar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { Stats } from '@/sections/Stats'
import { CaseStudies } from '@/sections/CaseStudies'
import { Experience } from '@/sections/Experience'
import { ProjectIndex } from '@/sections/ProjectIndex'
import { Competences } from '@/sections/Competences'
import { Skills } from '@/sections/Skills'
import { Education } from '@/sections/Education'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { useI18n } from '@/lib/i18n'
import { profile } from '@/data/profile'

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.content = content
}

/**
 * The page is a single document with no router, so the head is kept in sync
 * here rather than by a routing layer. index.html ships the French metadata,
 * which is what a crawler without JavaScript sees.
 */
function useDocumentMeta() {
  const { t, lang } = useI18n()

  useEffect(() => {
    document.title = t.meta.title
    setMeta('meta[name="description"]', t.meta.description)
    setMeta('meta[property="og:title"]', t.meta.ogTitle)
    setMeta('meta[property="og:description"]', t.meta.ogDescription)
    setMeta('meta[property="og:locale"]', lang === 'fr' ? 'fr_FR' : 'en_GB')
  }, [t, lang])
}

/**
 * A hash in the URL arrives before React has rendered the target, so the
 * browser's own jump finds nothing. Repeat it once after the first paint.
 */
function useInitialHashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])
}

export function App() {
  const { ui } = useI18n()
  useDocumentMeta()
  useInitialHashScroll()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60 focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:font-medium focus:text-signal-ink"
      >
        {ui('skip_to_content')}
      </a>

      <StatusBar />

      <main id="main">
        <Hero />
        <Stats />
        <CaseStudies />
        <Experience />
        <ProjectIndex />
        <Competences />
        <Skills />
        <Education />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Tells Google this is a person, with the profile links it should trust. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            jobTitle: 'AI & Full-Stack Developer',
            email: `mailto:${profile.email}`,
            url: profile.siteUrl,
            image: profile.siteUrl + profile.photo,
            address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
            sameAs: [profile.github, profile.linkedin, profile.product],
            knowsLanguage: ['fr', 'uk', 'ru', 'en'],
          }),
        }}
      />
    </>
  )
}
