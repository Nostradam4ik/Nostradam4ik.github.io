import { useI18n } from '@/lib/i18n'
import { Section } from '@/components/Section'
import { Block } from '@/components/Block'
import { featuredProjects } from '@/data/projects'
import type { Project } from '@/lib/types'

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const { ui, pick } = useI18n()
  const c = pick({ fr: project.fr, en: project.en })

  return (
    <article className={index > 0 ? 'mt-16 border-t border-line-2 pt-16 md:mt-20 md:pt-20' : ''}>
      <Block>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded bg-ink-750 px-2 py-1 font-mono text-micro text-text-muted">
            {ui(`status_${project.status}`)}
          </span>
          {project.liveUrl ? (
            <span className="inline-flex items-center gap-2 rounded bg-status-ok-wash px-2 py-1 font-mono text-micro text-text-body">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-status-ok" />
              {ui('live_site')}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-2xl leading-8 font-semibold md:text-3xl md:leading-10">
          {project.name}
        </h3>
        <p className="prose-measure mt-3 text-lg leading-7 text-text-body">{c.tagline}</p>
      </Block>

      <div className="mt-8 md:grid md:grid-cols-[minmax(0,1fr)_16rem] md:gap-10 lg:gap-14">
        <div>
          <Block>
            <h4 className="font-mono text-micro text-text-muted">{ui('the_problem')}</h4>
            <p className="prose-measure mt-3 text-text-body">{c.problem}</p>
          </Block>

          <Block>
            <h4 className="mt-9 font-mono text-micro text-text-muted">{ui('what_i_built')}</h4>
            <ul className="prose-measure mt-3 space-y-3">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-text-body">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-signal" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Block>

          {c.provenance ? (
            <Block>
              <div className="prose-measure mt-8 rounded border border-signal-edge bg-signal-wash px-4 py-3">
                <p className="font-mono text-micro text-text-muted">{ui('provenance')}</p>
                <p className="mt-1.5 text-note text-text-body">{c.provenance}</p>
              </div>
            </Block>
          ) : null}
        </div>

        <Block className="mt-10 md:mt-0">
          <dl className="seam">
            {c.metrics.map((m) => (
              <div key={m.label} className="px-4 py-3">
                <dd className="font-mono text-xl leading-7 font-medium text-text-hi">{m.value}</dd>
                <dt className="mt-1 text-note text-text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>

          <p className="mt-6 font-mono text-micro text-text-muted">{ui('stack_label')}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded border border-line-2 px-2 py-0.5 font-mono text-meta text-text-body"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link text-ui"
              >
                {ui('view_live')} ↗<span className="sr-only"> {ui('open_external_aria')}</span>
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link text-ui"
              >
                {ui('view_code')} ↗<span className="sr-only"> {ui('open_external_aria')}</span>
              </a>
            ) : (
              <span className="font-mono text-meta text-text-muted">{ui('closed_source')}</span>
            )}
          </div>
        </Block>
      </div>
    </article>
  )
}

export function CaseStudies() {
  const { t } = useI18n()
  const s = t.sections.travaux

  return (
    <Section id={s.key} eyebrow={s.eyebrow} heading={s.heading} intro={s.intro} raised>
      {featuredProjects.map((project, i) => (
        <CaseStudy key={project.slug} project={project} index={i} />
      ))}
    </Section>
  )
}
