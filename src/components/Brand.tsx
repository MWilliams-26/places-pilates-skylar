import type { CSSProperties, ReactNode } from 'react';

/**
 * The supplied Places, Pilates wordmark, traced from the brand guide PNG and
 * drawn as a mask so it can sit in burgundy or blush, the two colors the
 * guide shows. Replace the SVG with the original vector artwork once supplied.
 */
export function Wordmark({ className = '', color = 'var(--pp-burgundy)', label }: { className?: string; color?: string; label?: string }) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`wordmark ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}

export function Monogram({ className = '' }: { className?: string }) {
  return <img src="/brand/places-pilates-monogram.svg" alt="" width={573} height={826} className={`monogram ${className}`} />;
}

/** The five-point star from the monogram, for small accents. */
export function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`star ${className}`}>
      <path d="M12 1.5l2.47 7.6h7.99l-6.46 4.7 2.47 7.6L12 16.7l-6.47 4.7 2.47-7.6-6.46-4.7h7.99z" fill="currentColor" />
    </svg>
  );
}

type FrameProps = {
  /** What the approved photo should show. */
  label: string;
  variant?: 'tape' | 'arch' | 'torn' | 'print';
  tone?: 'blush' | 'salmon' | 'burgundy';
  className?: string;
  style?: CSSProperties;
};

/**
 * Where an approved studio photo goes, dressed in one of the collage
 * treatments (taped print, arch cutout, torn paper). The caption says what to
 * shoot or supply, so nobody mistakes the frame for real photography.
 */
export function Frame({ label, variant = 'tape', tone = 'blush', className = '', style }: FrameProps) {
  return (
    <figure className={`frame frame--${variant} frame--${tone} ${className}`} style={style}>
      <div className="frame__image">
        <Star className="frame__star" />
      </div>
      <figcaption>
        <span className="frame__kicker">Photo to come</span>
        {label}
      </figcaption>
    </figure>
  );
}

/**
 * A real photo of Skylar, from her own Instagram, in the same collage
 * treatments as Frame. The credit tag keeps the source visible.
 */
export function Photo({
  src,
  alt,
  variant = 'tape',
  caption,
  className = '',
  style,
}: {
  src: string;
  alt: string;
  variant?: FrameProps['variant'];
  caption?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className={`frame frame--${variant} frame--photo ${className}`} style={style}>
      <div className="frame__image">
        <img src={src} alt={alt} width={800} height={1000} loading="lazy" decoding="async" />
      </div>
      <figcaption>
        {caption ? <span className="frame__caption">{caption}</span> : null}
        <span className="frame__credit">@placespilates</span>
      </figcaption>
    </figure>
  );
}

/** A handwritten margin note, optionally with a drawn arrow. */
export function Note({ children, arrow, className = '' }: { children: ReactNode; arrow?: 'down' | 'left' | 'right' | 'up'; className?: string }) {
  return (
    <span className={`note ${className}`} aria-hidden="true">
      <span className="note__text">{children}</span>
      {arrow ? <Arrow direction={arrow} /> : null}
    </span>
  );
}

function Arrow({ direction }: { direction: 'down' | 'left' | 'right' | 'up' }) {
  return (
    <svg viewBox="0 0 80 60" className={`note__arrow note__arrow--${direction}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10c14 2 34 6 44 18s10 20 12 26" />
      <path d="M50 46l12 9 5-14" />
    </svg>
  );
}

/** A highlighter stroke across a word, like an actor marking their lines in a script. */
export function Highlighted({ children }: { children: ReactNode }) {
  return <mark className="highlighted">{children}</mark>;
}
