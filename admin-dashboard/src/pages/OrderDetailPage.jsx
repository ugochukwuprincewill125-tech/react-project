import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const statusOrder = ["Pending", "Processing", "Shipped", "Delivered"];

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE } = useAuth();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [note, setNote] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/orders/${id}/`)
      .then((response) => {
        const currentOrder = response.data;
        setOrder(currentOrder);
        setStatus(currentOrder.status);
        setNote(currentOrder.notes || "");
      })
      .catch(() => navigate("/orders"));
  }, [API_BASE, id, navigate]);

  const updateOrderStatus = async () => {
    await axios.patch(`${API_BASE}/orders/${id}/status/`, { status });
    const response = await axios.get(`${API_BASE}/orders/${id}/`);
    setOrder(response.data);
  };

  if (!order) {
    return <div className="empty-state">Loading order...</div>;
  }

  return (
    <div className="panel">
      <div className="page-header">
        <div>
          <p className="muted">Order Details</p>
          <h1>#{order.id}</h1>
        </div>
        <button
          type="button"
          className="btn secondary"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>

      <div className="form-grid" style={{ marginBottom: "28px" }}>
        <div>
          <h3>Customer Information</h3>
          <p>
            <strong>Name:</strong> {order.customer_name}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer_phone}
          </p>
          <p>
            <strong>Email:</strong> {order.customer_email}
          </p>
          <p>
            <strong>Address:</strong> {order.shipping_address}
          </p>
          <p>
            {order.city}, {order.state}
          </p>
        </div>

        <div>
          <h3>Order Status</h3>
          <div className="input-group">
            <label htmlFor="status">Update status</label>
            <select
              id="status"
              className="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {[
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
              ].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn" onClick={updateOrderStatus}>
            Save Status
          </button>
        </div>
      </div>

      <h3>Items</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>₦{Number(item.price).toLocaleString()}</td>
              <td>₦{Number(item.subtotal).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Order total:</strong> ₦
          {Number(order.total_amount).toLocaleString()}
        </p>
        <p>
          <strong>Placed:</strong> {new Date(order.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Last status change:</strong>{" "}
          {new Date(order.status_last_changed).toLocaleString()}
        </p>
      </div>

      <div className="input-group" style={{ marginTop: "20px" }}>
        <label htmlFor="internal-note">Internal note</label>
        <textarea
          id="internal-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="4"
          placeholder="Add an internal note for the team"
        />
      </div>
    </div>
  );
}
