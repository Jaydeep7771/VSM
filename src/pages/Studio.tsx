import { awards, beliefs, collaborators, studio, studioShots, team } from '../data/site';
import { Eyebrow, ImageSlot, Reveal, WordReveal } from '../components/Primitives';

function TwoColumnList({ title, rows }: { title: string; rows: { t: string; y: string }[] }) {
  return (
    <Reveal>
      <Eyebrow rule className="mb-8">
        {title}
      </Eyebrow>
      <ul className="m-0 list-none p-0">
        {rows.map((row, i) => (
          <li
            key={`${row.t}-${row.y}-${i}`}
            className="flex justify-between gap-6 border-t border-hairline py-5 text-[0.9375rem] transition-colors duration-500 hover:border-ink"
          >
            <span className="text-graphite">{row.t}</span>
            <span className="text-[0.625rem] uppercase tracking-[0.22em] text-ash">{row.y}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function Studio() {
  return (
    <>
      {/* Intro + founder portrait */}
      <section className="shell grid max-w-[90rem] items-start gap-[clamp(2.5rem,6vw,7rem)] pt-[clamp(4.5rem,9vw,8rem)] pb-[clamp(4.5rem,10vw,9rem)] lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow rule>The studio</Eyebrow>
          </Reveal>
          <WordReveal
            text="Rooted in Punjab. Made for now."
            italicFrom={3}
            className="mt-9 mb-10 text-[clamp(2.5rem,5.5vw,4.75rem)]"
          />
          <Reveal delay={220}>
            <p className="lede max-w-[50ch]">
              vSM Innovators was founded by {studio.founder} on a simple conviction: that a home in
              Jalandhar, Ludhiana or Amritsar deserves the same rigour as any address in the world —
              and should still feel unmistakably of this place.
            </p>
            <p className="body-copy mt-7 max-w-[50ch]">
              [Two or three lines on the founder’s training, the path to starting the studio, and
              what still drives the work.]
            </p>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <div className="overflow-hidden">
            <div className="transition-transform duration-[1800ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.04]">
              <ImageSlot
                alt="Portrait of the founder in the studio, natural light"
                className="aspect-[4/5] w-full"
                caption={false}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Beliefs — inverted band for tonal contrast */}
      <section className="grain relative bg-ink text-white">
        <div className="shell relative z-[1] max-w-[90rem] py-[clamp(5rem,11vw,10rem)]">
          <Reveal className="mb-16">
            <Eyebrow rule className="text-ash [&::before]:bg-graphite">
              What we believe
            </Eyebrow>
          </Reveal>
          <Reveal stagger className="grid gap-[clamp(2.5rem,5vw,5rem)] md:grid-cols-3">
            {beliefs.map((b) => (
              <div key={b.title} className="border-t border-graphite pt-8">
                <h2 className="serif-sm m-0 mb-5 text-[1.875rem] text-white">{b.title}</h2>
                <p className="body-copy m-0 text-silver">{b.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Inside the studio */}
      <section className="shell max-w-[90rem] py-[clamp(5rem,10vw,9rem)]">
        <Reveal>
          <div className="rule mb-7" />
          <h2 className="display mb-14 text-[clamp(2.125rem,4.2vw,3.75rem)]">Inside the studio</h2>
        </Reveal>
        <div className="grid gap-7 md:grid-cols-3">
          {studioShots.map((shot, i) => (
            <Reveal as="figure" key={shot.id} delay={i * 130} className="m-0">
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.05]">
                  <ImageSlot alt={shot.alt} className="aspect-[4/5] w-full" caption={false} />
                </div>
              </div>
              <figcaption className="eyebrow mt-5">{shot.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="shell max-w-[90rem] pb-[clamp(5rem,10vw,9rem)]">
        <Reveal>
          <div className="rule mb-7" />
          <h2 className="display mb-14 text-[clamp(2.125rem,4.2vw,3.75rem)]">The team</h2>
        </Reveal>
        <Reveal stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.id} className="group">
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]">
                  <ImageSlot
                    alt={`Team portrait — ${member.role}`}
                    className="aspect-square w-full"
                    caption={false}
                  />
                </div>
              </div>
              <div className="serif-sm mt-6 text-[1.375rem]">{member.name}</div>
              <Eyebrow className="mt-2.5">{member.role}</Eyebrow>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Recognition + collaborators */}
      <section className="shell grid max-w-[90rem] gap-[clamp(2.5rem,6vw,6rem)] pb-[clamp(5rem,10vw,9rem)] md:grid-cols-2">
        <TwoColumnList title="Recognition & press" rows={awards} />
        <TwoColumnList title="Craft collaborators" rows={collaborators} />
      </section>
    </>
  );
}
