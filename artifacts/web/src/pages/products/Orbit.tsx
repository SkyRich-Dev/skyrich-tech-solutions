import { MainLayout } from "@/components/layout/MainLayout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Users, Target, MessageSquare, TrendingUp, Filter } from "lucide-react";

export default function OrbitProduct() {
  return (
    <MainLayout>
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/orbit-abstract.png`} 
            alt="Orbit CRM Background" 
            className="w-full h-full object-cover opacity-15 mix-blend-screen"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-semibold text-sm mb-6 border border-purple-500/30 mx-auto">
            <Users className="w-4 h-4" /> Business Growth
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">Orbit CRM</h1>
          <h2 className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">Future Smart CRM for SMEs</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Scale your business relationships effortlessly. Orbit CRM is built specifically for SMEs, offering powerful lead management, automated engagement, and performance analytics without the enterprise complexity.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
            <Link href="/contact">Talk to Expert</Link>
          </Button>
        </div>
      </section>

      <Section className="bg-gray-50/80">
        <SectionHeader title="Accelerate Your Sales" subtitle="CRM Features" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Filter, title: "Lead Management", desc: "Capture, score, and route leads automatically." },
            { icon: Target, title: "Sales Pipeline", desc: "Visual drag-and-drop boards to track deals." },
            { icon: MessageSquare, title: "Customer Engagement", desc: "Automated follow-ups and email sequencing." },
            { icon: TrendingUp, title: "Performance Analytics", desc: "Track win rates and team performance." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
}
