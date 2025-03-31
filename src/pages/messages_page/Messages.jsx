import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { CardSkeleton } from "@/components/LoadingSkeleton";

export default function Messages() {
  return (
    <ScrollArea>
      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CardSkeleton />}>Messages</Suspense>
        </ErrorBoundary>
      </div>
    </ScrollArea>
  );
}
