import { useI18n } from '@/lib/i18n'
import { Section } from '@/components/Section'
import { Block } from '@/components/Block'
import { indexProjects } from '@/data/projects'

/**
 * An index, not a card grid. A table says "here is the complete list"; a grid
 * of repo cards says "here is my body of work", which is the reading French
 * recruiter write-ups dismiss on sight.
 */
export function ProjectIndex() {
  const { t, ui, pick } = useI18n()
  const s = t.sections.projets

  return (
    <Section
      id={s.key}
      eyebrow={s.eyebrow}
      heading={s.heading}
      intro={s.intro}
    >
      <ol className="border-t border-line-1">
        {indexProjects.map((project) => {
          const c = pick({ fr: project.fr, en: project.en })
          return (
            <Block key={project.slug} as="li" className="border-b border-line-1">
              <div className="py-6 md:grid md:grid-cols-[minmax(0,1fr)_14rem] md:gap-8">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg leading-7 font-medium">{project.name}</h3>
                    <span className="font-mono text-micro text-text-muted">
                      {ui(`status_${project.status}`)}
                    </span>
                  </div>
                  <p className="prose-measure mt-2 text-ui text-text-body">{c.tagline}</p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 6).map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-line-2 px-2 py-0.5 font-mono text-meta text-text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="font-mono text-meta text-text-muted">
                    {ui(`category_${categoryKey(project.category)}`)}
                  </p>
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link mt-2 inline-block text-ui"
                    >
                      {ui('view_code')} ↗
                      <span className="sr-only"> {ui('open_external_aria')}</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </Block>
          )
        })}
      </ol>
    </Section>
  )
}

function categoryKey(category: string): string {
  if (category === 'ai-llm') return 'ai'
  if (category === 'ml') return 'ml'
  if (category === 'mobile') return 'mobile'
  if (category === 'infra') return 'infra'
  return 'fullstack'
}
