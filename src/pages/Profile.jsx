import { Suspense, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

// Supbase
import { supabase } from "@/lib/supabase";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { LogOut, CircleUserRound } from "lucide-react";

// Error & Loading Handlers
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/error-fallback";
import { ProfileSkeleton } from "@/components/loading-skeleton";

function UserProfile() {
  const { user, signOut } = useAuth();
  const queryClient = useQueryClient();

  const fetchProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) throw error;
    return data;
  }, [user?.id]);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: fetchProfile,
    enabled: !!user?.id,
    suspense: true,
    placeholderData: () => {
      return queryClient.getQueryData(["profile", user?.id]);
    },
  });

  // HANDLE SIGN OUT
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign-out error: ", error);
      toast.error("Error", {
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  return (
    <Card className="bg-white border-gray-200 shadow-md">
      <CardHeader className="space-y-4">
        <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center">
          <CircleUserRound className="w-14 h-14 text-gray-300" />
        </div>
        <CardTitle className="text-center text-gray-500 text-base">
          {profile?.display_name || user.email}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-muted-foreground">
          Role: {profile?.role.charAt(0).toUpperCase() + profile?.role.slice(1)}
        </div>
        {/* SIGN OUT BUTTON */}
        <Button
          className="w-full h-14 text-base bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Profile() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ProfileSkeleton />}>
            <UserProfile />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ScrollArea>
  );
}
