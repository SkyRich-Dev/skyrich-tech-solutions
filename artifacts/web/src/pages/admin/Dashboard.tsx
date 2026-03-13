import { useState, useEffect } from "react";
import { adminApi } from "@/lib/admin-api";
import AdminLayout from "./AdminLayout";

const statCardStyle = (color: string) => ({
  background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${color}`, flex: "1", minWidth: "200px"
});

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard().then(setData).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLayout><p>Loading dashboard...</p></AdminLayout>;
  if (!data) return <AdminLayout><p>Failed to load dashboard</p></AdminLayout>;

  const { stats, recentLeads, topPages, leadsBySource } = data;

  return (
    <AdminLayout>
      <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C", marginBottom: "24px" }}>Dashboard Overview</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
        <div style={statCardStyle("#2D7FF9")}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "4px" }}>Total Visitors</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#0A1F3C" }}>{stats.totalVisitors}</p>
          <p style={{ color: "#2D7FF9", fontSize: "12px" }}>+{stats.weeklyVisitors} this week</p>
        </div>
        <div style={statCardStyle("#FF7A1A")}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "4px" }}>Total Enquiries</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#0A1F3C" }}>{stats.totalLeads}</p>
          <p style={{ color: "#FF7A1A", fontSize: "12px" }}>+{stats.weeklyLeads} this week</p>
        </div>
        <div style={statCardStyle("#00C853")}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "4px" }}>Page Views</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#0A1F3C" }}>{stats.totalPageViews}</p>
        </div>
        <div style={statCardStyle("#9C27B0")}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "4px" }}>Blog Posts</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#0A1F3C" }}>{stats.totalBlogPosts}</p>
        </div>
        <div style={statCardStyle("#FF4081")}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "4px" }}>Chat Sessions</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#0A1F3C" }}>{stats.totalChatSessions}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0A1F3C", marginBottom: "16px" }}>Recent Leads</h3>
          {recentLeads.length === 0 ? <p style={{ color: "#999", fontSize: "14px" }}>No leads yet</p> : (
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
              {recentLeads.map((lead: any) => (
                <div key={lead.id} style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: "600", fontSize: "14px", color: "#333" }}>{lead.name}</p>
                    <p style={{ fontSize: "12px", color: "#999" }}>{lead.email} | {lead.source}</p>
                  </div>
                  <span style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "12px", background: lead.status === "new_lead" ? "#e3f2fd" : lead.status === "contacted" ? "#fff3e0" : lead.status === "converted" ? "#e8f5e9" : "#f5f5f5", color: lead.status === "new_lead" ? "#1976d2" : lead.status === "contacted" ? "#f57c00" : lead.status === "converted" ? "#388e3c" : "#666" }}>{lead.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0A1F3C", marginBottom: "16px" }}>Top Pages</h3>
          {topPages.length === 0 ? <p style={{ color: "#999", fontSize: "14px" }}>No data yet</p> : (
            topPages.map((page: any, i: number) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#333" }}>{page.pageUrl}</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#2D7FF9" }}>{page.views} views</span>
              </div>
            ))
          )}
        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0A1F3C", marginBottom: "16px" }}>Leads by Source</h3>
          {leadsBySource.length === 0 ? <p style={{ color: "#999", fontSize: "14px" }}>No data yet</p> : (
            leadsBySource.map((s: any, i: number) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#333", textTransform: "capitalize" }}>{s.source.replace(/_/g, " ")}</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#FF7A1A" }}>{s.count}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
