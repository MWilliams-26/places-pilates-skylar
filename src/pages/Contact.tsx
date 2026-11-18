import { Accordion } from '@mwilliams/ui';
import { Link } from 'react-router-dom';
import { links } from '../content';
import { Note, Photo, Star } from '../components/Brand';
import { PageHead, Placeholder } from '../components/Layout';

const faqs = [
  {
    id: 'performer',
    title: 'Do I need to be a performer?',
    content: <p>No. Places is built around performers, and everyone is welcome. If you want to move better and feel stronger, come take class.</p>,
  },
  {
    id: 'new',
    title: 'I’ve never done Pilates. Can I come?',
    content: (
      <p>
        Yes. Tell Skylar it’s your first time when you book. <Placeholder>Beginner guidance and class levels to confirm</Placeholder>
      </p>
    ),
  },
  {
    id: 'where',
    title: 'Where is the studio?',
    content: (
      <p>
        Classes run in New York City while Skylar searches for a permanent home for Places.{' '}
        <Placeholder>Current class locations to confirm</Placeholder>
      </p>
    ),
  },
  {
    id: 'wear',
    title: 'What should I wear or bring?',
    content: (
      <p>
        <Placeholder>To confirm with Skylar (clothing, grip socks, water)</Placeholder>
      </p>
    ),
  },
  {
    id: 'book',
    title: 'How do I book?',
    content: (
      <p>
        Online, on the <Link to="/book">Schedule</Link> page.
      </p>
    ),
  },
  {
    id: 'virtual',
    title: 'Can I take class if I’m not in New York?',
    content: <p>Yes. Virtual sessions are live, one-on-one, and work from anywhere with a little floor space.</p>,
  },
  {
    id: 'cancel',
    title: 'What if I need to cancel?',
    content: (
      <p>
        <Placeholder>Cancellation and late-arrival policy to confirm</Placeholder>
      </p>
    ),
  },
];

export function Contact() {
  return (
    <>
      <PageHead
        kicker="Contact & FAQ"
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
        lede="The practical stuff, before your first class."
      />

      <section className="section faq" aria-labelledby="faq-title">
        <div className="wrap faq__grid">
          <div>
            <h2 id="faq-title" className="sr-only">
              Frequently asked questions
            </h2>
            <Accordion items={faqs} variant="lines" className="faq__list" />
          </div>
          <aside className="contact-card" aria-labelledby="contact-title">
            <Photo src="/images/ig/skylar-portrait.webp" alt="Skylar Soehner, smiling" variant="print" className="contact-card__photo" />
            <h2 id="contact-title" className="live-booking__title">
              Say hello
            </h2>
            <p>Questions about classes, privates, or pop-ups? Skylar answers every message herself.</p>
            <p className="contact-card__actions">
              <a href={`mailto:${links.email}`} className="btn btn--brick">
                Email Skylar
              </a>
              <a href={links.instagram} rel="noopener" className="btn btn--outline">
                Instagram
              </a>
            </p>
            <dl className="contact-list">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${links.email}`} className="contact-list__email">
                    {links.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={links.instagram} rel="noopener">
                    @placespilates
                  </a>
                </dd>
              </div>
              <div>
                <dt>Book</dt>
                <dd>
                  <Link to="/book">See open times</Link>
                </dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>New York City</dd>
              </div>
            </dl>
            <Note arrow="left" className="contact-card__note">
              say hi!
            </Note>
          </aside>
        </div>
        <p className="wrap faq__draft">
          <Star /> Draft answers for Skylar to review.
        </p>
      </section>

    </>
  );
}
