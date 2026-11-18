import { Link } from 'react-router-dom';
import { provisionalPricing } from '../content';
import { Note, Star } from '../components/Brand';
import { BookBand, PageHead, Placeholder } from '../components/Layout';

export function Pricing() {
  return (
    <>
      <PageHead
        kicker="Pricing & packages"
        title={
          <>
            Fair prices, <em>by design.</em>
          </>
        }
        lede="Places is built to be affordable for working performers. Single classes, packs, and private programs, with more options to come."
      />

      <section className="section pricing" aria-labelledby="pricing-title">
        <div className="wrap">
          <div className="pricing__head">
            <h2 id="pricing-title" className="section-title">
              Current rates
            </h2>
            <p className="pricing__stamp">
              <Star /> Provisional
            </p>
            <Note arrow="left" className="pricing__note-hand">
              Skylar to confirm
            </Note>
          </div>

          <div className="rate-cards">
            {provisionalPricing.map((g, gi) => (
              <section key={g.group} className={`rate-card${gi === 1 ? ' rate-card--burgundy' : ''}`} aria-labelledby={`rate-${gi}`}>
                <h3 id={`rate-${gi}`}>{g.group}</h3>
                <dl>
                  {g.items.map((item) => (
                    <div key={item.name}>
                      <dt>
                        {item.name}
                        {'note' in item && item.note ? <span className="rate-card__note">{item.note}</span> : null}
                      </dt>
                      <dd>{item.price}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <div className="future-options">
            <h3>On the drawing board</h3>
            <p>
              Room to grow: intro offers, memberships, and virtual packs can slot in here once Skylar decides on them.{' '}
              <Placeholder>Not available yet</Placeholder>
            </p>
          </div>

          <p className="pricing__note">
            <Star /> Rates shown are the latest published by the studio and may change with the rebrand.{' '}
            <Link to="/book">Book a class</Link>
          </p>
        </div>
      </section>

      <BookBand />
    </>
  );
}
