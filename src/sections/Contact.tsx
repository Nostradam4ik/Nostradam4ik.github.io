import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { Section } from '@/components/Section'
import { Block } from '@/components/Block'
import { profile } from '@/data/profile'

/**
 * No form, on purpose: a recruiter with ninety seconds copies an address or
 * hits reply from their ATS. A form is friction at the exact moment you want
 * none, and it would drag a CNIL notice into the middle of the page.
 */
export function Contact() {
  const { t, ui, lang } = useI18n()
  const s = t.sections.contact
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the address is right there in plain text anyway.
    }
  }

  const links = [
    { label: ui('phone_label'), value: profile.phone, href: `tel:${profile.phoneHref}` },
    { label: ui('linkedin'), value: profile.linkedinHandle, href: profile.linkedin },
    { label: ui('github'), value: profile.githubHandle, href: profile.github },
    { label: ui('live_site'), value: profile.productName, href: profile.product },
  ]

  return (
    <Section id={s.key} eyebrow={s.eyebrow} heading={t.contact.heading} intro={t.contact.body}>
      <Block>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="link font-mono text-xl leading-8 font-medium break-all md:text-2xl md:leading-9"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="no-print rounded border border-line-ui px-3 py-1.5 font-mono text-meta text-text-body transition-colors duration-150 hover:border-signal hover:text-text-hi"
          >
            {copied ? ui('email_copied') : ui('email_copy')}
          </button>
        </div>
      </Block>

      <Block>
        <dl className="seam mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <div key={link.label} className="px-4 py-4">
              <dt className="font-mono text-micro text-text-muted">{link.label}</dt>
              <dd className="mt-1.5">
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="link text-ui break-words"
                >
                  {link.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={profile.cvUrl[lang]}
            download
            className="inline-flex h-12 items-center justify-center rounded bg-signal px-5 font-medium text-signal-ink transition-colors duration-150 hover:bg-signal-hi active:bg-signal-press"
          >
            {ui('cv_download')}
          </a>
          <p className="font-mono text-meta text-text-muted">{t.contact.note}</p>
        </div>
      </Block>
    </Section>
  )
}
