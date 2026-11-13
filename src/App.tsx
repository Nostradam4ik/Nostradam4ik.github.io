import { useEffect, useRef } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Home } from '@/pages/Home'
import { Parcours } from '@/pages/Parcours'
import { Profil } from '@/pages/Profil'
import { Referentiel } from '@/pages/Referentiel'
import { Travaux } from '@/pages/Travaux'
import { useI18n } from '@/lib/i18n'
import { useLocation } from '@/lib/router'
import { profile } from '@/data/profile'
import type { RoutePath } from '@/lib/types'

const PAGES: Record<RoutePath, () => React.JSX.Element> = {
  '/': Home,
  '/travaux': Travaux,
  '/parcours': Parcours,
  '/referentiel': Referentiel,
  '/profil': Profil,
}

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.content = content
}

/**
 * The head is kept in sync here, since there is one document and no server.
 * index.html ships the French home metadata, which is what a crawler without
 * JavaScript sees.
 */
function useDocumentMeta(path: RoutePath) {
  const { t, lang } = useI18n()

  useEffect(() => {
    const page = path === '/' ? null : t.pages[path.slice(1) as keyof typeof t.pages]
    document.title = page ? `${page.title} — ${profile.name}` : t.meta.title
    setMeta('meta[name="description"]', t.meta.description)
    setMeta('meta[property="og:title"]', t.meta.ogTitle)
    setMeta('meta[property="og:description"]', t.meta.ogDescription)
    setMeta('meta[property="og:locale"]', lang === 'fr' ? 'fr_FR' : 'en_GB')
  }, [t, lang, path])
}

/**
 * A hash route change leaves the browser where it was. Move to the top of the
 * new page and put focus on its title, so a keyboard or screen-reader user
 * lands at the start of what they asked for. The first load is left alone.
 */
function useRouteEffects(path: RoutePath, anchor?: string) {
  const first = useRef(true)

  useEffect(() => {
    if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      first.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (first.current) {
      first.current = false
      return
    }
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
  }, [path, anchor])
}

export function App() {
  const { ui } = useI18n()
  const { path, anchor } = useLocation()
  useDocumentMeta(path)
  useRouteEffects(path, anchor)

  const Page = PAGES[path]

  return (
    <>
      <a
        href="#main"
        onClick={(event) => {
          // A plain #main would be read by the router as an unknown route.
          event.preventDefault()
          document.querySelector<HTMLElement>('main h1')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60 focus:rounded focus:bg-water focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        {ui('skip_to_content')}
      </a>

      <Header />

      <main id="main">
        <Page />
      </main>

      <Footer />

      {/* Tells search engines this is a person, and which profiles to trust. */}
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
