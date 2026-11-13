import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { profile } from '@/data/profile'
import type { DiagAudience, DiagLink } from '@/lib/types'

const ROW = 56
const ROOT_Y = (ROW * 3) / 2
const WIDTH = 48

/** Centre of each answer, so the branches meet the buttons exactly. */
const rowY = (i: number) => ROW * i + ROW / 2

function branch(i: number): string {
  const y = rowY(i)
  return `M6 ${ROOT_Y} C 28 ${ROOT_Y}, 24 ${y}, ${WIDTH} ${y}`
}

export function Diagnostic() {
  const { t, ui, lang } = useI18n()
  const [picked, setPicked] = useState<DiagAudience | null>(null)

  const options = t.diag.options
  const index = options.findIndex((o) => o.id === picked)
  const current = index >= 0 ? options[index] : null

  const resolve = (link: DiagLink): string => {
    switch (link.href) {
      case '@cv':
        return profile.cvUrl[lang]
      case '@saas':
        return profile.product
      case '@github':
        return profile.github
      case '@repo':
        return profile.repoUrl
      default:
        return link.href
    }
  }

  return (
    <section
      aria-labelledby="diag-question"
      className="on-night rounded-md bg-night p-6 text-night-text sm:p-7"
    >
      <h2 id="diag-question" className="ui text-3xl font-bold !text-night-text">
        {t.diag.question}
      </h2>

      <div className="mt-5 flex items-stretch gap-3">
        {/* A decision tree on its side: the root on the left, one branch per
            answer. The branch to the chosen answer is drawn when you choose. */}
        <svg
          aria-hidden="true"
          width={WIDTH}
          height={ROW * 3}
          viewBox={`0 0 ${WIDTH} ${ROW * 3}`}
          className="shrink-0"
        >
          {options.map((o, i) => (
            <path
              key={o.id}
              d={branch(i)}
              fill="none"
              stroke="var(--color-night-line)"
              strokeWidth="1.5"
            />
          ))}
          {index >= 0 ? (
            <path
              key={picked}
              d={branch(index)}
              pathLength={1}
              fill="none"
              stroke="var(--color-sky)"
              strokeWidth="3"
              strokeLinecap="round"
              className="draw"
            />
          ) : null}
          <circle cx="6" cy={ROOT_Y} r="4.5" fill="var(--color-sky)" />
        </svg>

        <div role="group" aria-labelledby="diag-question" className="flex-1">
          {options.map((o) => {
            const active = o.id === picked
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPicked(active ? null : o.id)}
                style={{ height: ROW }}
                className={[
                  'ui flex w-full items-center rounded-sm px-4 text-left text-lg font-semibold transition-colors',
                  active
                    ? 'bg-sky text-night'
                    : 'text-night-text hover:bg-night-2',
                ].join(' ')}
              >
                {o.label}
              </button>
            )
          })}
        </div>
      </div>

      <div aria-live="polite" className="mt-5 min-h-[13.5rem] border-t border-night-line pt-4">
        {current ? (
          <>
            <h3 className="ui text-lg font-semibold !text-night-text">{current.heading}</h3>
            <ul className="mt-1">
              {current.links.map((link) => {
                const external = link.external
                return (
                  <li key={link.label} className="border-t border-night-line py-2 first:border-t-0">
                    <a
                      href={resolve(link)}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      download={link.download ? true : undefined}
                      className="link ui text-lg font-semibold"
                    >
                      {link.label}
                      {external ? (
                        <span className="sr-only"> ({ui('open_external_aria')})</span>
                      ) : null}
                    </a>
                    <p className="text-base leading-6 text-night-muted">{link.note}</p>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <p className="text-night-muted">{t.diag.hint}</p>
        )}
      </div>

      <p className="mt-3 text-sm leading-6 text-night-muted">{t.diag.explain}</p>
    </section>
  )
}
