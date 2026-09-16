import { Link } from 'react-router-dom';
import './Logo.css';

// Placeholder wordmark. Replace with the official Timeline Global Systems
// logo file (e.g. <img src="/logo.svg" alt="Timeline Global Systems" />)
// as soon as it's supplied — this component is the only place to change.
function Logo({ theme = 'dark' }) {
  return (
    <Link to="/" className={`logo logo--${theme}`} aria-label="Timeline Global Systems Limited, home">
      <span className="logo__mark">TG</span>
      <span className="logo__text">
        <span className="logo__name">TIMELINE GLOBAL SYSTEMS</span>
        <span className="logo__tagline">Home of Quality Gadgets</span>
      </span>
    </Link>
  );
}

export default Logo;
