'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookiesPage = memo(() => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = useCallback((category: keyof CookiePreferences) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const handleSavePreferences = useCallback(() => {
    // Save to localStorage or send to API
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [preferences]);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, []);

  const handleRejectAll = useCallback(() => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, []);

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
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              Cookie Information
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Policy</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Learn how we use cookies and similar technologies to enhance your experience on our platform
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
        {/* Cookie Preferences Manager */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Manage Cookie Preferences</h2>
                <p className="text-zinc-400">Choose which cookies you allow us to use</p>
              </div>
              {saved && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Preferences Saved
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Essential Cookies</h3>
                      <p className="text-zinc-500 text-sm">Always active - Required for the platform to function</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                    REQUIRED
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  These cookies are necessary for the website to function and cannot be switched off. They include authentication, security features, and core functionality.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Functional Cookies</h3>
                      <p className="text-zinc-500 text-sm">Enhanced functionality and personalization</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('functional')}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      preferences.functional ? 'bg-yellow-500' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        preferences.functional ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Enable enhanced features such as language preferences, region settings, and personalized interface options.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Analytics Cookies</h3>
                      <p className="text-zinc-500 text-sm">Help us improve the platform</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('analytics')}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      preferences.analytics ? 'bg-yellow-500' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        preferences.analytics ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Allow us to collect anonymous usage data to understand how users interact with our platform and improve our services.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Marketing Cookies</h3>
                      <p className="text-zinc-500 text-sm">Personalized ads and content</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('marketing')}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      preferences.marketing ? 'bg-yellow-500' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        preferences.marketing ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Enable personalized advertising based on your interests and browsing behavior across websites.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-6 border-t border-zinc-800">
              <button
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-8 py-3 bg-zinc-800 text-white font-semibold rounded-xl hover:bg-zinc-700 transition-all duration-300"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-8 py-3 bg-zinc-800 text-white font-semibold rounded-xl hover:bg-zinc-700 transition-all duration-300"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>
        </section>

        {/* Cookie Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What Are Cookies */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences and provide a better user experience.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain on your device for a set period).
            </p>
          </div>

          {/* Why We Use Cookies */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why We Use Cookies</h2>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Keep you logged in to your account</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Remember your preferences and settings</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Understand how you use our platform</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Show relevant content and advertisements</span>
              </li>
            </ul>
          </div>

          {/* Managing Cookies */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              You can control cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="space-y-2 text-zinc-300 list-disc list-inside ml-4">
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Delete all cookies when you close your browser</li>
              <li>Block all cookies</li>
            </ul>
            <p className="text-zinc-400 text-sm mt-4">
              Note: Blocking cookies may affect your experience on our platform.
            </p>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              We use services from trusted third parties that may set cookies on your device:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li><strong>Google Analytics:</strong> Website analytics</li>
              <li><strong>Facebook Pixel:</strong> Advertising and retargeting</li>
              <li><strong>Hotjar:</strong> User behavior analysis</li>
              <li><strong>Intercom:</strong> Customer support chat</li>
            </ul>
            <p className="text-zinc-400 text-sm mt-4">
              These services have their own privacy policies governing their use of information.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Questions About Cookies?</h3>
            <p className="text-black/80 mb-6">Contact us if you have questions about our use of cookies</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/privacy" className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105">
                Privacy Policy
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});

CookiesPage.displayName = 'CookiesPage';

export default CookiesPage;

