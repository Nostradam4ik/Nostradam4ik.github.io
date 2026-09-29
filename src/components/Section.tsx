import type { ReactNode } from 'react'
import { Block } from './Block'

interface SectionProps {
  id: string
  eyebrow: string
  heading: string
  intro?: string
  /** Right-aligned mono readout in the section header row. */
  readout?: string
  children: ReactNode
  /** Lifts the whole band onto surface 1 — used for the case studies. */
  raised?: boolean
}

/**
 * Every section opens the same way: a full-band hairline, an index in the
 * left rail, the heading, and an optional mono readout on the right. The
 * metronome is deliberate, so the two sections that break it register as
 * events rather than as noise.
 *
 * Above 1152px the index and label live in a 10.5rem rail; below that they
 * collapse into a single pre-heading line rather than disappearing.
 */
export function Section({
  id,
  eyebrow,
  heading,
  intro,
  readout,
  children,
  raised = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        'border-t border-line-2 py-16 md:py-22 lg:py-30',
        raised ? 'bg-ink-850' : '',
      ].join(' ')}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto w-full max-w-[var(--page-max)] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="lg:grid lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:block">
            <p className="font-mono text-micro text-signal">{eyebrow}</p>
          </div>

          <div>
            <Block>
              <p className="font-mono text-micro text-signal lg:hidden">{eyebrow}</p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 lg:mt-0">
                <h2 id={`${id}-heading`}>{heading}</h2>
                {readout ? (
                  <p className="font-mono text-meta text-text-muted uppercase">{readout}</p>
                ) : null}
              </div>
              {intro ? (
                <p className="prose-measure mt-5 text-text-body">{intro}</p>
              ) : null}
            </Block>

            <div className="mt-10 md:mt-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
