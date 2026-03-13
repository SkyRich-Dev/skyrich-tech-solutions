import { useState, useEffect } from "react";
import { adminApi } from "@/lib/admin-api";
import AdminLayout from "./AdminLayout";

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<any>(null);
  const [traffic, setTraffic] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [period, setPeriod] = useState("daily");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getAnalyticsOverview(),
      adminApi.getTrafficData(period),
      adminApi.getLocations(),
    ]).then(([o, t, l]) => { setOverview(o); setTraffic(t); setLocations(l); }).finally(() => setLoading(false));
  }, [period]);

  if (loading) return <AdminLayout><p>Loading analytics...</p></AdminLayout>;

  const maxTraffic = Math.max(...traffic.map(t => t.count), 1);

  return (
    <AdminLayout>
      <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C", marginBottom: "24px" }}>Website Analytics</h1>

      {overview && (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
          {[
            { label: "Total Visitors", value: overview.totalVisitors, color: "#2D7FF9" },
            { label: "Page Views", value: overview.totalPageViews, color: "#FF7A1A" },
            { label: "Return Visitors", value: overview.returnVisitors, color: "#00C853" },
            { label: "Recent (30d)", value: overview.recentVisitors, color: "#9C27B0" },
          ].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: "12px", padding: "20px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${s.color}`, flex: "1", minWidth: "180px" }}>
              <p style={{ color: "#666", fontSize: "13px" }}>{s.label}</p>
              <p style={{ fontSize: "28px", fontWeight: "700", color: "#0A1F3C" }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Traffic Chart</h3>
          <div style={{ display: "flex", gap: "8px" }}>
            {["daily", "weekly", "monthly"].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{ padding: "6px 14px", borderRadius: "16px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "500", background: period === p ? "#2D7FF9" : "#f0f0f0", color: period === p ? "white" : "#333" }}>{p.charAt(0).toUpperCase() + p.slice(1)}</button>
            ))}
          </div>
        </div>
        {traffic.length === 0 ? <p style={{ color: "#999" }}>No traffic data yet</p> : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "200px", paddingBottom: "30px", position: "relative" }}>
            {traffic.slice(-30).map((t, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "100%", background: "#2D7FF9", borderRadius: "4px 4px 0 0", height: `${(t.count / maxTraffic) * 170}px`, minHeight: "4px", transition: "height 0.3s" }} title={`${t.date}: ${t.count} visitors`} />
                {i % 5 === 0 && <span style={{ fontSize: "9px", color: "#999", marginTop: "4px", transform: "rotate(-45deg)", whiteSpace: "nowrap" }}>{t.date}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Traffic Sources</h3>
          {overview?.trafficSources?.length === 0 ? <p style={{ color: "#999", fontSize: "14px" }}>No data</p> :
            overview?.trafficSources?.map((s: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: "14px", textTransform: "capitalize" }}>{s.source || "Unknown"}</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#2D7FF9" }}>{s.count}</span>
              </div>
            ))}
        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Devices</h3>
          {overview?.deviceTypes?.length === 0 ? <p style={{ color: "#999", fontSize: "14px" }}>No data</p> :
            overview?.deviceTypes?.map((d: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: "14px", textTransform: "capitalize" }}>{d.device || "Unknown"}</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#FF7A1A" }}>{d.count}</span>
              </div>
            ))}
        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Top Pages</h3>
          {overview?.topPages?.length === 0 ? <p style={{ color: "#999", fontSize: "14px" }}>No data</p> :
            overview?.topPages?.slice(0, 8).map((p: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: "13px", color: "#333", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.pageUrl}</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#00C853" }}>{p.views}</span>
              </div>
            ))}
        </div>
      </div>

      {locations.length > 0 && (
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginTop: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Visitor Locations</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px" }}>
            {locations.map((l, i) => (
              <div key={i} style={{ padding: "10px 14px", background: "#f8f9fa", borderRadius: "8px", fontSize: "13px" }}>
                <span style={{ fontWeight: "500" }}>{l.city || "Unknown"}, {l.country || "Unknown"}</span>
                <span style={{ float: "right", fontWeight: "600", color: "#2D7FF9" }}>{l.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
