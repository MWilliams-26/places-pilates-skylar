import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { slotLabel } from './LiveBooking';
import { Monogram, Wordmark } from './Brand';

/**
 * Collage pieces drawn from the mood board. The marquee, script page, and
 * newspaper are built in HTML so their words stay real text. Photographic
 * cutouts are generated concept stand-ins, always tagged as such, until
 * Places photography replaces them (docs/ASSETS.md).
 */

export function ConceptImage({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  tagPosition = 'end',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  tagPosition?: 'start' | 'end';
}) {
  return (
    <figure className={`concept ${className}`} style={style}>
      <img src={src} alt={`Concept image: ${alt}`} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption className={`concept__tag concept__tag--${tagPosition}`}>Concept image</figcaption>
    </figure>
  );
}

/**
 * Broadway theatre marquee: a photographic marquee (concept image) whose
 * blank sign face carries the real wordmark and copy as live text.
 */
export function TheatreMarquee({ className = '' }: { className?: string }) {
  return (
    <figure className={`theatre-marquee ${className}`}>
      <img
        src="/images/concept-theatre-marquee.webp"
        alt=""
        width={1400}
        height={560}
        decoding="async"
        className="theatre-marquee__photo"
      />
      <div className="theatre-marquee__face" role="img" aria-label="Theatre marquee: Now playing, Places, Pilates, starring you">
        <span className="theatre-marquee__line" aria-hidden="true">
          Now
          <br />
          playing
        </span>
        <Wordmark className="theatre-marquee__title" />
        <span className="theatre-marquee__line" aria-hidden="true">
          Starring
          <br />
          you
        </span>
      </div>
      <figcaption className="concept__tag concept__tag--end">Concept image</figcaption>
    </figure>
  );
}

/** A typed script title page with the monogram: "script instead of equipment". */
export function ScriptPage({ className = '' }: { className?: string }) {
  return (
    <div className={`script-page ${className}`}>
      <Monogram className="script-page__mark" />
      <p className="script-page__title">PLACES, PILATES</p>
      <p className="script-page__sub">A movement piece in one act</p>
      <p className="script-page__by">
        by
        <br />
        Skylar Soehner
      </p>
      <p className="script-page__foot">
        Draft · New York
        <br />
        All bodies welcome
      </p>
    </div>
  );
}

/**
 * The closing call to action as a real front page: a photographed newspaper
 * (generated blank sheet) printed with live copy, Skylar's photo, and her next
 * open times from Acuity.
 */
export function Newspaper({ slots, service }: { slots: string[] | null; service?: { name: string; duration: number; price: string } }) {
  return (
    <article className="paper" aria-labelledby="paper-headline">
      <p className="paper__dateline">
        <span>Vol. I · No. 1</span>
        <span>New York</span>
        <span>Late edition</span>
      </p>
      <p className="paper__masthead">The Daily Call</p>
      <h3 id="paper-headline" className="paper__headline">
        Places, everyone!
      </h3>
      <p className="paper__deck">Dancer turned instructor Skylar Soehner opens her calendar to performers, and everyone else.</p>
      <div className="paper__cols">
        <figure className="paper__photo">
          <img src="/images/ig/newsprint-skylar.webp" alt="Skylar Soehner in a standing split on a reformer" width={335} height={419} loading="lazy" />
          <figcaption>Skylar Soehner, on the reformer.</figcaption>
        </figure>
        <div className="paper__booking">
          <p className="paper__box-title">Now booking</p>
          {service ? (
            <p className="paper__box-meta">
              {service.name} · {service.duration} min · ${Number(service.price).toFixed(0)}
            </p>
          ) : null}
          {slots === null ? (
            <p className="paper__box-meta">Checking Skylar’s calendar…</p>
          ) : slots.length ? (
            <ul className="paper__slots" aria-label="Next open times">
              {slots.map((slot) => (
                <li key={slot}>
                  <Link to={`/book?slot=${encodeURIComponent(slot)}`}>
                    {slotLabel(slot)}
                    <span className="sr-only">, book this time</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="paper__box-meta">New times are posted every Thursday.</p>
          )}
          <Link to="/book" className="paper__more">
            Every open time <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
