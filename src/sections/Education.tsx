import { useI18n } from '@/lib/i18n'
import { Section } from '@/components/Section'
import { Block } from '@/components/Block'
import { award, certifications, education, spokenLanguages } from '@/data/profile'

export function Education() {
  const { t, ui, pick } = useI18n()
  const s = t.sections.formation

  return (
    <Section id={s.key} eyebrow={s.eyebrow} heading={s.heading} intro={s.intro}>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
        <Block>
          <h3 className="font-mono text-micro text-text-muted">{ui('education_heading')}</h3>
          <ul className="mt-4 border-t border-line-1">
            {education.map((item) => (
              <li key={item.id} className="border-b border-line-1 py-4">
                <p className="text-ui font-medium text-text-hi">{pick(item.degree)}</p>
                <p className="mt-1 font-mono text-meta text-text-muted">
                  {item.school} · {item.period}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-mono text-micro text-text-muted">{ui('languages_heading')}</h3>
          <ul className="mt-4 border-t border-line-1">
            {spokenLanguages.map((l) => (
              <li key={l.id} className="border-b border-line-1 py-3">
                <div className="leader">
                  <span className="text-ui text-text-hi">{pick(l.name)}</span>
                  <span className="order-last font-mono text-meta text-text-muted">
                    {pick(l.level)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block>
          <h3 className="font-mono text-micro text-text-muted">{ui('certifications_heading')}</h3>
          <ul className="mt-4 border-t border-line-1">
            {certifications.map((cert) => (
              <li key={cert.id} className="border-b border-line-1 py-4">
                <p className="text-ui font-medium text-text-hi">{cert.name}</p>
                <p className="mt-1 font-mono text-meta text-text-muted">
                  {cert.issuer} · {pick(cert.date)}
                </p>
                <div className="mt-2 flex flex-wrap gap-4">
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link text-note"
                    >
                      {ui('verify')} ↗<span className="sr-only"> {ui('open_external_aria')}</span>
                    </a>
                  ) : null}
                  {cert.pdfUrl ? (
                    <a href={cert.pdfUrl} target="_blank" rel="noreferrer" className="link text-note">
                      {ui('certificate_pdf')}
                    </a>
                  ) : null}
                </div>
              </li>
            ))}

            <li className="border-b border-line-1 py-4">
              <p className="text-ui font-medium text-text-hi">{pick(award).name}</p>
              <p className="mt-1 font-mono text-meta text-signal">{pick(award).result}</p>
              <p className="mt-1 text-note text-text-muted">{pick(award).detail}</p>
            </li>
          </ul>
        </Block>
      </div>
    </Section>
  )
}
