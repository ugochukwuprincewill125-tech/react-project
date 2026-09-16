import { Link } from 'react-router-dom';
import './PromoBanner.css';

function PromoBanner() {
  return (
    <section className="promo">
      <div className="container promo__inner">
        <div>
          <span className="section-kicker promo__kicker">Limited-time</span>
          <h2 className="promo__headline">Deals you don't want to miss.</h2>
          <p className="promo__sub">Quality gadgets. Better prices.</p>
        </div>
        <Link to="/deals" className="btn btn-primary">Shop Deals</Link>
      </div>
    </section>
  );
}

export default PromoBanner;
