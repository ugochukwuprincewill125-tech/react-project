import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo theme="light" />
          <p className="footer__desc">
            Supply, importation, distribution and sales of quality
            computer, phone, networking and general technology accessories.
          </p>
          <a
            href="https://www.instagram.com/timelinegadgets/"
            target="_blank"
            rel="noreferrer"
            className="footer__social"
            aria-label="Timeline Global Systems on Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
            <span>@timelinegadgets</span>
          </a>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Shop</h4>
          <ul>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/deals">Deals</Link></li>
            <li><Link to="/brands">Brands</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Customer Service</h4>
          <ul>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/orders">Order History</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Get in Touch</h4>
          <ul className="footer__contact">
            <li><a href="tel:07032292149">0703 229 2149</a></li>
            <li><a href="tel:08063874538">0806 387 4538</a></li>
            <li><a href="tel:07014077771">0701 407 7771</a></li>
            <li><a href="mailto:timelinegadget@gmail.com">timelinegadget@gmail.com</a></li>
            <li className="footer__address">
              #17, Oremeji Street, Micro Station Plaza, Computer Village, Ikeja, Lagos.
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>&copy; {year} Timeline Global Systems Limited. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
