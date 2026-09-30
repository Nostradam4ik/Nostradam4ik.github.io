import { useI18n } from '@/lib/i18n'
import { Section } from '@/components/Section'
import { Block } from '@/components/Block'
import { competences } from '@/data/competences'

/**
 * The BUT self-assessment: three competencies, each with what the level asks,
 * checkable evidence, what changed in how I work, and where the level stops.
 * The limit is part of the claim — a self-assessment without one is a pitch.
 */
export function Competences() {
  const { t, ui, pick } = useI18n()
  const s = t.sections.referentiel

  return (
    <Section id={s.key} eyebrow={s.eyebrow} heading={s.heading} intro={s.intro}>
      <div className="space-y-14 md:space-y-16">
        {competences.map((c) => (
          <Block key={c.id} as="article" className="border-t border-line-2 pt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded bg-ink-750 px-2 py-1 font-mono text-micro text-text-muted">
                {c.code}
              </span>
              <span className="rounded bg-signal-wash px-2 py-1 font-mono text-micro text-signal">
                {ui('level_confirmed')}
              </span>
            </div>

            <h3 className="mt-4 text-xl leading-8 font-medium md:text-2xl md:leading-9">
              {pick(c.name)}
            </h3>

            <p className="prose-measure mt-4 text-text-body">{pick(c.expected)}</p>

            <div className="mt-8 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
              <div>
                <h4 className="font-mono text-micro text-text-muted">{ui('evidence')}</h4>
                <ul className="mt-3 space-y-3">
                  {pick(c.evidence).map((e) => (
                    <li key={e} className="flex gap-3 text-ui text-text-body">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-signal" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 md:mt-0">
                <h4 className="font-mono text-micro text-text-muted">{ui('self_analysis')}</h4>
                <p className="mt-3 font-serif text-lg leading-8 text-text-body">
                  {pick(c.reflection)}
                </p>

                <div className="mt-6 rounded border border-line-2 bg-ink-800 px-4 py-3">
                  <h4 className="font-mono text-micro text-text-muted">{ui('where_it_stops')}</h4>
                  <p className="mt-1.5 text-note text-text-body">{pick(c.limit)}</p>
                </div>
              </div>
            </div>
          </Block>
        ))}
      </div>
    </Section>
  )
}
