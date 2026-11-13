import { useMemo, useSyncExternalStore } from 'react'
import type { RoutePath } from './types'

export const ROUTES: RoutePath[] = ['/', '/travaux', '/parcours', '/referentiel', '/profil']

export interface Location {
  path: RoutePath
  /** Id of an element to scroll to once the page has rendered. */
  anchor?: string
}

/**
 * The first version of this site was one long page with ids like #referentiel.
 * Those addresses are already in an email and on a submitted PDF, so they keep
 * working: each old id lands on the page that now holds that content.
 */
const LEGACY: Record<string, Location> = {
  top: { path: '/' },
  travaux: { path: '/travaux' },
  parcours: { path: '/parcours' },
  projets: { path: '/parcours', anchor: 'projets' },
  referentiel: { path: '/referentiel' },
  competences: { path: '/profil', anchor: 'competences' },
  formation: { path: '/profil' },
  apropos: { path: '/profil' },
  contact: { path: '/', anchor: 'contact' },
}

export function parseHash(hash: string): Location {
  const h = hash.replace(/^#/, '')

  if (h.startsWith('/')) {
    const [, segment = '', anchor] = h.split('/')
    const path = `/${segment}` as RoutePath
    return { path: ROUTES.includes(path) ? path : '/', anchor: anchor || undefined }
  }

  return LEGACY[h] ?? { path: '/' }
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash
const getServerHash = () => ''

export function useLocation(): Location {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash)
  return useMemo(() => parseHash(hash), [hash])
}

/** href for a route, optionally with an anchor inside it. */
export function href(path: RoutePath, anchor?: string): string {
  const base = path === '/' ? '#/' : `#${path}`
  return anchor ? `${base}/${anchor}` : base
}
