import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Database, Cloud, Activity, Shield, Factory, Car, Stethoscope, Zap, Truck, ChevronLeft, ChevronRight, BarChart3, Eye, Users, Sparkles, Calendar, User } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { SEOHead, organizationSchema, localBusinessSchema } from "@/components/SEOHead";

import { blogArticles } from "@/data/blog-articles";
const insightsPosts = blogArticles.slice(0, 3);

const industries = [
  { name: "Manufacturing", icon: Factory, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", alt: "Smart manufacturing IoT factory automation solutions" },
  { name: "Automotive", icon: Car, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80", alt: "Automotive manufacturing digital transformation and car manufacturing automation" },
  { name: "Healthcare", icon: Stethoscope, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80", alt: "Healthcare technology solutions and AI diagnostics" },
  { name: "Energy", icon: Zap, image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80", alt: "Smart energy monitoring systems for power grid optimization" },
  { name: "Logistics", icon: Truck, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", alt: "Logistics and supply chain analytics automation" },
  { name: "Retail", icon: Users, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", alt: "Retail analytics and inventory management systems" },
  { name: "Telecom", icon: Activity, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", alt: "Telecommunications network infrastructure and IoT solutions" },
  { name: "Finance", icon: BarChart3, image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80", alt: "Financial analytics and AI-powered fraud detection" },
];

const heroSlides = [
  {
    badge: "Pioneering Industry 4.0",
    title: "Innovating Industries",
    titleLine2: "with",
    highlight: "SkyRich",
    subtitle: "Empowering enterprises with IoT, AI, cloud computing, and Industry 4.0 platforms to drive intelligent digital transformation.",
    image: "hero-abstract.jpg",
    stats: [
      { value: "500+", label: "Industries Targeted" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "40%", label: "Cost Reduction" },
    ],
  },
  {
    badge: "AI-Powered Analytics",
    title: "Unlock Insights",
    titleLine2: "with",
    highlight: "AIDA Platform",
    subtitle: "Transform raw operational data into powerful predictive insights using machine learning and AI-driven analytics.",
    image: "aida-abstract.jpg",
    stats: [
      { value: "10x", label: "Faster Insights" },
      { value: "30%", label: "Productivity Gain" },
      { value: "Real-time", label: "Dashboards" },
    ],
  },
  {
    badge: "Visual Intelligence",
    title: "See Smarter",
    titleLine2: "with",
    highlight: "AIVA Platform",
    subtitle: "Convert complex datasets into intuitive visual dashboards and AI-powered visual insights for faster decision making.",
    image: "aiva-abstract.jpg",
    stats: [
      { value: "AI", label: "Anomaly Detection" },
      { value: "Live", label: "KPI Monitoring" },
      { value: "Zero", label: "Blind Spots" },
    ],
  },
  {
    badge: "Future Smart CRM",
    title: "Grow Faster",
    titleLine2: "with",
    highlight: "Orbit CRM",
    subtitle: "Next-generation intelligent CRM designed for small and medium businesses to manage leads, customers, and analytics.",
    image: "orbit-abstract.jpg",
    stats: [
      { value: "3x", label: "Lead Conversion" },
      { value: "Auto", label: "Follow-ups" },
      { value: "360\u00B0", label: "Customer View" },
    ],
  },
];

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={cn("absolute rounded-full pointer-events-none", className)}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function GridPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <MainLayout>
      <SEOHead
        title="SkyRich Tech Solutions | Industry 4.0 & Smart Manufacturing Solutions"
        description="SkyRich Tech Solutions delivers AI, IoT, smart manufacturing, and Industry 4.0 platforms including AIDA analytics, AIVA visual intelligence, and Orbit CRM. Enterprise digital transformation since 2014."
        keywords="Industry 4.0, smart manufacturing, AI data analytics, manufacturing automation, IoT solutions, AIDA, AIVA, Orbit CRM, digital transformation, predictive maintenance, factory automation, assembly line software, plant management software, manufacturing ERP, CNC monitoring software, energy monitoring systems"
        structuredData={[organizationSchema, localBusinessSchema]}
      />
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060e1a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3C] via-[#0d2847] to-[#091a30]" />

        <GridPattern />

        <FloatingOrb className="top-[10%] left-[5%] w-[500px] h-[500px] bg-[#2D7FF9]/[0.07] blur-[130px]" delay={0} />
        <FloatingOrb className="bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#FF7A1A]/[0.06] blur-[120px]" delay={3} />
        <FloatingOrb className="top-[50%] left-[50%] w-[300px] h-[300px] bg-[#2D7FF9]/[0.04] blur-[100px]" delay={5} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/${slide.image}`}
              alt=""
              className="w-full h-full object-cover opacity-10 mix-blend-screen"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060e1a] to-transparent z-[2]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2D7FF9]/20 to-[#FF7A1A]/20 border border-white/10 backdrop-blur-sm mb-8"
                  >
                    <Sparkles className="w-4 h-4 text-[#FF7A1A]" />
                    <span className="text-sm font-semibold tracking-wider uppercase text-white/80">{slide.badge}</span>
                  </motion.div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-2">
                    <span className="text-white">{slide.title}</span>
                  </h1>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8">
                    <span className="text-white/60">{slide.titleLine2} </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D7FF9] via-[#6BA3FF] to-[#FF7A1A]">{slide.highlight}</span>
                  </h1>

                  <p className="text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] hover:from-[#FF8A2A] hover:to-[#FF5D10] text-white shadow-[0_8px_30px_rgba(255,122,26,0.3)] hover:shadow-[0_8px_40px_rgba(255,122,26,0.45)] transition-all" asChild>
                  <Link href="/contact">Talk to Expert</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-white/20 text-white hover:bg-white/10 bg-white/[0.03] backdrop-blur-sm" asChild>
                  <Link href="/products">Explore Solutions <ArrowRight className="ml-2 w-5 h-5"/></Link>
                </Button>
              </motion.div>

              <div className="flex items-center gap-4">
                <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                      style={{ width: i === currentSlide ? 40 : 12 }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full" />
                      {i === currentSlide && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#2D7FF9] to-[#FF7A1A] rounded-full"
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 6, ease: "linear" }}
                          key={`progress-${currentSlide}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.7 }}
                  className="relative"
                >
                  <div className="absolute -inset-8 bg-gradient-to-br from-[#2D7FF9]/20 to-[#FF7A1A]/10 rounded-[40px] blur-2xl" />

                  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {slide.stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="text-center p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                        >
                          <div className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">{stat.value}</div>
                          <div className="text-xs text-white/40 mt-1 font-medium uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border border-white/5">
                      <img
                        src={`${import.meta.env.BASE_URL}images/${slide.image}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/60 via-transparent to-transparent" />
                    </div>

                    <div className="flex items-center justify-between mt-6 px-2">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d2847] bg-gradient-to-br from-[#2D7FF9]/40 to-[#FF7A1A]/30 flex items-center justify-center">
                            <span className="text-[10px] text-white/70 font-bold">{['AI', 'ML', 'IoT', 'CRM'][i]}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-white/40 font-medium">Live Platform</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-1 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Enterprise Clients" },
              { value: "15+", label: "Industries Served" },
              { value: "99.9%", label: "Platform Uptime" },
              { value: "50M+", label: "Data Points / Day" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Section id="services">
        <SectionHeader 
          title="Transformative Technology Solutions" 
          subtitle="Our Expertise"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Cpu, title: "IoT & Smart Manufacturing", desc: "Connect your physical operations to the digital world for real-time monitoring and control." },
            { icon: Database, title: "AI & Data Analytics", desc: "Turn massive datasets into actionable insights with predictive AI models." },
            { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable, secure, and robust cloud architectures built for enterprise demands." },
            { icon: Activity, title: "Automation & Robotics", desc: "Streamline workflows and reduce human error with intelligent automation." },
            { icon: Shield, title: "Cybersecurity", desc: "Military-grade protection for your enterprise data and critical infrastructure." }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-200 p-8 rounded-2xl group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="products" className="bg-gray-50/80">
        <SectionHeader 
          title="Flagship Platforms" 
          subtitle="Enterprise Products"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              name: "AIDA",
              tagline: "AI Based Data Analytics",
              desc: "Predictive analytics and real-time operational intelligence dashboard.",
              link: "/products/aida",
              color: "from-[#2D7FF9] to-[#0A1F3C]",
              icon: BarChart3,
            },
            {
              name: "AIVA",
              tagline: "AI Based Visual Analytics",
              desc: "Computer vision platform for real-time anomaly detection and KPI tracking.",
              link: "/products/aiva",
              color: "from-[#FF7A1A] to-[#FF4D00]",
              icon: Eye,
            },
            {
              name: "Orbit CRM",
              tagline: "Future Smart CRM",
              desc: "Intelligent lead management and sales automation for growing SMEs.",
              link: "/products/orbit-crm",
              color: "from-indigo-500 to-purple-600",
              icon: Users,
            }
          ].map((prod, i) => (
            <motion.div
              key={prod.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative p-[2px] rounded-3xl overflow-hidden group"
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-100 transition-opacity duration-500", prod.color)} />
              <div className="relative h-full bg-white rounded-[22px] p-8 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <prod.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black mb-2 text-foreground">{prod.name}</h3>
                <p className="text-primary font-semibold mb-4 text-sm tracking-wide uppercase">{prod.tagline}</p>
                <p className="text-muted-foreground mb-8 flex-grow">{prod.desc}</p>
                <Button asChild variant="outline" className="w-full mt-auto hover:bg-primary/5 hover:border-primary/30">
                  <Link href={prod.link}>View Platform <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <section className="bg-gradient-primary relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <SectionHeader 
            title="Industries We Empower" 
            subtitle="Cross-Domain Expertise"
            align="center"
            light
          />
        </div>

        <div className="relative mt-8 space-y-6">
          <div className="overflow-hidden">
            <div className="animate-marquee flex gap-6 w-max">
              {[...industries, ...industries].map((ind, i) => (
                <div key={`row1-${i}`} className="relative w-[320px] h-[200px] rounded-2xl overflow-hidden group shrink-0" data-cursor-hover>
                  <img src={ind.image} alt={ind.alt || `${ind.name} industry solutions`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/90 via-[#0A1F3C]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#FF7A1A]">
                      <ind.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white font-bold text-lg">{ind.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="animate-marquee-reverse flex gap-6 w-max">
              {[...industries.slice(4), ...industries.slice(0, 4), ...industries.slice(4), ...industries.slice(0, 4)].map((ind, i) => (
                <div key={`row2-${i}`} className="relative w-[320px] h-[200px] rounded-2xl overflow-hidden group shrink-0" data-cursor-hover>
                  <img src={ind.image} alt={ind.alt || `${ind.name} industry solutions`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/90 via-[#0A1F3C]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#FF7A1A]">
                      <ind.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white font-bold text-lg">{ind.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader 
          title="Latest Insights" 
          subtitle="From Our Blog"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insightsPosts.map((post, i) => (
            <Link key={post.slug} href={`/insights/${post.slug}`} className="block">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-primary shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</div>
                    <div className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="hover:bg-primary/5 hover:border-primary/30">
            <Link href="/insights">View All Insights <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D7FF9] to-[#0A1F3C]" />
          
          <div className="relative z-10 py-20 px-8 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to transform your enterprise?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join the leading organizations leveraging SkyRich to dominate their markets.</p>
            <Button size="lg" className="text-lg px-10 h-14 shadow-2xl bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] hover:from-[#FF8A2A] hover:to-[#FF5D10] text-white" asChild>
              <Link href="/contact">Talk to Expert</Link>
            </Button>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
