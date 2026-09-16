import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './Account.css';

const LINKS = [
  { to: '/orders', label: 'Order History', desc: 'View past and current orders.' },
  { to: '/wishlist', label: 'Wishlist', desc: 'Products you have saved.' },
  { to: '/cart', label: 'Cart', desc: 'Items currently in your cart.' },
];

function Account() {
  return (
    <>
      <PageHeader kicker="Account" title="My Account" />
      <section className="section">
        <div className="container">
          
          <div className="account__grid">
            {LINKS.map((link) => (
              <Link to={link.to} className="account__card tick-corner" key={link.to}>
                <h3>{link.label}</h3>
                <p>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Account;
