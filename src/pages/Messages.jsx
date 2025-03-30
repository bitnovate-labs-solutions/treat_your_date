import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { CardSkeleton } from "@/components/LoadingSkeleton";

function MessagesList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {/* Placeholder for messages */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Messages feature will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Messages() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CardSkeleton />}>
            <MessagesList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ScrollArea>
  );
}
