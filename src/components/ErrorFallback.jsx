import { AlertTriangle } from "lucide-react";

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="max-w-sm w-full bg-white shadow-xl rounded-2xl p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />

        <h2 className="text-xl font-semibold text-gray-800">
          Something went wrong
        </h2>
        <p className="text-gray-600 mt-2">
          {error?.message || "An unexpected error occurred."}
        </p>

        {/* BUTTON */}
        <button
          onClick={resetErrorBoundary}
          className="mt-4 bg-primary hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
