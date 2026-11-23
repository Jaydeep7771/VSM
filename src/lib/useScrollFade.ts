import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-linked fade.
 *
 * Unlike `useReveal`, which flips an element to visible once and leaves it
 * there, this tracks scroll position continuously: an element fades up as it
 * rises into the viewport and — when `fadeOut` is set — fades back down as it
 * leaves through the top. The effect reverses when the reader scrolls back.
 *
 * Every subscriber shares one scroll listener and one rAF tick, so adding
 * more elements costs almost nothing.
 */

type Entry = {
  el: HTMLElement;
  fadeOut: boolean;
  /** How far the element travels while fading in, as a fraction of viewport height. */
  distance: number;
  /** The same, for the fade back out through the top of the viewport. */
  exitDistance: number;
  set: (v: number) => void;
  last: number;
};

const entries = new Set<Entry>();
let frame = 0;
let listening = false;

function clamp(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Ease-out so most of the fade happens early, before the item is centred. */
function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function measure() {
  frame = 0;
  const vh = window.innerHeight || 1;

  for (const entry of entries) {
    const rect = entry.el.getBoundingClientRect();
    const band = vh * entry.distance;

    // Rising in from the bottom edge.
    const fromBottom = vh - rect.top;
    let progress = clamp(fromBottom / band);

    // Leaving through the top: start dimming once the element's base is high up.
    if (entry.fadeOut) {
      const leaving = clamp((rect.bottom - vh * 0.04) / (vh * entry.exitDistance));
      progress = Math.min(progress, leaving);
    }

    const value = ease(progress);

    // Skip sub-pixel updates — avoids pointless style writes every frame.
    if (Math.abs(value - entry.last) > 0.004) {
      entry.last = value;
      entry.set(value);
    }
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure);
}

function subscribe(entry: Entry) {
  entries.add(entry);
  if (!listening) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    listening = true;
  }
  schedule();

  return () => {
    entries.delete(entry);
    if (entries.size === 0 && listening) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      listening = false;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}

export function useScrollFade<T extends HTMLElement>({
  fadeOut = false,
  distance = 0.45,
  exitDistance = 0.45,
}: { fadeOut?: boolean; distance?: number; exitDistance?: number } = {}) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (reduced?.matches) {
      setProgress(1);
      return;
    }

    return subscribe({ el, fadeOut, distance, exitDistance, set: setProgress, last: -1 });
  }, [fadeOut, distance, exitDistance]);

  return { ref, progress };
}
