"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⚠</div>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">
          Something went wrong
        </h2>
        <p className="text-ink/60 mb-6 text-sm">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="bg-aegean text-white px-6 py-3 rounded-lg font-medium hover:bg-aegean/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
