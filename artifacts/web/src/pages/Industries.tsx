import { MainLayout } from "@/components/layout/MainLayout";
import { Section } from "@/components/ui/Section";
import { Factory, Car, Stethoscope, Zap, Truck, Building2, ShoppingCart, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  { icon: Factory, name: "Manufacturing", desc: "Optimize assembly lines, implement predictive maintenance, and achieve Industry 4.0 standards with our IoT and AI solutions." },
  { icon: Car, name: "Automotive", desc: "Accelerate R&D, streamline supply chains, and enhance connected vehicle analytics." },
  { icon: Stethoscope, name: "Healthcare", desc: "Secure patient data infrastructure, automate administrative workflows, and utilize AI for diagnostic support." },
  { icon: Zap, name: "Energy", desc: "Monitor smart grids, forecast demand, and optimize resource distribution through predictive models." },
  { icon: Truck, name: "Logistics", desc: "Real-time fleet tracking, intelligent route optimization, and automated warehouse management." },
  { icon: Building2, name: "Real Estate", desc: "Smart building management systems for energy efficiency and predictive facility maintenance." },
  { icon: ShoppingCart, name: "Retail", desc: "Inventory forecasting, personalized customer analytics, and omnichannel integration." },
  { icon: Landmark, name: "Finance", desc: "Fraud detection algorithms, secure transaction ledgers, and automated compliance reporting." },
];

export default function Industries() {
  return (
    <MainLayout>
      <div className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#FF7A1A]/5 blur-[150px] pointer-events-none rounded-full" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-6">Industries We Serve</h1>
          <p className="text-xl text-muted-foreground">Tailored technological transformations for distinct vertical challenges.</p>
        </div>
      </div>

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-gray-200 p-8 rounded-3xl text-center group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                <ind.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">{ind.name}</h3>
              <p className="text-sm text-muted-foreground">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
}
