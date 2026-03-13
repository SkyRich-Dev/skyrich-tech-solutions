import { MainLayout } from "@/components/layout/MainLayout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Target, Lightbulb, MapPin, CheckCircle2, Globe, Factory, Car, Stethoscope, Zap, Truck, Cog, Brain, Eye, Cpu, Cloud, BarChart3, Database, Workflow, Shield, Lock, TrendingUp, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEOHead, organizationSchema, createBreadcrumbSchema } from "@/components/SEOHead";

const offices = [
  { country: "India", flag: "🇮🇳", cities: ["Chennai (Head Office)", "Mumbai"] },
  { country: "Singapore", flag: "🇸🇬", cities: ["Singapore"] },
  { country: "Malaysia", flag: "🇲🇾", cities: ["Malaysia"] },
  { country: "Thailand", flag: "🇹🇭", cities: ["Thailand"] },
];

const industries = [
  { name: "Automotive", icon: Car },
  { name: "Manufacturing", icon: Factory },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Energy & Utilities", icon: Zap },
  { name: "Logistics & Supply Chain", icon: Truck },
  { name: "Industrial Automation", icon: Cog },
];

const differentiators = [
  "Industry-focused digital transformation",
  "Practical implementation of AI and IoT technologies",
  "Scalable enterprise platforms for modern businesses",
  "End-to-end technology consulting and deployment",
  "Long-term partnerships with clients",
];

const expertise = [
  { name: "AI & Machine Learning Platforms", icon: Brain },
  { name: "Industrial IoT Solutions", icon: Cpu },
  { name: "Smart Manufacturing Systems", icon: Factory },
  { name: "Data Analytics & Visualization", icon: BarChart3 },
  { name: "Enterprise Software Platforms", icon: Database },
  { name: "Cloud Infrastructure", icon: Cloud },
  { name: "Digital Automation", icon: Workflow },
];

const commitmentValues = [
  { label: "Reliable", icon: Shield },
  { label: "Scalable", icon: TrendingUp },
  { label: "Secure", icon: Lock },
  { label: "Data-driven", icon: BarChart3 },
];

export default function About() {
  return (
    <MainLayout>
      <SEOHead
        title="About SkyRich Tech Solutions | Industry 4.0 Solutions Provider Since 2014"
        description="Founded in 2014, SkyRich Tech Solutions is a leading Industry 4.0 solutions provider delivering AI, IoT, and smart manufacturing platforms across India, Singapore, Malaysia, and Thailand."
        keywords="about SkyRich Tech Solutions, Industry 4.0 solutions company, smart manufacturing technology provider, AI manufacturing analytics platform, enterprise technology company India, digital transformation partner"
        structuredData={[organizationSchema, createBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])]}
      />
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/about-building.jpg`} 
            alt="SkyRich Tech Solutions corporate headquarters in Chennai India" 
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">About SkyRich</h1>
          <p className="text-2xl font-medium mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D7FF9] to-[#FF7A1A]">Transforming Industries Through Technology Since 2014</span>
          </p>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Founded in 2014, SkyRich Tech Solutions has been at the forefront of delivering innovative technology solutions that help organizations modernize operations, unlock data-driven insights, and accelerate digital transformation.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Over the past decade, SkyRich has partnered with businesses across the globe to implement Industry 4.0 technologies, intelligent automation systems, and enterprise-grade software platforms that enable smarter, faster, and more efficient operations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              From small and medium enterprises to large global corporations, we empower organizations with advanced solutions in AI, IoT, data analytics, cloud computing, and enterprise platforms.
            </p>
            <div className="bg-gradient-to-r from-[#2D7FF9]/5 to-[#FF7A1A]/5 border border-primary/10 rounded-2xl p-8 mt-8">
              <p className="text-xl font-bold text-foreground leading-relaxed">
                Our mission is simple: <span className="text-gradient">help businesses harness technology to build intelligent, future-ready operations.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gray-50/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <Lightbulb className="w-12 h-12 text-[#FF7A1A] mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become a global leader in intelligent industrial technology, empowering organizations worldwide with innovative solutions that drive efficiency, sustainability, and growth.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <Target className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To transform 500+ industries by 2030 through advanced technologies including:
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {["Artificial Intelligence", "Industrial IoT", "Data Analytics", "Smart Manufacturing Platforms", "Intelligent Enterprise Systems"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Our Global Presence" subtitle="Where We Operate" align="center" />
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12 -mt-8">
          SkyRich Tech Solutions operates across multiple regions to support clients with localized expertise and global capabilities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {offices.map((office, i) => (
            <motion.div
              key={office.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center group"
            >
              <div className="text-5xl mb-4">{office.flag}</div>
              <h4 className="text-xl font-bold mb-3">{office.country}</h4>
              <div className="space-y-1">
                {office.cities.map((city) => (
                  <div key={city} className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {city}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50/80">
        <SectionHeader title="Industries We Serve" subtitle="Cross-Domain Expertise" align="center" />
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12 -mt-8">
          SkyRich Tech Solutions has successfully implemented technology solutions across diverse industries. By combining deep industry expertise with advanced technology platforms, we help organizations optimize processes, reduce operational risks, and achieve sustainable growth.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ind.icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-foreground leading-tight">{ind.name}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-bold tracking-wider uppercase text-sm mb-4 block text-[#FF7A1A]">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-foreground">What Makes SkyRich Different</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At SkyRich Tech Solutions, we believe technology should deliver real business outcomes, not just innovation. We work closely with organizations to understand operational challenges and design solutions that deliver measurable impact.
            </p>
            <div className="space-y-4">
              {differentiators.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#2D7FF9]/10 to-[#FF7A1A]/10 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-primary rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Expertise</h3>
              <p className="text-gray-300 text-sm mb-6">SkyRich Tech Solutions combines technology innovation with real-world implementation experience.</p>
              <div className="grid grid-cols-1 gap-3">
                {expertise.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#FF7A1A] shrink-0" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gray-50/80">
        <SectionHeader title="Our Flagship Platforms" subtitle="Products We Build" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: "AIDA", desc: "AI-based Data Analytics Platform", link: "/products/aida", icon: BarChart3, color: "from-[#2D7FF9] to-[#0A1F3C]" },
            { name: "AIVA", desc: "AI-based Visual Analytics Platform", link: "/products/aiva", icon: Eye, color: "from-[#FF7A1A] to-[#FF4D00]" },
            { name: "Orbit CRM", desc: "Future Smart CRM for SMEs", link: "/products/orbit-crm", icon: Users, color: "from-indigo-500 to-purple-600" },
          ].map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-[2px] rounded-2xl overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-100 transition-opacity ${product.color}`} />
              <div className="relative bg-white rounded-[14px] p-6 text-center h-full flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <product.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.desc}</p>
                <Button asChild variant="outline" size="sm" className="mt-auto hover:bg-primary/5">
                  <Link href={product.link}>Learn More <ArrowRight className="ml-1 w-3 h-3" /></Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Our Commitment" subtitle="What We Stand For" align="center" />
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12 -mt-8">
          We believe the future of industries lies in intelligent, connected, and automated systems. At SkyRich Tech Solutions, we are committed to helping organizations transition into this future.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {commitmentValues.map((val, i) => (
            <motion.div
              key={val.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                <val.icon className="w-7 h-7" />
              </div>
              <p className="font-bold text-foreground">{val.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-primary">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let's Build the Future Together</h2>
          <p className="text-xl text-gray-300 mb-10">
            Whether you are a growing SME or a global enterprise, SkyRich Tech Solutions is your trusted partner in building intelligent, technology-driven operations.
          </p>
          <Button size="lg" className="text-lg px-10 h-14 shadow-2xl bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] hover:from-[#FF8A2A] hover:to-[#FF5D10] text-white" asChild>
            <Link href="/contact">Talk to Expert</Link>
          </Button>
        </div>
      </Section>
    </MainLayout>
  );
}
