import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
  const { API_BASE } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE}/profile/change-password/`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
      );
      setMessage(response.data.detail || "Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Password update failed.");
    }
  };

  return (
    <div className="panel">
      <div className="page-header">
        <div>
          <p className="muted">Account</p>
          <h1>Settings</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="old-password">Current password</label>
          <input
            id="old-password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {message && (
          <p className="muted" style={{ marginBottom: "12px" }}>
            {message}
          </p>
        )}
        <button type="submit" className="btn">
          Update Password
        </button>
      </form>
    </div>
  );
}
