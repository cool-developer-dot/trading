'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/app/types/blog';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = memo(({ post }: FeaturedPostProps) => {
  const handleClick = useCallback(() => {
    // Track analytics if needed
  }, []);

  return (
    <article 
      className="relative group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20"
      onClick={handleClick}
      role="article"
      aria-label={`Featured post: ${post.title}`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 md:h-full overflow-hidden bg-zinc-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/40 to-transparent" />
            
            {/* Featured Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured Article
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            {/* Category */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm font-semibold rounded-full border border-yellow-500/30">
                {post.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-sm text-zinc-500">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors duration-300">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-zinc-400 text-lg mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full ring-2 ring-yellow-500/30"
                loading="eager"
              />
              <div>
                <p className="text-base font-semibold text-white">{post.author.name}</p>
                <p className="text-sm text-zinc-500">{post.author.role}</p>
              </div>
              <div className="ml-auto flex items-center gap-2 text-zinc-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{post.readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-yellow-500 font-semibold group-hover:gap-4 transition-all duration-300">
                Read Full Article
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              
              <div className="flex items-center gap-4 ml-auto text-sm text-zinc-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {post.views?.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {post.likes?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
});

FeaturedPost.displayName = 'FeaturedPost';

export default FeaturedPost;

