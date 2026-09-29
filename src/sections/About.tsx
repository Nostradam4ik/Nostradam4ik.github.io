import { useI18n } from '@/lib/i18n'
import { Block } from '@/components/Block'
import { profile } from '@/data/profile'

/**
 * The one place on the page set in a serif, and the one written in the first
 * person. A second use anywhere else would turn a voice tier into a motif.
 */
export function About() {
  const { t } = useI18n()

  return (
    <section
      id="apropos"
      aria-labelledby="apropos-heading"
      className="border-t border-line-2 bg-ink-850 py-16 md:py-22 lg:py-30"
    >
      <div className="mx-auto w-full max-w-[var(--page-max)] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="lg:grid lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:block">
            <p className="font-mono text-micro text-signal">§ 00</p>
          </div>

          <Block>
            <p className="font-mono text-micro text-signal lg:hidden">§ 00</p>
            <p className="mt-3 font-mono text-micro text-text-muted lg:mt-0">{t.about.eyebrow}</p>
            <h2 id="apropos-heading" className="mt-3">
              {t.about.heading}
            </h2>

            <div className="mt-7 max-w-[34rem] border-l-2 border-signal pl-5 md:pl-7">
              {t.about.paragraphs.map((p, i) => (
                <p
                  key={p}
                  className={[
                    'font-serif text-lg leading-8 text-text-body md:text-xl md:leading-9',
                    i > 0 ? 'mt-5' : '',
                  ].join(' ')}
                >
                  {p}
                </p>
              ))}
              <p className="mt-6 font-mono text-meta text-text-muted">— {profile.name}</p>
            </div>
          </Block>
        </div>
      </div>
    </section>
  )
}
