import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CategoriesPage() {
  const { API_BASE } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/categories/`)
      .then((response) => setCategories(response.data.results || response.data))
      .catch((error) => console.error(error));
  }, [API_BASE]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${API_BASE}/categories/`, { name });
    setName("");
    const response = await axios.get(`${API_BASE}/categories/`);
    setCategories(response.data.results || response.data);
  };

  return (
    <div className="panel">
      <div className="page-header">
        <div>
          <p className="muted">Categories</p>
          <h1>Category Management</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <div className="input-group">
          <label htmlFor="category-name">Category name</label>
          <input
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Add Category
        </button>
      </form>

      {categories.length === 0 ? (
        <div className="empty-state">No categories yet.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
