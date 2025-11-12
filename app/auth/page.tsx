'use client';

import { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

// Icon Components - Optimized
const GoogleIcon = memo(() => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
));
GoogleIcon.displayName = 'GoogleIcon';

const AppleIcon = memo(() => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
));
AppleIcon.displayName = 'AppleIcon';

const TelegramIcon = memo(() => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.48 1.02-.73 3.99-1.73 6.66-2.88 8.01-3.44 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.53.17.14.11.18.26.19.37.01.08.02.33 0 .51z"/>
  </svg>
));
TelegramIcon.displayName = 'TelegramIcon';

const BackIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
));
BackIcon.displayName = 'BackIcon';

const EyeIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
));
EyeIcon.displayName = 'EyeIcon';

const EyeOffIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
));
EyeOffIcon.displayName = 'EyeOffIcon';

// Animated Background Orbs
const AnimatedOrbs = memo(() => (
  <>
    <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
    <div className="absolute top-0 right-0 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
  </>
));
AnimatedOrbs.displayName = 'AnimatedOrbs';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'subaccount'>('email'); // For sign-in tabs
  
  // Sign In form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up form state
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [sponsorCode, setSponsorCode] = useState('');

  const handleFlip = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsSignIn((prev) => !prev);
      setActiveTab('email'); // Reset to email tab when flipping
      setIsFlipping(false);
    }, 300);
  }, []);

  const handleTabChange = useCallback((tab: 'email' | 'subaccount') => {
    setActiveTab(tab);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isSignIn) {
        console.log('Sign In:', { email, password });
        // Add your sign-in logic here
      } else {
        console.log('Sign Up:', { 
          fullName, 
          email: signUpEmail, 
          country, 
          phone, 
          password: signUpPassword, 
          sponsorCode 
        });
        // Add your sign-up logic here
      }
    },
    [email, password, fullName, signUpEmail, country, phone, signUpPassword, sponsorCode, isSignIn]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <AnimatedOrbs />
      
      {/* Main Content - Flex Grow to Push Footer Down */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Card with flip animation */}
          <div
            className={`transform-gpu transition-all duration-500 ease-out ${
              isFlipping ? 'scale-90 opacity-0 rotate-y-180' : 'scale-100 opacity-100 rotate-y-0'
            }`}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-[0_20px_80px_rgba(0,0,0,0.12)] transition-shadow duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100/50">
              <Link
                href="/"
                className="p-2.5 hover:bg-black/5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Go back to home"
              >
                <BackIcon />
              </Link>
              <h1 className="text-xl font-bold text-black tracking-tight">
                {isSignIn ? 'Welcome back!' : 'Create Account'}
              </h1>
              <button
                onClick={handleFlip}
                className="text-sm font-bold text-black hover:text-gray-700 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-black/5 active:scale-95"
                type="button"
              >
                {isSignIn ? 'Sign up' : 'Sign in'}
              </button>
            </div>

            {/* Form Content */}
            <div className={isSignIn ? "p-6" : "p-5"}>
              {/* Tabs - Only show on Sign In */}
              {isSignIn && (
                <div className="flex mb-5 border-b border-gray-200/50 relative">
                  <button
                    type="button"
                    onClick={() => handleTabChange('email')}
                    className={`flex-1 pb-3 text-sm font-bold transition-all duration-300 relative ${
                      activeTab === 'email'
                        ? 'text-black'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                    aria-current={activeTab === 'email' ? 'page' : undefined}
                  >
                    Email/Mobile
                    {activeTab === 'email' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-slide-in" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange('subaccount')}
                    className={`flex-1 pb-3 text-sm font-bold transition-all duration-300 relative ${
                      activeTab === 'subaccount'
                        ? 'text-black'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                    aria-current={activeTab === 'subaccount' ? 'page' : undefined}
                  >
                    Sub-account
                    {activeTab === 'subaccount' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-slide-in" />
                    )}
                  </button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className={isSignIn ? 'space-y-4' : 'space-y-3'}>
                {isSignIn ? (
                  // SIGN IN FORM
                  <>
                    {/* Email/Phone Input - Changes based on tab */}
                    <div className="group">
                      <input
                        type={activeTab === 'email' ? 'tel' : 'text'}
                        placeholder={activeTab === 'email' ? 'Phone Number' : 'Enter your email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50/50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none hover:bg-gray-100/50 hover:border-gray-200"
                        required
                        aria-label={activeTab === 'email' ? 'Phone number' : 'Email'}
                      />
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50/50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none pr-12 hover:bg-gray-100/50 hover:border-gray-200"
                        required
                        aria-label="Password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <button
                        type="button"
                        className="text-sm font-semibold text-black hover:text-gray-600 transition-all duration-300 hover:underline underline-offset-2"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </>
                ) : (
                  // SIGN UP FORM
                  <>
                    {/* Full Name */}
                    <div className="group">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none hover:bg-gray-100/50 hover:border-gray-200"
                        required
                        aria-label="Full name"
                      />
                    </div>

                    {/* Email */}
                    <div className="group">
                      <input
                        type="email"
                        placeholder="Email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none hover:bg-gray-100/50 hover:border-gray-200"
                        required
                        aria-label="Email"
                      />
                    </div>

                    {/* Country Selector */}
                    <div className="relative group">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl text-black focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none appearance-none cursor-pointer hover:bg-gray-100/50 hover:border-gray-200"
                        required
                        aria-label="Select country"
                      >
                        <option value="">Select Country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BR">Brazil</option>
                        <option value="BG">Bulgaria</option>
                        <option value="KH">Cambodia</option>
                        <option value="CA">Canada</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="HR">Croatia</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GR">Greece</option>
                        <option value="GT">Guatemala</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao</option>
                        <option value="MY">Malaysia</option>
                        <option value="MT">Malta</option>
                        <option value="MX">Mexico</option>
                        <option value="MD">Moldova</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MA">Morocco</option>
                        <option value="MM">Myanmar</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NG">Nigeria</option>
                        <option value="MK">North Macedonia</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PA">Panama</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="QA">Qatar</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="RS">Serbia</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="ZA">South Africa</option>
                        <option value="KR">South Korea</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="TW">Taiwan</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TH">Thailand</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-300 group-focus-within:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Phone */}
                    <div className="group">
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none hover:bg-gray-100/50 hover:border-gray-200"
                        required
                        aria-label="Phone number"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none pr-12 hover:bg-gray-100/50 hover:border-gray-200"
                        required
                        minLength={8}
                        aria-label="Password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>

                    {/* Sponsor Code */}
                    <div className="group">
                      <input
                        type="text"
                        placeholder="Sponsor Code (Optional)"
                        value={sponsorCode}
                        onChange={(e) => setSponsorCode(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white focus:border-black/10 transition-all duration-300 outline-none hover:bg-gray-100/50 hover:border-gray-200"
                        aria-label="Sponsor code"
                      />
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`relative w-full font-bold rounded-xl transition-all duration-300 shadow-lg bg-black text-white hover:shadow-2xl hover:shadow-black/20 active:scale-[0.97] overflow-hidden group ${isSignIn ? 'py-4 mt-6' : 'py-3.5 mt-4'}`}
                >
                  <span className="relative z-10">{isSignIn ? 'Log in' : 'Sign Up'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </form>

              {/* Divider */}
              <div className={`flex items-center ${isSignIn ? 'my-5' : 'my-4'}`}>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Or {isSignIn ? 'log in' : 'sign up'} with
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              </div>

              {/* Social Login */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Login with Google"
                >
                  <GoogleIcon />
                </button>
                <button
                  type="button"
                  className="p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 text-black"
                  aria-label="Login with Apple"
                >
                  <AppleIcon />
                </button>
                <button
                  type="button"
                  className="p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 text-[#0088cc]"
                  aria-label="Login with Telegram"
                >
                  <TelegramIcon />
                </button>
              </div>

              {/* Authenticator */}
              <div className={`text-center ${isSignIn ? 'mt-5' : 'mt-4'}`}>
                <button
                  type="button"
                  className="text-xs font-semibold text-gray-500 hover:text-black transition-all duration-300 inline-flex items-center gap-1.5 hover:gap-2 group"
                >
                  Switch authenticator
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Footer - Stays at Bottom */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default memo(AuthPage);

