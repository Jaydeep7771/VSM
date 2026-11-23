import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';
import { useScrollFade } from '../lib/useScrollFade';

/* ------------------------------------------------------------------ */
/* Reveal-on-scroll wrapper                                            */
/* ------------------------------------------------------------------ */

type Tag = 'div' | 'section' | 'article' | 'figure' | 'li' | 'aside' | 'ol' | 'ul' | 'header';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  /** Lift children in sequence rather than the block as a whole. */
  stagger?: boolean;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  stagger = false,
}: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Component = as;
  return (
    <Component
      ref={ref as never}
      className={`reveal ${stagger ? 'stagger' : ''} ${shown ? 'reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-linked fade                                                  */
/* ------------------------------------------------------------------ */

/**
 * Opacity tied to scroll position rather than triggered once. The item
 * fades up as it rises into view and, with `fadeOut`, dims again as it
 * leaves through the top — so scrolling back up reverses it.
 */
export function ScrollFade({
  children,
  className = '',
  as = 'div',
  fadeOut = false,
  /** Fade-in distance as a fraction of viewport height. Lower = quicker. */
  distance = 0.45,
  /** Fade-out distance. Larger = a longer, gentler exit. */
  exitDistance = 0.45,
  /** Pixels of upward drift paired with the fade. */
  lift = 28,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  fadeOut?: boolean;
  distance?: number;
  exitDistance?: number;
  lift?: number;
}) {
  const { ref, progress } = useScrollFade<HTMLDivElement>({ fadeOut, distance, exitDistance });
  const Component = as;

  return (
    <Component
      ref={ref as never}
      className={className}
      style={{
        opacity: progress,
        transform: lift ? `translate3d(0, ${(1 - progress) * lift}px, 0)` : undefined,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* Headline that rises word by word out of its own baseline            */
/* ------------------------------------------------------------------ */

export function WordReveal({
  text,
  className = '',
  italicFrom,
  as = 'h1',
}: {
  text: string;
  className?: string;
  /** Index of the first word to set in italic — used for the accented tail. */
  italicFrom?: number;
  as?: 'h1' | 'h2' | 'p';
}) {
  const { ref, shown } = useReveal<HTMLHeadingElement>();
  const Component = as;
  const words = text.split(' ');

  return (
    <Component ref={ref as never} className={`display ${shown ? 'words-in' : ''} ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word">
          <span
            style={{ transitionDelay: `${i * 70}ms` }}
            className={italicFrom !== undefined && i >= italicFrom ? 'italic' : undefined}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* Image placeholder — swap for <img> once photography is ready        */
/* ------------------------------------------------------------------ */

export function ImageSlot({
  alt,
  className = '',
  tone = 'mist',
  caption = true,
  src,
  priority = false,
  objectPosition,
}: {
  alt: string;
  className?: string;
  tone?: 'mist' | 'paper' | 'ink';
  /** Hide the visible caption where it would collide with page copy. */
  caption?: boolean;
  /** When supplied, a real photograph renders instead of the placeholder. */
  src?: string;
  /** Load eagerly — use for above-the-fold imagery only. */
  priority?: boolean;
  /** CSS object-position, to protect the subject when the frame crops. */
  objectPosition?: string;
}) {
  const tones = {
    mist: 'bg-mist text-ash',
    paper: 'bg-paper text-ash',
    ink: 'bg-ink-soft text-ash',
  } as const;

  /* ---- Real photograph ---- */
  if (src) {
    return (
      <div className={`vignette relative overflow-hidden ${tones[tone]} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          /* lowercase: React 18 does not map a camelCase fetchPriority prop */
          {...{ fetchpriority: priority ? 'high' : 'auto' }}
          className="photo-mono absolute inset-0 h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    );
  }

  /* ---- Placeholder plate ---- */
  return (
    <div
      role="img"
      aria-label={alt}
      className={`grain vignette relative overflow-hidden ${tones[tone]} ${className}`}
    >
      {/* Faint tonal wash so an empty plate still has depth */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(145deg, rgba(0,0,0,0.045) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.055) 100%)',
        }}
      />
      {caption ? (
        <div className="absolute inset-x-0 bottom-0 z-[3] flex items-end p-5">
          <span className="max-w-[44ch] text-[0.5625rem] font-medium uppercase leading-[1.7] tracking-[0.24em]">
            {alt}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons & links                                                     */
/* ------------------------------------------------------------------ */

type Variant = 'solid' | 'outline' | 'light' | 'onink';

const variantClass: Record<Variant, string> = {
  solid: 'btn-solid',
  outline: 'btn-outline',
  light: 'btn-light',
  onink: 'btn-onink',
};

export function ButtonLink({
  to,
  children,
  variant = 'solid',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link to={to} className={`btn ${variantClass[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  children,
  variant = 'outline',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`btn ${variantClass[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/** Understated underlined link used for secondary actions. */
export function TextLink({
  to,
  children,
  className = '',
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={`link-quiet ${className}`}>
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Typography helpers                                                  */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = '',
  rule = false,
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return <p className={`eyebrow m-0 ${rule ? 'eyebrow-rule' : ''} ${className}`}>{children}</p>;
}

/** Shared page header: eyebrow, large display title, optional lede. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  italicFrom,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  italicFrom?: number;
}) {
  return (
    <header className="shell max-w-[90rem] pt-[clamp(5rem,10vw,9.5rem)] pb-[clamp(3.5rem,6vw,6rem)]">
      <Reveal>
        <Eyebrow rule>{eyebrow}</Eyebrow>
      </Reveal>
      <WordReveal
        text={title}
        italicFrom={italicFrom}
        className="mt-9 mb-0 text-[clamp(2.75rem,7.5vw,7rem)]"
      />
      {lead ? (
        <Reveal delay={200}>
          <p className="lede mt-10 max-w-[50ch]">{lead}</p>
        </Reveal>
      ) : null}
    </header>
  );
}

/** Drawn hairline + heading + optional right-hand action. */
export function SectionHead({
  title,
  action,
  eyebrow,
}: {
  title: string;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <Reveal className="mb-14">
      <div className="rule mb-7" />
      <div className="flex flex-wrap items-baseline justify-between gap-6">
        <div>
          {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
          <h2 className="display m-0 text-[clamp(2.125rem,4.5vw,4rem)]">{title}</h2>
        </div>
        {action}
      </div>
    </Reveal>
  );
}
