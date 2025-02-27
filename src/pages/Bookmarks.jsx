import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/error-fallback";
import { CardSkeleton } from "@/components/loading-skeleton";

function BookmarkedItems() {
  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder for bookmarked items */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Checkout feature will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Bookmarks() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CardSkeleton />}>
            <BookmarkedItems />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ScrollArea>
  );
}
