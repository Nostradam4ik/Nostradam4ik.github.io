import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { profile } from '@/data/profile'

const UPDATED = '2026-11-13'

/** Contact lives in the footer of every page, so no page is a dead end. */
export function Footer() {
  const { t, ui, lang } = useI18n()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the address is on screen in plain text anyway.
    }
  }

  const links = [
    { label: ui('phone_label'), text: profile.phone, href: `tel:${profile.phoneHref}`, ext: false },
    { label: ui('linkedin'), text: profile.linkedinHandle, href: profile.linkedin, ext: true },
    { label: ui('github'), text: profile.githubHandle, href: profile.github, ext: true },
    { label: ui('code_of_site'), text: 'GitHub', href: profile.repoUrl, ext: true },
  ]

  return (
    <footer id="contact" className="on-night mt-24 bg-night text-night-text">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="ui text-4xl font-bold !text-night-text md:text-5xl">
              {t.contact.heading}
            </h2>
            <p className="measure mt-4 text-night-muted">{t.contact.body}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="ui text-2xl font-semibold break-all text-night-text underline decoration-sky decoration-2 underline-offset-4 md:text-3xl"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="no-print ui rounded border border-night-line px-3 py-2 text-sm font-semibold text-night-text transition-colors hover:bg-night-2"
              >
                {copied ? ui('email_copied') : ui('email_copy')}
              </button>
            </div>
          </div>

          <dl className="grid content-start gap-5 sm:grid-cols-2">
            {links.map((l) => (
              <div key={l.label}>
                <dt className="ui text-sm font-medium text-night-muted">{l.label}</dt>
                <dd className="mt-1">
                  <a
                    href={l.href}
                    target={l.ext ? '_blank' : undefined}
                    rel={l.ext ? 'noreferrer noopener' : undefined}
                    className="link ui text-lg font-medium break-words"
                  >
                    {l.text}
                    {l.ext ? <span className="sr-only"> ({ui('open_external_aria')})</span> : null}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-night-line pt-6 text-sm text-night-muted md:flex-row md:items-center md:justify-between">
          <p className="measure">{t.contact.note}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={profile.cvUrl[lang]} download className="link ui font-medium">
              {ui('cv_download_aria')}
            </a>
            <p>
              {ui('updated')} <time dateTime={UPDATED}>{UPDATED}</time>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
