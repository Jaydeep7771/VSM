import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectTypes, projects } from '../data/site';
import { ImageSlot, PageHeader, Reveal } from '../components/Primitives';

export default function Portfolio() {
  const [filter, setFilter] = useState<string>('All');

  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectTypes.map((t) => [
          t,
          t === 'All' ? projects.length : projects.filter((p) => p.type === t).length,
        ]),
      ) as Record<string, number>,
    [],
  );

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.type === filter)),
    [filter],
  );

  return (
    <>
      <PageHeader eyebrow="Portfolio" title="The work." />

      <section className="shell max-w-[90rem] pb-[clamp(5rem,11vw,10rem)]">
        <div
          role="tablist"
          aria-label="Filter projects by type"
          className="mb-16 flex flex-wrap gap-x-10 gap-y-1 border-b border-hairline"
        >
          {projectTypes.map((t) => {
            const selected = filter === t;
            const empty = counts[t] === 0;
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(t)}
                className={`group relative -mb-px whitespace-nowrap py-5 text-[0.625rem] font-medium uppercase tracking-[0.26em] transition-colors duration-500 ${
                  selected ? 'text-ink' : empty ? 'text-silver' : 'text-ash hover:text-graphite'
                }`}
              >
                {t}
                <span className="tnum ml-2.5 text-silver">
                  {String(counts[t]).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                    selected ? 'origin-left scale-x-100' : 'origin-right scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <Reveal>
            <p className="lede max-w-[44ch]">
              No {filter.toLowerCase()} projects are published yet. New work is added as each
              commission completes — in the meantime, we are happy to share recent projects
              privately.
            </p>
          </Reveal>
        ) : (
          <div className="grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-[clamp(3rem,6vw,5.5rem)] md:grid-cols-2">
            {visible.map((p, i) => (
              <Reveal
                as="article"
                key={p.slug}
                delay={i * 120}
                className={i % 2 === 1 ? 'md:mt-[clamp(0px,9vw,9rem)]' : ''}
              >
                <Link to={`/portfolio/${p.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <div className="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
                      <ImageSlot alt={p.coverAlt} className="aspect-[4/5] w-full" caption={false} />
                    </div>
                    <div className="absolute inset-0 z-[4] bg-ink/0 transition-colors duration-[900ms] ease-out group-hover:bg-ink/25" />
                    <div className="absolute inset-x-0 bottom-0 z-[5] flex translate-y-3 items-center justify-between gap-4 p-7 opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-[0.625rem] font-medium uppercase tracking-[0.3em] text-white">
                        View project
                      </span>
                      <span aria-hidden className="text-base text-white">
                        →
                      </span>
                    </div>
                    <span className="tnum absolute left-6 top-6 z-[5] text-[0.625rem] font-medium tracking-[0.26em] text-white mix-blend-difference">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-7 flex flex-wrap items-baseline justify-between gap-4">
                    <h2 className="serif-sm m-0 text-[clamp(1.5rem,2.3vw,2rem)] transition-colors duration-500 group-hover:text-slate">
                      {p.name}
                    </h2>
                    <span className="text-[0.625rem] uppercase tracking-[0.26em] text-ash">
                      {p.location} · {p.year}
                    </span>
                  </div>
                  <p className="body-copy mt-3.5 max-w-[46ch]">{p.scope}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
