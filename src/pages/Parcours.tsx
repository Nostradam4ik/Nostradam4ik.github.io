import { PageHead } from '@/components/PageHead'
import { useI18n } from '@/lib/i18n'
import { experience } from '@/data/profile'
import { indexProjects } from '@/data/projects'

export function Parcours() {
  const { t, ui, pick } = useI18n()
  const page = t.pages.parcours

  return (
    <>
      <PageHead title={page.title} intro={page.intro} />

      <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <section aria-labelledby="experiences">
          <h2 id="experiences" className="border-t-2 border-ink pt-4 text-3xl font-extrabold md:text-4xl">
            {ui('experiences_heading')}
          </h2>

          <ol className="mt-4">
            {experience.map((role) => (
              <li key={role.id} className="border-b border-line py-7 first:pt-4">
                <p className="ui text-base font-semibold text-muted">{pick(role.period)}</p>
                <h3 className="mt-1 text-2xl leading-tight font-bold">{pick(role.role)}</h3>
                <p className="ui mt-1 text-lg font-semibold text-water">
                  {typeof role.company === 'string' ? role.company : pick(role.company)}
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-water">
                  {pick(role.bullets).map((b) => (
                    <li key={b} className="pl-1">
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-base text-muted">{role.stack.join(', ')}.</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="projets" aria-labelledby="projets-title">
          <h2
            id="projets-title"
            className="border-t-2 border-ink pt-4 text-3xl font-extrabold md:text-4xl"
          >
            {ui('projects_heading')}
          </h2>

          <ul className="mt-4">
            {indexProjects.map((project) => {
              const c = pick({ fr: project.fr, en: project.en })
              return (
                <li key={project.slug} className="border-b border-line py-5 first:pt-4">
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="ui text-xl font-bold text-ink">{project.name}</span>
                    <span className="ui text-sm font-semibold text-muted">
                      {ui(`status_${project.status}`)}
                    </span>
                  </p>
                  <p className="mt-1 text-body">{c.tagline}</p>
                  {c.ci ? <p className="mt-1 text-base text-muted">{c.ci}</p> : null}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link ui mt-1 inline-block text-base font-semibold"
                    >
                      {ui('view_code')}
                      <span className="sr-only"> ({ui('open_external_aria')})</span>
                    </a>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </>
  )
}
