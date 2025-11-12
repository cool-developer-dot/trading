'use client';

import { memo } from 'react';

const BlogHero = memo(() => {
  return (
    <section 
      className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-yellow-900/20 py-20 px-4 overflow-hidden"
      role="banner"
      aria-label="Blog hero section"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            Latest Crypto Insights & Analysis
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Blog</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Stay ahead of the curve with expert analysis, trading strategies, and the latest news from the cryptocurrency world
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-zinc-500">Articles</div>
            </div>
            <div className="w-px h-12 bg-zinc-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-zinc-500">Readers</div>
            </div>
            <div className="w-px h-12 bg-zinc-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Daily</div>
              <div className="text-sm text-zinc-500">Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
    </section>
  );
});

BlogHero.displayName = 'BlogHero';

export default BlogHero;

