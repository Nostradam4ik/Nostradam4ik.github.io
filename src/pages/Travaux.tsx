import { PageHead } from "@/components/PageHead";
import { Maquettes } from "@/components/Maquettes";
import { useI18n } from "@/lib/i18n";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/lib/types";

function Work({ project }: { project: Project }) {
  const { ui, pick } = useI18n();
  const c = pick({ fr: project.fr, en: project.en });
  const film = project.film;
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <article
      className={`border-t-2 border-ink pt-6 ${film ? "lg:col-span-2" : ""}`}
    >
      <p className="ui flex flex-wrap items-center gap-x-4 gap-y-1 text-base font-semibold text-muted">
        <span>{ui(`status_${project.status}`)}</span>
        {project.liveUrl ? (
          <span className="flex items-center gap-2 text-ok">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ok" />
            {ui("live_site")}
          </span>
        ) : null}
      </p>

      <h2 className="mt-3 text-5xl leading-none font-extrabold md:text-6xl">
        {project.name}
      </h2>
      <p className="mt-4 max-w-4xl text-2xl leading-9 text-ink">{c.tagline}</p>

      {film ? (
        <video
          controls
          muted
          loop
          playsInline
          autoPlay={!reducedMotion}
          preload={reducedMotion ? "none" : "metadata"}
          poster={film.poster}
          aria-label={pick(film.alt)}
          className="mt-8 block aspect-video w-full rounded-xl border border-line bg-ink object-cover shadow-sm"
        >
          <source src={film.video} type="video/mp4" />
        </video>
      ) : null}

      <div className={film ? "lg:grid lg:grid-cols-2 lg:gap-14" : ""}>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 self-start">
          {c.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-base leading-6 text-muted">{m.label}</dt>
              <dd className="ui text-4xl font-bold text-water">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className={film ? "lg:[&>h3:first-child]:mt-8" : ""}>
          <h3 className="ui mt-10 text-xl font-bold">{ui("the_problem")}</h3>
          <p className="mt-2">{c.problem}</p>

          <h3 className="ui mt-8 text-xl font-bold">{ui("what_i_built")}</h3>
          <ul className="mt-2 list-disc space-y-3 pl-5 marker:text-water">
            {c.highlights.map((h) => (
              <li key={h} className="pl-1">
                {h}
              </li>
            ))}
          </ul>

          {c.provenance ? (
            <p className="mt-8 border-l-4 border-water bg-panel py-3 pr-4 pl-4 text-base leading-7 text-body">
              <span className="ui font-semibold text-ink">
                {ui("provenance")}.{" "}
              </span>
              {c.provenance}
            </p>
          ) : null}

          <p className="mt-8 text-base text-muted">
            <span className="ui font-semibold text-ink">
              {ui("stack_label")}.{" "}
            </span>
            {project.stack.join(", ")}.
          </p>

          <p className="ui mt-5 flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link"
              >
                {ui("view_live")}
                <span className="sr-only"> ({ui("open_external_aria")})</span>
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link"
              >
                {ui("view_code")}
                <span className="sr-only"> ({ui("open_external_aria")})</span>
              </a>
            ) : (
              <span className="text-muted">{ui("closed_source")}</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Travaux() {
  const { t } = useI18n();
  const page = t.pages.travaux;

  return (
    <>
      <PageHead title={page.title} intro={page.intro} />
      <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-14">
        {featuredProjects.map((project) => (
          <Work key={project.slug} project={project} />
        ))}
      </div>
      <Maquettes />
    </>
  );
}
