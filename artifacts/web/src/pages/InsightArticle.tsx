import { MainLayout } from "@/components/layout/MainLayout";
import { Section } from "@/components/ui/Section";
import { Link, useParams, Redirect } from "wouter";
import { Calendar, User, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SEOHead, createBreadcrumbSchema, createArticleSchema } from "@/components/SEOHead";
import { blogArticles } from "@/data/blog-articles";

export default function InsightArticle() {
  const params = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === params.slug);

  if (!article) {
    return <Redirect to="/insights" />;
  }

  const currentIndex = blogArticles.indexOf(article);
  const relatedArticles = blogArticles
    .filter(a => a.slug !== article.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <MainLayout>
      <SEOHead
        title={`${article.title} | SkyRich Tech Solutions`}
        description={article.excerpt}
        keywords={article.keywords.join(", ")}
        ogType="article"
        structuredData={[
          createBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Insights", url: "/insights" },
            { name: article.title, url: `/insights/${article.slug}` },
          ]),
          createArticleSchema({
            title: article.title,
            description: article.excerpt,
            author: article.author,
            date: article.isoDate,
            url: `/insights/${article.slug}`,
            slug: article.slug,
          }),
        ]}
      />

      <div className="pt-32 pb-10 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D7FF9]/20 text-[#6BAFFF] font-semibold text-sm mb-4 border border-[#2D7FF9]/30">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</span>
          </div>
        </div>
      </div>

      <Section>
        <article className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-8 border-l-4 border-primary pl-6">
              {article.excerpt}
            </p>
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed mb-6 text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-8">
              {article.keywords.map(kw => (
                <span key={kw} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {kw}
                </span>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#0A1F3C] to-[#0d2847] rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">Ready to Transform Your Manufacturing?</h3>
              <p className="text-gray-300 mb-6">Discover how SkyRich Tech Solutions can help implement Industry 4.0 solutions tailored to your specific needs.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/products/aida" className="px-6 py-3 bg-[#2D7FF9] text-white rounded-xl font-semibold hover:bg-[#2565d4] transition-colors">
                  Explore AIDA Platform
                </Link>
                <Link href="/contact" className="px-6 py-3 bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] text-white rounded-xl font-semibold hover:from-[#FF8A2A] hover:to-[#FF5D10] transition-colors">
                  Talk to Expert
                </Link>
              </div>
            </div>
          </div>
        </article>
      </Section>

      <Section className="bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {relatedArticles.map((post) => (
            <Link key={post.slug} href={`/insights/${post.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-primary shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
}
