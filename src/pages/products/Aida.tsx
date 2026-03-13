import { MainLayout } from "@/components/layout/MainLayout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BarChart3, Zap, Layers, RefreshCw, Settings, CheckCircle2 } from "lucide-react";
import { SEOHead, createBreadcrumbSchema, createProductSchema } from "@/components/SEOHead";

export default function AidaProduct() {
  return (
    <MainLayout>
      <SEOHead
        title="AIDA - AI Data Analytics Platform | Manufacturing Analytics & Predictive Insights"
        description="AIDA by SkyRich Tech Solutions is an AI-powered data analytics platform that transforms raw industrial data into actionable predictive insights for smart manufacturing, plant management, and Industry 4.0 operations."
        keywords="AI data analytics platform, manufacturing analytics, industrial AI insights, predictive analytics, operational intelligence, real-time dashboards, factory data analytics, AI powered manufacturing insights, plant performance monitoring software"
        structuredData={[
          createBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Products", url: "/products" }, { name: "AIDA", url: "/products/aida" }]),
          createProductSchema({ name: "AIDA - AI Data Analytics Platform", description: "Transform raw industrial and enterprise data into actionable predictive insights with AI-powered analytics.", url: "/products/aida", category: "BusinessApplication" }),
        ]}
      />
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/aida-abstract.jpg`} 
            alt="AIDA AI data analytics platform dashboard for smart manufacturing" 
            className="w-full h-full object-cover opacity-15 mix-blend-screen"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2D7FF9]/20 text-[#6BAFFF] font-semibold text-sm mb-6 border border-[#2D7FF9]/30">
              <BarChart3 className="w-4 h-4" /> Flagship Analytics
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">AIDA</h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D7FF9] to-[#FF7A1A]">AI Based Data Analytics Platform</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Transform raw industrial and enterprise data into actionable predictive insights. AIDA connects directly to your operational databases to forecast trends, identify bottlenecks, and optimize resource allocation in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] text-white hover:from-[#FF8A2A] hover:to-[#FF5D10]" asChild>
                <Link href="/contact">Talk to Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-gray-50/80">
        <SectionHeader title="Core Capabilities" subtitle="Platform Features" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Predictive Analytics", desc: "Machine learning models forecast machine failures and demand spikes before they happen." },
            { icon: Layers, title: "Operational Intelligence", desc: "Aggregate siloed data streams into a single pane of glass for management." },
            { icon: RefreshCw, title: "Real-time Dashboards", desc: "Live visualization of critical KPIs with sub-second latency updates." },
            { icon: Settings, title: "Production Data Analysis", desc: "Deep dive into assembly line metrics to optimize yield and reduce scrap." },
            { icon: BarChart3, title: "Supply Chain Analytics", desc: "Track inventory velocity and supplier performance dynamically." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Why Choose AIDA?" align="left" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {[
              "30% Productivity Improvement",
              "Real-time Decision Making",
              "Significant Cost Reduction",
              "100% Operational Transparency",
              "Automated Reporting",
              "Seamless API Integrations"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                <span className="font-semibold text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
