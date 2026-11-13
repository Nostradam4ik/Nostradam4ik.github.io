import { useEffect, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { href, useLocation } from '@/lib/router'
import { profile } from '@/data/profile'

export function Header() {
  const { t, ui, lang, toggleLang } = useI18n()
  const { path } = useLocation()
  // The menu is open for one page: remember which, so moving to another page
  // closes it without an effect having to reset anything.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === path
  const setOpen = (value: boolean | ((current: boolean) => boolean)) => {
    const next = typeof value === 'function' ? value(open) : value
    setOpenOn(next ? path : null)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenOn(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur">
      <div className="wrap flex h-16 items-center gap-6">
        <a
          href={href('/')}
          aria-label={ui('home_aria')}
          className="ui text-xl font-bold tracking-tight text-ink"
        >
          {profile.name}
        </a>

        <nav aria-label={ui('nav_aria')} className="ml-4 hidden flex-1 md:block">
          <ul className="flex items-center gap-7">
            {t.nav.map((item) => (
              <li key={item.path}>
                <a
                  href={href(item.path)}
                  aria-current={path === item.path ? 'page' : undefined}
                  className={[
                    'ui border-b-2 py-1 text-base font-medium transition-colors',
                    path === item.path
                      ? 'border-water text-ink'
                      : 'border-transparent text-muted hover:text-ink',
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
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="ui rounded px-2 py-1.5 text-base font-medium text-ink md:hidden"
          >
            {ui('menu')} <span aria-hidden="true">{open ? '▴' : '▾'}</span>
          </button>

          <button
            type="button"
            onClick={toggleLang}
            title={ui('lang_switch_to')}
            aria-label={ui('lang_toggle_aria')}
            className="ui rounded border border-line-ui px-2.5 py-1.5 text-sm font-semibold transition-colors hover:border-ink"
          >
            <span aria-hidden="true" className={lang === 'fr' ? 'text-ink' : 'text-muted'}>
              FR
            </span>
            <span aria-hidden="true" className="mx-1 text-line-ui">
              /
            </span>
            <span aria-hidden="true" className={lang === 'en' ? 'text-ink' : 'text-muted'}>
              EN
            </span>
            <span className="sr-only">{ui('lang_switch_to')}</span>
          </button>

          <a
            href={profile.cvUrl[lang]}
            download
            aria-label={ui('cv_download_aria')}
            className="btn btn-solid hidden min-h-10 px-4 text-sm sm:inline-flex"
          >
            {ui('cv_download')}
          </a>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label={ui('nav_aria')} className="border-t border-line bg-paper md:hidden">
          <ul className="wrap py-2">
            {t.nav.map((item) => (
              <li key={item.path}>
                <a
                  href={href(item.path)}
                  aria-current={path === item.path ? 'page' : undefined}
                  className={[
                    'ui block py-3 text-lg font-medium',
                    path === item.path ? 'text-water' : 'text-ink',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cvUrl[lang]}
                download
                className="ui block py-3 text-lg font-medium text-ink sm:hidden"
              >
                {ui('cv_download')}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
