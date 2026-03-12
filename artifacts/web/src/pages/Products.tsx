import { MainLayout } from "@/components/layout/MainLayout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Eye, Users } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: "aida",
      name: "AIDA",
      title: "AI Based Data Analytics Platform",
      icon: BarChart3,
      desc: "Harness the power of your enterprise data. AIDA ingests massive streams of operational data to provide predictive insights, unearth inefficiencies, and deliver actionable intelligence in real-time.",
      features: ["Predictive Analytics", "Operational Intelligence", "Real-time Dashboards"],
      link: "/products/aida",
      image: `${import.meta.env.BASE_URL}images/aida-abstract.png`
    },
    {
      id: "aiva",
      name: "AIVA",
      title: "AI Based Visual Analytics Platform",
      icon: Eye,
      desc: "Give your operations the power of sight. AIVA utilizes advanced computer vision to monitor assembly lines, detect anomalies, and track spatial KPIs without human intervention.",
      features: ["Visual Dashboards", "Anomaly Detection", "Automated QA"],
      link: "/products/aiva",
      image: `${import.meta.env.BASE_URL}images/aiva-abstract.png`
    },
    {
      id: "orbit",
      name: "Orbit CRM",
      title: "Future Smart CRM for SMEs",
      icon: Users,
      desc: "Supercharge your sales and customer relations. Orbit CRM brings enterprise-grade automation and intelligent pipeline tracking to growing small and medium businesses.",
      features: ["Lead Management", "Sales Automation", "Performance Analytics"],
      link: "/products/orbit-crm",
      image: `${import.meta.env.BASE_URL}images/orbit-abstract.png`
    }
  ];

  return (
    <MainLayout>
      <div className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6">Our Platforms</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Deploy specialized intelligent systems designed to solve complex business problems instantly.</p>
      </div>

      <div className="flex flex-col gap-0">
        {products.map((prod, i) => (
          <Section key={prod.id} className={i % 2 !== 0 ? "bg-gray-50" : ""}>
            <div className={`flex flex-col ${i % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}>
              <div className="flex-1 w-full relative">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-200 shadow-xl relative"
                >
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#2D7FF9]/30 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                      <prod.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl font-black text-white drop-shadow-lg">{prod.name}</h2>
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 w-full space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold text-gradient mb-4">{prod.title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {prod.desc}
                  </p>
                  
                  <div className="space-y-3 mb-10">
                    {prod.features.map(f => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="font-medium text-foreground/90">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="px-8" asChild>
                    <Link href={prod.link}>Discover {prod.name} <ArrowRight className="ml-2 w-5 h-5"/></Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </Section>
        ))}
      </div>
    </MainLayout>
  );
}
