import { useI18n } from '@/lib/i18n'
import { profile } from '@/data/profile'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const SECTION_IDS = [
  'travaux',
  'parcours',
  'projets',
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

        {/* A long document with no room for a nav still owes the reader a
            "where am I": the active section label stands in for the links. */}
        <p
          aria-hidden="true"
          className="min-w-0 flex-1 truncate font-mono text-meta text-text-muted md:hidden"
        >
          {activeLabel}
        </p>

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
    </header>
  )
}
