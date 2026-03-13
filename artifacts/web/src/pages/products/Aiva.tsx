import { MainLayout } from "@/components/layout/MainLayout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Eye, AlertTriangle, MonitorPlay, FileVideo, Crosshair } from "lucide-react";
import { SEOHead, createBreadcrumbSchema, createProductSchema } from "@/components/SEOHead";

export default function AivaProduct() {
  return (
    <MainLayout>
      <SEOHead
        title="AIVA - AI Visual Analytics Platform | Machine Vision & Quality Inspection"
        description="AIVA by SkyRich Tech Solutions is an AI-powered visual analytics platform using machine vision and computer vision to monitor assembly lines, detect defects, and automate quality inspection in manufacturing."
        keywords="visual analytics platform, AI dashboards, business intelligence AI, machine vision solutions, vision camera systems, automated quality inspection, computer vision manufacturing, AI based manufacturing analytics platform"
        structuredData={[
          createBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Products", url: "/products" }, { name: "AIVA", url: "/products/aiva" }]),
          createProductSchema({ name: "AIVA - AI Visual Analytics Platform", description: "Intelligent computer vision for manufacturing quality inspection, anomaly detection, and visual KPI tracking.", url: "/products/aiva", category: "BusinessApplication" }),
        ]}
      />
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/aiva-abstract.jpg`} 
            alt="AIVA AI visual analytics platform for manufacturing quality inspection" 
            className="w-full h-full object-cover opacity-15 mix-blend-screen"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF7A1A]/20 text-[#FFB070] font-semibold text-sm mb-6 border border-[#FF7A1A]/30">
              <Eye className="w-4 h-4" /> Computer Vision
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">AIVA</h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gradient-orange mb-6">AI Based Visual Analytics Platform</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Equip your facility with intelligent eyes. AIVA processes live CCTV and industrial camera feeds to automatically detect defects, monitor safety compliance, and calculate visual KPIs with superhuman precision.
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
            { icon: MonitorPlay, title: "Visual Analytics Dashboards", desc: "See what your cameras see, translated into charts and metrics." },
            { icon: AlertTriangle, title: "AI Anomaly Detection", desc: "Instantly flag physical defects on assembly lines or safety protocol breaches." },
            { icon: Crosshair, title: "Real-time KPI Monitoring", desc: "Track throughput and cycle times visually without physical sensors." },
            { icon: FileVideo, title: "Interactive Reports", desc: "Generate visual audit trails and compliance reports automatically." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 p-8 rounded-2xl border-t-4 border-t-[#FF7A1A] hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Deep Learning", "Edge Computing", "Real-time Inference", "Cloud Aggregation", "Neural Networks"].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-full border border-gray-300 bg-white text-foreground font-medium shadow-sm">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
