import { useI18n } from '@/lib/i18n'
import { Section } from '@/components/Section'
import { Block } from '@/components/Block'
import { experience } from '@/data/profile'

/** A ledger, not cards: the dates are the column a recruiter reads first. */
export function Experience() {
  const { t, pick } = useI18n()
  const s = t.sections.parcours

  return (
    <Section id={s.key} eyebrow={s.eyebrow} heading={s.heading} intro={s.intro}>
      <ol className="border-t border-line-1">
        {experience.map((role) => (
          <Block key={role.id} as="li" className="border-b border-line-1 py-7">
            <div className="md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
              <p className="font-mono text-meta text-text-muted">{pick(role.period)}</p>

              <div className="mt-2 md:mt-0">
                <h3 className="text-xl leading-7 font-medium">{pick(role.role)}</h3>
                <p className="mt-1 text-ui text-signal">{role.company}</p>

                <ul className="prose-measure mt-4 space-y-2.5">
                  {pick(role.bullets).map((b) => (
                    <li key={b} className="flex gap-3 text-ui text-text-body">
                      <span aria-hidden="true" className="mt-3 h-px w-2.5 shrink-0 bg-line-3" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-line-2 px-2 py-0.5 font-mono text-meta text-text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Block>
        ))}
      </ol>
    </Section>
  )
}
