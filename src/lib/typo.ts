const NNBSP = ' '

/**
 * French typography: the space before `; : ! ?` and inside guillemets is a
 * narrow no-break space, not a normal one. Without it the punctuation can
 * start a line, which is the small wrongness that marks a French page laid
 * out by an English-language template.
 *
 * This only upgrades spaces the author already typed — it never inserts one —
 * so `https://…` and `2:1` are left alone.
 */
export function typoFr(input: string): string {
  return input
    .replace(/ +([;:!?])(?=\s|$)/g, `${NNBSP}$1`)
    .replace(/«\s+/g, `«${NNBSP}`)
    .replace(/\s+»/g, `${NNBSP}»`)
}

const cache = new WeakMap<object, unknown>()

/** Applies `typoFr` across a string, array or plain object, memoised by reference. */
export function deepTypoFr<T>(value: T): T {
  if (typeof value === 'string') return typoFr(value) as T
  if (value === null || typeof value !== 'object') return value

  const hit = cache.get(value)
  if (hit !== undefined) return hit as T

  const result = Array.isArray(value)
    ? value.map((item) => deepTypoFr(item))
    : Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, deepTypoFr(v)]),
      )

  cache.set(value, result)
  return result as T
}
