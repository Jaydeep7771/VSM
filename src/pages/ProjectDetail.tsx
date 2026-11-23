import { Link, Navigate, useParams } from 'react-router-dom';
import { projectFacts, projects } from '../data/site';
import { Eyebrow, ImageSlot, Reveal, WordReveal } from '../components/Primitives';

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) return <Navigate to="/portfolio" replace />;

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const hasNarrative = Boolean(project.brief || project.approach || project.materials);

  return (
    <article>
      {/* Hero plate */}
      <div className="overflow-hidden">
        <div className="drift">
          <ImageSlot
            src={project.cover.src}
            alt={project.cover.alt}
            className="h-[clamp(24rem,68vh,46rem)] w-full"
            caption={false}
            priority
          />
        </div>
      </div>

      {/* Title + fact sheet */}
      <section className="shell max-w-[90rem] py-[clamp(3.5rem,8vw,7rem)]">
        <Reveal>
          <Eyebrow rule>{project.type}</Eyebrow>
        </Reveal>
        <WordReveal text={project.name} className="mt-8 mb-10 text-[clamp(2.5rem,6.5vw,5.5rem)]" />
        <Reveal>
          <p className="lede max-w-[58ch]">{project.summary}</p>
        </Reveal>
        <Reveal
          stagger
          className="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {projectFacts(project).map((f) => (
            <dl key={f.k} className="m-0">
              <dt className="eyebrow mb-3.5">{f.k}</dt>
              <dd className="body-copy m-0 text-ink">{f.v}</dd>
            </dl>
          ))}
        </Reveal>
      </section>

      {/* Narrative — rendered only where the studio has supplied it */}
      {hasNarrative ? (
        <section className="shell grid max-w-[90rem] gap-[clamp(2.5rem,6vw,7rem)] pb-[clamp(4.5rem,10vw,9rem)] lg:grid-cols-2">
          {project.brief ? (
            <Reveal>
              <Eyebrow>The brief</Eyebrow>
              <p className="display mt-7 mb-0 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.26]">
                {project.brief}
              </p>
            </Reveal>
          ) : null}

          {project.approach || project.materials ? (
            <Reveal delay={140}>
              {project.approach ? (
                <>
                  <Eyebrow>The approach</Eyebrow>
                  <p className="body-copy mt-7">{project.approach}</p>
                </>
              ) : null}
              {project.materials ? (
                <>
                  <Eyebrow className="mt-11">Materials</Eyebrow>
                  <p className="body-copy mt-6">{project.materials}</p>
                </>
              ) : null}
            </Reveal>
          ) : null}
        </section>
      ) : null}

      {/* Gallery */}
      {project.gallery?.length ? (
        <section className="shell max-w-[90rem] pb-[clamp(4rem,9vw,8rem)]">
          <Reveal>
            <div className="rule mb-7" />
            <Eyebrow className="mb-12">Inside the project</Eyebrow>
          </Reveal>
          <div className="grid gap-[clamp(1.5rem,3vw,2.5rem)]">
            {project.gallery.map((shot, i) => (
              <Reveal as="figure" key={shot.src} delay={i * 100} className="m-0">
                <div className="overflow-hidden">
                  <div className="transition-transform duration-[2000ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]">
                    <ImageSlot
                      src={shot.src}
                      alt={shot.alt}
                      className="aspect-[16/10] w-full"
                      caption={false}
                    />
                  </div>
                </div>
                <figcaption className="body-copy mt-5 max-w-[60ch]">{shot.alt}</figcaption>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Prev / next */}
      <nav aria-label="Project navigation" className="grid border-t border-hairline sm:grid-cols-2">
        <Link
          to={`/portfolio/${prev.slug}`}
          className="group border-b border-hairline px-[clamp(1.25rem,5vw,5rem)] py-14 transition-colors duration-700 hover:bg-paper sm:border-b-0 sm:border-r"
        >
          <span className="eyebrow inline-flex items-center gap-3">
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:-translate-x-1.5"
            >
              ←
            </span>
            Previous project
          </span>
          <div className="serif-sm mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] text-ink">
            {prev.name}
          </div>
        </Link>
        <Link
          to={`/portfolio/${next.slug}`}
          className="group px-[clamp(1.25rem,5vw,5rem)] py-14 text-right transition-colors duration-700 hover:bg-paper"
        >
          <span className="eyebrow inline-flex items-center gap-3">
            Next project
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
          <div className="serif-sm mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] text-ink">
            {next.name}
          </div>
        </Link>
      </nav>
    </article>
  );
}
