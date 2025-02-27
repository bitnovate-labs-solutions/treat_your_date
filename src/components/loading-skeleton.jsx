import { Skeleton } from "@/components/ui/skeleton";

export function RoleSelectionSkeleton() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
