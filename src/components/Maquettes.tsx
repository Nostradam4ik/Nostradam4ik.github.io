import { useI18n } from '@/lib/i18n'
import { maquettes } from '@/data/maquettes'
import type { Maquette } from '@/data/maquettes'

function Card({ m }: { m: Maquette }) {
  const { lang, ui } = useI18n()
  const c = m[lang]

  return (
    <article className="grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
      <video
        controls
        playsInline
        preload="none"
        poster={m.poster}
        aria-label={`${m.name} : ${ui('maquette_video_aria')}`}
        className="aspect-[9/16] w-full max-w-[15rem] rounded-lg bg-ink object-cover"
      >
        <source src={m.video} type="video/mp4" />
      </video>

      <div>
        <h3 className="text-4xl leading-none font-extrabold">{m.name}</h3>
        <p className="ui mt-2 text-base font-semibold text-muted">{c.kind}</p>
        <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-water">
          {c.points.map((p) => (
            <li key={p} className="pl-1">
              {p}
            </li>
          ))}
        </ul>
        <p className="ui mt-6 text-lg font-semibold">
          <a href={m.demoUrl} target="_blank" rel="noreferrer noopener" className="link">
            {ui('maquette_open')}
            <span className="sr-only"> ({ui('open_external_aria')})</span>
          </a>
        </p>
      </div>
    </article>
  )
}

/** Two concept mock-ups, each with a short film and a live page. */
export function Maquettes() {
  const { ui } = useI18n()

  return (
    <section aria-labelledby="maquettes-title" className="wrap mt-24 md:mt-32">
      <div className="border-t-2 border-ink pt-8">
        <h2 id="maquettes-title" className="text-4xl leading-tight font-extrabold md:text-5xl">
          {ui('maquettes_heading')}
        </h2>
        <p className="measure mt-4 text-xl leading-8 text-body">{ui('maquettes_intro')}</p>
      </div>

      <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-14">
        {maquettes.map((m) => (
          <Card key={m.slug} m={m} />
        ))}
      </div>

      <p className="mt-10 text-base text-muted">{ui('maquettes_note')}</p>
    </section>
  )
}
