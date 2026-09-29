import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lang, SiteCopy } from './types'
import { copy } from '@/data/copy'
import { deepTypoFr } from './typo'

const STORAGE_KEY = 'az-lang'
const LANGS: Lang[] = ['fr', 'en']

function isLang(value: string | null | undefined): value is Lang {
  return value === 'fr' || value === 'en'
}

/**
 * Resolution order: ?lang= query → stored choice → browser preference → fr.
 * French is the default because the primary audience is the French job market.
 */
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'fr'

  const fromQuery = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromQuery)) return fromQuery

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // Private mode or blocked storage — fall through to browser preference.
  }

  const navLangs = window.navigator.languages ?? [window.navigator.language]
  for (const tag of navLangs) {
    const base = tag.slice(0, 2).toLowerCase()
    if (base === 'fr') return 'fr'
    if (base === 'en') return 'en'
  }

  return 'fr'
}

interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: SiteCopy
  /** Shorthand for a flat UI string, returning the key itself if missing. */
  ui: (key: string) => string
  /** Picks the right half of a `{ fr, en }` pair. */
  pick: <T>(pair: { fr: T; en: T }) => T
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Not being able to remember the choice is not worth breaking the page over.
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    // Keep the URL shareable in the chosen language without a navigation.
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState({}, '', url)
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next = LANGS[(LANGS.indexOf(current) + 1) % LANGS.length]
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState({}, '', url)
      return next
    })
  }, [])

  const value = useMemo<I18nValue>(() => {
    // French punctuation spacing is applied once, at the boundary, so no
    // component has to remember it.
    const t = lang === 'fr' ? deepTypoFr(copy.fr) : copy.en
    return {
      lang,
      setLang,
      toggleLang,
      t,
      ui: (key: string) => t.ui[key] ?? key,
      pick: <T,>(pair: { fr: T; en: T }) =>
        lang === 'fr' ? deepTypoFr(pair.fr) : pair.en,
    }
  }, [lang, setLang, toggleLang])

  return <I18nContext value={value}>{children}</I18nContext>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
