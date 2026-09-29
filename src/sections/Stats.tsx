import { useI18n } from '@/lib/i18n'
import { Block } from '@/components/Block'

/** Four integers a reader can check, set in tabular mono so they scan as a column. */
export function Stats() {
  const { t } = useI18n()

  return (
    <section aria-label={t.hero.name} className="border-t border-line-2">
      <div className="mx-auto w-full max-w-[var(--page-max)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
        <dl className="seam grid-cols-2 lg:grid-cols-4">
          {t.stats.map((stat) => (
            <Block key={stat.value} className="bg-ink-850 px-4 py-6 sm:px-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-mono text-3xl leading-9 font-medium text-text-hi md:text-4xl md:leading-11">
                  {stat.value}
                </span>
                <span className="mt-2 block text-note text-text-muted">{stat.label}</span>
              </dd>
            </Block>
          ))}
        </dl>
      </div>
    </section>
  )
}
