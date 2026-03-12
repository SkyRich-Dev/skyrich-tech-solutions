import { MainLayout } from "@/components/layout/MainLayout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Cpu, Database, Cloud, Activity, Shield, Code, Server, Network } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Cpu, title: "IoT & Smart Manufacturing", desc: "Implement industrial IoT sensors to capture machine telemetry, track performance, and automate production lines with real-time feedback loops." },
  { icon: Database, title: "AI & Data Analytics", desc: "Leverage machine learning to process structured and unstructured data, uncovering hidden patterns for predictive maintenance and demand forecasting." },
  { icon: Cloud, title: "Cloud Infrastructure Setup", desc: "Design, deploy, and manage highly available cloud architectures on AWS, Azure, or GCP tailored for enterprise workloads." },
  { icon: Activity, title: "Automation & Robotics", desc: "Integrate RPA (Robotic Process Automation) and physical robotics into legacy workflows to maximize throughput and minimize human error." },
  { icon: Shield, title: "Enterprise Cybersecurity", desc: "End-to-end security audits, threat monitoring, and zero-trust architecture implementation to protect sensitive corporate data." },
  { icon: Code, title: "Custom Software Development", desc: "Full-stack development of bespoke enterprise applications designed to solve unique operational challenges." },
  { icon: Server, title: "Data Center Modernization", desc: "Migrate legacy on-premise systems to hybrid or fully cloud-native environments without operational downtime." },
  { icon: Network, title: "Network Architecture", desc: "Design high-bandwidth, low-latency corporate networks to support heavy data streams from IoT and Edge devices." }
];

export default function Services() {
  return (
    <MainLayout>
      <div className="pt-32 pb-10 px-6 bg-gradient-primary relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2D7FF9]/20 blur-[150px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">Our Services</h1>
          <p className="text-xl text-gray-300">Comprehensive technology solutions designed to architect the future of your business.</p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-gray-200 p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-start hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="w-16 h-16 shrink-0 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary border border-primary/20">
                <service.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
}
