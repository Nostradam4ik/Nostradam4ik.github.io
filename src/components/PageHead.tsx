interface PageHeadProps {
  title: string
  intro?: string
}

/** Every inner page opens the same way: a heavy title and one plain sentence. */
export function PageHead({ title, intro }: PageHeadProps) {
  return (
    <header className="wrap pt-12 pb-10 md:pt-16 md:pb-14">
      <h1
        tabIndex={-1}
        className="text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.95] font-extrabold"
      >
        {title}
      </h1>
      {intro ? <p className="measure mt-5 text-xl leading-8 text-body">{intro}</p> : null}
    </header>
  )
}
