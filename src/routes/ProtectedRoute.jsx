import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useUserProfile(user);
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If on create-profile page
  if (location.pathname === "/create-profile") {
    // If user has a profile, redirect to their role page
    if (profile?.role) {
      return <Navigate to={`/${profile.role}`} replace />;
    }
    // Otherwise, show the create profile page
    return <Outlet />;
  }

  // For all other protected routes...
  // If user has no profile, redirect to create-profile
  if (!profile || !profile?.role) {
    return <Navigate to="/create-profile" replace />;
  }

  return <Outlet />;
}
