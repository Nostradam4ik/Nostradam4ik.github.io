import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently under the top band of the viewport.
 *
 * IntersectionObserver alone is unreliable for this: with a tall section and a
 * short one both intersecting, "most visible" and "current" disagree. Instead we
 * pick the last section whose top has crossed an offset line below the header.
 */
export function useScrollSpy(ids: string[], offset = 120): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return

    let frame = 0

    const compute = () => {
      frame = 0
      const line = offset + 1
      let current: string | null = null

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = id
      }

      // Anything near the bottom of the page should light up the last section,
      // which is often too short to ever reach the line on its own.
      const scrolledToEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
      if (scrolledToEnd) current = ids[ids.length - 1]

      // null above the first section: nothing is active in the hero.
      setActiveId(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return activeId
}
