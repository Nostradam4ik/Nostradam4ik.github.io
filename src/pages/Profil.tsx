import { PageHead } from '@/components/PageHead'
import { useI18n } from '@/lib/i18n'
import { award, certifications, education, skillGroups, spokenLanguages } from '@/data/profile'

export function Profil() {
  const { t, ui, pick } = useI18n()
  const page = t.pages.profil

  return (
    <>
      <PageHead title={page.title} />

      <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <section aria-labelledby="about-title">
          <h2 id="about-title" className="text-3xl leading-tight font-extrabold md:text-4xl">
            {t.about.heading}
          </h2>
          <div className="mt-6 space-y-5 text-xl leading-9 text-ink">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <div className="space-y-12">
          <section aria-labelledby="edu">
            <h2 id="edu" className="ui border-t-2 border-ink pt-3 text-2xl font-bold !tracking-normal">
              {ui('education_heading')}
            </h2>
            <ul className="mt-3">
              {education.map((e) => (
                <li key={e.id} className="border-b border-line py-3">
                  <p className="ui text-lg font-semibold text-ink">{pick(e.degree)}</p>
                  <p className="text-base text-muted">
                    {e.school}, {e.period}
                  </p>
                  {e.detail ? <p className="mt-1 text-base text-muted">{pick(e.detail)}</p> : null}
                  {e.pdfUrl ? (
                    <p className="ui mt-1 text-base font-semibold">
                      <a href={e.pdfUrl} target="_blank" rel="noreferrer" className="link">
                        {ui('diploma_pdf')}
                      </a>
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="langs">
            <h2 id="langs" className="ui border-t-2 border-ink pt-3 text-2xl font-bold !tracking-normal">
              {ui('languages_heading')}
            </h2>
            <ul className="mt-3">
              {spokenLanguages.map((l) => (
                <li key={l.id} className="flex flex-wrap justify-between gap-x-4 border-b border-line py-2.5">
                  <span className="ui text-lg font-semibold text-ink">{pick(l.name)}</span>
                  <span className="text-base text-muted">{pick(l.level)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="certs">
            <h2 id="certs" className="ui border-t-2 border-ink pt-3 text-2xl font-bold !tracking-normal">
              {ui('certifications_heading')}
            </h2>
            <ul className="mt-3">
              {certifications.map((cert) => (
                <li key={cert.id} className="border-b border-line py-3">
                  <p className="ui text-lg leading-snug font-semibold text-ink">{cert.name}</p>
                  <p className="text-base text-muted">
                    {cert.issuer}, {pick(cert.date)}
                  </p>
                  <p className="ui mt-1 flex flex-wrap gap-x-5 text-base font-semibold">
                    {cert.verifyUrl ? (
                      <a href={cert.verifyUrl} target="_blank" rel="noreferrer noopener" className="link">
                        {ui('verify')}
                        <span className="sr-only"> ({ui('open_external_aria')})</span>
                      </a>
                    ) : null}
                    {cert.pdfUrl ? (
                      <a href={cert.pdfUrl} target="_blank" rel="noreferrer" className="link">
                        {ui('certificate_pdf')}
                      </a>
                    ) : null}
                  </p>
                </li>
              ))}
              <li className="border-b border-line py-3">
                <p className="ui text-lg font-semibold text-ink">{pick(award).name}</p>
                <p className="text-base text-muted">
                  {pick(award).result}. {pick(award).detail}
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <section id="competences" aria-labelledby="skills" className="wrap mt-16">
        <h2 id="skills" className="border-t-2 border-ink pt-4 text-3xl font-extrabold md:text-4xl">
          {ui('skills_heading')}
        </h2>
        <dl className="mt-4 grid gap-x-16 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id} className="border-b border-line py-4">
              <dt className="ui text-lg font-bold text-ink">{pick(group.label)}</dt>
              <dd className="mt-1 text-body">{group.items.join(', ')}.</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
