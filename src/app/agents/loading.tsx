export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="h-10 w-64 bg-limestone/30 rounded-lg animate-pulse mb-2" />
        <div className="h-5 w-48 bg-limestone/20 rounded animate-pulse" />
      </div>

      <div className="flex gap-3 mb-8">
        <div className="h-10 w-64 bg-limestone/20 rounded-lg animate-pulse" />
        <div className="h-10 w-36 bg-limestone/20 rounded-lg animate-pulse" />
        <div className="h-10 w-36 bg-limestone/20 rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-limestone/30 rounded-xl p-6 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-limestone/30" />
              <div className="flex-1">
                <div className="h-5 w-32 bg-limestone/30 rounded mb-1" />
                <div className="h-3 w-20 bg-limestone/20 rounded" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-limestone/20 rounded" />
              <div className="h-3 w-4/5 bg-limestone/20 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-limestone/15 rounded-full" />
              <div className="h-6 w-20 bg-limestone/15 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
