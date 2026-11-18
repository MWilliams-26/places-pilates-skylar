import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ErrorSummary, Field, Input, RadioCards, StatusMessage, ToggleGroup, type FormErrorItem } from '@mwilliams/ui';
import { Link } from 'react-router-dom';
import { checkoutUrl, packageUrl, TIMEZONE } from '../../server/acuity';
import { Star } from './Brand';
import { longDate, Ticket } from './Booking';

type Service = { id: number; name: string; description: string; duration: number; price: string; category: string; calendarIDs: number[] };
type Product = { id: number; title: string; description: string; formattedPrice: string; category: string; isSubscription: boolean; subscriptionTermsText: string };
type Slot = { time: string; slotsAvailable: number };
type Step = 'session' | 'time' | 'details' | 'checkout';

const steps: { id: Step; label: string }[] = [
  { id: 'session', label: 'Session' },
  { id: 'time', label: 'Time' },
  { id: 'details', label: 'Details' },
  { id: 'checkout', label: 'Checkout' },
];

const todayInNewYork = () => new Date().toLocaleDateString('en-CA', { timeZone: TIMEZONE });
const clock = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TIMEZONE });
/** A YYYY-MM-DD key as a local date at noon, so labels never slip a day. */
const dayOf = (key: string) => new Date(`${key}T12:00:00`);
const money = (price: string) => `$${Number(price).toFixed(0)}`;
const nyDay = (iso: string) => new Date(iso).toLocaleDateString('en-CA', { timeZone: TIMEZONE });
export const slotLabel = (iso: string) =>
  `${new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: TIMEZONE })} · ${clock(iso)}`;

/** The next open times for Skylar's first bookable session, for teasers like the newspaper. */
export function useOpenSlots(count: number) {
  const [state, setState] = useState<{ service?: Service; slots: string[] | null }>({ slots: null });
  useEffect(() => {
    let live = true;
    (async () => {
      const catalog: { services: Service[] } = await (await fetch('/api/acuity/catalog')).json();
      const service = catalog.services[0];
      if (!service) return live && setState({ slots: [] });
      const query = new URLSearchParams({ appointmentTypeId: String(service.id), calendarId: String(service.calendarIDs[0]), startDate: todayInNewYork() });
      const days: Record<string, Slot[]> = await (await fetch(`/api/acuity/times?${query}`)).json();
      const slots = Object.values(days).flat().map((s) => s.time).slice(0, count);
      if (live) setState({ service, slots });
    })().catch(() => live && setState({ slots: [] }));
    return () => {
      live = false;
    };
  }, [count]);
  return state;
}

/**
 * Booking in the site's own design, on Skylar's live Acuity data: real
 * sessions and open times, then Acuity's secure checkout for the chosen slot
 * with the client's details filled in.
 */
export function LiveBooking({ initialSlot }: { initialSlot?: string }) {
  const [services, setServices] = useState<Service[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [step, setStep] = useState<Step>('session');
  const [serviceId, setServiceId] = useState('');
  const [slots, setSlots] = useState<Record<string, Slot[]> | null>(null);
  const [dayKey, setDayKey] = useState('');
  const [time, setTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FormErrorItem[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const jumped = useRef(false);

  const service = services?.find((s) => String(s.id) === serviceId);
  const calendarId = service?.calendarIDs[0];
  const errorFor = (id: string) => errors.find((e) => e.id === id)?.message;

  useEffect(() => {
    fetch('/api/acuity/catalog')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: { services: Service[] }) => {
        setServices(data.services);
        if (data.services.length === 1) setServiceId(String(data.services[0].id));
        // A time picked elsewhere (the newspaper's "Now booking") opens on the time step with it selected.
        if (data.services.length && initialSlot && !Number.isNaN(Date.parse(initialSlot))) {
          setServiceId(String(data.services[0].id));
          setDayKey(nyDay(initialSlot));
          setTime(initialSlot);
          jumped.current = true;
          setStep('time');
        }
      })
      .catch(() => setLoadError(true));
  }, [initialSlot]);

  useEffect(() => {
    if (step !== 'time' || !service || !calendarId) return;
    setSlots(null);
    const query = new URLSearchParams({ appointmentTypeId: String(service.id), calendarId: String(calendarId), startDate: todayInNewYork() });
    fetch(`/api/acuity/times?${query}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: Record<string, Slot[]>) => {
        setSlots(data);
        const first = Object.keys(data).find((k) => data[k].length);
        setDayKey((current) => (current && data[current]?.length ? current : (first ?? '')));
        setTime((current) => (current && data[nyDay(current)]?.some((slot) => slot.time === current) ? current : ''));
      })
      .catch(() => setLoadError(true));
  }, [step, service, calendarId]);

  // Acuity's embed script sizes the checkout frame to its content; it only sees frames present when it loads.
  useEffect(() => {
    if (step !== 'checkout') return;
    const script = document.createElement('script');
    script.src = 'https://embed.acuityscheduling.com/js/embed.js';
    document.body.append(script);
    return () => script.remove();
  }, [step]);

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (jumped.current) {
      heading.current?.closest('.box-office')?.scrollIntoView({ block: 'start' });
      heading.current?.focus({ preventScroll: true });
      jumped.current = false;
    } else if (moved.current) heading.current?.focus({ preventScroll: true });
    moved.current = true;
  }, [step]);

  const go = (next: Step) => {
    setErrors([]);
    setStep(next);
  };

  const next = (event: FormEvent) => {
    event.preventDefault();
    const found: FormErrorItem[] = [];
    if (step === 'session' && !service) found.push({ id: 'booking-session', message: 'Choose a session to continue.' });
    if (step === 'time' && !time) found.push({ id: 'booking-time', message: 'Choose a time.' });
    if (step === 'details') {
      if (!firstName.trim()) found.push({ id: 'booking-first', message: 'Enter your first name.' });
      if (!lastName.trim()) found.push({ id: 'booking-last', message: 'Enter your last name.' });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.push({ id: 'booking-email', message: 'Enter an email like name@example.com.' });
    }
    setErrors(found);
    if (!found.length) go(({ session: 'time', time: 'details', details: 'checkout', checkout: 'checkout' } as const)[step]);
  };

  if (loadError) {
    return (
      <div className="box-office">
        <StatusMessage tone="info" title="Booking is taking a moment">
          We couldn’t load Skylar’s schedule just now.{' '}
          <a href="https://app.acuityscheduling.com/schedule.php?owner=37370862" rel="noopener">
            Book directly on Acuity
          </a>
          .
        </StatusMessage>
      </div>
    );
  }

  const stepIndex = steps.findIndex((s) => s.id === step);
  const days = slots ? Object.keys(slots).filter((k) => slots[k].length) : [];

  return (
    <div className="box-office">
      <ol className="steps" aria-label="Booking steps">
        {steps.map((s, i) => (
          <li key={s.id} className={i < stepIndex ? 'is-done' : i === stepIndex ? 'is-current' : undefined}>
            {i < stepIndex ? (
              <button type="button" onClick={() => go(s.id)}>
                <span className="steps__n">{i + 1}</span> {s.label}
                <span className="sr-only"> (completed, edit)</span>
              </button>
            ) : (
              <span aria-current={i === stepIndex ? 'step' : undefined}>
                <span className="steps__n">{i + 1}</span> {s.label}
              </span>
            )}
          </li>
        ))}
      </ol>

      <form className="box-office__form" onSubmit={next} noValidate>
        <h3 ref={heading} tabIndex={-1} className="box-office__step-title">
          {{ session: 'Which session?', time: 'When works for you?', details: 'Who is taking class?', checkout: 'Check your ticket' }[step]}
        </h3>

        {errors.length > 1 ? <ErrorSummary errors={errors} title="A couple of things to fix" /> : null}

        {step === 'session' ? (
          services ? (
            <RadioCards
              id="booking-session"
              legend="Session"
              hideLegend
              name="session"
              columns={services.length > 1 ? 2 : 1}
              value={serviceId || undefined}
              onValueChange={setServiceId}
              error={errorFor('booking-session')}
              className="class-cards"
              options={services.map((s) => ({
                value: String(s.id),
                title: s.name,
                description: s.description || 'One-on-one with Skylar, built around your body and your goals.',
                meta: `${s.duration} min · ${money(s.price)}`,
              }))}
            />
          ) : (
            <p className="time-picker__empty" role="status">
              Loading Skylar’s sessions…
            </p>
          )
        ) : null}

        {step === 'session' ? (
          <p className="box-office__aside">
            <Star />
            <span>
              Looking for group reformer? <Link to="/contact">Get in touch</Link>.
            </span>
          </p>
        ) : null}

        {step === 'time' && service ? (
          <div className="time-picker">
            <p className="time-picker__for">
              {service.name} · {service.duration} min · {money(service.price)}
            </p>
            {!slots ? (
              <p className="time-picker__empty" role="status">
                Checking Skylar’s calendar…
              </p>
            ) : days.length ? (
              <>
                <ToggleGroup
                  id="booking-day"
                  legend="Date"
                  name="day"
                  variant="chips"
                  value={dayKey}
                  onValueChange={(v) => {
                    setDayKey(v);
                    setTime('');
                  }}
                  options={days.map((k) => ({
                    value: k,
                    label: (
                      <span className="day-chip">
                        <span className="day-chip__dow">{dayOf(k).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="day-chip__date">{dayOf(k).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </span>
                    ),
                  }))}
                />
                {dayKey ? (
                  <ToggleGroup
                    id="booking-time"
                    legend={`Open times on ${longDate(dayOf(dayKey))} (New York time)`}
                    name="time"
                    variant="chips"
                    value={time}
                    onValueChange={setTime}
                    options={slots[dayKey].map((s) => ({ value: s.time, label: clock(s.time) }))}
                  />
                ) : null}
                {errorFor('booking-time') ? <p className="form-error">{errorFor('booking-time')}</p> : null}
              </>
            ) : (
              <p className="time-picker__empty">No open times in the next three weeks. Message Skylar on Instagram and she’ll find you a spot.</p>
            )}
          </div>
        ) : null}

        {step === 'details' ? (
          <div className="details-grid">
            <Field id="booking-first" label="First name" required error={errorFor('booking-first')}>
              <Input name="given-name" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Field>
            <Field id="booking-last" label="Last name" required error={errorFor('booking-last')}>
              <Input name="family-name" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Field>
            <Field id="booking-email" label="Email" required error={errorFor('booking-email')}>
              <Input type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field id="booking-phone" label="Phone" hint="Optional, for reminders">
              <Input type="tel" name="phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
          </div>
        ) : null}

        {step === 'checkout' && service && calendarId ? (
          <>
            <Ticket className={service.name} day={new Date(time)} time={clock(time)} name={`${firstName} ${lastName}`} price={money(service.price)} />
            <div className="checkout">
              <p className="checkout__note">
                <Star /> Secure checkout by Acuity Scheduling, Skylar’s booking system. Your details are filled in; confirm and pay to
                hold your spot.
              </p>
              <iframe
                className="checkout__frame"
                src={`${checkoutUrl(service.id, calendarId, time, { firstName, lastName, email, phone })}&ref=embedded_csp`}
                title="Secure checkout for your Places, Pilates session"
                allow="payment"
              />
            </div>
          </>
        ) : null}

        {step !== 'checkout' ? (
          <div className="box-office__actions">
            {stepIndex > 0 ? (
              <button type="button" className="btn btn--outline" onClick={() => go(steps[stepIndex - 1].id)}>
                Back
              </button>
            ) : (
              <span />
            )}
            <button type="submit" className="btn btn--brick" disabled={step === 'session' && !services}>
              {step === 'details' ? 'Continue to checkout' : 'Continue'}
            </button>
          </div>
        ) : (
          <div className="box-office__actions">
            <button type="button" className="btn btn--outline" onClick={() => go('time')}>
              Pick a different time
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

/** Packs and packages from Skylar's Acuity catalog, each opening its own checkout. */
export function Packages() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('/api/acuity/catalog')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: { products: Product[] }) => setProducts(data.products))
      .catch(() => setProducts([]));
  }, []);
  if (!products.length) return null;
  const groups = [...new Set(products.map((p) => p.category))];
  return (
    <div className="packages">
      {groups.map((group) => (
        <section key={group} aria-labelledby={`pk-${group}`}>
          <h3 id={`pk-${group}`} className="packages__title">
            {group}
          </h3>
          <ul className="packages__list">
            {products
              .filter((p) => p.category === group)
              .map((p) => (
                <li key={p.id}>
                  <a href={packageUrl(p.id)} rel="noopener" className="package-card">
                    <span className="package-card__name">{p.title}</span>
                    <span className="package-card__price">{p.isSubscription ? p.subscriptionTermsText : p.formattedPrice}</span>
                    {p.description ? <span className="package-card__note">{p.description}</span> : null}
                    <span className="package-card__cta">
                      Buy <span aria-hidden="true">→</span>
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
