import type { ElementType, ReactNode } from 'react'

interface BlockProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

/**
 * A grouping element that can change its tag without changing its callers.
 *
 * There is deliberately no scroll entrance animation on this page. Any
 * scroll-driven reveal — IntersectionObserver or a CSS view() timeline —
 * leaves everything below the fold at opacity 0 for anyone who does not
 * scroll: a crawler, a print job, a screenshot. The motion budget is spent
 * on hover, focus and the status bar instead, where it cannot hide content.
 */
export function Block({ children, className = '', as: Tag = 'div' }: BlockProps) {
  return <Tag className={className}>{children}</Tag>
}
