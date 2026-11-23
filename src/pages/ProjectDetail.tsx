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

  return (
    <article>
      {/* Hero plate */}
      <div className="overflow-hidden">
        <div className="drift">
          <ImageSlot
            alt={project.coverAlt}
            className="h-[clamp(24rem,68vh,46rem)] w-full"
            caption={false}
          />
        </div>
      </div>

      {/* Title + fact sheet */}
      <section className="shell max-w-[90rem] py-[clamp(3.5rem,8vw,7rem)]">
        <Reveal>
          <Eyebrow rule>{project.type}</Eyebrow>
        </Reveal>
        <WordReveal text={project.name} className="mt-8 mb-14 text-[clamp(2.5rem,6.5vw,5.5rem)]" />
        <Reveal stagger className="grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {projectFacts(project).map((f) => (
            <dl key={f.k} className="m-0">
              <dt className="eyebrow mb-3.5">{f.k}</dt>
              <dd className="body-copy m-0 text-ink">{f.v}</dd>
            </dl>
          ))}
        </Reveal>
      </section>

      {/* Brief / approach / materials / palette */}
      <section className="shell grid max-w-[90rem] gap-[clamp(2.5rem,6vw,7rem)] pb-[clamp(4.5rem,10vw,9rem)] lg:grid-cols-2">
        <Reveal>
          <Eyebrow>The brief</Eyebrow>
          <p className="display mt-7 mb-0 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.26]">
            {project.brief}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <Eyebrow>The approach</Eyebrow>
          <p className="body-copy mt-7">{project.approach}</p>

          <div className="my-11 h-px w-full bg-hairline" />

          <Eyebrow>Materials</Eyebrow>
          <p className="body-copy mt-6">{project.materials}</p>

          <Eyebrow className="mt-11">Palette</Eyebrow>
          <ul className="mt-7 flex list-none flex-wrap gap-x-8 gap-y-5 p-0">
            {project.palette.map((c) => (
              <li key={c.name} className="flex items-center gap-3.5">
                <span
                  aria-hidden
                  className="block h-10 w-10 rounded-full ring-1 ring-inset ring-black/10"
                  style={{ background: c.tone }}
                />
                <span className="text-[0.625rem] uppercase tracking-[0.22em] text-graphite">
                  {c.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Room by room */}
      {project.rooms.map((room) => (
        <section key={room.num} className="shell max-w-[90rem] pb-[clamp(4rem,9vw,8rem)]">
          <Reveal>
            <div className="overflow-hidden">
              <div className="transition-transform duration-[2000ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]">
                <ImageSlot alt={room.wide.alt} className="aspect-[16/9] w-full" caption={false} />
              </div>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <Reveal className="lg:pr-10">
              <Eyebrow rule>
                {room.num} — {room.room}
              </Eyebrow>
              <p className="lede mt-7">{room.text}</p>
            </Reveal>
            {room.details.map((d, i) => (
              <Reveal key={d.id} delay={(i + 1) * 130}>
                <div className="overflow-hidden">
                  <div className="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.05]">
                    <ImageSlot alt={d.alt} className="aspect-[4/5] w-full" caption={false} />
                  </div>
                </div>
                <p className="eyebrow mt-4 text-ash">{d.alt}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* Concept to completion */}
      <section className="grain relative bg-paper">
        <div className="shell relative z-[1] max-w-[90rem] py-[clamp(4.5rem,10vw,9rem)]">
          <Reveal>
            <Eyebrow rule>Concept to completion</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            text="From paper to place."
            className="mt-8 mb-14 text-[clamp(2.125rem,4.2vw,3.75rem)]"
          />
          <div className="grid gap-[clamp(2.5rem,5vw,4rem)]">
            {project.compare.map((c, i) => (
              <Reveal key={c.a} delay={i * 120} className="grid gap-6 sm:grid-cols-2">
                {[c.a, c.b].map((label) => (
                  <figure key={label} className="m-0">
                    <ImageSlot alt={label} className="aspect-[4/3] w-full" tone="mist" caption={false} />
                    <figcaption className="eyebrow mt-5">{label}</figcaption>
                  </figure>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client quote */}
      <Reveal as="section" className="shell max-w-[62rem] py-[clamp(5rem,11vw,10rem)] text-center">
        <div className="font-serif mx-auto mb-2 h-10 text-[5rem] leading-[0.6] text-silver">“</div>
        <blockquote className="display m-0 text-[clamp(1.5rem,3.2vw,2.625rem)] italic leading-[1.26]">
          {project.quote}
        </blockquote>
        <div className="mx-auto mt-10 mb-6 h-px w-14 bg-line" />
        <p className="eyebrow m-0">{project.client}</p>
      </Reveal>

      {/* Prev / next */}
      <nav aria-label="Project navigation" className="grid border-t border-hairline sm:grid-cols-2">
        <Link
          to={`/portfolio/${prev.slug}`}
          className="group border-b border-hairline px-[clamp(1.25rem,5vw,5rem)] py-14 transition-colors duration-700 hover:bg-paper sm:border-b-0 sm:border-r"
        >
          <span className="eyebrow inline-flex items-center gap-3">
            <span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1.5">
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
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">
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
