import { fees, services } from '../data/site';
import { Eyebrow, PageHeader, Reveal, WordReveal } from '../components/Primitives';

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="One studio, from first conversation to final styling."
        italicFrom={4}
      />

      <section className="shell max-w-[90rem] pb-[clamp(4.5rem,10vw,9rem)]">
        {services.map((s) => (
          <Reveal
            key={s.num}
            className="group grid gap-x-12 gap-y-6 border-t border-hairline py-[clamp(2rem,4vw,3.25rem)] transition-colors duration-700 hover:border-ink lg:grid-cols-[1fr_1.15fr]"
          >
            <div className="flex items-baseline gap-6">
              <span className="tnum text-[0.625rem] font-medium tracking-[0.26em] text-ash transition-colors duration-500 group-hover:text-ink">
                {s.num}
              </span>
              <h2 className="serif-sm m-0 text-[clamp(1.5rem,2.8vw,2.375rem)] leading-tight">
                {s.title}
              </h2>
            </div>
            <div>
              <p className="body-copy m-0 max-w-[54ch]">{s.desc}</p>
              <p className="mt-6 text-[0.6875rem] leading-[1.9] tracking-[0.1em] text-ash">
                Includes — {s.includes}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Fees */}
      <section className="grain relative bg-paper">
        <div className="shell relative z-[1] max-w-[90rem] py-[clamp(5rem,10vw,9rem)]">
          <Reveal>
            <Eyebrow rule>Fees &amp; engagement</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            text="Clear from the start."
            className="mt-8 mb-8 text-[clamp(2.125rem,4.2vw,3.75rem)]"
          />
          <Reveal delay={200}>
            <p className="lede mb-16 max-w-[56ch]">
              Every commission begins with a written proposal: scope, fee, payment stages and
              timeline, agreed before design work starts. No surprises, and no commissions taken on
              materials we specify.
            </p>
          </Reveal>

          <Reveal stagger className="grid gap-10 md:grid-cols-3">
            {fees.map((f) => (
              <div key={f.title} className="border-t border-silver pt-8">
                <h3 className="serif-sm m-0 mb-3 text-[1.75rem]">{f.title}</h3>
                <div className="eyebrow mb-6">{f.basis}</div>
                <p className="body-copy m-0">{f.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
