import { Link, useLocation } from 'react-router-dom';
import { navigation, studio } from '../data/site';
import { ButtonAnchor, ButtonLink, Eyebrow, Reveal, WordReveal } from './Primitives';

/** Closing band that invites a consultation — hidden on the contact page. */
export function CtaBand() {
  const { pathname } = useLocation();
  if (pathname === '/contact') return null;

  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      <div className="shell relative z-[1] max-w-[90rem] py-[clamp(5.5rem,12vw,11rem)]">
        <Reveal>
          <Eyebrow rule className="text-ash [&::before]:bg-graphite">
            Begin a conversation
          </Eyebrow>
        </Reveal>
        <WordReveal
          as="h2"
          text="Every home starts with a quiet hour of listening."
          italicFrom={4}
          className="mt-9 mb-12 max-w-[26ch] text-[clamp(2.125rem,5vw,4.25rem)] text-white"
        />
        <Reveal delay={250} className="flex flex-wrap gap-3">
          <ButtonLink to="/contact" variant="light">
            Book a consultation
          </ButtonLink>
          <ButtonAnchor href={studio.whatsapp} variant="onink">
            Message on WhatsApp
          </ButtonAnchor>
        </Reveal>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="shell grid max-w-[90rem] gap-14 py-[clamp(4rem,8vw,7rem)] md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="flex items-baseline gap-2.5">
            <span className="font-serif text-[1.75rem] leading-none tracking-[0.015em]">VSM</span>
            <span className="text-[0.5625rem] font-medium uppercase tracking-[0.42em]">
              Innovators
            </span>
          </span>
          <p className="body-copy mt-7 max-w-[32ch]">{studio.blurb}</p>
          <div className="mt-8 h-px w-14 bg-line" />
        </div>

        <nav aria-label="Footer" className="flex flex-col items-start gap-4">
          <Eyebrow className="mb-2">Index</Eyebrow>
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-[0.625rem] font-medium uppercase tracking-[0.26em] text-slate transition-colors duration-500 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="body-copy">
          <Eyebrow className="mb-5">Studio</Eyebrow>
          <a
            href={studio.mapUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="block not-italic transition-colors duration-500 hover:text-ink"
          >
            {studio.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </a>
          <div className="mt-2 text-ash">{studio.visitNote}</div>
          <div className="mt-6 flex flex-col gap-1.5">
            <a
              href={studio.phoneHref}
              className="text-graphite transition-colors duration-500 hover:text-ink"
            >
              {studio.phone}
            </a>
            <a
              href={`mailto:${studio.email}`}
              className="text-graphite transition-colors duration-500 hover:text-ink"
            >
              {studio.email}
            </a>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="text-graphite transition-colors duration-500 hover:text-ink"
            >
              {studio.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      <div className="shell max-w-[90rem] border-t border-hairline py-8">
        <div className="flex flex-wrap justify-between gap-4 text-[0.5625rem] uppercase tracking-[0.26em] text-ash">
          <span>© {new Date().getFullYear()} VSM Innovators</span>
          <span>Interior designer · Jalandhar · Ludhiana · Amritsar</span>
        </div>
      </div>
    </footer>
  );
}
