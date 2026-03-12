import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";

export default function TermsOfService() {
  return (
    <MainLayout>
      <SEOHead
        title="Terms of Service | SkyRich Tech Solutions"
        description="Terms of Service for SkyRich Tech Solutions. Read the terms and conditions governing the use of our website and services."
        keywords="terms of service, terms and conditions, SkyRich Tech Solutions"
        structuredData={[createBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Terms of Service", url: "/terms-of-service" }])]}
      />
      <div className="pt-32 pb-12 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Terms of Service</h1>
          <p className="text-gray-300">Last updated: March 12, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none text-gray-700">

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">1. Acceptance of Terms</h2>
            <p>Welcome to SkyRich Tech Solutions. These Terms of Service ("Terms") govern your access to and use of the website located at www.skyrichtechsolutions.com, as well as our products, services, and platforms including AIDA (AI Data Analytics), AIVA (AI Visual Analytics), and Orbit CRM (collectively, the "Services").</p>
            <p>By accessing or using our website and Services, you agree to be bound by these Terms. If you do not agree to all of these Terms, you must not access or use our Services. If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">2. Description of Services</h2>
            <p>SkyRich Tech Solutions provides enterprise technology solutions for the manufacturing and industrial sectors, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>AIDA Platform:</strong> AI-powered data analytics for manufacturing operations, predictive maintenance, energy monitoring, and production optimization</li>
              <li><strong>AIVA Platform:</strong> AI-based visual analytics for quality inspection, machine vision, and visual intelligence in manufacturing environments</li>
              <li><strong>Orbit CRM:</strong> Customer relationship management system designed for manufacturing companies and SMEs</li>
              <li><strong>Consulting Services:</strong> Industry 4.0 implementation, smart manufacturing consulting, and digital transformation advisory</li>
              <li><strong>Website Content:</strong> Insights, articles, resources, and educational content related to industrial technology</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">3. User Accounts and Registration</h2>
            <p>Certain features of our Services may require you to create an account. When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your information to keep it accurate and complete</li>
              <li>Maintain the security and confidentiality of your login credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="mt-3">We reserve the right to suspend or terminate accounts that violate these Terms or that have been inactive for an extended period.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">4. Intellectual Property Rights</h2>
            <p>All content, features, and functionality on our website and within our Services — including but not limited to text, graphics, logos, icons, images, audio clips, video, software, algorithms, data compilations, and the overall design and layout — are the exclusive property of SkyRich Tech Solutions or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
            <p className="mt-3">You may not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Reproduce, distribute, modify, or create derivative works from any content on our website without prior written consent</li>
              <li>Use our trademarks, trade names, or logos without express written permission</li>
              <li>Reverse engineer, decompile, or disassemble any software or technology provided through our Services</li>
              <li>Remove, alter, or obscure any proprietary notices or labels on our content</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">5. Acceptable Use</h2>
            <p>You agree to use our website and Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Use our Services in any way that violates applicable local, national, or international laws or regulations</li>
              <li>Attempt to gain unauthorized access to any portion of our Services, other accounts, computer systems, or networks</li>
              <li>Interfere with or disrupt the integrity or performance of our website or Services</li>
              <li>Transmit any viruses, malware, or other harmful code through our Services</li>
              <li>Use automated tools, bots, or scrapers to access our website without permission</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              <li>Collect or harvest any personally identifiable information from our website</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">6. Product and Service Terms</h2>
            <h3 className="text-xl font-semibold text-[#0A1F3C] mb-3">6.1 Software Platforms (AIDA, AIVA, Orbit CRM)</h3>
            <p>Access to and use of our software platforms is governed by separate license agreements provided at the time of purchase or subscription. These Terms apply in addition to any platform-specific agreements. In case of conflict, the platform-specific agreement shall prevail.</p>

            <h3 className="text-xl font-semibold text-[#0A1F3C] mb-3 mt-6">6.2 Consulting and Implementation Services</h3>
            <p>Consulting, implementation, and support services are governed by individual service agreements or statements of work (SOWs) executed between SkyRich Tech Solutions and the client. These Terms apply as baseline terms and conditions in addition to any specific service agreements.</p>

            <h3 className="text-xl font-semibold text-[#0A1F3C] mb-3 mt-6">6.3 Data Ownership</h3>
            <p>You retain ownership of all data you provide to or generate through our Services ("Your Data"). By using our Services, you grant us a limited, non-exclusive license to process, store, and analyze Your Data solely for the purpose of providing and improving our Services. We will not share Your Data with third parties except as described in our Privacy Policy.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">7. Payment Terms</h2>
            <p>For paid Services, the following terms apply:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Fees are as specified in the applicable service agreement, order form, or pricing schedule</li>
              <li>Payment is due within 30 days of invoice date unless otherwise agreed in writing</li>
              <li>All fees are exclusive of applicable taxes, duties, and levies, which shall be borne by the client</li>
              <li>Late payments may incur interest at the rate of 1.5% per month or the maximum rate permitted by law, whichever is lower</li>
              <li>We reserve the right to suspend Services for accounts with outstanding balances exceeding 60 days</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">8. Confidentiality</h2>
            <p>Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of the business relationship. Confidential information includes, but is not limited to, trade secrets, business plans, technical data, customer information, and financial information. This obligation of confidentiality survives the termination of these Terms for a period of three (3) years.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">9. Disclaimer of Warranties</h2>
            <p>Our website and Services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>
            <p className="mt-3">SkyRich Tech Solutions does not warrant that:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>The Services will function uninterrupted, secure, or error-free</li>
              <li>The results obtained from using the Services will be accurate or reliable</li>
              <li>Any errors in the Services will be corrected</li>
              <li>The Services will meet your specific requirements or expectations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, SkyRich Tech Solutions and its directors, officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, arising out of or in connection with your use of our website or Services.</p>
            <p className="mt-3">Our total aggregate liability for any claims arising out of or relating to these Terms or our Services shall not exceed the total fees paid by you to SkyRich Tech Solutions during the twelve (12) months preceding the claim.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">11. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless SkyRich Tech Solutions and its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of our Services, your violation of these Terms, or your violation of any rights of a third party.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">12. Termination</h2>
            <p>We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Your right to use the Services will immediately cease</li>
              <li>We may delete your account and any associated data, subject to applicable data retention requirements</li>
              <li>Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">13. Governing Law and Dispute Resolution</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India.</p>
            <p className="mt-3">Before initiating any formal legal proceedings, both parties agree to attempt to resolve disputes through good-faith negotiation. If the dispute cannot be resolved through negotiation within 30 days, either party may pursue resolution through the appropriate legal channels.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">14. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page with a revised "Last Updated" date. Your continued use of our Services after the posting of changes constitutes your acceptance of such changes. We encourage you to review these Terms periodically.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">15. Severability</h2>
            <p>If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">16. Entire Agreement</h2>
            <p>These Terms, together with our Privacy Policy and any applicable service agreements, constitute the entire agreement between you and SkyRich Tech Solutions regarding the use of our website and Services, and supersede all prior and contemporaneous understandings, agreements, representations, and warranties.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">17. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="mt-4 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="font-semibold text-[#0A1F3C]">SkyRich Tech Solutions</p>
              <p>Perungudi, Chennai, Tamil Nadu, India</p>
              <p>Email: <a href="mailto:info@skyrichtechsolutions.com" className="text-[#2D7FF9] hover:underline">info@skyrichtechsolutions.com</a></p>
              <p>Phone: <a href="tel:+919384801120" className="text-[#2D7FF9] hover:underline">+91 9384801120</a></p>
            </div>
          </section>

        </div>
      </div>
    </MainLayout>
  );
}
