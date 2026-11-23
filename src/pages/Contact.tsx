import { useState, type FormEvent } from 'react';
import { formFields, formSelects, studio } from '../data/site';
import { Eyebrow, ImageSlot, Reveal, WordReveal } from '../components/Primitives';

const fieldClass =
  'mt-3 w-full border-0 border-b border-line bg-transparent pb-3 text-[0.9375rem] text-ink outline-none transition-colors duration-500 placeholder:text-silver focus:border-ink';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this to the studio's form endpoint or CRM before launch.
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section className="shell grid max-w-[90rem] gap-[clamp(3rem,7vw,7rem)] pt-[clamp(4rem,8vw,7rem)] pb-[clamp(4.5rem,9vw,8rem)] lg:grid-cols-[1.1fr_0.9fr]">
      {/* Form column */}
      <div>
        <Reveal>
          <Eyebrow rule>Book a consultation</Eyebrow>
        </Reveal>
        <WordReveal
          text="Tell us about the space."
          italicFrom={3}
          className="mt-9 mb-8 text-[clamp(2.5rem,5.5vw,4.5rem)]"
        />
        <p className="lede mb-14 max-w-[48ch]">
          We take on a small number of homes each year. Share a few details and we’ll reply within
          two working days to arrange a first conversation.
        </p>

        {sent ? (
          <div className="border border-ink p-[clamp(1.5rem,4vw,2.75rem)]">
            <p className="display m-0 text-[clamp(1.375rem,2.4vw,1.875rem)]">
              Thank you. Your enquiry is with us.
            </p>
            <p className="body-copy mt-5 mb-0">
              Expect a call or WhatsApp message from the studio shortly.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="eyebrow mt-8 border-b border-silver pb-1 transition-colors hover:border-ink hover:text-ink"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-9 sm:grid-cols-2">
            {formFields.map((f) => (
              <label key={f.name} className="eyebrow block">
                {f.label}
                {f.required ? <span className="text-silver"> *</span> : null}
                <input
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  placeholder={f.placeholder}
                  className={fieldClass}
                />
              </label>
            ))}

            {formSelects.map((s) => (
              <label key={s.name} className="eyebrow block">
                {s.label}
                <select name={s.name} className={`${fieldClass} appearance-none`} defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  {s.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            <label className="eyebrow block sm:col-span-2">
              Message
              <textarea
                name="message"
                rows={4}
                placeholder="What are you hoping the space will feel like?"
                className={`${fieldClass} resize-y`}
              />
            </label>

            <div className="sm:col-span-2">
              <button type="submit" className="btn btn-solid w-full sm:w-auto">
                Request a consultation
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Details column */}
      <Reveal as="aside" delay={120} className="flex flex-col gap-10">
        <div className="flex flex-col">
          <a
            href={studio.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-baseline justify-between gap-6 border-t border-ink py-6 text-ink transition-colors duration-300 hover:text-slate"
          >
            <span className="serif-sm text-[1.5rem]">
              WhatsApp
              <span className="ml-3.5 text-[0.625rem] uppercase tracking-[0.22em] text-ash">
                {studio.whatsappNumber}
              </span>
            </span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={studio.phoneHref}
            className="group flex items-baseline justify-between gap-6 border-t border-line py-6 text-ink transition-colors duration-300 hover:text-slate"
          >
            <span className="font-serif text-[1.5rem]">Call the studio</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={`mailto:${studio.email}`}
            className="group flex items-baseline justify-between gap-6 border-y border-line py-6 text-ink transition-colors duration-300 hover:text-slate"
          >
            <span className="font-serif text-[1.5rem]">Email</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <a
          href={studio.mapUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group relative block"
          aria-label="Open the studio location in Google Maps"
        >
          <ImageSlot
            alt="Studio location map — Adarsh Nagar, Jalandhar"
            className="aspect-[4/3] w-full"
            caption={false}
          />
          <span className="absolute bottom-4 left-4 z-[5] inline-flex items-center gap-2.5 bg-white px-4 py-2.5 text-[0.625rem] font-medium uppercase tracking-[0.26em] text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
            Open in Maps
            <span aria-hidden>→</span>
          </span>
        </a>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="body-copy">
            <Eyebrow className="mb-3">Studio</Eyebrow>
            <a
              href={studio.mapUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="block transition-colors duration-500 hover:text-ink"
            >
              {studio.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
            <div className="mt-2 text-ash">{studio.visitNote}</div>
          </div>
          <div className="body-copy">
            <Eyebrow className="mb-3">Working across</Eyebrow>
            <div>{studio.cities.join(' · ')}</div>
            <div className="mt-2">{studio.email}</div>
            <div>{studio.phone}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
