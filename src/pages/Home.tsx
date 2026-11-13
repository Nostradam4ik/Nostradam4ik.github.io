import { Diagnostic } from '@/components/Diagnostic'
import { useI18n } from '@/lib/i18n'
import { profile } from '@/data/profile'

/**
 * One screen. The name is the visual element: large, condensed, heavy. The
 * facts a recruiter checks first sit under it as plain text, so the page says
 * everything it needs to even if the diagnostic beside it is never touched.
 */
export function Home() {
  const { t, ui, lang } = useI18n()

  return (
    <>
      <section aria-labelledby="home-title" className="wrap pt-8 pb-10 md:pt-10 lg:pb-12">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="ui flex items-center gap-2.5 text-base font-semibold text-ok">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ok" />
              {t.hero.availability}
            </p>

            <h1
              id="home-title"
              tabIndex={-1}
              className="mt-4 text-[clamp(3.25rem,8.2vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.025em]"
            >
              <span className="block">Andrii</span> <span className="block">Zhmuryk</span>
            </h1>

            <p className="ui mt-4 text-xl font-semibold text-water md:text-2xl">{t.hero.role}</p>

            <p className="measure mt-4 text-xl leading-8 text-ink md:text-[1.45rem] md:leading-9">
              {t.hero.headline}
            </p>
            <p className="measure mt-3 text-body">{t.hero.subline}</p>
            <p className="measure mt-3 text-base text-muted">{t.hero.terms}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={profile.cvUrl[lang]} download className="btn btn-solid">
                {t.hero.ctaPrimary}
              </a>
              <a
                href={profile.product}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-line"
              >
                {t.hero.ctaSecondary}
                <span className="sr-only"> ({ui('open_external_aria')})</span>
              </a>
            </div>
          </div>

          <Diagnostic />
        </div>
      </section>

      <section aria-label={t.hero.name} className="wrap">
        <dl className="grid grid-cols-2 border-t-2 border-ink md:grid-cols-4">
          {t.stats.map((stat) => (
            <div
              key={stat.value}
              className="border-b border-line py-6 pr-4 md:border-b-0 md:py-8"
            >
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-base text-muted">{stat.label}</dt>
                <dd className="ui text-4xl font-bold text-ink md:text-5xl">{stat.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
