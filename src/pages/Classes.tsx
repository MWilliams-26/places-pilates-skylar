import { Link } from 'react-router-dom';
import { classAction, classFormats } from '../content';
import { Photo, Star } from '../components/Brand';

const photos = [
  { src: '/images/ig/skylar-reformer-room.webp', alt: 'Skylar between rows of reformers in a studio' },
  { src: '/images/ig/skylar-mat.webp', alt: 'Skylar teaching mat Pilates on the floor' },
  { src: '/images/ig/skylar-on-reformer.webp', alt: 'Skylar in a standing split on a reformer' },
  { src: '/images/ig/skylar-ball.webp', alt: 'Skylar holding a Pilates ball, ready to teach' },
];
import { BookBand, PageHead, Placeholder } from '../components/Layout';

export function Classes() {
  return (
    <>
      <PageHead
        kicker="Classes"
        title={
          <>
            Group, private, or virtual. <em>All of them welcome you.</em>
          </>
        }
        lede="Every format works on the same things: strength from the center, control, and alignment. Pick the one that fits your body and your week."
      />

      <section className="section class-list" aria-label="Class formats">
        <div className="wrap">
          {classFormats.map((c, i) => (
            <article key={c.id} id={c.id} className={`class-feature${i % 2 ? ' class-feature--flip' : ''}`} aria-labelledby={`${c.id}-title`}>
              <Photo {...photos[i]} variant={(['tape', 'torn', 'arch', 'print'] as const)[i]} className="class-feature__photo" />
              <div className="class-feature__copy">
                <p className="class-feature__no">
                  No. {i + 1} · {c.kind}
                </p>
                <h2 id={`${c.id}-title`} className="section-title">
                  {c.name}
                </h2>
                <p className="class-feature__summary">{c.summary}</p>
                <dl className="facts facts--compact">
                  <div>
                    <dt>Length</dt>
                    <dd>{c.duration ?? <Placeholder>To confirm</Placeholder>}</dd>
                  </div>
                  <div>
                    <dt>Level</dt>
                    <dd>
                      <Placeholder>To confirm</Placeholder>
                    </dd>
                  </div>
                  <div>
                    <dt>Good for</dt>
                    <dd>{c.goodFor}</dd>
                  </div>
                </dl>
                <h3 className="class-feature__subhead">What to expect</h3>
                <ul className="star-list">
                  {c.expect.map((e) => (
                    <li key={e}>
                      <Star /> {e}
                    </li>
                  ))}
                </ul>
                <Link to={classAction(c).href} className="btn btn--brick">
                  {classAction(c).label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section first-class" aria-labelledby="first-title">
        <div className="wrap first-class__inner">
          <h2 id="first-title" className="section-title">
            Your first class
          </h2>
          <ol className="steps-list">
            <li>
              <h3>Book online</h3>
              <p>Choose a class and a time that suits you.</p>
            </li>
            <li>
              <h3>Tell Skylar about you</h3>
              <p>Mention injuries, goals, or a show you’re in when you book.</p>
            </li>
            <li>
              <h3>Arrive and take your place</h3>
              <p>
                <Placeholder>Arrival time, what to wear, and grip-sock policy to confirm</Placeholder>
              </p>
            </li>
          </ol>
        </div>
      </section>

      <BookBand />
    </>
  );
}
