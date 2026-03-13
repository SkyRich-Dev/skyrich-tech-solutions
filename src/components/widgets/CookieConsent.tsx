import { useState, useEffect } from "react";
import { publicApi } from "@/lib/admin-api";

function generateVisitorId(): string {
  const stored = localStorage.getItem("skyrich_visitor_id");
  if (stored) return stored;
  const id = "v_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  localStorage.setItem("skyrich_visitor_id", id);
  return id;
}

function generateSessionId(): string {
  const id = "s_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  sessionStorage.setItem("skyrich_session_id", id);
  return id;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({ necessary: true, analytics: true, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("skyrich_cookie_consent");
    if (!consent) { setTimeout(() => setVisible(true), 2000); }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("skyrich_cookie_consent", "accepted");
    setVisible(false);
    const visitorId = generateVisitorId();
    const sessionId = sessionStorage.getItem("skyrich_session_id") || generateSessionId();
    publicApi.trackCookieConsent({ visitorId, sessionId, consentGiven: "accepted" });
  };

  const handleReject = () => {
    localStorage.setItem("skyrich_cookie_consent", "rejected");
    setVisible(false);
    const visitorId = generateVisitorId();
    const sessionId = sessionStorage.getItem("skyrich_session_id") || generateSessionId();
    publicApi.trackCookieConsent({ visitorId, sessionId, consentGiven: "rejected" });
  };

  const handleCustomize = () => {
    const consent = preferences.analytics ? "partial" : "rejected";
    localStorage.setItem("skyrich_cookie_consent", consent);
    localStorage.setItem("skyrich_cookie_preferences", JSON.stringify(preferences));
    setVisible(false);
    setShowCustomize(false);
    const visitorId = generateVisitorId();
    const sessionId = sessionStorage.getItem("skyrich_session_id") || generateSessionId();
    publicApi.trackCookieConsent({ visitorId, sessionId, consentGiven: consent });
  };

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10000, background: "white", borderTop: "1px solid #e0e0e0", boxShadow: "0 -4px 20px rgba(0,0,0,0.1)", padding: "20px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {!showCustomize ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#0A1F3C", marginBottom: "4px" }}>Cookie Notice</h4>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5" }}>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.</p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
              <button onClick={() => setShowCustomize(true)} style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "13px", fontWeight: "500", color: "#666" }}>Customize</button>
              <button onClick={handleReject} style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "13px", fontWeight: "500", color: "#333" }}>Reject All</button>
              <button onClick={handleAccept} style={{ padding: "10px 20px", border: "none", borderRadius: "8px", background: "#2D7FF9", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>Accept All</button>
            </div>
          </div>
        ) : (
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#0A1F3C", marginBottom: "16px" }}>Cookie Preferences</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
              {[
                { key: "necessary", label: "Necessary", desc: "Required for the website to function properly.", disabled: true },
                { key: "analytics", label: "Analytics", desc: "Help us understand how visitors use our website." },
                { key: "marketing", label: "Marketing", desc: "Used to deliver personalized advertisements." },
              ].map(c => (
                <label key={c.key} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#f8f9fa", borderRadius: "8px", cursor: c.disabled ? "default" : "pointer" }}>
                  <input type="checkbox" checked={(preferences as any)[c.key]} disabled={c.disabled} onChange={e => setPreferences({ ...preferences, [c.key]: e.target.checked })} style={{ width: "18px", height: "18px", accentColor: "#2D7FF9" }} />
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>{c.label}</p>
                    <p style={{ fontSize: "12px", color: "#999" }}>{c.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowCustomize(false)} style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "13px" }}>Back</button>
              <button onClick={handleCustomize} style={{ padding: "10px 20px", border: "none", borderRadius: "8px", background: "#2D7FF9", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>Save Preferences</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
