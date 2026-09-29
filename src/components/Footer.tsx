import { useI18n } from '@/lib/i18n'
import { profile } from '@/data/profile'

const BUILD_DATE = '2026-09-29'

export function Footer() {
  const { t, ui } = useI18n()

  return (
    <footer className="border-t border-line-2 py-10">
      <div className="mx-auto w-full max-w-[var(--page-max)] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <p className="prose-measure text-note text-text-muted">{t.footer}</p>

          <div className="flex shrink-0 flex-col gap-2 md:items-end">
            <p className="font-mono text-meta text-text-muted">
              {ui('last_updated')} : <time dateTime={BUILD_DATE}>{BUILD_DATE}</time>
            </p>
            <a href="#top" className="link no-print font-mono text-meta">
              {ui('back_to_top')} ↑
            </a>
          </div>
        </div>

        <p className="mt-6 font-mono text-micro text-line-ui">
          © {BUILD_DATE.slice(0, 4)} {profile.name}
        </p>
      </div>
    </footer>
  )
}
