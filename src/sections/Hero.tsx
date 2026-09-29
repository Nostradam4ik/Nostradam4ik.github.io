import { useI18n } from '@/lib/i18n'
import { availability, profile } from '@/data/profile'

/**
 * Deliberately not wrapped in <Block>: the ten-second decision starts at
 * 0 ms, so the hero and the key/value block must be in the first paint and
 * must never be gated on JavaScript.
 */
export function Hero() {
  const { t, ui, lang, pick } = useI18n()
  const a = pick(availability)

  const facts = [
    { label: ui('availability_label'), value: a.status },
    { label: ui('contract_label'), value: a.contract },
    { label: ui('location_label'), value: a.zone },
    { label: ui('work_right_label'), value: a.workRight },
  ]

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <div className="mx-auto w-full max-w-[var(--page-max)] px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:px-8 lg:pt-28 lg:pb-24 xl:px-12">
        <div className="lg:grid lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:block">
            <img
              src={profile.photo}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded border border-line-2 object-cover"
            />
          </div>

          <div>
            <img
              src={profile.photo}
              alt=""
              width={64}
              height={64}
              className="mb-5 h-16 w-16 rounded border border-line-2 object-cover lg:hidden"
            />

            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-meta text-text-muted">
              <span className="inline-flex items-center gap-2 text-status-ok">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full bg-status-ok"
                />
                {t.hero.availability}
              </span>
              <span>{t.hero.location}</span>
            </p>

            <h1 id="hero-heading" className="mt-5">
              {t.hero.name}
            </h1>

            <p className="mt-4 font-mono text-ui text-signal">{t.hero.role}</p>

            <p className="prose-measure mt-7 text-xl leading-8 text-text-hi md:text-2xl md:leading-9">
              {t.hero.headline}
            </p>

            <p className="prose-measure mt-5 text-text-body">{t.hero.subline}</p>

            <dl className="seam mt-9 max-w-2xl rounded-[10px] sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="px-4 py-3.5">
                  <dt className="font-mono text-micro text-text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-ui text-text-hi">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={profile.cvUrl[lang]}
                download
                className="inline-flex h-12 items-center justify-center rounded bg-signal px-5 font-medium text-signal-ink transition-colors duration-150 hover:bg-signal-hi active:bg-signal-press"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href={profile.product}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center justify-center rounded border border-line-ui px-5 text-text-body transition-colors duration-150 hover:border-signal hover:text-text-hi"
              >
                {t.hero.ctaSecondary}
                <span className="sr-only"> ({ui('open_external_aria')})</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center justify-center rounded border border-line-ui px-5 text-text-body transition-colors duration-150 hover:border-signal hover:text-text-hi"
              >
                {ui('email_label')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
