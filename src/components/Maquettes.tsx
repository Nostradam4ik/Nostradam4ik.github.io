import { useI18n } from '@/lib/i18n'
import { apps, reels } from '@/data/maquettes'
import type { Demo } from '@/data/maquettes'

function DemoText({ demo }: { demo: Demo }) {
  const { lang, ui } = useI18n()
  const c = demo[lang]

  return (
    <>
      <h3 className="text-2xl leading-tight font-extrabold">{demo.name}</h3>
      <p className="ui mt-1 text-sm font-semibold text-muted">{c.kind}</p>
      <p className="mt-3 text-base leading-7">{c.tech}</p>
      <p className="ui mt-3 text-base font-semibold">
        <a href={demo.demoUrl} target="_blank" rel="noreferrer noopener" className="link">
          {ui('demo_open')}
          <span className="sr-only">
            {' '}
            : {demo.name} ({ui('open_external_aria')})
          </span>
        </a>
      </p>
    </>
  )
}

function Film({ demo, className }: { demo: Demo; className: string }) {
  const { lang } = useI18n()

  return (
    <video
      controls
      muted
      playsInline
      preload="none"
      poster={demo.poster}
      aria-label={demo[lang].alt}
      className={`block rounded-lg border border-line bg-ink object-cover ${className}`}
    >
      <source src={demo.video} type="video/mp4" />
    </video>
  )
}

/**
 * A quiet gallery after the case studies: nothing plays until asked, and each
 * card says what was built rather than selling it.
 */
export function Maquettes() {
  const { ui } = useI18n()

  return (
    <section aria-labelledby="maquettes-title" className="wrap mt-24 md:mt-32">
      <div className="border-t-2 border-ink pt-6">
        <h2 id="maquettes-title" className="text-3xl leading-tight font-extrabold md:text-4xl">
          {ui('maquettes_heading')}
        </h2>
        <p className="measure mt-3">{ui('maquettes_intro')}</p>
      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {apps.map((demo) => (
          <li key={demo.slug}>
            <Film demo={demo} className="aspect-video w-full" />
            <div className="mt-4">
              <DemoText demo={demo} />
            </div>
          </li>
        ))}
      </ul>

      <ul className="mt-14 grid gap-x-12 gap-y-10 border-t border-line pt-10 md:grid-cols-2">
        {reels.map((demo) => (
          <li key={demo.slug} className="flex items-start gap-5">
            <Film demo={demo} className="aspect-[9/16] w-32 shrink-0 sm:w-40" />
            <div className="min-w-0">
              <DemoText demo={demo} />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-base text-muted">{ui('maquettes_note')}</p>
    </section>
  )
}
