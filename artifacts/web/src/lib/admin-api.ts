const API_BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+/g, '/').replace(/\/$/, '');

function getApiUrl(path: string): string {
  return `/api${path}`;
}

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function setToken(token: string): void {
  localStorage.setItem("admin_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function apiRequest(path: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const headers: any = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(getApiUrl(path), { ...options, headers });
  if (res.status === 401) {
    clearToken();
    window.location.href = `${import.meta.env.BASE_URL}admin/login`;
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const adminApi = {
  login: (email: string, password: string) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  getMe: () => apiRequest("/auth/me"),
  setup: () => apiRequest("/auth/setup", { method: "POST" }),

  getDashboard: () => apiRequest("/admin/dashboard"),

  getLeads: (page = 1, status?: string) => apiRequest(`/admin/leads?page=${page}${status ? `&status=${status}` : ""}`),
  updateLead: (id: number, data: any) => apiRequest(`/admin/leads/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteLead: (id: number) => apiRequest(`/admin/leads/${id}`, { method: "DELETE" }),
  getLeadStats: () => apiRequest("/admin/leads/stats"),

  getBlogPosts: (page = 1) => apiRequest(`/admin/blog/posts?page=${page}`),
  createBlogPost: (data: any) => apiRequest("/admin/blog/posts", { method: "POST", body: JSON.stringify(data) }),
  updateBlogPost: (id: number, data: any) => apiRequest(`/admin/blog/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlogPost: (id: number) => apiRequest(`/admin/blog/posts/${id}`, { method: "DELETE" }),
  getCategories: () => apiRequest("/admin/blog/categories"),
  createCategory: (data: any) => apiRequest("/admin/blog/categories", { method: "POST", body: JSON.stringify(data) }),

  getChatSessions: (page = 1) => apiRequest(`/admin/chat/sessions?page=${page}`),
  getChatMessages: (sessionId: number) => apiRequest(`/admin/chat/sessions/${sessionId}/messages`),
  sendChatReply: (sessionId: number, message: string) => apiRequest("/admin/chat/reply", { method: "POST", body: JSON.stringify({ sessionId, message }) }),

  getAnalyticsOverview: () => apiRequest("/admin/analytics/overview"),
  getTrafficData: (period = "daily") => apiRequest(`/admin/analytics/traffic?period=${period}`),
  getLocations: () => apiRequest("/admin/analytics/locations"),
};

export const publicApi = {
  submitLead: (data: any) => fetch(getApiUrl("/leads"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  createChatSession: (pageUrl: string) => fetch(getApiUrl("/chat/session"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pageUrl }) }).then(r => r.json()),
  sendChatMessage: (sessionId: number, message: string, sender = "visitor") => fetch(getApiUrl("/chat/message"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId, message, sender }) }).then(r => r.json()),
  submitChatDetails: (data: any) => fetch(getApiUrl("/chat/details"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  trackAnalytics: (data: any) => fetch(getApiUrl("/analytics/track"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => {}),
  trackPageTime: (data: any) => fetch(getApiUrl("/analytics/page-time"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => {}),
  trackCookieConsent: (data: any) => fetch(getApiUrl("/analytics/cookie-consent"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => {}),
};
