import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CustomersPage() {
  const { API_BASE } = useAuth();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/customers/`)
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error(error));
  }, [API_BASE]);

  return (
    <div className="panel">
      <div className="page-header">
        <div>
          <p className="muted">Customers</p>
          <h1>Customer Overview</h1>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="empty-state">No customers yet.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={`${customer.customer_email}-${customer.customer_phone}`}>
                <td>{customer.customer_name}</td>
                <td>{customer.customer_phone}</td>
                <td>{customer.customer_email}</td>
                <td>{customer.order_count}</td>
                <td>₦{Number(customer.total_spent || 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
