import Icon from './Icon';
import './TrustSection.css';

const POINTS = [
  { icon: 'shield', title: 'Quality Products', text: 'Original, reliable gadgets sourced with care.' },
  { icon: 'power', title: 'Competitive Prices', text: 'Fair pricing across our full accessory range.' },
  { icon: 'headset', title: 'Excellent Customer Service', text: 'Real support before and after you buy.' },
  { icon: 'router', title: 'Nationwide Delivery', text: 'We get your order to you, wherever you are.' },
];

function TrustSection() {
  return (
    <section className="section trust">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Why Timeline</span>
            <h2>Built for the way you buy technology.</h2>
          </div>
        </div>
        <div className="trust__grid">
          {POINTS.map((point) => (
            <div className="trust__item" key={point.title}>
              <span className="trust__icon"><Icon name={point.icon} size={24} /></span>
              <h3 className="trust__title">{point.title}</h3>
              <p className="trust__text">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
