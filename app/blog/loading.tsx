export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Skeleton */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-yellow-900/20 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <div className="h-8 w-64 bg-zinc-800 rounded-full mx-auto animate-pulse" />
            <div className="h-16 w-96 bg-zinc-800 rounded-lg mx-auto animate-pulse" />
            <div className="h-6 w-[600px] bg-zinc-800 rounded mx-auto animate-pulse" />
            <div className="flex items-center justify-center gap-8 pt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-10 w-20 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Featured Post Skeleton */}
        <section>
          <div className="h-8 w-48 bg-zinc-800 rounded mb-8 animate-pulse" />
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-96 bg-zinc-800 animate-pulse" />
              <div className="p-10 space-y-6">
                <div className="h-6 w-32 bg-zinc-800 rounded-full animate-pulse" />
                <div className="h-12 w-full bg-zinc-800 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Skeleton */}
        <section className="bg-black/95 backdrop-blur-xl rounded-2xl border border-zinc-800 p-6">
          <div className="space-y-6">
            <div className="h-14 w-full max-w-2xl mx-auto bg-zinc-800 rounded-xl animate-pulse" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-12 w-32 bg-zinc-800 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Cards Grid Skeleton */}
        <section>
          <div className="h-8 w-48 bg-zinc-800 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="h-48 bg-zinc-800 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-6 w-full bg-zinc-800 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-zinc-800 rounded animate-pulse" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                    <div className="w-8 h-8 bg-zinc-800 rounded-full animate-pulse" />
                    <div className="space-y-1 flex-1">
                      <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

