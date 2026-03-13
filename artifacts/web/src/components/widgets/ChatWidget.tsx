import { useState, useRef, useEffect } from "react";
import { publicApi } from "@/lib/admin-api";

const botResponses: Record<string, string> = {
  default: "Thank you for reaching out! Our team will get back to you shortly. Meanwhile, could you share your name and email so we can follow up?",
  greeting: "Hello! Welcome to SkyRich Tech Solutions. How can I help you today? We specialize in Industry 4.0, AI Analytics, Smart Manufacturing, and Digital Transformation solutions.",
  aida: "AIDA is our AI-powered Data Analytics platform designed for Industry 4.0. It provides real-time insights, predictive analytics, and smart dashboards for manufacturing plants. Would you like to schedule a demo?",
  aiva: "AIVA is our Advanced Industrial Vision & Analytics system for quality inspection using AI-powered cameras and machine learning. It detects defects in real-time on production lines. Interested in learning more?",
  orbit: "Orbit CRM is our comprehensive customer relationship management solution built for B2B enterprises. It includes lead tracking, sales pipeline, and analytics dashboards. Would you like a walkthrough?",
  services: "We offer a wide range of services including AI & Data Analytics, Smart Manufacturing, Plant Digitization, Vision & Quality Inspection, and Digital Transformation consulting. Which area interests you?",
  contact: "You can reach us at info@skyrichtechsolutions.com or call +91 9384801120. Our office is in Perungudi, Chennai, India. Would you like to schedule a meeting with our experts?",
  pricing: "Our pricing is customized based on your specific requirements and scale. I'd recommend connecting with our sales team for a tailored proposal. Shall I arrange a call?",
};

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.match(/hi|hello|hey|good/)) return botResponses.greeting;
  if (lower.match(/aida|data analytics|analytics platform/)) return botResponses.aida;
  if (lower.match(/aiva|vision|quality|inspection|camera/)) return botResponses.aiva;
  if (lower.match(/orbit|crm|customer/)) return botResponses.orbit;
  if (lower.match(/service|offer|what do you/)) return botResponses.services;
  if (lower.match(/contact|email|phone|call|reach/)) return botResponses.contact;
  if (lower.match(/price|cost|pricing|quote/)) return botResponses.pricing;
  return botResponses.default;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", company: "" });
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startChat = async () => {
    setIsOpen(true);
    if (!sessionId) {
      try {
        const session = await publicApi.createChatSession(window.location.pathname);
        setSessionId(session.id);
        setMessages([{ sender: "bot", text: "Hello! Welcome to SkyRich Tech Solutions. How can I help you today?" }]);
      } catch { setMessages([{ sender: "bot", text: "Welcome! How can I help you today?" }]); }
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim().slice(0, 2000);
    setInput("");
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);

    if (sessionId) {
      publicApi.sendChatMessage(sessionId, userMsg, "visitor").catch(() => {});
    }

    setTimeout(() => {
      const botReply = getBotResponse(userMsg);
      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
      if (sessionId) { publicApi.sendChatMessage(sessionId, botReply, "bot").catch(() => {}); }
      if (!detailsSubmitted && messages.length >= 3) { setShowDetails(true); }
    }, 800);
  };

  const escapeHtml = (str: string): string => {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  const validateEmailFormat = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
  };

  const submitDetails = async () => {
    if (!details.name || !details.email) return;
    if (!validateEmailFormat(details.email)) {
      setMessages(prev => [...prev, { sender: "bot", text: "Please enter a valid email address." }]);
      return;
    }
    const safeName = escapeHtml(details.name.slice(0, 255));
    const safeEmail = escapeHtml(details.email.slice(0, 254));
    if (sessionId) {
      await publicApi.submitChatDetails({ sessionId, name: safeName, email: safeEmail, phone: details.phone.slice(0, 20), company: details.company.slice(0, 255) });
    }
    setDetailsSubmitted(true);
    setShowDetails(false);
    setMessages(prev => [...prev, { sender: "bot", text: `Thank you ${safeName}! Our team will follow up with you at ${safeEmail}. Is there anything else I can help with?` }]);
  };

  return (
    <>
      {!isOpen && (
        <button onClick={startChat} style={{ position: "fixed", bottom: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, #2D7FF9, #FF7A1A)", border: "none", color: "white", fontSize: "24px", cursor: "pointer", boxShadow: "0 4px 20px rgba(45,127,249,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }} onMouseEnter={e => (e.target as HTMLElement).style.transform = "scale(1.1)"} onMouseLeave={e => (e.target as HTMLElement).style.transform = "scale(1)"}>
          💬
        </button>
      )}

      {isOpen && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", width: "380px", height: "520px", background: "white", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", zIndex: 9999, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg, #0A1F3C, #1a3a6c)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ color: "white", fontSize: "16px", fontWeight: "600", margin: 0 }}>SkyRich Support</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", margin: "2px 0 0" }}>We typically reply within minutes</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "12px", display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: msg.sender === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.sender === "user" ? "#2D7FF9" : "#f0f2f5", color: msg.sender === "user" ? "white" : "#333", fontSize: "14px", lineHeight: "1.4" }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {showDetails && !detailsSubmitted && (
              <div style={{ background: "#f8f9fa", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
                <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "10px", color: "#333" }}>Share your details so we can follow up:</p>
                <input placeholder="Name *" value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                <input placeholder="Email *" value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                <input placeholder="Phone" value={details.phone} onChange={e => setDetails({ ...details, phone: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                <input placeholder="Company" value={details.company} onChange={e => setDetails({ ...details, company: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                <button onClick={submitDetails} style={{ width: "100%", padding: "10px", background: "#2D7FF9", color: "white", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Submit</button>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid #e0e0e0", display: "flex", gap: "8px" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: "10px 14px", border: "2px solid #e0e0e0", borderRadius: "24px", outline: "none", fontSize: "14px" }} />
            <button onClick={sendMessage} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#2D7FF9", border: "none", color: "white", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
