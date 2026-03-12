import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClass?: string;
}

export function Section({ children, className, id, containerClass }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative overflow-hidden", className)}>
      <div className={cn("max-w-7xl mx-auto px-6 md:px-12 relative z-10", containerClass)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, align = "center", light = false }: { title: string, subtitle?: string, align?: "left" | "center", light?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16", align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl")}
    >
      {subtitle && (
        <span className={cn("font-bold tracking-wider uppercase text-sm mb-4 block", light ? "text-[#FF7A1A]" : "text-secondary")}>
          {subtitle}
        </span>
      )}
      <h2 className={cn("text-3xl md:text-5xl font-extrabold mb-6 leading-tight", light ? "text-white" : "text-foreground")}>
        {title}
      </h2>
      <div className={cn("h-1 w-20 bg-gradient-to-r from-[#2D7FF9] to-[#FF7A1A] rounded-full", align === "center" && "mx-auto")} />
    </motion.div>
  );
}
