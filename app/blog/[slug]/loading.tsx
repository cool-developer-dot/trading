export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Reading Progress Bar Skeleton */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50" />

      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-4 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-4 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Category Badge */}
          <div className="h-8 w-40 bg-zinc-800 rounded-full animate-pulse" />

          {/* Title */}
          <div className="space-y-3">
            <div className="h-12 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-12 w-4/5 bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <div className="h-6 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-zinc-800 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-8 w-px bg-zinc-700" />
            <div className="flex items-center gap-4">
              <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-28 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Content Paragraphs */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
          </div>
        ))}

        {/* Tags Skeleton */}
        <div className="pt-8 border-t border-zinc-800 space-y-4">
          <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-zinc-800 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Share Section Skeleton */}
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse" />
            <div className="flex gap-3">
              <div className="h-10 w-24 bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-10 w-24 bg-zinc-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Author Bio Skeleton */}
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-zinc-800 rounded-full animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
              <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Skeleton */}
      <section className="bg-zinc-900/30 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-zinc-800 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="h-48 bg-zinc-800 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-6 w-full bg-zinc-800 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

