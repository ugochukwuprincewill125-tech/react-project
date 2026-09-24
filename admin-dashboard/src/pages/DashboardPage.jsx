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

export default function DashboardPage() {
  const { API_BASE } = useAuth();
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_revenue: 0,
    status_counts: {},
    recent_orders: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/dashboard/`)
      .then((response) => setSummary(response.data))
      .catch(() => setError("No dashboard data is available yet."));
  }, [API_BASE]);

  const statusKeys = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <p className="muted">Overview</p>
          <h1>Dashboard</h1>
        </div>
      </div>

      {error ? (
        <div className="empty-state">{error}</div>
      ) : (
        <>
          <div className="card-grid">
            <div className="metric-card">
              <div className="metric-label">Total Orders</div>
              <div className="metric-value">{summary.total_orders}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Total Revenue</div>
              <div className="metric-value">
                {summary.total_revenue
                  ? `₦${summary.total_revenue.toLocaleString()}`
                  : "No data yet"}
              </div>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: "24px" }}>
            <h3>Orders by Status</h3>
            <div className="card-grid">
              {statusKeys.map((key) => (
                <div key={key} className="metric-card">
                  <div className="metric-label">{key}</div>
                  <div className="metric-value">
                    {summary.status_counts[key] || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3>Recent Orders</h3>
            {summary.recent_orders.length === 0 ? (
              <div className="empty-state">No orders yet.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recent_orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <Link to={`/orders/${order.id}`}>#{order.id}</Link>
                      </td>
                      <td>{order.customer_name}</td>
                      <td>₦{Number(order.total_amount).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
}
