import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { PageHead } from '@/components/PageHead'
import { useI18n } from '@/lib/i18n'
import { competences } from '@/data/competences'

/**
 * Three competencies, one tab each, so the page is read one at a time rather
 * than scrolled through. The limit is part of each claim: a self-assessment
 * without one is a pitch.
 */
export function Referentiel() {
  const { t, ui, pick } = useI18n()
  const page = t.pages.referentiel
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const move = (to: number) => {
    const next = (to + competences.length) % competences.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(i + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(i - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      move(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      move(competences.length - 1)
    }
  }

  const c = competences[active]

  return (
    <>
      <PageHead title={page.title} intro={page.intro} />

      <div className="wrap">
        <div role="tablist" aria-label={ui('tabs_aria')} className="grid gap-0 sm:grid-cols-3">
          {competences.map((item, i) => {
            const on = i === active
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={on}
                aria-controls={`panel-${item.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={[
                  'ui flex flex-col items-start justify-start border-t-4 py-4 pr-4 text-left transition-colors',
                  on
                    ? 'border-water text-ink'
                    : 'border-line text-muted hover:border-line-ui hover:text-ink',
                ].join(' ')}
              >
                <span className="block text-sm font-semibold">
                  {item.code}, {ui('level_confirmed').toLowerCase()}
                </span>
                <span className="mt-1 block text-xl leading-snug font-bold">{pick(item.name)}</span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${c.id}`}
          aria-labelledby={`tab-${c.id}`}
          tabIndex={0}
          className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16"
        >
          <div>
            <p className="text-2xl leading-9 text-ink">{pick(c.expected)}</p>

            <h2 className="ui mt-10 text-2xl font-bold !tracking-normal">{ui('evidence')}</h2>
            <ul className="mt-3 list-disc space-y-3 pl-5 marker:text-water">
              {pick(c.evidence).map((e) => (
                <li key={e} className="pl-1">
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="ui text-2xl font-bold !tracking-normal">{ui('self_analysis')}</h2>
            <p className="mt-3 border-l-4 border-water pl-5 text-xl leading-9 text-ink">
              {pick(c.reflection)}
            </p>

            <div className="mt-10 bg-panel p-6">
              <h3 className="ui text-lg font-bold">{ui('where_it_stops')}</h3>
              <p className="mt-2 text-body">{pick(c.limit)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
