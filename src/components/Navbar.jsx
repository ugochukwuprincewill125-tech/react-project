import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/brands', label: 'Brands' },
  { to: '/deals', label: 'Deals' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Logo theme="dark" />

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__search">
          <SearchBar />
        </div>

        <div className="navbar__actions">
          <NavLink to="/account" className="navbar__icon-link" aria-label="My account">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
              <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </NavLink>

          <NavLink to="/wishlist" className="navbar__icon-link" aria-label={`Wishlist, ${wishlistCount} items`}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20s-7.2-4.4-9.5-8.8C.8 7.8 2.6 4.5 6 4c2-.3 3.7.7 6 3 2.3-2.3 4-3.3 6-3 3.4.5 5.2 3.8 3.5 7.2C19.2 15.6 12 20 12 20z"
                stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
              />
            </svg>
            {wishlistCount > 0 && <span className="navbar__badge">{wishlistCount}</span>}
          </NavLink>

          <NavLink to="/cart" className="navbar__icon-link" aria-label={`Cart, ${itemCount} items`}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path d="M3 4h2l1.4 11.2A2 2 0 0 0 8.4 17h8.2a2 2 0 0 0 2-1.6L20 7H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" />
              <circle cx="16.5" cy="20.5" r="1.4" fill="currentColor" />
            </svg>
            {itemCount > 0 && <span className="navbar__badge">{itemCount}</span>}
          </NavLink>

          <button
            className="navbar__hamburger"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-header">
          <Logo theme="dark" />
          <button className="navbar__mobile-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            &times;
          </button>
        </div>
        <div className="navbar__mobile-search">
          <SearchBar variant="mobile" onSubmitSearch={() => setIsMenuOpen(false)} />
        </div>
        <nav className="navbar__mobile-links" aria-label="Mobile primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="navbar__mobile-footer">
          <NavLink to="/account" onClick={() => setIsMenuOpen(false)} className="navbar__mobile-pill">Account</NavLink>
          <NavLink to="/wishlist" onClick={() => setIsMenuOpen(false)} className="navbar__mobile-pill">Wishlist ({wishlistCount})</NavLink>
          <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className="navbar__mobile-pill navbar__mobile-pill--accent">Cart ({itemCount})</NavLink>
        </div>
      </div>

      {isMenuOpen && <button className="navbar__scrim" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />}
    </header>
  );
}

export default Navbar;
