export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-center p-4 space-y-4">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
