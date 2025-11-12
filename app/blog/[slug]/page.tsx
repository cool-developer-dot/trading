'use client';

import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '../../data/blogData';
import BlogCard from '../../components/blog/BlogCard';

const BlogPostPage = memo(() => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Find the current post
  const post = useMemo(() => 
    blogPosts.find(p => p.slug === slug),
    [slug]
  );

  // Find related posts
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    
    return blogPosts
      .filter(p => p.id !== post.id && (
        p.category === post.category ||
        p.tags.some(tag => post.tags.includes(tag))
      ))
      .slice(0, 3);
  }, [post]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = useCallback(() => {
    setLiked(prev => !prev);
  }, []);

  const handleBookmark = useCallback(() => {
    setBookmarked(prev => !prev);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Article Not Found</h1>
          <p className="text-zinc-500">The article you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-3 hidden lg:flex flex-col">
        <button
          onClick={handleLike}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            liked 
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
          }`}
          aria-label="Like post"
        >
          <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <button
          onClick={handleBookmark}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            bookmarked 
              ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30' 
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
          }`}
          aria-label="Bookmark post"
        >
          <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

        <button
          onClick={handleShare}
          className="w-12 h-12 rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 flex items-center justify-center transition-all duration-300"
          aria-label="Share post"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

        <Link
          href="/blog"
          className="w-12 h-12 rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 flex items-center justify-center transition-all duration-300"
          aria-label="Back to blog"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white">{post.category}</span>
          </nav>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black text-sm font-semibold rounded-full mb-6">
            {post.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-zinc-400 mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-14 h-14 rounded-full ring-2 ring-yellow-500/30"
              />
              <div>
                <p className="text-lg font-semibold text-white">{post.author.name}</p>
                <p className="text-sm text-zinc-500">{post.author.role}</p>
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-700" />

            <div className="flex items-center gap-4 text-zinc-400 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime} min read
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views?.toLocaleString()} views
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div 
            className="blog-content text-zinc-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
          />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-8 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold">Enjoyed this article?</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  liked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {liked ? 'Liked' : 'Like'}
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800 rounded-xl">
          <div className="flex items-start gap-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-20 h-20 rounded-full ring-4 ring-zinc-800"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{post.author.name}</h3>
              <p className="text-yellow-500 font-medium mb-4">{post.author.role}</p>
              <p className="text-zinc-400 leading-relaxed">
                {post.author.name} is a seasoned expert in the cryptocurrency industry with years of experience in market analysis and trading strategies. Follow for more insights on crypto markets and blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-zinc-900/30 py-16 px-4 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-white">Related Articles</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog CTA */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-semibold rounded-xl border border-zinc-800 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </section>
    </div>
  );
});

BlogPostPage.displayName = 'BlogPostPage';

export default BlogPostPage;

