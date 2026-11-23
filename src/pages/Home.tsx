import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  heroSlides,
  instagramGrid,
  press,
  processSteps,
  projects,
  services,
  studio,
  testimonials,
} from '../data/site';
import {
  ButtonLink,
  Eyebrow,
  ImageSlot,
  Reveal,
  ScrollFade,
  SectionHead,
  TextLink,
  WordReveal,
} from '../components/Primitives';

function Hero() {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    const id = window.setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 7200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  return (
    <section className="relative h-[calc(100svh-4.5rem)] min-h-[36rem] overflow-hidden bg-mist">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-[2600ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          {/* Each plate drifts slowly while it is on screen */}
          <div className={`h-full w-full ${i === active ? 'drift' : ''}`}>
            <ImageSlot
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full"
              caption={false}
              priority={i === 0}
            />
          </div>
        </div>
      ))}

      {/* Scrims: keep the headline legible over any photograph.
          One rises from the base, one washes in from the left behind the copy. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[4] bg-gradient-to-t from-white from-[12%] via-white/70 via-[46%] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[4] bg-gradient-to-r from-white/85 from-[2%] via-white/25 via-[38%] to-transparent"
      />

      {/* The whole hero block dims and lifts away as the reader scrolls past it */}
      <ScrollFade
        fadeOut
        lift={0}
        distance={0.2}
        exitDistance={0.95}
        className="shell absolute inset-x-0 bottom-0 z-[5] max-w-[90rem] pb-[clamp(2.5rem,6vw,5rem)]"
      >
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-[46rem]">
            <div
              className={`transition-all duration-1000 ease-out ${
                entered ? 'opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <Eyebrow rule className="!text-graphite [&::before]:bg-graphite">
                {studio.tagline}
              </Eyebrow>
            </div>

            <WordReveal
              text="Spaces crafted to be lived in, beautifully."
              italicFrom={6}
              className="mt-8 mb-10 text-[clamp(2.75rem,7vw,6rem)]"
            />

            <div
              className={`flex flex-wrap gap-3 transition-all duration-1000 ease-out ${
                entered ? 'opacity-100 delay-[700ms]' : 'translate-y-3 opacity-0'
              }`}
            >
              <ButtonLink to="/portfolio">View our work</ButtonLink>
              <ButtonLink to="/contact" variant="outline">
                Book a consultation
              </ButtonLink>
            </div>
          </div>

          {/* Numbered slide index — reads as a plate number, not a carousel dot */}
          <div className="flex items-center gap-5 pb-2">
            <span className="tnum text-[0.625rem] font-medium tracking-[0.26em] text-graphite">
              {String(active + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2" role="tablist" aria-label="Hero images">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setActive(i)}
                  className="group flex h-5 w-9 items-center"
                >
                  <span className="relative block h-px w-full bg-silver">
                    <span
                      className="absolute inset-0 origin-left bg-ink transition-transform duration-[900ms] ease-out"
                      style={{ transform: `scaleX(${i === active ? 1 : 0})` }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <span className="tnum text-[0.625rem] font-medium tracking-[0.26em] text-silver">
              {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}

function Statement() {
  return (
    <section className="shell max-w-[70rem] py-[clamp(6rem,14vw,13rem)] text-center">
      <ScrollFade fadeOut distance={0.5}>
        <Eyebrow className="justify-center eyebrow-rule">The studio</Eyebrow>
      </ScrollFade>
      <ScrollFade fadeOut distance={0.55}>
        <p className="display mx-auto mt-10 mb-12 max-w-[44ch] text-[clamp(1.625rem,3.4vw,2.875rem)] leading-[1.22]">
          We design contemporary Indian interiors rooted in Punjab — lime plaster, hand-cut stone,
          brass worked by hand, light that moves slowly through a room. Every home is made for one
          family, and <em>meant to outlast every trend.</em>
        </p>
        <TextLink to="/studio">Meet the studio</TextLink>
      </ScrollFade>
    </section>
  );
}

function ProjectCard({
  project,
  aspect,
  index,
}: {
  project: (typeof projects)[number];
  aspect: string;
  index: number;
}) {
  return (
    <Link to={`/portfolio/${project.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
          <ImageSlot
            src={project.cover.src}
            alt={project.cover.alt}
            className={`w-full ${aspect}`}
            caption={false}
          />
        </div>

        {/* Hover plate: darkens the image and offers the action */}
        <div className="absolute inset-0 z-[4] bg-ink/0 transition-colors duration-[900ms] ease-out group-hover:bg-ink/25" />
        <div className="absolute inset-x-0 bottom-0 z-[5] flex translate-y-3 items-center justify-between gap-4 p-7 opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.625rem] font-medium uppercase tracking-[0.3em] text-white">
            View project
          </span>
          <span aria-hidden className="text-base text-white">
            →
          </span>
        </div>

        {/* Plate number, top-left */}
        <span className="tnum absolute left-6 top-6 z-[5] text-[0.625rem] font-medium tracking-[0.26em] text-white mix-blend-difference">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-7 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="serif-sm m-0 text-[clamp(1.5rem,2.3vw,2rem)] transition-colors duration-500 group-hover:text-slate">
          {project.name}
        </h3>
        <span className="text-[0.625rem] uppercase tracking-[0.26em] text-ash">
          {[project.location, project.type].filter(Boolean).join(' · ')}
        </span>
      </div>
    </Link>
  );
}

function SelectedWork() {
  return (
    <section className="shell max-w-[90rem] pb-[clamp(5rem,11vw,10rem)]">
      <SectionHead title="Selected work" action={<TextLink to="/portfolio">All projects</TextLink>} />
      <div className="grid gap-x-[clamp(1.5rem,4vw,4.5rem)] gap-y-[clamp(3rem,6vw,5.5rem)] md:grid-cols-5">
        {projects.slice(0, 2).map((p, i) => (
          <ScrollFade
            as="article"
            key={p.slug}
            distance={i === 0 ? 0.5 : 0.6}
            className={i === 0 ? 'md:col-span-3' : 'md:col-span-2 md:mt-[clamp(0px,13vw,12rem)]'}
          >
            <ProjectCard project={p} index={i} aspect={i === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'} />
          </ScrollFade>
        ))}
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="grain relative bg-paper">
      <div className="shell relative z-[1] grid max-w-[90rem] gap-[clamp(2.5rem,6vw,7rem)] py-[clamp(5rem,11vw,10rem)] lg:grid-cols-2">
        <Reveal>
          <Eyebrow rule>Services</Eyebrow>
          <h2 className="display mt-9 mb-8 max-w-[18ch] text-[clamp(2.125rem,4.2vw,3.875rem)]">
            From the first sketch to <em>the last cushion.</em>
          </h2>
          <p className="body-copy mb-11 max-w-[40ch]">
            One studio, one point of contact. We design, source, build and style — so the home you
            approve on paper is the home you walk into.
          </p>
          <TextLink to="/services">All services</TextLink>
        </Reveal>

        <Reveal delay={150} stagger className="flex flex-col">
          {services.slice(0, 4).map((s) => (
            <div
              key={s.num}
              className="group grid grid-cols-[3rem_1fr] gap-5 border-t border-line py-8 transition-colors duration-500 first:border-t-0"
            >
              <span className="tnum pt-2 text-[0.625rem] font-medium tracking-[0.26em] text-ash transition-colors duration-500 group-hover:text-ink">
                {s.num}
              </span>
              <div>
                <h3 className="serif-sm m-0 mb-3 text-[1.625rem]">{s.title}</h3>
                <p className="body-copy m-0">{s.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ProcessPreview() {
  return (
    <section className="shell max-w-[90rem] py-[clamp(5rem,11vw,10rem)]">
      <SectionHead title="How we work" action={<TextLink to="/process">The full process</TextLink>} />
      <Reveal stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {processSteps.map((step) => (
          <div key={step.num} className="group border-t border-ink pt-6">
            <div className="tnum font-serif mb-6 text-[2.75rem] font-light leading-none text-silver transition-colors duration-700 group-hover:text-ink">
              {step.num}
            </div>
            <div className="mb-2.5 text-[0.9375rem] font-medium leading-snug">{step.title}</div>
            <div className="text-[0.75rem] uppercase tracking-[0.18em] text-ash">{step.time}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Press() {
  return (
    <Reveal as="section" className="border-y border-hairline">
      <div className="shell flex max-w-[90rem] flex-wrap items-center justify-between gap-x-14 gap-y-8 py-14">
        <Eyebrow>As featured in</Eyebrow>
        {press.map((p) => (
          <div
            key={p.id}
            role="img"
            aria-label="Publication logo"
            className="flex h-10 w-28 items-center justify-center text-[0.5625rem] uppercase tracking-[0.3em] text-silver opacity-70 transition-opacity duration-500 hover:opacity-100"
          >
            Logo
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* Inverted section — the tonal break that gives the page its rhythm */
function Testimonials() {
  return (
    <section className="grain relative bg-ink text-white">
      <div className="shell relative z-[1] max-w-[82rem] py-[clamp(5.5rem,12vw,11rem)]">
        <Reveal className="mb-16">
          <Eyebrow rule className="text-ash [&::before]:bg-graphite">
            In their words
          </Eyebrow>
        </Reveal>
        <div className="grid gap-[clamp(3.5rem,8vw,8rem)] md:grid-cols-2">
          {testimonials.map((t, i) => (
            <ScrollFade
              as="figure"
              key={t.who}
              fadeOut
              distance={i === 0 ? 0.5 : 0.62}
              className="m-0"
            >
              <div className="font-serif h-9 text-[5rem] leading-[0.6] text-graphite">“</div>
              <blockquote className="display m-0 mb-9 text-[clamp(1.5rem,2.6vw,2.125rem)] italic leading-[1.3] text-white">
                {t.quote}
              </blockquote>
              <div className="mb-5 h-px w-12 bg-graphite" />
              <figcaption className="eyebrow text-ash">
                {t.who} — {t.project}
              </figcaption>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramStrip() {
  return (
    <section className="shell max-w-[90rem] py-[clamp(5rem,10vw,9rem)]">
      <Reveal className="mb-10 flex flex-wrap items-baseline justify-between gap-6">
        <Eyebrow rule>From the studio</Eyebrow>
        <a
          href={studio.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="serif-sm text-[1.625rem] text-ink transition-colors duration-500 hover:text-slate"
        >
          {studio.instagramHandle}
        </a>
      </Reveal>
      <Reveal stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {instagramGrid.map((ig) => (
          <div key={ig.id} className="overflow-hidden">
            <div className="transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.06]">
              <ImageSlot alt={ig.alt} className="aspect-square" caption={false} />
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <SelectedWork />
      <ServicesPreview />
      <ProcessPreview />
      <Press />
      <Testimonials />
      <InstagramStrip />
    </>
  );
}
