'use client';

import { memo, useState, useMemo, useCallback } from 'react';
import { blogPosts, categories } from '../data/blogData';
import BlogHero from '../components/blog/BlogHero';
import FeaturedPost from '../components/blog/FeaturedPost';
import BlogCard from '../components/blog/BlogCard';
import CategoryFilter from '../components/blog/CategoryFilter';
import SearchBar from '../components/blog/SearchBar';
import Newsletter from '../components/blog/Newsletter';

const BlogPage = memo(() => {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (activeCategory !== 'All Posts') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  // Get featured posts
  const featuredPosts = useMemo(() => 
    blogPosts.filter(post => post.featured),
    []
  );

  // Get regular posts (non-featured)
  const regularPosts = useMemo(() => 
    filteredPosts.filter(post => !post.featured),
    [filteredPosts]
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        
        {/* Featured Posts Section */}
        {searchQuery === '' && activeCategory === 'All Posts' && featuredPosts.length > 0 && (
          <section aria-labelledby="featured-heading">
            <div className="flex items-center justify-between mb-8">
              <h2 id="featured-heading" className="text-3xl font-bold text-white">
                Featured Articles
              </h2>
              <div className="h-px flex-1 ml-8 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
            
            <div className="space-y-8">
              {featuredPosts.map(post => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <section className="sticky top-4 z-20 bg-black/95 backdrop-blur-xl rounded-2xl border border-zinc-800 p-6 shadow-2xl">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex justify-center">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search by title, content, tags, or author..."
              />
            </div>

            {/* Category Filters */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-500 mb-4 uppercase tracking-wider">
                Filter by Category
              </h3>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </section>

        {/* All Posts Section */}
        <section aria-labelledby="all-posts-heading">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="all-posts-heading" className="text-3xl font-bold text-white mb-2">
                {searchQuery ? 'Search Results' : activeCategory === 'All Posts' ? 'Latest Articles' : activeCategory}
              </h2>
              <p className="text-zinc-500">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>
            <div className="h-px flex-1 ml-8 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div 
              id="blog-posts-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="tabpanel"
            >
              {regularPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 rounded-full mb-6">
                <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-zinc-500 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Posts');
                }}
                className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        {searchQuery === '' && activeCategory === 'All Posts' && (
          <section>
            <Newsletter />
          </section>
        )}

        {/* Popular Tags */}
        {searchQuery === '' && activeCategory === 'All Posts' && (
          <section aria-labelledby="popular-tags-heading" className="border-t border-zinc-800 pt-12">
            <h3 id="popular-tags-heading" className="text-2xl font-bold text-white mb-6">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags)))
                .slice(0, 20)
                .map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-2 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 transform hover:scale-105"
                  >
                    #{tag}
                  </button>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
});

BlogPage.displayName = 'BlogPage';

export default BlogPage;

