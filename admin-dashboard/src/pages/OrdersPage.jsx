import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  Pending: "pending",
  Processing: "processing",
  Shipped: "shipped",
  Delivered: "delivered",
  Cancelled: "cancelled",
};

export default function OrdersPage() {
  const { API_BASE } = useAuth();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/orders/`)
      .then((response) => setOrders(response.data.results || response.data))
      .catch((error) => console.error(error));
  }, [API_BASE, statusFilter]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const text =
      `${order.customer_name} ${order.customer_phone} ${order.id}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="panel">
      <div className="page-header">
        <div>
          <p className="muted">Orders</p>
          <h1>Order Management</h1>
        </div>
      </div>

      <div className="form-grid" style={{ marginBottom: "18px" }}>
        <div className="input-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Customer, phone, order ID"
          />
        </div>
        <div className="input-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">No orders yet.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>₦{Number(order.total_amount).toLocaleString()}</td>
                <td>
                  <span className={`badge ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link to={`/orders/${order.id}`} className="btn secondary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
