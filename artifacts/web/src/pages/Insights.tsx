import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Section } from "@/components/ui/Section";
import { Link } from "wouter";
import { Calendar, User, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import { blogArticles } from "@/data/blog-articles";

const categories = ["All", "Industry 4.0", "Smart Manufacturing", "AI & Data Analytics", "AI & ML", "Vision & Quality", "Plant & Process", "Digital Transformation"];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return blogArticles;
    return blogArticles.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <MainLayout>
      <SEOHead
        title="Insights & Resources | Industry 4.0, AI & Smart Manufacturing Blog"
        description="Expert insights on Industry 4.0, smart manufacturing, AI data analytics, predictive maintenance, IoT platforms, and digital transformation from the SkyRich Tech Solutions engineering team."
        keywords="Industry 4.0 blog, smart manufacturing insights, AI manufacturing articles, predictive maintenance guide, IoT platform resources, digital transformation blog, factory automation articles, manufacturing analytics insights"
        structuredData={[createBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Insights", url: "/insights" }])]}
      />
      <div className="pt-32 pb-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">Insights & Resources</h1>
          <p className="text-xl text-gray-300">Expert perspectives on Industry 4.0, AI-powered manufacturing, smart factory automation, and enterprise digital transformation.</p>
        </div>
      </div>

      <Section>
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${activeCategory === cat ? "bg-primary text-white border border-primary" : "bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
            >
              <Link href={`/insights/${post.slug}`} className="block">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-primary shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1"><User className="w-3 h-3"/> {post.author}</div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No articles found in this category.</p>
        )}
      </Section>
    </MainLayout>
  );
}
