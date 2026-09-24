import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const STORAGE_KEY = "timeline_admin_token";
const AuthContext = createContext(null);

const API_BASE = "http://localhost:8000/api";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "",
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem(STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${API_BASE}/auth/login/`, {
      email,
      password,
    });
    setToken(response.data.access);
    return response.data;
  };

  const logout = () => setToken("");

  const value = useMemo(() => ({ token, login, logout, API_BASE }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
