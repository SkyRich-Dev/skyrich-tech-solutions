import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainLayout } from "@/components/layout/MainLayout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will get back to you within 24 hours.",
    });
    reset();
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground">Ready to start your digital transformation journey? Our experts are here to help.</p>
        </div>
      </div>

      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                  <p className="text-muted-foreground mb-1">For general inquiries and support:</p>
                  <a href="mailto:info@skyrichtechsolutions.com" className="text-primary hover:underline font-medium break-all">info@skyrichtechsolutions.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                  <p className="text-muted-foreground mb-1">Mon-Fri from 9am to 6pm IST:</p>
                  <a href="tel:+919384801120" className="text-primary hover:underline font-medium">+91 9384801120</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Headquarters</h4>
                  <p className="text-muted-foreground">Perungudi,<br/>Chennai, Tamil Nadu,<br/>India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Full Name</label>
                <input 
                  {...register("name")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Business Email</label>
                <input 
                  {...register("email")}
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@company.com"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Company Name</label>
                <input 
                  {...register("company")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Acme Corp"
                />
                {errors.company && <p className="text-destructive text-sm mt-1">{errors.company.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
                <textarea 
                  {...register("message")}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] hover:from-[#FF8A2A] hover:to-[#FF5D10] text-white" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : <><Send className="w-4 h-4 mr-2"/> Send Message</>}
              </Button>
            </form>
          </div>

        </div>
      </Section>
    </MainLayout>
  );
}
