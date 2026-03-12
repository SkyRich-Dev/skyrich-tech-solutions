import { MainLayout } from "@/components/layout/MainLayout";
import { Section } from "@/components/ui/Section";
import { Link } from "wouter";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    title: "The Dawn of Industry 4.0: What It Means for Manufacturing",
    category: "Industry 4.0",
    date: "Oct 12, 2024",
    author: "Dr. Sarah Chen",
    excerpt: "Explore how interconnected sensors and predictive AI are reshaping the factory floor, driving unprecedented efficiency.",
  },
  {
    title: "How Visual Analytics is Reducing QA Costs by 40%",
    category: "AI & ML",
    date: "Sep 28, 2024",
    author: "Michael Roberts",
    excerpt: "Computer vision models are now capable of detecting micro-fractures on assembly lines faster and more accurately than human inspectors.",
  },
  {
    title: "Securing the IoT Edge: Challenges and Solutions",
    category: "Cybersecurity",
    date: "Sep 15, 2024",
    author: "Elena Rodriguez",
    excerpt: "As more devices connect to the enterprise network, the attack surface expands. Learn how to implement zero-trust at the edge.",
  },
  {
    title: "Digital Transformation in Logistics: A Case Study",
    category: "Digital Transformation",
    date: "Aug 30, 2024",
    author: "James Wilson",
    excerpt: "How a leading shipping company utilized our AIDA platform to optimize routes and save millions in fuel costs.",
  },
  {
    title: "Smart Manufacturing: Beyond the Hype",
    category: "Smart Manufacturing",
    date: "Aug 12, 2024",
    author: "Dr. Sarah Chen",
    excerpt: "Practical steps for mid-sized manufacturers to begin their automation journey without massive upfront capital expenditure.",
  },
  {
    title: "The Role of CRM in SME Growth",
    category: "Business Strategy",
    date: "Jul 25, 2024",
    author: "Anita Patel",
    excerpt: "Why spreadsheets are killing your sales, and how intelligent CRMs like Orbit can automate follow-ups and close more deals.",
  }
];

export default function Insights() {
  return (
    <MainLayout>
      <div className="pt-32 pb-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">Insights & Resources</h1>
          <p className="text-xl text-gray-300">Expert perspectives on enterprise technology, AI, and digital transformation.</p>
        </div>
      </div>

      <Section>
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {["All", "Industry 4.0", "AI & ML", "Smart Manufacturing", "Cybersecurity", "Digital Transformation"].map(cat => (
            <button key={cat} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-primary shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</div>
                  <div className="flex items-center gap-1"><User className="w-3 h-3"/> {post.author}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
}
