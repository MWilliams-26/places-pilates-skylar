import { useState, type FormEvent } from 'react';
import { Field, Input, StatusMessage } from '@mwilliams/ui';
import { Frame, Star } from '../components/Brand';
import { PageHead, Placeholder } from '../components/Layout';

const modules = [
  { title: 'Location & directions', body: 'Address, map, nearest subway lines, and entry instructions.' },
  { title: 'The space', body: 'Photography of the studio, the reformers, and the changing area.' },
  { title: 'Weekly schedule', body: 'The live class timetable from the booking platform.' },
  { title: 'Instructors', body: 'Profiles for Skylar and any teachers who join her.' },
  { title: 'Studio policies', body: 'Arrival, cancellations, waitlists, and studio etiquette.' },
  { title: 'Events & workshops', body: 'Community programming, workshops, and special classes.' },
];

/**
 * Future studio page. Not linked from the navigation until Skylar secures a
 * space (features.studioInNav); until then it is a preview of the structure.
 */
export function Studio() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter an email like name@example.com.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <>
      <p className="preview-banner">
        <Star /> Preview page: this goes live only once Places has a permanent home. No address or opening date is implied.
      </p>
      <PageHead
        kicker="The studio"
        title={
          <>
            A home for <em>Places.</em>
          </>
        }
        lede="When the doors open, this page becomes the guide to the studio: where it is, what it looks like, and how to get the most out of it."
      />

      <section className="section studio-plan" aria-labelledby="studio-modules">
        <div className="wrap">
          <h2 id="studio-modules" className="section-title">
            What this page will hold
          </h2>
          <ul className="module-grid">
            {modules.map((m, i) => (
              <li key={m.title}>
                <span className="module-grid__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                <Placeholder>Ready when the studio is</Placeholder>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section interest" aria-labelledby="interest-title">
        <div className="wrap interest__grid">
          <Frame label="The studio, opening day" variant="tape" tone="salmon" className="interest__photo" />
          <div>
            <p className="tag">
              <Star /> Proposed: launch interest list
            </p>
            <h2 id="interest-title" className="section-title">
              Be the first to know
            </h2>
            <p>Get studio news and opening announcements by email. No commitment, no payment.</p>
            {sent ? (
              <StatusMessage tone="success" title="You’re on the list (prototype)">
                In the live site, {email} would be added to the studio’s mailing list. This preview stored nothing.
              </StatusMessage>
            ) : (
              <form className="interest__form" onSubmit={submit} noValidate>
                <Field id="interest-email" label="Email" required error={error || undefined}>
                  <Input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Field>
                <button type="submit" className="btn btn--brick">
                  Keep me posted
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
