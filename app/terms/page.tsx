'use client';

import { memo, useState } from 'react';
import Link from 'next/link';

const sections = [
  'Acceptance of Terms',
  'Account Registration',
  'Trading Services',
  'User Obligations',
  'Fees and Charges',
  'Prohibited Activities',
  'Risk Disclosure',
  'Intellectual Property',
  'Limitation of Liability',
  'Termination',
  'Dispute Resolution',
  'Governing Law'
];

const TermsPage = memo(() => {
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
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78.165 1.623.91 1.91.528.203.966.674 1.217 1.281a1 1 0 11-1.903.63c-.134-.405-.439-.74-.82-.925a3.988 3.988 0 01-2.21-4.754L3.55 7.8A1 1 0 015.437 7.2l1.09 3.275a1 1 0 01-.926 1.325l-.101-.526z" clipRule="evenodd" />
              </svg>
              Legal Agreement
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Use</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our platform
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
              <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
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
                    {index + 1}. {section}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 mb-3">Need help understanding?</p>
                <Link
                  href="/contact"
                  className="block text-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors"
                >
                  Contact Legal Team
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
                  These Terms of Use ("Terms") govern your access to and use of the Binance trading platform, website, and services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-yellow-500 font-bold mb-2">Important Notice</h3>
                      <p className="text-zinc-300 text-sm">
                        Trading cryptocurrencies involves substantial risk of loss and is not suitable for all investors. Please ensure you fully understand the risks involved before trading.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div id="section-1" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">1</span>
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  By creating an account, accessing, or using any part of the Binance platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, along with our Privacy Policy and all applicable laws and regulations.
                </p>
                <p>
                  You represent and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are at least 18 years of age or the age of majority in your jurisdiction</li>
                  <li>You have the legal capacity to enter into binding agreements</li>
                  <li>You are not located in a country where our services are prohibited</li>
                  <li>You will comply with all applicable laws and regulations</li>
                  <li>All information you provide is accurate and truthful</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div id="section-2" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">2</span>
                Account Registration
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  To use our trading services, you must create an account and complete our verification process (KYC - Know Your Customer).
                </p>
                <h3 className="text-white font-semibold text-lg mt-6">Account Requirements:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <h3 className="text-white font-semibold text-lg mt-6">Verification Process:</h3>
                <p>
                  We require identity verification to comply with anti-money laundering (AML) and counter-terrorist financing (CTF) regulations. You must provide valid government-issued identification and may be required to provide additional documentation.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div id="section-3" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">3</span>
                Trading Services
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Our platform provides cryptocurrency trading services, allowing you to buy, sell, and exchange digital assets. By using our trading services, you understand and agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All trades are executed at market prices and may be subject to slippage</li>
                  <li>We do not provide investment advice or recommendations</li>
                  <li>You are solely responsible for your trading decisions</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>Cryptocurrency markets are highly volatile and prices can fluctuate rapidly</li>
                  <li>We reserve the right to refuse or cancel any transaction</li>
                </ul>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-6">
                  <p className="text-red-400 text-sm font-semibold">
                    ⚠️ Risk Warning: Trading cryptocurrencies carries a high level of risk and may result in the loss of all your invested capital.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="section-4" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">4</span>
                User Obligations
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>As a user of our platform, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the platform only for lawful purposes</li>
                  <li>Not engage in any fraudulent or manipulative trading practices</li>
                  <li>Not use the platform to launder money or finance illegal activities</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not use automated trading bots without authorization</li>
                  <li>Not impersonate any person or entity</li>
                  <li>Not interfere with or disrupt the platform's operations</li>
                  <li>Comply with all applicable tax obligations</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div id="section-5" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">5</span>
                Fees and Charges
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  We charge fees for various services on our platform. All fees are clearly displayed before you complete a transaction.
                </p>
                <h3 className="text-white font-semibold text-lg mt-6">Fee Structure:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Trading Fees:</strong> 0.1% per trade (may be reduced for high-volume traders)</li>
                  <li><strong>Deposit Fees:</strong> Free for cryptocurrency deposits; varies for fiat</li>
                  <li><strong>Withdrawal Fees:</strong> Network fees apply for cryptocurrency withdrawals</li>
                  <li><strong>Conversion Fees:</strong> Spread included in exchange rates</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to modify our fee structure with 30 days' notice. Fee changes will be posted on our website and communicated via email.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div id="section-6" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">6</span>
                Prohibited Activities
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>The following activities are strictly prohibited:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Market manipulation including pump and dump schemes</li>
                  <li>Wash trading or creating artificial trading volume</li>
                  <li>Front-running or insider trading</li>
                  <li>Money laundering or terrorist financing</li>
                  <li>Fraudulent chargebacks or payment reversals</li>
                  <li>Creating multiple accounts to bypass restrictions</li>
                  <li>Using the platform from restricted jurisdictions</li>
                  <li>Attempting to reverse engineer or hack the platform</li>
                </ul>
                <p className="mt-4 text-red-400 font-semibold">
                  Violation of these prohibitions may result in immediate account suspension, fund seizure, and legal action.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div id="section-7" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">7</span>
                Risk Disclosure
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  Cryptocurrency trading involves significant risks. Before trading, you should carefully consider:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Volatility Risk:</strong> Cryptocurrency prices can fluctuate dramatically</li>
                  <li><strong>Liquidity Risk:</strong> You may not be able to sell assets at desired prices</li>
                  <li><strong>Technology Risk:</strong> Blockchain networks may experience failures or delays</li>
                  <li><strong>Regulatory Risk:</strong> Laws and regulations may change unfavorably</li>
                  <li><strong>Security Risk:</strong> Accounts may be subject to hacking attempts</li>
                  <li><strong>Counterparty Risk:</strong> Other users may default on obligations</li>
                  <li><strong>Operational Risk:</strong> Platform maintenance may temporarily restrict access</li>
                </ul>
                <p className="mt-4">
                  You should only trade with funds you can afford to lose and should seek independent financial advice if necessary.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div id="section-8" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">8</span>
                Intellectual Property
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  All content on our platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is our property or that of our content suppliers and is protected by intellectual property laws.
                </p>
                <p>You may not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reproduce, distribute, or create derivative works from our content</li>
                  <li>Use our trademarks or branding without written permission</li>
                  <li>Remove copyright or proprietary notices</li>
                  <li>Reverse engineer our software or technology</li>
                </ul>
              </div>
            </div>

            {/* Section 9 */}
            <div id="section-9" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">9</span>
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We provide our services "AS IS" without warranties of any kind</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the fees paid by you in the past 12 months</li>
                  <li>We are not responsible for losses due to market conditions, network failures, or force majeure events</li>
                  <li>We do not guarantee uninterrupted or error-free service</li>
                </ul>
                <p className="mt-4">
                  Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so these limitations may not apply to you.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div id="section-10" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">10</span>
                Termination
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  We reserve the right to suspend or terminate your account at any time for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violation of these Terms</li>
                  <li>Suspected fraudulent or illegal activity</li>
                  <li>Prolonged inactivity</li>
                  <li>Request from law enforcement or regulatory authorities</li>
                  <li>Technical or security reasons</li>
                </ul>
                <p>
                  You may terminate your account at any time by contacting customer support. Upon termination, you must withdraw all funds within 90 days, after which we may charge storage fees or escheat funds in accordance with applicable law.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div id="section-11" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">11</span>
                Dispute Resolution
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  If you have a dispute with us, we encourage you to contact our customer support first. If we cannot resolve the dispute informally, any disputes will be resolved through:
                </p>
                <h3 className="text-white font-semibold text-lg mt-6">Binding Arbitration</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All disputes shall be resolved by binding arbitration</li>
                  <li>Arbitration shall be conducted by the American Arbitration Association (AAA)</li>
                  <li>The arbitration shall take place in San Francisco, California</li>
                  <li>Each party shall bear its own costs and fees</li>
                  <li>You waive your right to participate in class action lawsuits</li>
                </ul>
              </div>
            </div>

            {/* Section 12 */}
            <div id="section-12" className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 scroll-mt-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-500 text-lg font-bold">12</span>
                Governing Law
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                </p>
                <p>
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
                </p>
                <h3 className="text-white font-semibold text-lg mt-6">Changes to Terms</h3>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of material changes via email or platform notification. Your continued use of the platform after such modifications constitutes acceptance of the updated Terms.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-black mb-4">Questions About These Terms?</h3>
              <p className="text-black/80 mb-6">Our legal team is here to help clarify any questions you may have</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105">
                  Contact Legal Team
                </Link>
                <Link href="/help-center" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

TermsPage.displayName = 'TermsPage';

export default TermsPage;

