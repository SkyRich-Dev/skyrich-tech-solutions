import { useState, useEffect, type ReactNode } from "react";
import { useLocation, Link } from "wouter";
import { isAuthenticated, clearToken, adminApi } from "@/lib/admin-api";

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: "📊" },
  { path: "/admin/leads", label: "Leads / CRM", icon: "👥" },
  { path: "/admin/blog", label: "Blog Manager", icon: "📝" },
  { path: "/admin/chat", label: "Chat Messages", icon: "💬" },
  { path: "/admin/analytics", label: "Analytics", icon: "📈" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) { setLocation("/admin/login"); return; }
    adminApi.getMe().then(setUser).catch(() => { clearToken(); setLocation("/admin/login"); });
  }, []);

  const handleLogout = () => { clearToken(); setLocation("/admin/login"); };

  if (!user) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}><p>Loading...</p></div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      <aside style={{ width: sidebarOpen ? "260px" : "0px", background: "#0A1F3C", transition: "width 0.3s", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: "700", margin: 0 }}>SkyRich Admin</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "4px" }}>{user.name} ({user.role})</p>
        </div>
        <nav style={{ padding: "16px 0" }}>
          {menuItems.map(item => (
            <Link key={item.path} href={item.path}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", color: location === item.path ? "#2D7FF9" : "rgba(255,255,255,0.7)", background: location === item.path ? "rgba(45,127,249,0.1)" : "transparent", cursor: "pointer", fontSize: "14px", fontWeight: location === item.path ? "600" : "400", borderRight: location === item.path ? "3px solid #2D7FF9" : "none", textDecoration: "none" }}>
                <span>{item.icon}</span><span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ position: "absolute", bottom: "20px", left: "0", width: "260px", padding: "0 20px", boxSizing: "border-box" }}>
          <button onClick={handleLogout} style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>Logout</button>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: "auto" }}>
        <header style={{ background: "white", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e0e0e0" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "1px solid #ddd", borderRadius: "6px", padding: "8px 12px", cursor: "pointer", fontSize: "16px" }}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/" style={{ color: "#2D7FF9", textDecoration: "none", fontSize: "14px" }}>View Website</Link>
          </div>
        </header>
        <div style={{ padding: "24px" }}>{children}</div>
      </main>
    </div>
  );
}
