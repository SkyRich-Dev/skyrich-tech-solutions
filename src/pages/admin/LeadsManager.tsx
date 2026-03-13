import { useState, useEffect } from "react";
import { adminApi } from "@/lib/admin-api";
import AdminLayout from "./AdminLayout";

const statusColors: any = {
  new_lead: { bg: "#e3f2fd", color: "#1976d2" },
  contacted: { bg: "#fff3e0", color: "#f57c00" },
  follow_up: { bg: "#fce4ec", color: "#c62828" },
  converted: { bg: "#e8f5e9", color: "#388e3c" },
  closed: { bg: "#f5f5f5", color: "#666" },
};

export default function LeadsManager() {
  const [leads, setLeads] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadLeads = () => {
    setLoading(true);
    adminApi.getLeads(page, filter || undefined).then(data => { setLeads(data.leads); setTotal(data.total); }).finally(() => setLoading(false));
  };

  useEffect(() => { loadLeads(); }, [page, filter]);
  useEffect(() => { adminApi.getLeadStats().then(setStats); }, []);

  const updateStatus = async (id: number, status: string) => {
    await adminApi.updateLead(id, { status });
    loadLeads();
    adminApi.getLeadStats().then(setStats);
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Delete this lead?")) return;
    await adminApi.deleteLead(id);
    loadLeads();
    adminApi.getLeadStats().then(setStats);
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C" }}>Lead Management (CRM)</h1>
      </div>

      {stats && (
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ background: "white", borderRadius: "10px", padding: "16px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: "12px", color: "#999" }}>Total Leads</p>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C" }}>{stats.total}</p>
          </div>
          {stats.byStatus?.map((s: any) => (
            <div key={s.status} style={{ background: "white", borderRadius: "10px", padding: "16px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "12px", color: "#999", textTransform: "capitalize" }}>{s.status.replace(/_/g, " ")}</p>
              <p style={{ fontSize: "24px", fontWeight: "700", color: statusColors[s.status]?.color || "#333" }}>{s.count}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["", "new_lead", "contacted", "follow_up", "converted", "closed"].map(s => (
          <button key={s} onClick={() => { setFilter(s); setPage(1); }} style={{ padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "500", background: filter === s ? "#2D7FF9" : "#f0f0f0", color: filter === s ? "white" : "#333" }}>{s ? s.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "All"}</button>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        {loading ? <p style={{ padding: "24px" }}>Loading...</p> : leads.length === 0 ? <p style={{ padding: "24px", color: "#999" }}>No leads found</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                {["Name", "Email", "Phone", "Company", "Source", "Status", "Date", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#666", borderBottom: "2px solid #e0e0e0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: "1px solid #f0f0f0" }} onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}>
                  <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500" }}>{lead.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#666" }}>{lead.email}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#666" }}>{lead.phone || "-"}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#666" }}>{lead.company || "-"}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#666", textTransform: "capitalize" }}>{lead.source.replace(/_/g, " ")}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <select value={lead.status} onChange={e => updateStatus(lead.id, e.target.value)} onClick={e => e.stopPropagation()} style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "12px", background: statusColors[lead.status]?.bg || "#f5f5f5", color: statusColors[lead.status]?.color || "#333" }}>
                      <option value="new_lead">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="follow_up">Follow-up</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#999" }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button onClick={e => { e.stopPropagation(); deleteLead(lead.id); }} style={{ background: "none", border: "none", color: "#e53935", cursor: "pointer", fontSize: "13px" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedLead && (
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", marginTop: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>Lead Details - {selectedLead.name}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
            <p><strong>Email:</strong> {selectedLead.email}</p>
            <p><strong>Phone:</strong> {selectedLead.phone || "N/A"}</p>
            <p><strong>Company:</strong> {selectedLead.company || "N/A"}</p>
            <p><strong>Location:</strong> {selectedLead.location || "N/A"}</p>
            <p><strong>Source:</strong> {selectedLead.source}</p>
            <p><strong>Source Page:</strong> {selectedLead.sourcePage || "N/A"}</p>
          </div>
          {selectedLead.message && <div style={{ marginTop: "12px", padding: "12px", background: "#f8f9fa", borderRadius: "8px" }}><strong>Message:</strong><br />{selectedLead.message}</div>}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ddd", cursor: "pointer", background: "white" }}>Previous</button>
        <span style={{ padding: "8px 16px", fontSize: "14px" }}>Page {page}</span>
        <button disabled={leads.length < 20} onClick={() => setPage(p => p + 1)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ddd", cursor: "pointer", background: "white" }}>Next</button>
      </div>
    </AdminLayout>
  );
}
