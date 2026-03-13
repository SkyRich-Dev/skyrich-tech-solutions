import { useState } from "react";
import { useLocation } from "wouter";
import { adminApi, setToken } from "@/lib/admin-api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminApi.login(email, password);
      setToken(data.token);
      setLocation("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0A1F3C 0%, #1a3a6c 100%)" }}>
      <div style={{ background: "white", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C", marginBottom: "8px" }}>SkyRich Admin</h1>
          <p style={{ color: "#666", fontSize: "14px" }}>Sign in to manage your website</p>
        </div>
        {error && <div style={{ background: "#fee", color: "#c00", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "6px" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: "12px 16px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#2D7FF9"} onBlur={e => e.target.style.borderColor = "#e0e0e0"} />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "6px" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: "12px 16px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#2D7FF9"} onBlur={e => e.target.style.borderColor = "#e0e0e0"} />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "#999" : "#2D7FF9", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
