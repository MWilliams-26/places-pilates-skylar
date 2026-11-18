import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { links, nav } from '../content';
import { Monogram, Star, Wordmark } from './Brand';
import { Newspaper } from './Collage';
import { useOpenSlots } from './LiveBooking';

/** Masthead for inner pages: a magazine-style section title. */
export function PageHead({ kicker, title, lede, children }: { kicker: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-head">
      <div className="wrap page-head__inner">
        <p className="kicker">
          <Star /> {kicker}
        </p>
        <h1 className="page-head__title">{title}</h1>
        {lede ? <p className="page-head__lede">{lede}</p> : null}
        {children}
        <Monogram className="page-head__p" />
      </div>
    </header>
  );
}

/** The closing call to action on every page: the theatre seats, and a front page announcing her next open times. */
export function BookBand({ title = 'Take your place.' }: { title?: ReactNode }) {
  const { service, slots } = useOpenSlots(3);
  return (
    <section className="book-band" aria-labelledby="book-band-title">
      <picture className="book-band__backdrop" aria-hidden="true">
        <source media="(max-width: 700px)" srcSet="/images/concept-theatre-seats-sm.webp" />
        <img src="/images/concept-theatre-seats.webp" alt="" width={1800} height={1013} loading="lazy" />
      </picture>
      <div className="wrap book-band__inner">
        <div className="book-band__copy">
          <p className="kicker kicker--light">This is your call to places</p>
          <h2 id="book-band-title" className="book-band__title">
            {title}
          </h2>
          <p className="book-band__lede">Every open spot on Skylar’s calendar, booked in under a minute.</p>
        </div>
        <Newspaper service={service} slots={slots} />
        <div className="book-band__actions">
          <Link to="/book" className="btn btn--blush btn--lg">
            Book a session
          </Link>
          <Link to="/book#packs-title" className="btn btn--ghost btn--lg">
            See class packs
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__home">
            <Wordmark className="footer__wordmark" />
            <span className="sr-only">Places, Pilates home</span>
          </Link>
          <p>Pilates for the performer · New York City</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer__links">
            {[...nav, { label: 'Book', href: '/book' }].map((item) => (
              <li key={item.href}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="footer__links footer__links--social">
          <li>
            <a href={links.instagram} rel="noopener">
              Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${links.email}`}>Email</a>
          </li>
          <li>
            <Link to="/studio">Studio preview</Link>
          </li>
        </ul>
      </div>
      <p className="wrap footer__legal">
        <Star /> Website concept for Skylar’s review. Photos tagged @placespilates are Skylar’s own; “Stock photo” and “Concept image”
        tags mark stand-ins. Prices and details are provisional.
      </p>
    </footer>
  );
}

/** A visible marker for copy or facts Skylar still needs to supply or approve. */
export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="placeholder">{children}</span>;
}
