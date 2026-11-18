import { Note, Photo, Star } from '../components/Brand';
import { BookBand, PageHead, Placeholder } from '../components/Layout';
import { links } from '../content';

const post = (id: string) => `https://www.instagram.com/p/${id}/`;

/** Her answers, quoted from her own posts (capitalization tidied). */
const interview = [
  {
    q: 'Why a studio for performers?',
    a: 'Once I started teaching Pilates, I realized there was a need for performer-specific fitness spaces. An “all levels” class wasn’t going to benefit the performer doing eight shows a week.',
    source: 'Dd4zqNAFLVq',
  },
  {
    q: 'What has stayed the same through every job?',
    a: 'My love of people. My love of movement. Watching clients learn what their bodies are capable of, building confidence in themselves, and making lifelong friendships.',
    source: 'Ddjx56AFLwG',
  },
  {
    q: 'Hills you’ll die on as an instructor?',
    a: 'Barefoot over grip socks. Strength training should be your priority, especially as women. And if your client is moving safely and feels good, you’ve done your job.',
    source: 'Dej6S-slMvp',
  },
];

const story = [
  {
    src: '/images/ig/story-dance.webp',
    alt: 'Young Skylar mid-leap in a split jump at a dance competition',
    title: 'Before Pilates, there was dance',
    text: 'A competitive dancer from age 4 to 16, Skylar graduated high school a year early and moved to New York for school.',
  },
  {
    src: '/images/ig/skylar-on-reformer.webp',
    alt: 'Skylar in a standing split on a reformer',
    title: 'Every side of the studio',
    text: 'Front desk, operations, general manager, then instructor: franchises, corporate gyms, boutique studios, privates, and group classes. She earned her first certification in 2023 and is still studying.',
  },
  {
    src: '/images/ig/story-performer-space.webp',
    alt: 'A dancer performing in a rehearsal studio under stage lights',
    title: 'A place for performers',
    text: 'Teaching showed her the gap: performers need Pilates built around their bodies and their schedules. Places, Pilates is that space.',
  },
];

export function About() {
  return (
    <>
      <PageHead
        kicker="About Skylar"
        title={
          <>
            A dancer who found Pilates, <em>and built a place for it.</em>
          </>
        }
      />

      <section className="section about" aria-labelledby="about-founder">
        <div className="wrap about__grid">
          <div className="about__media">
            <Photo src="/images/ig/skylar-portrait.webp" alt="Skylar smiling, holding her For The Theatre Pilates LLC binder" variant="arch" />
            <Photo src="/images/ig/skylar-studio.webp" alt="Skylar in a reformer studio" variant="tape" className="about__media-second" />
            <Note arrow="up" className="about__note">
              founder &amp; instructor
            </Note>
          </div>
          <div className="about__copy">
            <h2 id="about-founder" className="section-title">
              Skylar Soehner
            </h2>
            <p className="about__lede">
              A dancer since age four, Skylar discovered what Pilates could do for strength, flexibility, and overall well-being, and
              became a certified Pilates instructor and personal trainer.
            </p>
            <p>
              She started teaching as Pilates with Skylar, offering personalized instruction tailored to each client’s needs and goals.
              Places, Pilates is the next chapter: Pilates for the performer, and a community for loving our bodies and moving
              intentionally.
            </p>
            <blockquote className="pull-quote">
              <p>“Everyone deserves to feel good in their body.”</p>
              <footer>Skylar Soehner</footer>
            </blockquote>

            <h3 className="about__subhead">In brief</h3>
            <dl className="facts">
              <div>
                <dt>Role</dt>
                <dd>Founder &amp; certified Pilates instructor</dd>
              </div>
              <div>
                <dt>Background</dt>
                <dd>Competitive dancer, ages 4 to 16</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>New York City</dd>
              </div>
              <div>
                <dt>Certification</dt>
                <dd>
                  First certified in 2023 · <Placeholder>Program to confirm</Placeholder>
                </dd>
              </div>
              <div>
                <dt>Dance training &amp; credits</dt>
                <dd>
                  <Placeholder>To be supplied by Skylar</Placeholder>
                </dd>
              </div>
              <div>
                <dt>Follow</dt>
                <dd>
                  <a href={links.instagram} rel="noopener">
                    @placespilates
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section story" aria-labelledby="story-title">
        <div className="wrap">
          <p className="kicker">
            <Star /> Her story
          </p>
          <h2 id="story-title" className="section-title">
            From the wings <em>to the reformer.</em>
          </h2>
          <ol className="story__list">
            {story.map((item, i) => (
              <li key={item.title} style={{ ['--tilt' as string]: `${[-2, 1.5, -1][i]}deg` }}>
                <Photo src={item.src} alt={item.alt} variant={i === 1 ? 'tape' : 'print'} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section interview" aria-labelledby="interview-title">
        <div className="wrap interview__inner">
          <p className="kicker">
            <Star /> The interview
          </p>
          <h2 id="interview-title" className="section-title">
            In her own words
          </h2>
          <p className="interview__intro">Answers quoted from Skylar’s posts on @placespilates.</p>
          <ol className="interview__list">
            {interview.map((item) => (
              <li key={item.q}>
                <h3>{item.q}</h3>
                <p>“{item.a}”</p>
                <a className="text-link text-link--light" href={post(item.source)} rel="noopener">
                  Read the post <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section name-story" aria-labelledby="name-title">
        <div className="wrap name-story__grid">
          <h2 id="name-title" className="idea__statement">
            Why <em>“Places”</em>?
          </h2>
          <div>
            <p>
              Before a show, the stage manager calls the time down to the curtain. The last call is <q>places</q>: everyone stops what
              they’re doing and steps into position.
            </p>
            <p>Every class here is that moment. Phone down, feet on the bar, and full attention on your body.</p>
          </div>
        </div>
      </section>

      <BookBand />
    </>
  );
}
