import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../services/api.js";

const AuthContext = createContext(null);

// We keep the JWT in localStorage as a simple client-side "am I logged in"
// flag (used to guard the /admin route on the frontend). The backend also
// sets an httpOnly cookie on login, which is what actually authenticates
// every request - localStorage alone is never trusted server-side.
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On refresh, verify the stored token is still valid against the backend.
    const verify = async () => {
      const stored = localStorage.getItem("adminToken");
      if (!stored) {
        setLoading(false);
        return;
      }
      try {
        await api.getMe();
        setToken(stored);
      } catch {
        localStorage.removeItem("adminToken");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem("adminToken", data.token);
    setToken(data.token);
    return data;
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // even if the request fails, clear local state
    }
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const value = {
    isAuthenticated: Boolean(token),
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
