'use client';

import { memo, useState } from 'react';
import Link from 'next/link';

const sections = [
  'Information We Collect',
  'How We Use Your Information',
  'Information Sharing',
  'Data Security',
  'Your Rights',
  'Cookies and Tracking',
  'International Transfers',
  'Data Retention',
  'Children\'s Privacy',
  'Third-Party Links',
  'Updates to Policy',
  'Contact Information'
];

const PrivacyPage = memo(() => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Your Privacy Matters
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Policy</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              We are committed to protecting your personal information and your right to privacy
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 pt-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Last Updated: November 11, 2024
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <a
                    key={section}
                    href={`#section-${index + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(section);
                      document.getElementById(`section-${index + 1}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                      activeSection === section
                        ? 'bg-yellow-500 text-black font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {section}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 mb-3">Questions about privacy?</p>
                <Link
                  href="/contact"
                  className="block text-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                  This Privacy Policy describes how Binance ("we," "us," or "our") collects, uses, and shares your personal information when you use our cryptocurrency trading platform and services. We are committed to protecting your privacy and ensuring transparency in how we handle your data.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-blue-400 font-bold mb-2">GDPR & CCPA Compliant</h3>
                      <p className="text-zinc-300 text-sm">
                        We comply with GDPR, CCPA, and other international data protection regulations to ensure your rights are protected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div id="section-1" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <h3 className="text-white font-semibold text-lg">Personal Information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Identity Information:</strong> Name, date of birth, nationality, government-issued ID</li>
                  <li><strong>Contact Information:</strong> Email address, phone number, physical address</li>
                  <li><strong>Financial Information:</strong> Bank account details, payment card information</li>
                  <li><strong>Transaction Data:</strong> Trading history, deposit/withdrawal records</li>
                  <li><strong>Verification Documents:</strong> ID photos, proof of address, selfies</li>
                </ul>

                <h3 className="text-white font-semibold text-lg mt-6">Automatically Collected Information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, clickstream data</li>
                  <li><strong>Location Data:</strong> Geographic location based on IP address</li>
                  <li><strong>Cookies:</strong> Session data, preferences, authentication tokens</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div id="section-2" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>We use your personal information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Provision:</strong> To create and manage your account, process transactions, and provide customer support</li>
                  <li><strong>Compliance:</strong> To verify your identity (KYC), comply with AML/CTF regulations, and prevent fraud</li>
                  <li><strong>Security:</strong> To detect and prevent unauthorized access, protect against security threats</li>
                  <li><strong>Communication:</strong> To send transactional emails, service updates, and marketing communications (with consent)</li>
                  <li><strong>Improvement:</strong> To analyze usage patterns and improve our services</li>
                  <li><strong>Legal Obligations:</strong> To respond to legal requests and enforce our terms</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div id="section-3" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (payment processors, KYC providers, cloud hosting)</li>
                  <li><strong>Regulatory Authorities:</strong> Government agencies, law enforcement, or regulatory bodies when required by law</li>
                  <li><strong>Legal Proceedings:</strong> In response to subpoenas, court orders, or legal processes</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Affiliates:</strong> Other companies within our corporate group</li>
                </ul>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6">
                  <p className="text-sm font-semibold text-yellow-400">
                    We do NOT sell your personal information to third parties for marketing purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="section-4" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>We implement industry-standard security measures to protect your information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Encryption:</strong> All data transmitted is encrypted using TLS/SSL protocols</li>
                  <li><strong>Storage:</strong> Data at rest is encrypted using AES-256 encryption</li>
                  <li><strong>Access Control:</strong> Strict access controls and authentication requirements</li>
                  <li><strong>Cold Storage:</strong> 95% of cryptocurrency assets stored offline</li>
                  <li><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
                  <li><strong>Regular Audits:</strong> Third-party security audits and penetration testing</li>
                </ul>
                <p className="mt-4">
                  While we implement robust security measures, no method of transmission over the internet is 100% secure. Users should also take precautions to protect their accounts.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div id="section-5" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>Depending on your jurisdiction, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                  <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for processing based on consent</li>
                  <li><strong>Complaint:</strong> Lodge a complaint with a data protection authority</li>
                </ul>
                <p className="mt-4">
                  To exercise your rights, please contact our Data Protection Officer at privacy@binance.com.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div id="section-6" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>We use cookies and similar tracking technologies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
                </ul>
                <p className="mt-4">
                  You can manage cookie preferences through your browser settings. For more information, please see our{' '}
                  <Link href="/cookies" className="text-yellow-500 hover:text-yellow-400 underline">Cookie Policy</Link>.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div id="section-7" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">7. International Transfers</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.
                </p>
                <p>
                  We ensure appropriate safeguards are in place for international transfers, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Adequacy decisions recognizing equivalent data protection</li>
                  <li>Binding Corporate Rules for intra-group transfers</li>
                </ul>
              </div>
            </div>

            {/* Section 8 */}
            <div id="section-8" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide our services and maintain your account</li>
                  <li>Comply with legal obligations (typically 5-7 years for financial records)</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
                <p className="mt-4">
                  After the retention period expires, we securely delete or anonymize your personal information.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div id="section-9" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.
                </p>
                <p>
                  If you believe we have collected information from a child, please contact us immediately at privacy@binance.com.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div id="section-10" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Links</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Our platform may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information to them.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div id="section-11" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">11. Updates to This Policy</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending an email notification to your registered email address</li>
                  <li>Displaying a prominent notice on our platform</li>
                </ul>
                <p className="mt-4">
                  Your continued use of our services after the effective date of the updated policy constitutes acceptance of the changes.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div id="section-12" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-zinc-800/50 rounded-xl p-6 mt-4">
                  <h4 className="text-white font-semibold mb-4">Data Protection Officer</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> privacy@binance.com</p>
                    <p><strong>Phone:</strong> +1 (800) 123-4567</p>
                    <p><strong>Mail:</strong> 123 Crypto Street, San Francisco, CA 94102</p>
                    <p><strong>Response Time:</strong> We aim to respond within 30 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-black mb-4">Privacy Questions?</h3>
              <p className="text-black/80 mb-6">Our privacy team is here to help address your concerns</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105">
                  Contact Privacy Team
                </Link>
                <Link href="/cookies" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105">
                  Cookie Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

PrivacyPage.displayName = 'PrivacyPage';

export default PrivacyPage;

