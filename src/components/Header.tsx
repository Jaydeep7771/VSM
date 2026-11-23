import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation, studio } from '../data/site';

function Wordmark() {
  return (
    <span className="flex items-baseline gap-2.5 text-ink">
      <span className="font-serif text-[1.75rem] font-normal leading-none tracking-[-0.02em]">
        vSM
      </span>
      <span className="text-[0.5625rem] font-medium uppercase tracking-[0.42em]">Innovators</span>
    </span>
  );
}

/** Hairline that tracks reading progress along the bottom of the header. */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-transparent">
      <div
        className="h-full origin-left bg-ink transition-transform duration-200 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the overlay; Escape dismisses it.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.625rem] focus:uppercase focus:tracking-[0.26em] focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 h-[4.5rem] transition-colors duration-700 ease-out ${
          menuOpen ? 'bg-white' : 'bg-white/88 backdrop-blur-md'
        }`}
      >
        <div className="shell flex h-full max-w-[90rem] items-center justify-between gap-6">
          <Link to="/" aria-label={`${studio.name} — home`} onClick={() => setMenuOpen(false)}>
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {navigation.slice(1, 6).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-2 text-[0.625rem] font-medium uppercase tracking-[0.26em] transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-ink after:transition-transform after:duration-[700ms] after:ease-[cubic-bezier(.16,1,.3,1)] ${
                    isActive
                      ? 'text-ink after:origin-left after:scale-x-100'
                      : 'text-slate after:origin-right after:scale-x-0 hover:text-ink hover:after:origin-left hover:after:scale-x-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn-solid ml-2 !px-6 !py-3.5">
              Consultation
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="flex items-center gap-3.5 py-2 text-[0.625rem] font-medium uppercase tracking-[0.26em] text-ink transition-colors duration-500 hover:text-slate lg:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
            <span aria-hidden className="relative block h-2.5 w-6">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                  menuOpen ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px bg-current transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                  menuOpen ? 'top-1/2 w-full -rotate-45' : 'top-full w-2/3'
                }`}
              />
            </span>
          </button>
        </div>

        {scrolled && !menuOpen ? <ScrollProgress /> : null}
      </header>

      {/* Full-screen index */}
      <div
        id="site-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-auto bg-white"
      >
        <div className="shell grid max-w-[90rem] gap-16 py-[clamp(2rem,6vw,5rem)] lg:grid-cols-[1.3fr_1fr]">
          <nav aria-label="All pages" className="flex flex-col">
            {navigation.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                style={{ transitionDelay: `${i * 45}ms` }}
                className={`group flex items-baseline gap-7 border-b border-hairline py-5 text-ink transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:text-slate ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <span className="tnum w-7 text-[0.5625rem] font-medium tracking-[0.3em] text-ash">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="display text-[clamp(2.25rem,5.5vw,4.25rem)]">{item.label}</span>
                <span
                  aria-hidden
                  className="ml-auto translate-x-[-0.5rem] self-center text-base text-ash opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col justify-end gap-8">
            <p className="display m-0 max-w-[20ch] text-[clamp(1.375rem,2.4vw,1.875rem)] italic">
              Interiors for Jalandhar, Ludhiana and Amritsar — made slowly, made to last.
            </p>
            <div className="h-px w-16 bg-line" />
            <div className="body-copy">
              Studio visits by appointment
              <br />
              {studio.address[0]}, Jalandhar, Punjab
            </div>
            <div className="flex flex-wrap gap-8 text-[0.625rem] font-medium uppercase tracking-[0.26em]">
              <a
                href={studio.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="text-slate transition-colors duration-500 hover:text-ink"
              >
                WhatsApp
              </a>
              <a
                href={studio.phoneHref}
                className="text-slate transition-colors duration-500 hover:text-ink"
              >
                Call
              </a>
              <a
                href={studio.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="text-slate transition-colors duration-500 hover:text-ink"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
