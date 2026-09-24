import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import "./Checkout.css";

const API_BASE = "http://localhost:8000/api";

function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    shipping_address: "",
    city: "",
    state: "",
    payment_method: "Pay on Delivery",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...formData,
        total_amount: subtotal,
        status: "Pending",
        items: items.map((item) => ({
          product_id: String(item.id),
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await fetch(`${API_BASE}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Your order could not be sent.");
      }

      clearCart();
      setPlaced(true);
    } catch (submitError) {
      setError(
        submitError.message || "Something went wrong while sending the order.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0 && !placed) {
    return (
      <>
        <PageHeader kicker="Checkout" title="Checkout" />
        <div className="container section cart__empty">
          <p>Your cart is empty — add something before checking out.</p>
          <Link to="/shop" className="btn btn-primary">
            Browse Products
          </Link>
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
            Your order has been received and is now live in the admin dashboard
            for review.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
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
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label>
              Email
              <input
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                required
              />
            </label>

            <h3>Shipping Address</h3>
            <label>
              Address
              <input
                type="text"
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleChange}
                required
              />
            </label>
            <div className="checkout__row">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                State
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <h3>Payment Method</h3>
            <p className="checkout__note">
              Payment integration is not yet connected. This section is built so
              a Nigerian payment gateway can be added here.
            </p>
            <label className="checkout__radio">
              <input
                type="radio"
                name="payment_method"
                value="Pay on Delivery"
                checked
                readOnly
              />{" "}
              Pay on Delivery
            </label>

            {error && (
              <p className="checkout__note" style={{ color: "#b91c1c" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={submitting}
            >
              {submitting ? "Sending Order..." : "Place Order"}
            </button>
          </form>

          <div className="cart__summary checkout__summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div className="checkout__summary-item" key={item.id}>
                <span>
                  {item.name} &times; {item.quantity}
                </span>
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
