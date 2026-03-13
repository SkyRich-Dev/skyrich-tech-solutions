import { useState, useEffect } from "react";
import { adminApi } from "@/lib/admin-api";
import AdminLayout from "./AdminLayout";

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState<any>(null);
  const [form, setForm] = useState({ title: "", slug: "", seoTitle: "", seoDescription: "", focusKeywords: "", content: "", excerpt: "", featuredImage: "", tags: "", author: "SkyRich Team", status: "draft", ogTitle: "", ogDescription: "", canonicalUrl: "", schemaMarkup: "" });

  const loadPosts = () => { setLoading(true); adminApi.getBlogPosts(page).then(d => { setPosts(d.posts); setTotal(d.total); }).finally(() => setLoading(false)); };
  useEffect(() => { loadPosts(); }, [page]);

  const calcSeoScore = () => {
    let score = 0;
    if (form.seoTitle) score += 15; if (form.seoDescription) score += 15; if (form.focusKeywords) score += 15;
    if (form.ogTitle) score += 10; if (form.ogDescription) score += 10; if (form.canonicalUrl) score += 10;
    if (form.excerpt) score += 10; if (form.featuredImage) score += 10; if (form.schemaMarkup) score += 5;
    return score;
  };

  const handleSave = async () => {
    try {
      if (editPost) { await adminApi.updateBlogPost(editPost.id, form); }
      else { await adminApi.createBlogPost(form); }
      setShowEditor(false); setEditPost(null);
      setForm({ title: "", slug: "", seoTitle: "", seoDescription: "", focusKeywords: "", content: "", excerpt: "", featuredImage: "", tags: "", author: "SkyRich Team", status: "draft", ogTitle: "", ogDescription: "", canonicalUrl: "", schemaMarkup: "" });
      loadPosts();
    } catch (e: any) { alert(e.message); }
  };

  const handleEdit = (post: any) => {
    setEditPost(post);
    setForm({ title: post.title, slug: post.slug, seoTitle: post.seoTitle || "", seoDescription: post.seoDescription || "", focusKeywords: post.focusKeywords || "", content: post.content, excerpt: post.excerpt || "", featuredImage: post.featuredImage || "", tags: post.tags || "", author: post.author, status: post.status, ogTitle: post.ogTitle || "", ogDescription: post.ogDescription || "", canonicalUrl: post.canonicalUrl || "", schemaMarkup: post.schemaMarkup || "" });
    setShowEditor(true);
  };

  const handleDelete = async (id: number) => { if (!confirm("Delete this post?")) return; await adminApi.deleteBlogPost(id); loadPosts(); };

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const inputStyle = { width: "100%", padding: "10px 14px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" as const, marginBottom: "12px" };
  const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600" as const, color: "#333", marginBottom: "4px" };

  if (showEditor) {
    const seoScore = calcSeoScore();
    return (
      <AdminLayout>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C" }}>{editPost ? "Edit Post" : "New Post"}</h1>
          <button onClick={() => { setShowEditor(false); setEditPost(null); }} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "8px", background: "white", cursor: "pointer" }}>Cancel</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={form.title} onChange={e => { setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) }); }} />
            <label style={labelStyle}>Slug URL</label>
            <input style={inputStyle} value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
            <label style={labelStyle}>Content (HTML)</label>
            <textarea style={{ ...inputStyle, minHeight: "300px", fontFamily: "monospace" }} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
            <label style={labelStyle}>Excerpt</label>
            <textarea style={{ ...inputStyle, minHeight: "80px" }} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><label style={labelStyle}>Author</label><input style={inputStyle} value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} /></div>
              <div><label style={labelStyle}>Status</label>
                <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="draft">Draft</option><option value="published">Published</option><option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input style={inputStyle} value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
            <label style={labelStyle}>Featured Image URL</label>
            <input style={inputStyle} value={form.featuredImage} onChange={e => setForm({ ...form, featuredImage: e.target.value })} />
          </div>
          <div>
            <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>SEO Score</h3>
              <div style={{ width: "100%", height: "8px", background: "#f0f0f0", borderRadius: "4px", marginBottom: "8px" }}>
                <div style={{ width: `${seoScore}%`, height: "100%", background: seoScore >= 80 ? "#4caf50" : seoScore >= 50 ? "#ff9800" : "#f44336", borderRadius: "4px", transition: "width 0.3s" }} />
              </div>
              <p style={{ fontSize: "24px", fontWeight: "700", color: seoScore >= 80 ? "#4caf50" : seoScore >= 50 ? "#ff9800" : "#f44336" }}>{seoScore}/100</p>
            </div>
            <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>SEO Settings</h3>
              <label style={labelStyle}>SEO Title</label>
              <input style={inputStyle} value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} />
              <label style={labelStyle}>SEO Description</label>
              <textarea style={{ ...inputStyle, minHeight: "60px" }} value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} />
              <label style={labelStyle}>Focus Keywords</label>
              <input style={inputStyle} value={form.focusKeywords} onChange={e => setForm({ ...form, focusKeywords: e.target.value })} />
              <label style={labelStyle}>OG Title</label>
              <input style={inputStyle} value={form.ogTitle} onChange={e => setForm({ ...form, ogTitle: e.target.value })} />
              <label style={labelStyle}>OG Description</label>
              <input style={inputStyle} value={form.ogDescription} onChange={e => setForm({ ...form, ogDescription: e.target.value })} />
              <label style={labelStyle}>Canonical URL</label>
              <input style={inputStyle} value={form.canonicalUrl} onChange={e => setForm({ ...form, canonicalUrl: e.target.value })} />
            </div>
            <button onClick={handleSave} style={{ width: "100%", marginTop: "16px", padding: "14px", background: "#2D7FF9", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>{editPost ? "Update Post" : "Create Post"}</button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0A1F3C" }}>Blog Manager</h1>
        <button onClick={() => setShowEditor(true)} style={{ padding: "10px 20px", background: "#2D7FF9", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>+ New Post</button>
      </div>
      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        {loading ? <p style={{ padding: "24px" }}>Loading...</p> : posts.length === 0 ? <p style={{ padding: "24px", color: "#999" }}>No blog posts yet</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#f8f9fa" }}>
              {["Title", "Author", "Status", "SEO Score", "Views", "Date", "Actions"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#666", borderBottom: "2px solid #e0e0e0" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#666" }}>{post.author}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "500", background: post.status === "published" ? "#e8f5e9" : post.status === "draft" ? "#fff3e0" : "#e3f2fd", color: post.status === "published" ? "#388e3c" : post.status === "draft" ? "#f57c00" : "#1976d2" }}>{post.status}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontWeight: "600", color: (post.seoScore || 0) >= 80 ? "#4caf50" : (post.seoScore || 0) >= 50 ? "#ff9800" : "#f44336" }}>{post.seoScore || 0}/100</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px" }}>{post.views || 0}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#999" }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "12px 16px", display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEdit(post)} style={{ background: "none", border: "none", color: "#2D7FF9", cursor: "pointer", fontSize: "13px" }}>Edit</button>
                    <button onClick={() => handleDelete(post.id)} style={{ background: "none", border: "none", color: "#e53935", cursor: "pointer", fontSize: "13px" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ddd", cursor: "pointer", background: "white" }}>Previous</button>
        <span style={{ padding: "8px 16px", fontSize: "14px" }}>Page {page} ({total} total)</span>
        <button disabled={posts.length < 20} onClick={() => setPage(p => p + 1)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ddd", cursor: "pointer", background: "white" }}>Next</button>
      </div>
    </AdminLayout>
  );
}
