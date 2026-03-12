import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from "lucide-react";

const logoUrl = `${import.meta.env.BASE_URL}images/skyrich-logo.png`;

export function Footer() {
  return (
    <footer className="bg-[#0A1F3C] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-[#2D7FF9]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img src={logoUrl} alt="SkyRich Tech Solutions" className="h-12 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Innovating industries through intelligent automation, AI analytics, and robust cloud infrastructure. Our mission is to transform 500 industries by 2030.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#2D7FF9] hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Products</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/products/aida" className="text-gray-400 hover:text-[#2D7FF9] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all"/> AIDA Analytics</Link></li>
              <li><Link href="/products/aiva" className="text-gray-400 hover:text-[#2D7FF9] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all"/> AIVA Vision</Link></li>
              <li><Link href="/products/orbit-crm" className="text-gray-400 hover:text-[#2D7FF9] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Orbit CRM</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-gray-400 hover:text-[#2D7FF9] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-[#2D7FF9] transition-colors">Services</Link></li>
              <li><Link href="/insights" className="text-gray-400 hover:text-[#2D7FF9] transition-colors">Insights</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-[#2D7FF9] transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#2D7FF9] shrink-0 mt-0.5" />
                <a href="mailto:info@skyrichtechsolutions.com" className="hover:text-white transition-colors break-all">info@skyrichtechsolutions.com</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#2D7FF9] shrink-0 mt-0.5" />
                <a href="tel:+919384801120" className="hover:text-white transition-colors">+91 9384801120</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#2D7FF9] shrink-0 mt-0.5" />
                <span>Perungudi, Chennai, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SkyRich Tech Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
