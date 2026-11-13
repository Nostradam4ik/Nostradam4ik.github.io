import { useEffect, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { profile } from '@/data/profile'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const SECTION_IDS = [
  'travaux',
  'parcours',
  'projets',
  'referentiel',
  'competences',
  'formation',
  'apropos',
  'contact',
]

/**
 * Sticky bar rather than a conventional nav: a recruiter needs the CV and the
 * language toggle reachable from any scroll position, and neither should ever
 * require scrolling back to the top.
 */
export function StatusBar() {
  const { t, ui, lang, toggleLang } = useI18n()
  const active = useScrollSpy(SECTION_IDS, 96)
  // Sections without a nav link still deserve a running head on mobile.
  const activeLabel =
    t.nav.find((item) => item.key === active)?.label ??
    (active ? (t.sections[active]?.heading ?? '') : '')
  const [open, setOpen] = useState(false)

  // Escape closes the panel, as anyone who has used a menu expects.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line-2 bg-ink-850/88 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--bar-h)] w-full max-w-[var(--page-max)] items-center gap-4 px-4 sm:px-6 lg:px-8 xl:px-12">
        <a
          href="#top"
          className="font-mono text-ui font-medium tracking-wide text-text-hi"
          aria-label={profile.name}
        >
          {profile.initials}
        </a>

        {/* Below md there is no room for the links, so the running head becomes
            the menu: it says where you are and opens the way to anywhere else. */}
        <div className="min-w-0 flex-1 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex max-w-full items-center gap-2 rounded px-1 py-1 font-mono text-meta text-text-muted"
          >
            <span className="truncate">{activeLabel || ui('menu')}</span>
            <span aria-hidden="true" className={open ? 'rotate-180' : ''}>
              ▾
            </span>
            <span className="sr-only">{ui('menu')}</span>
          </button>
        </div>

        <nav aria-label={ui('nav_aria')} className="hidden min-w-0 flex-1 md:block">
          <ul className="flex items-center gap-5 lg:gap-7">
            {t.nav.map((item) => (
              <li key={item.key}>
                <a
                  href={`#${item.key}`}
                  aria-current={active === item.key ? 'true' : undefined}
                  className={[
                    'text-ui transition-colors duration-150',
                    active === item.key
                      ? 'text-text-hi'
                      : 'text-text-muted hover:text-text-body',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLang}
            title={ui('lang_switch_to')}
            aria-label={ui('lang_toggle_aria')}
            className="rounded border border-line-ui px-2 py-1 font-mono text-meta transition-colors duration-150 hover:border-signal"
          >
            {/* Both languages are shown, so the control says what it does
                rather than only what state it is in. */}
            <span aria-hidden="true" className={lang === 'fr' ? 'text-text-hi' : 'text-text-muted'}>
              FR
            </span>
            <span aria-hidden="true" className="mx-1 text-line-3">
              |
            </span>
            <span aria-hidden="true" className={lang === 'en' ? 'text-text-hi' : 'text-text-muted'}>
              EN
            </span>
            <span className="sr-only">{ui('lang_switch_to')}</span>
          </button>

          <a
            href={profile.cvUrl[lang]}
            download
            aria-label={ui('cv_download_aria')}
            className="rounded bg-signal px-3 py-1.5 font-mono text-meta font-medium text-signal-ink transition-colors duration-150 hover:bg-signal-hi active:bg-signal-press"
          >
            {ui('cv_download')}
          </a>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label={ui('nav_aria')}
          className="border-t border-line-2 bg-ink-850 md:hidden"
        >
          <ul className="mx-auto max-w-[var(--page-max)] px-4 py-2 sm:px-6">
            {t.nav.map((item) => (
              <li key={item.key}>
                <a
                  href={`#${item.key}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.key ? 'true' : undefined}
                  className={[
                    'block py-3 text-ui',
                    active === item.key ? 'text-text-hi' : 'text-text-body',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
