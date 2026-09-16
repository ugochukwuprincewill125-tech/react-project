import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './Cart.css';

function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHeader kicker="Your Cart" title="Cart" />
        <div className="container section cart__empty">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader kicker="Your Cart" title="Shopping Cart" />
      <section className="section">
        <div className="container cart__layout">
          <div className="cart__items">
            {items.map((item) => (
              <div className="cart__item" key={item.id}>
                <div className="cart__item-media">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <span>{item.name.charAt(0)}</span>
                  )}
                </div>
                <div className="cart__item-info">
                  <Link to={`/product/${item.id}`} className="cart__item-name">{item.name}</Link>
                  <span className="cart__item-category">{item.category}</span>
                  <span className="cart__item-price">{formatPrice(item.price)}</span>
                </div>
                <div className="cart__item-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                </div>
                <span className="cart__item-total">{formatPrice(item.price * item.quantity)}</span>
                <button className="cart__item-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>
                  &times;
                </button>
              </div>
            ))}
            <Link to="/shop" className="cart__continue">&larr; Continue Shopping</Link>
          </div>

          <div className="cart__summary">
            <h3>Order Summary</h3>
            <div className="cart__summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart__summary-row cart__summary-row--muted">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart__summary-row cart__summary-row--total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
