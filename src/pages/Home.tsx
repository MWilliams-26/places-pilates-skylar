import { Link } from 'react-router-dom';
import { classAction, classFormats } from '../content';
import { Highlighted, Note, Photo, Star } from '../components/Brand';
import { ConceptImage, ScriptPage, TheatreMarquee } from '../components/Collage';
import { BookBand } from '../components/Layout';

const differences = [
  { title: 'Made for working bodies', text: 'Strength, stamina, and recovery between rehearsals and shows.' },
  { title: 'Open to everyone', text: 'No headshot required. If you want to move better, there’s a place for you.' },
  { title: 'Affordable & fun', text: 'Skylar’s own words. Serious about the method, never too serious about ourselves.' },
];

const companyPhotos = [
  { src: '/images/ig/skylar-studio-tower.webp', alt: 'Skylar by the tower reformer, ready for class' },
  { src: '/images/ig/post-midday-movement.webp', alt: 'Skylar at the barre: midday movement between clients and classes' },
  { src: '/images/ig/skylar-reformer-room.webp', alt: 'Skylar between rows of reformers' },
  { src: '/images/ig/post-day-in-life.webp', alt: 'A day in the life of a freelance Pilates instructor in NYC' },
];

export function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="kicker">
              <Star /> Pilates for the performer · New York
            </p>
            <h1 id="hero-title" className="hero__title">
              Find your <Highlighted>place.</Highlighted>
            </h1>
            <p className="hero__lede">
              Reformer, mat, private, and virtual Pilates with Skylar Soehner, a dancer and certified Pilates instructor. Rooted in the performing arts, and open to anyone who wants to
              move with intention.
            </p>
            <div className="hero__actions">
              <Link to="/book" className="btn btn--brick btn--lg">
                Book a class
              </Link>
              <Link to="/about" className="btn btn--outline btn--lg">
                Meet the studio
              </Link>
            </div>
          </div>

          {/* The show and the call: the marquee announces it, the dancer picks up the phone. */}
          <div className="hero__collage">
            <TheatreMarquee className="hero__marquee" />
            <ConceptImage
              src="/images/concept-phone-dancer.webp"
              alt="a dancer on the floor, leg raised, answering a red telephone"
              width={1200}
              height={800}
              className="hero__dancer"
            />
            <Note arrow="left" className="hero__note-you">
              “this is your
              <br />
              call to places”
            </Note>
          </div>
        </div>

        <dl className="glance wrap">
          <div>
            <dt>What</dt>
            <dd>Reformer, mat, private &amp; virtual</dd>
          </div>
          <div>
            <dt>Who</dt>
            <dd>Performers, and everyone else</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>New York City</dd>
          </div>
          <div>
            <dt>How</dt>
            <dd>
              <Link to="/book">Book online</Link>
            </dd>
          </div>
        </dl>
      </section>

      <section className="section idea" aria-labelledby="idea-title">
        <div className="wrap idea__grid">
          <div className="idea__copy">
            <h2 id="idea-title" className="idea__statement">
              In the theatre, <em>“places”</em> is the last call before the curtain goes up. Here, it’s the moment you show up for
              yourself.
            </h2>
            <p className="idea__lede">
              Pilates for the performer: strength, control, and alignment for people who ask a lot of their bodies, whether that’s
              eight shows a week or a long day at a desk.
            </p>
          </div>
          <figure className="idea__media">
            <Photo src="/images/ig/skylar-mat-full.webp" alt="Skylar on the mat with both legs raised, mid-exercise" variant="tape" />
            <blockquote className="idea__quote">
              <p>“I’m looking forward to creating a community for loving our bodies and moving intentionally.”</p>
              <footer>Skylar Soehner, founder</footer>
            </blockquote>
          </figure>
        </div>
      </section>

      <section className="section why" aria-labelledby="why-title">
        <div className="wrap">
          <h2 id="why-title" className="sr-only">
            Why Places
          </h2>
          <ol className="differences">
            {differences.map((d) => (
              <li key={d.title}>
                <span className="differences__badge" aria-hidden="true">
                  <Star />
                </span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section audience" aria-labelledby="audience-title">
        <div className="wrap">
          <h2 id="audience-title" className="sr-only">
            Who it’s for
          </h2>
          <div className="audience__grid">
            <article className="audience-card audience-card--burgundy">
              <figure className="audience-card__media">
                <img src="/images/stock-performers.webp" alt="Dancers rehearsing together in a studio" width={1000} height={625} loading="lazy" />
                <figcaption className="concept__tag concept__tag--end">Stock photo</figcaption>
              </figure>
              <div>
                <p className="kicker kicker--light">For performers</p>
                <h3>Dancers, singers, actors, and crew.</h3>
                <p>The conditioning behind the choreography, and the reset after it.</p>
              </div>
            </article>
            <article className="audience-card audience-card--blush">
              <figure className="audience-card__media">
                <img src="/images/stock-reformer.webp" alt="A smiling woman on a reformer, holding a small ball" width={1000} height={625} loading="lazy" />
                <figcaption className="concept__tag concept__tag--end">Stock photo</figcaption>
              </figure>
              <div>
                <p className="kicker">For everyone else</p>
                <h3>First-timers, regulars, and the curious.</h3>
                <p>You don’t need a stage to take class. Come as you are.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section program" aria-labelledby="program-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">
                <Star /> On the program
              </p>
              <h2 id="program-title" className="section-title">
                Four ways to take class
              </h2>
            </div>
            <Link to="/classes" className="text-link">
              All class details <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="index-cards">
            {classFormats.map((c, i) => (
              <li key={c.id} className="index-card" style={{ ['--tilt' as string]: `${[-1.2, 0.8, -0.6, 1][i]}deg` }}>
                <span className="index-card__tape" aria-hidden="true" />
                <p className="index-card__meta">
                  <span>{c.kind}</span>
                  <span>{c.duration ?? 'Length TBC'}</span>
                </p>
                <h3>{c.name}</h3>
                <p>{c.summary}</p>
                <Link to={classAction(c).href} className="index-card__link">
                  {classAction(c).label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section founder-teaser" aria-labelledby="founder-title">
        <div className="wrap founder-teaser__grid">
          <div className="founder-teaser__media">
            <ScriptPage className="founder-teaser__script" />
            <Photo
              src="/images/ig/skylar-portrait.webp"
              alt="Skylar holding the binder for her company, For The Theatre Pilates LLC"
              variant="print"
              caption="Founding day"
              className="founder-teaser__photo"
            />
          </div>
          <div>
            <p className="kicker">
              <Star /> The founder
            </p>
            <h2 id="founder-title" className="section-title">
              Skylar Soehner
            </h2>
            <p className="founder-teaser__lede">
              Skylar founded Places, Pilates to give performers a Pilates practice that speaks their language, and to build a
              community around it.
            </p>
            <Link to="/about" className="btn btn--outline">
              Read Skylar’s story
            </Link>
          </div>
        </div>
      </section>

      <section className="company" aria-labelledby="company-title">
        <div className="wrap company__head">
          <div>
            <p className="kicker">
              <Star /> Community
            </p>
            <h2 id="company-title" className="section-title">
              Pilates that feels like company class.
            </h2>
          </div>
          <p>
            The warm-up a dance company takes together before every show: focused, social, and a little bit joyful.{' '}
            <Link to="/community" className="text-link">
              Meet the community
            </Link>
          </p>
        </div>
        <ul className="company__strip" aria-label="Photos from @placespilates">
          {companyPhotos.map((p, i) => (
            <li key={p.src} style={{ ['--tilt' as string]: `${[-2, 1.5, -1, 2][i]}deg` }}>
              <Photo src={p.src} alt={p.alt} variant={i % 2 ? 'tape' : 'print'} />
            </li>
          ))}
        </ul>
      </section>

      <BookBand />
    </>
  );
}
