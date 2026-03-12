import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <SEOHead
        title="Privacy Policy | SkyRich Tech Solutions"
        description="Privacy Policy for SkyRich Tech Solutions. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, SkyRich Tech Solutions"
        structuredData={[createBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy-policy" }])]}
      />
      <div className="pt-32 pb-12 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: March 12, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none text-gray-700">

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">1. Introduction</h2>
            <p>SkyRich Tech Solutions ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website at www.skyrichtechsolutions.com, use our products (AIDA, AIVA, Orbit CRM), or engage with our services.</p>
            <p>By accessing or using our website and services, you agree to the terms of this Privacy Policy. If you do not agree with any part of this policy, please do not access our website or use our services.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-[#0A1F3C] mb-3">2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Fill out contact forms or request a demo</li>
              <li>Subscribe to our newsletter or blog updates</li>
              <li>Register for an account on our platforms</li>
              <li>Apply for a job through our Careers page</li>
              <li>Communicate with us via email, phone, or chat</li>
            </ul>
            <p className="mt-3">This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.</p>

            <h3 className="text-xl font-semibold text-[#0A1F3C] mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain technical information, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>IP address and approximate geographic location</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited, time spent on pages, and navigation patterns</li>
              <li>Referring website or search terms</li>
              <li>Device type and screen resolution</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0A1F3C] mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
            <p>We use cookies, web beacons, and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. You can control cookie settings through your browser preferences.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>To provide, operate, and maintain our website and services</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you marketing communications, product updates, and promotional materials (with your consent)</li>
              <li>To process job applications submitted through our Careers page</li>
              <li>To improve our website, products, and services based on usage analytics</li>
              <li>To detect, prevent, and address technical issues and security threats</li>
              <li>To comply with legal obligations and enforce our terms of service</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">4. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party vendors who assist us in operating our website, conducting business, or providing services (e.g., cloud hosting, email delivery, analytics). These providers are obligated to maintain the confidentiality of your information.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law, regulation, legal process, or governmental request.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
              <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">5. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection and privacy practices</li>
            </ul>
            <p className="mt-3">While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">6. Data Retention</h2>
            <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. When personal information is no longer needed, we securely delete or anonymize it.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">7. Your Rights</h2>
            <p>Depending on your location and applicable data protection laws, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations</li>
              <li><strong>Objection:</strong> Object to the processing of your personal information for certain purposes</li>
              <li><strong>Data Portability:</strong> Request transfer of your personal information to another service provider</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:info@skyrichtechsolutions.com" className="text-[#2D7FF9] hover:underline">info@skyrichtechsolutions.com</a>.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">8. International Data Transfers</h2>
            <p>SkyRich Tech Solutions operates globally across India, Southeast Asia, the Middle East, Europe, North America, and Australia. Your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your information in compliance with applicable data protection laws, including the EU General Data Protection Regulation (GDPR), India's Digital Personal Data Protection Act (DPDPA), and other regional regulations.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">9. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">10. Children's Privacy</h2>
            <p>Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete that information promptly.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#0A1F3C] mb-4">12. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
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
