import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ProductsPage() {
  const { API_BASE } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: 0,
    description: "",
    featured: false,
    deal: false,
  });

  useEffect(() => {
    axios
      .get(`${API_BASE}/products/`)
      .then((response) => setProducts(response.data.results || response.data))
      .catch((error) => console.error(error));
  }, [API_BASE]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${API_BASE}/products/`, {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
    setForm({
      name: "",
      brand: "",
      price: "",
      stock: 0,
      description: "",
      featured: false,
      deal: false,
    });
    const response = await axios.get(`${API_BASE}/products/`);
    setProducts(response.data.results || response.data);
  };

  return (
    <div className="panel">
      <div className="page-header">
        <div>
          <p className="muted">Products</p>
          <h1>Inventory</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <div className="form-grid">
          <div className="input-group">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label>Brand</label>
            <input
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label>Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="4"
          />
        </div>
        <div className="inline-actions">
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />{" "}
            Featured
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.deal}
              onChange={(e) => setForm({ ...form, deal: e.target.checked })}
            />{" "}
            Deal
          </label>
          <button type="submit" className="btn">
            Add Product
          </button>
        </div>
      </form>

      {products.length === 0 ? (
        <div className="empty-state">No products yet.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Deal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>₦{Number(product.price).toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>{product.featured ? "Yes" : "No"}</td>
                <td>{product.deal ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
