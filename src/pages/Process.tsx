import { processSteps } from '../data/site';
import { Eyebrow, ImageSlot, PageHeader, Reveal } from '../components/Primitives';

export default function Process() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="Six stages. One unhurried rhythm."
        italicFrom={2}
        lead="A full home typically takes eight to fourteen months from first meeting to handover. Timelines below are indicative and are fixed in your proposal."
      />

      <section className="shell max-w-[90rem] pb-[clamp(5rem,10vw,9rem)]">
        <ol className="m-0 list-none p-0">
          {processSteps.map((step) => (
            <Reveal
              as="li"
              key={step.num}
              className="group grid gap-x-12 gap-y-8 border-t border-hairline py-[clamp(2.25rem,4.5vw,4rem)] transition-colors duration-700 hover:border-ink lg:grid-cols-[1fr_1fr_1fr] lg:items-start"
            >
              <div className="flex items-baseline gap-6">
                <span className="tnum font-serif text-[2.5rem] font-light leading-none text-silver transition-colors duration-700 group-hover:text-ink">
                  {step.num}
                </span>
                <div>
                  <h2 className="serif-sm m-0 text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight">
                    {step.title}
                  </h2>
                  <Eyebrow className="mt-3">{step.time}</Eyebrow>
                </div>
              </div>
              <p className="body-copy m-0 max-w-[46ch]">{step.desc}</p>
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]">
                  <ImageSlot alt={step.alt} className="aspect-[3/2] w-full" caption={false} />
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
