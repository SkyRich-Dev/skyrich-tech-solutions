import { MainLayout } from "@/components/layout/MainLayout";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";

export default function Careers() {
  const jobs = [
    { title: "Senior AI Engineer", dept: "Engineering", type: "Full-time", loc: "Chennai, India / Remote" },
    { title: "Enterprise Account Executive", dept: "Sales", type: "Full-time", loc: "Chennai, India" },
    { title: "React Frontend Developer", dept: "Engineering", type: "Full-time", loc: "Remote" },
    { title: "Data Scientist (Computer Vision)", dept: "Research", type: "Full-time", loc: "Chennai, India" },
  ];

  return (
    <MainLayout>
      <SEOHead
        title="Careers at SkyRich Tech Solutions | Join Our Innovation Team"
        description="Join SkyRich Tech Solutions and help build the next generation of enterprise technology. Explore career opportunities in AI engineering, data science, software development, and more across Chennai, India."
        keywords="technology careers, AI engineer jobs, data scientist jobs, software developer jobs Chennai, enterprise technology careers, Industry 4.0 jobs, manufacturing technology careers"
        structuredData={[createBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Careers", url: "/careers" }])]}
      />
      <div className="pt-32 pb-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">Build the Future With Us</h1>
          <p className="text-xl text-gray-300">Join a culture of relentless innovation. We are always looking for brilliant minds to help us build the next generation of enterprise technology.</p>
        </div>
      </div>

      <Section>
        <SectionHeader title="Open Positions" align="left" />
        <div className="flex flex-col gap-4">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/50 hover:shadow-lg transition-all">
              <div>
                <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> {job.dept}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {job.type}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.loc}</span>
                </div>
              </div>
              <Button>Apply Now</Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 rounded-2xl border border-gray-200 bg-gray-50 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-3">Don't see a fit?</h3>
          <p className="text-muted-foreground mb-6">We're always open to meeting talented individuals. Send your resume to careers@skyrichtechsolutions.com</p>
          <Button variant="outline" asChild><a href="mailto:careers@skyrichtechsolutions.com">Email Resume</a></Button>
        </div>
      </Section>
    </MainLayout>
  );
}
