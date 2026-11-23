import { journal } from '../data/site';
import { ImageSlot, PageHeader, Reveal } from '../components/Primitives';

export default function Journal() {
  return (
    <>
      <PageHeader eyebrow="Journal" title="Notes on material & light." />

      <section className="shell max-w-[90rem] pb-[clamp(4.5rem,9vw,8rem)]">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {journal.map((entry, i) => (
            <Reveal as="article" key={entry.id} delay={i * 100}>
              <a href="#" className="group block">
                <div className="overflow-hidden">
                  <div className="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]">
                    <ImageSlot alt={entry.alt} className="aspect-[4/3] w-full" caption={false} />
                  </div>
                </div>
                <div className="eyebrow mt-7">
                  {entry.cat} · {entry.read}
                </div>
                <h2 className="serif-sm mt-5 mb-3.5 text-[1.75rem] leading-snug transition-colors duration-500 group-hover:text-slate">
                  {entry.title}
                </h2>
                <p className="body-copy m-0">{entry.dek}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
