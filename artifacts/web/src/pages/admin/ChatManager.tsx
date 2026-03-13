import { useState, useEffect } from "react";
import { adminApi } from "@/lib/admin-api";
import AdminLayout from "./AdminLayout";

export default function ChatManager() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");

  const loadSessions = () => { setLoading(true); adminApi.getChatSessions(page).then(d => { setSessions(d.sessions); setTotal(d.total); }).finally(() => setLoading(false)); };
  useEffect(() => { loadSessions(); }, [page]);

  const viewMessages = async (session: any) => {
    setSelectedSession(session);
    const msgs = await adminApi.getChatMessages(session.id);
    setMessages(msgs);
  };

  const sendReply = async () => {
    if (!reply.trim() || !selectedSession) return;
    await adminApi.sendChatReply(selectedSession.id, reply);
    setReply("");
    const msgs = await adminApi.getChatMessages(selectedSession.id);
    setMessages(msgs);
  };

  return (
    <AdminLayout>
      <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C", marginBottom: "24px" }}>Chat Messages</h1>
      <div style={{ display: "grid", gridTemplateColumns: selectedSession ? "1fr 1fr" : "1fr", gap: "24px" }}>
        <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #e0e0e0" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Chat Sessions ({total})</h3>
          </div>
          {loading ? <p style={{ padding: "20px" }}>Loading...</p> : sessions.length === 0 ? <p style={{ padding: "20px", color: "#999" }}>No chat sessions</p> : (
            sessions.map(session => (
              <div key={session.id} onClick={() => viewMessages(session)} style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", cursor: "pointer", background: selectedSession?.id === session.id ? "#f0f7ff" : "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: "600", fontSize: "14px", color: "#333" }}>{session.visitorName || "Anonymous Visitor"}</p>
                    <p style={{ fontSize: "12px", color: "#999" }}>{session.visitorEmail || "No email"} | {session.pageUrl || "Unknown page"}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "10px", background: session.isResolved ? "#e8f5e9" : "#fff3e0", color: session.isResolved ? "#388e3c" : "#f57c00" }}>{session.isResolved ? "Resolved" : "Open"}</span>
                    <p style={{ fontSize: "11px", color: "#ccc", marginTop: "4px" }}>{new Date(session.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "12px" }}>
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #ddd", cursor: "pointer", background: "white", fontSize: "13px" }}>Prev</button>
            <span style={{ fontSize: "13px", padding: "6px" }}>Page {page}</span>
            <button disabled={sessions.length < 20} onClick={() => setPage(p => p + 1)} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #ddd", cursor: "pointer", background: "white", fontSize: "13px" }}>Next</button>
          </div>
        </div>

        {selectedSession && (
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", maxHeight: "600px" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e0e0e0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Chat with {selectedSession.visitorName || "Anonymous"}</h3>
              <p style={{ fontSize: "12px", color: "#999" }}>{selectedSession.visitorEmail} | {selectedSession.visitorCompany || ""}</p>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ marginBottom: "12px", display: "flex", justifyContent: msg.sender === "admin" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: "12px", background: msg.sender === "admin" ? "#2D7FF9" : "#f0f0f0", color: msg.sender === "admin" ? "white" : "#333", fontSize: "14px" }}>
                    {msg.message}
                    <p style={{ fontSize: "10px", opacity: 0.7, marginTop: "4px" }}>{new Date(msg.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid #e0e0e0", display: "flex", gap: "8px" }}>
              <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === "Enter" && sendReply()} placeholder="Type reply..." style={{ flex: 1, padding: "10px 14px", border: "2px solid #e0e0e0", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
              <button onClick={sendReply} style={{ padding: "10px 20px", background: "#2D7FF9", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Send</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
