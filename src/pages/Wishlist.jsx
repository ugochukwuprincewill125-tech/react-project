import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './Wishlist.css';

function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHeader kicker="Saved" title="Wishlist" />
        <div className="container section cart__empty">
          <p>You haven't saved any products yet.</p>
          <Link to="/shop" className="btn btn-primary">Browse Products</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader kicker="Saved" title="Wishlist" />
      <section className="section">
        <div className="container">
          <div className="wishlist__grid">
            {items.map((item) => (
              <div className="wishlist__item" key={item.id}>
                <div className="wishlist__media">
                  {item.image ? <img src={item.image} alt={item.name} /> : <span>{item.name.charAt(0)}</span>}
                </div>
                <div className="wishlist__info">
                  <Link to={`/product/${item.id}`} className="wishlist__name">{item.name}</Link>
                  <span className="wishlist__price">{formatPrice(item.price)}</span>
                  <div className="wishlist__actions">
                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(item)}>Move to Cart</button>
                    <button className="btn btn-outline-dark btn-sm" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Wishlist;
