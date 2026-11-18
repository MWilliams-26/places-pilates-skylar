import { forwardRef, useLayoutEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { LinkProvider, SiteHeader, useNavigationFocus, type LinkComponentProps } from '@mwilliams/ui';
import { features, nav } from './content';
import { Wordmark } from './components/Brand';
import { Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Classes } from './pages/Classes';
import { Book } from './pages/Book';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Community } from './pages/Community';
import { Studio } from './pages/Studio';

const RouterLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(({ href, ...props }, ref) => <Link ref={ref} to={href} {...props} />);

export default function App() {
  const location = useLocation();
  useNavigationFocus(location);
  useLayoutEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <LinkProvider component={RouterLink}>
      <SiteHeader
        className="site-header"
        brand={{ label: 'Places, Pilates', href: '/', logo: <Wordmark className="site-header__wordmark" /> }}
        items={features.studioInNav ? [...nav, { label: 'Studio', href: '/studio' }] : nav}
        currentPath={location.pathname}
        actions={
          <Link to="/book" className="btn btn--brick">
            Book a class
          </Link>
        }
        menuLabel="Menu"
        collapseBelow="lg"
      />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/book" element={<Book />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </LinkProvider>
  );
}
