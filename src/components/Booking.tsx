import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { ErrorSummary, Field, Input, RadioCards, StatusMessage, Textarea, ToggleGroup, type FormErrorItem } from '@mwilliams/ui';
import { classFormats } from '../content';
import { Star } from './Brand';

type Step = 'class' | 'time' | 'details' | 'review' | 'done';
const steps: { id: Exclude<Step, 'done'>; label: string }[] = [
  { id: 'class', label: 'Class' },
  { id: 'time', label: 'Time' },
  { id: 'details', label: 'Details' },
  { id: 'review', label: 'Review' },
];

const intents = ['Performer', 'Dancer', 'Athlete', 'New to Pilates', 'Coming back from injury', 'Just here to move'];

/** Placeholder times so the flow can be clicked through. The real schedule comes from the studio's booking system. */
function sampleTimes(date: Date) {
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  return weekend ? ['9:00 AM', '10:30 AM', '12:00 PM'] : ['7:30 AM', '12:15 PM', '6:00 PM', '7:30 PM'];
}

function upcomingDays(count: number) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1));
}

const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const longDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

function toIcs(className: string, day: Date, time: string, minutes: number) {
  const [clock, meridiem] = time.split(' ');
  const [h, m] = clock.split(':').map(Number);
  const start = new Date(day);
  start.setHours((h % 12) + (meridiem === 'PM' ? 12 : 0), m);
  const end = new Date(start.getTime() + minutes * 60_000);
  const stamp = (d: Date) => `${isoDay(d).replaceAll('-', '')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Places Pilates//Demo//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@places-pilates-demo`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${className} — Places, Pilates (demo)`,
    'DESCRIPTION:Sample booking from the Places, Pilates website concept. No class was booked.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/** Illustrative booking flow. `initialClass` (from a class's Book link) skips straight to picking a time. */
export function Booking({ initialClass }: { initialClass?: string }) {
  const known = classFormats.some((c) => c.id === initialClass) ? initialClass! : '';
  const [step, setStep] = useState<Step>(known ? 'time' : 'class');
  const [classId, setClassId] = useState(known);
  const [dayIso, setDayIso] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [why, setWhy] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrorItem[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const days = useMemo(() => upcomingDays(14), []);
  const day = days.find((d) => isoDay(d) === dayIso);
  const chosen = classFormats.find((c) => c.id === classId);
  const errorFor = (id: string) => errors.find((e) => e.id === id)?.message;

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (moved.current) heading.current?.focus({ preventScroll: true });
    moved.current = true;
  }, [step]);

  const go = (next: Step) => {
    setErrors([]);
    setStep(next);
  };

  const validate = (event: FormEvent) => {
    event.preventDefault();
    const found: FormErrorItem[] = [];
    if (step === 'class' && !classId) found.push({ id: 'booking-class', message: 'Choose a class to continue.' });
    if (step === 'time') {
      if (!dayIso) found.push({ id: 'booking-day', message: 'Choose a date.' });
      else if (!time) found.push({ id: 'booking-time', message: 'Choose a time.' });
    }
    if (step === 'details') {
      if (!name.trim()) found.push({ id: 'booking-name', message: 'Enter your name.' });
      if (!email.trim()) found.push({ id: 'booking-email', message: 'Enter your email so the studio can confirm.' });
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.push({ id: 'booking-email', message: 'Enter an email like name@example.com.' });
    }
    setErrors(found);
    if (found.length) return;
    go(({ class: 'time', time: 'details', details: 'review', review: 'done' } as const)[step as Exclude<Step, 'done'>]);
  };

  const reset = () => {
    setDayIso('');
    setTime('');
    setWhy([]);
    setNotes('');
    go('class');
  };

  const stepIndex = steps.findIndex((s) => s.id === step);
  const minutes = chosen?.duration ? parseInt(chosen.duration, 10) : 50;

  return (
        <div className="box-office">
          <p className="box-office__demo">
            <strong>Prototype.</strong> Sample times only. Nothing is booked and no payment is taken.
          </p>

          {step !== 'done' ? (
            <>
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

              <form className="box-office__form" onSubmit={validate} noValidate>
                <h3 ref={heading} tabIndex={-1} className="box-office__step-title">
                  {
                    {
                      class: 'Which class?',
                      time: 'When works for you?',
                      details: 'Who is taking class?',
                      review: 'Check your ticket',
                    }[step]
                  }
                </h3>

                {errors.length > 1 ? <ErrorSummary errors={errors} title="A couple of things to fix" /> : null}

                {step === 'class' ? (
                  <RadioCards
                    id="booking-class"
                    legend="Class"
                    hideLegend
                    name="class"
                    columns={3}
                    value={classId || undefined}
                    onValueChange={setClassId}
                    error={errorFor('booking-class')}
                    className="class-cards"
                    options={classFormats.map((c) => ({
                      value: c.id,
                      title: c.name,
                      description: c.summary,
                      meta: c.duration ?? 'Length TBC',
                    }))}
                  />
                ) : null}

                {step === 'time' ? (
                  <div className="time-picker">
                    <p className="time-picker__for">
                      {chosen?.name}
                      {chosen?.duration ? ` · ${chosen.duration}` : ''}
                    </p>
                    <ToggleGroup
                      id="booking-day"
                      legend="Date"
                      name="day"
                      variant="chips"
                      value={dayIso}
                      onValueChange={(v) => {
                        setDayIso(v);
                        setTime('');
                      }}
                      options={days.map((d) => ({
                        value: isoDay(d),
                        label: (
                          <span className="day-chip">
                            <span className="day-chip__dow">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span className="day-chip__date">{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </span>
                        ),
                      }))}
                    />
                    {errorFor('booking-day') ? <p className="form-error">{errorFor('booking-day')}</p> : null}
                    {day ? (
                      <ToggleGroup
                        id="booking-time"
                        legend={`Sample times for ${longDate(day)}`}
                        name="time"
                        variant="chips"
                        value={time}
                        onValueChange={setTime}
                        options={sampleTimes(day).map((t) => ({ value: t, label: t }))}
                      />
                    ) : (
                      <p className="time-picker__empty">Choose a date to see times.</p>
                    )}
                    {errorFor('booking-time') ? <p className="form-error">{errorFor('booking-time')}</p> : null}
                  </div>
                ) : null}

                {step === 'details' ? (
                  <div className="details-grid">
                    <Field id="booking-name" label="Name" required error={errorFor('booking-name')}>
                      <Input name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Field>
                    <Field id="booking-email" label="Email" required error={errorFor('booking-email')}>
                      <Input type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Field>
                    <Field id="booking-phone" label="Phone" hint="Optional">
                      <Input type="tel" name="phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Field>
                    <ToggleGroup
                      type="multiple"
                      legend="What brings you in?"
                      name="why"
                      variant="chips"
                      size="sm"
                      value={why}
                      onValueChange={setWhy}
                      options={intents.map((i) => ({ value: i, label: i }))}
                      className="details-grid__wide"
                    />
                    <Field id="booking-notes" label="Anything Skylar should know?" hint="Injuries, goals, or a show you're in." className="details-grid__wide">
                      <Textarea name="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </Field>
                  </div>
                ) : null}

                {step === 'review' && chosen && day ? <Ticket className={chosen.name} day={day} time={time} name={name} /> : null}

                <div className="box-office__actions">
                  {stepIndex > 0 ? (
                    <button type="button" className="btn btn--outline" onClick={() => go(steps[stepIndex - 1].id)}>
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button type="submit" className="btn btn--brick">
                    {step === 'review' ? 'Confirm booking (demo)' : 'Continue'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="box-office__done">
              <h3 ref={heading} tabIndex={-1} className="box-office__step-title">
                You're on the call sheet.
              </h3>
              {chosen && day ? <Ticket className={chosen.name} day={day} time={time} name={name} stamped /> : null}
              <StatusMessage tone="success" title="Demo booking complete">
                In the live site, the studio's booking system would confirm by email at {email}. This preview did not book a class.
              </StatusMessage>
              <div className="box-office__actions">
                <a
                  className="btn btn--outline"
                  download="places-pilates-demo.ics"
                  href={chosen && day ? `data:text/calendar;charset=utf-8,${encodeURIComponent(toIcs(chosen.name, day, time, minutes))}` : undefined}
                >
                  Add to calendar
                </a>
                <button type="button" className="btn btn--brick" onClick={reset}>
                  Book another class
                </button>
              </div>
            </div>
          )}
        </div>
  );
}

export function Ticket({
  className,
  day,
  time,
  name,
  price = 'Set by the studio',
  stamped = false,
}: {
  className: string;
  day: Date;
  time: string;
  name: string;
  price?: string;
  stamped?: boolean;
}) {
  return (
    <div className={`ticket${stamped ? ' is-stamped' : ''}`}>
      <div className="ticket__stub" aria-hidden="true">
        <span>Admit one</span>
      </div>
      <dl className="ticket__main">
        <div className="ticket__show">
          <dt className="sr-only">Class</dt>
          <dd>{className}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{longDate(day)}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{time}</dd>
        </div>
        <div>
          <dt>Name</dt>
          <dd>{name}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{price}</dd>
        </div>
      </dl>
      {stamped ? (
        <span className="ticket__stamp" aria-hidden="true">
          <Star /> Places! <Star />
        </span>
      ) : null}
    </div>
  );
}
