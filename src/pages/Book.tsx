import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bookingProvider } from '../booking/provider';
import { Booking } from '../components/Booking';
import { LiveBooking, Packages } from '../components/LiveBooking';
import { Star } from '../components/Brand';
import { PageHead } from '../components/Layout';

export function Book() {
  const [params] = useSearchParams();

  // Acuity's embed script sizes the iframe to its content.
  useEffect(() => {
    if (bookingProvider.kind !== 'embed' || document.querySelector('script[data-acuity]')) return;
    const script = document.createElement('script');
    script.src = 'https://embed.acuityscheduling.com/js/embed.js';
    script.dataset.acuity = '';
    document.body.append(script);
  }, []);

  return (
    <>
      <PageHead
        kicker="Schedule & booking"
        title={
          <>
            Take your <em>place.</em>
          </>
        }
        lede="Pick a session, choose a time, and you’re on the call sheet."
      />

      <section className="section book" aria-label="Booking">
        <div className="wrap book__grid">
          <aside className="book__aside" aria-labelledby="book-how">
            <h2 id="book-how" className="live-booking__title">
              How booking works
            </h2>
            <ol className="steps-list steps-list--stacked">
              <li>
                <h3>Choose a session</h3>
                <p>Pick what you’d like to book. Packs to save per class are below.</p>
              </li>
              <li>
                <h3>Pick a time</h3>
                <p>Every open slot on Skylar’s calendar, live.</p>
              </li>
              <li>
                <h3>Check out</h3>
                <p>Confirm and pay securely; you’ll get a confirmation and reminder by email.</p>
              </li>
            </ol>
          </aside>

          <div className="book__main">
            {bookingProvider.kind === 'live' ? (
              <>
                <p className="tag">
                  <Star /> Live booking · Skylar’s calendar
                </p>
                <LiveBooking initialSlot={params.get('slot') ?? undefined} />
              </>
            ) : bookingProvider.kind === 'prototype' ? (
              <>
                <p className="tag">
                  <Star /> Prototype booking flow
                </p>
                <Booking initialClass={params.get('class') ?? undefined} />
              </>
            ) : bookingProvider.kind === 'embed' ? (
              <>
                <p className="tag">
                  <Star /> Live booking · {bookingProvider.name}
                </p>
                <div className="book__embed-card">
                  <iframe className="book__embed" src={bookingProvider.src} title={`Book with Places, Pilates on ${bookingProvider.name}`} allow="payment" />
                </div>
              </>
            ) : (
              <a href={bookingProvider.href} className="btn btn--brick btn--lg">
                Book on {bookingProvider.name}
              </a>
            )}
          </div>
        </div>
      </section>

      {bookingProvider.kind === 'live' ? (
        <section className="section packs" aria-labelledby="packs-title">
          <div className="wrap">
            <p className="kicker">
              <Star /> Season tickets
            </p>
            <h2 id="packs-title" className="section-title">
              Save with a pack.
            </h2>
            <p className="packs__lede">Buy a pack of classes or private sessions and use them whenever you book. Prices come straight from Skylar’s booking system.</p>
            <Packages />
          </div>
        </section>
      ) : null}
    </>
  );
}
