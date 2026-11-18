import { Link } from 'react-router-dom';
import { instagramPosts, links } from '../content';
import { Monogram, Note, Photo, Star } from '../components/Brand';
import { BookBand, PageHead } from '../components/Layout';

const kindLabel = { photo: 'Photo', carousel: 'Carousel', reel: 'Reel' } as const;

export function Community() {
  return (
    <>
      <PageHead
        kicker="Community"
        title={
          <>
            Where the stage door <em>meets the studio.</em>
          </>
        }
        lede="Places brings together people who move for a living and people who simply love to move. Same class, same warm-up, same company."
      />

      <section className="section community" aria-labelledby="company-class">
        <div className="wrap community__grid">
          <div className="community__collage">
            <Photo src="/images/ig/skylar-studio-peace.webp" alt="Skylar throwing a peace sign in the studio" variant="print" className="community__photo-a" />
            <Photo src="/images/ig/skylar-studio-tee.webp" alt="Skylar in the studio with a green juice" variant="tape" className="community__photo-b" />
            <Note arrow="down" className="community__note">
              like company class
            </Note>
          </div>
          <div>
            <h2 id="company-class" className="section-title">
              Like company class, for everyone
            </h2>
            <p className="community__lede">
              Dancers start every show day with company class: the whole cast warming up together. Places brings that feeling to Pilates.
            </p>
            <ul className="star-list">
              <li>
                <Star /> Built by a dancer, for performers of every kind
              </li>
              <li>
                <Star /> Open to first-timers and lifelong movers alike
              </li>
              <li>
                <Star /> Mat Pilates pop-ups announced on Instagram
              </li>
              <li>
                <Star /> The weekly schedule goes out to the email list every Thursday
              </li>
            </ul>
            <Link to="/classes" className="btn btn--outline">
              See the classes
            </Link>
          </div>
        </div>
      </section>

      <section className="section feed" aria-labelledby="feed-title">
        <div className="wrap feed__layout">
          <div className="feed__intro">
            <p className="kicker">
              <Star /> Follow along
            </p>
            <h2 id="feed-title" className="section-title">
              @placespilates
            </h2>
            <p>Class drops, schedules, hot takes, and a day in the life of a freelance Pilates instructor in NYC.</p>
            <a href={links.instagram} rel="noopener" className="btn btn--brick">
              Follow on Instagram
            </a>
          </div>

          <div className="phone" aria-hidden="true">
            <div className="phone__screen">
              <div className="phone__profile">
                <img src="/images/ig/skylar-portrait.webp" alt="" width={800} height={1000} />
                <div>
                  <strong>placespilates</strong>
                  <span>Pilates for the Performer 🪩</span>
                  <span>Athletes on and off stage</span>
                </div>
              </div>
              <div className="phone__grid">
                {instagramPosts.slice(0, 6).map((p) => (
                  <img key={p.id} src={p.image} alt="" width={700} height={875} loading="lazy" />
                ))}
              </div>
            </div>
            <Monogram className="phone__p" />
          </div>
        </div>

        <ul className="wrap feed__grid" aria-label="Recent posts from @placespilates">
          {instagramPosts.slice(0, 4).map((p, i) => (
            <li key={p.id} style={{ ['--tilt' as string]: `${[-1.5, 1, -0.5, 1.5][i % 4]}deg` }}>
              <a href={`https://www.instagram.com/p/${p.id}/`} rel="noopener" className="post-card">
                <span className="post-card__image">
                  <img src={p.image} alt={p.alt} width={700} height={875} loading="lazy" decoding="async" />
                  <span className="post-card__kind">{kindLabel[p.kind]}</span>
                </span>
                <span className="post-card__caption">{p.caption}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="wrap feed__more">
          <a href={links.instagram} rel="noopener" className="btn btn--brick btn--lg">
            See more on Instagram
          </a>
        </p>
      </section>

      <BookBand title="Join the company." />
    </>
  );
}
