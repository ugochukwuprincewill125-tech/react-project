import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './Checkout.css';

function Checkout() {
  const { items, subtotal } = useCart();
  const [placed, setPlaced] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // No payment gateway is connected yet — this is a frontend placeholder.
    // Wire this up to a real Nigerian payment provider before going live.
    setPlaced(true);
  }

  if (items.length === 0 && !placed) {
    return (
      <>
        <PageHeader kicker="Checkout" title="Checkout" />
        <div className="container section cart__empty">
          <p>Your cart is empty — add something before checking out.</p>
          <Link to="/shop" className="btn btn-primary">Browse Products</Link>
        </div>
      </>
    );
  }

  if (placed) {
    return (
      <>
        <PageHeader kicker="Checkout" title="Order Received" />
        <div className="container section cart__empty">
          <p>
            This order was captured on the frontend only — no payment has
            been processed, since a payment gateway isn't connected yet.
          </p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader kicker="Checkout" title="Checkout" />
      <section className="section">
        <div className="container checkout__layout">
          <form className="checkout__form" onSubmit={handleSubmit}>
            <h3>Customer Information</h3>
            <div className="checkout__row">
              <label>
                Full Name
                <input type="text" required />
              </label>
              <label>
                Phone Number
                <input type="tel" required />
              </label>
            </div>
            <label>
              Email
              <input type="email" required />
            </label>

            <h3>Shipping Address</h3>
            <label>
              Address
              <input type="text" required />
            </label>
            <div className="checkout__row">
              <label>
                City
                <input type="text" required />
              </label>
              <label>
                State
                <input type="text" required />
              </label>
            </div>

            <h3>Payment Method</h3>
            <p className="checkout__note">
              Payment integration is not yet connected. This section is
              built so a Nigerian payment gateway can be added here.
            </p>
            <label className="checkout__radio">
              <input type="radio" name="payment" defaultChecked disabled /> Pay on Delivery (placeholder)
            </label>

            <button type="submit" className="btn btn-primary btn-block">Place Order</button>
          </form>

          <div className="cart__summary checkout__summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div className="checkout__summary-item" key={item.id}>
                <span>{item.name} &times; {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="cart__summary-row cart__summary-row--muted">
              <span>Delivery</span>
              <span>Calculated after order</span>
            </div>
            <div className="cart__summary-row cart__summary-row--total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
