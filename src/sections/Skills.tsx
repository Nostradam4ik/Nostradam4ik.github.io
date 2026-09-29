import { useI18n } from '@/lib/i18n'
import { Section } from '@/components/Section'
import { Block } from '@/components/Block'
import { skillGroups } from '@/data/profile'

/**
 * Dot leaders rather than logo walls or percentage bars: a short, edited list
 * reads as self-assessment, and "le mur de technologies" is the complaint
 * French recruiters raise most often about junior portfolios.
 */
export function Skills() {
  const { t, pick } = useI18n()
  const s = t.sections.competences

  return (
    <Section id={s.key} eyebrow={s.eyebrow} heading={s.heading} intro={s.intro}>
      <dl className="border-t border-line-1">
        {skillGroups.map((group) => (
          <Block key={group.id} className="border-b border-line-1 py-5">
            <div className="sm:grid sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
              <dt className="font-mono text-meta text-text-muted sm:pt-1">{pick(group.label)}</dt>
              <dd className="mt-2 sm:mt-0">
                <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-ui text-text-body">
                      {item}
                      <span aria-hidden="true" className="ml-2 text-line-3 last:hidden">
                        ·
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Block>
        ))}
      </dl>
    </Section>
  )
}
