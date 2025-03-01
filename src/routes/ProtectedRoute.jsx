import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const { data: profile, isLoading, error } = useUserProfile(user);

  // Special case for /create-profile route
  const isCreateProfileRoute = window.location.pathname === "/create-profile";

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Special handling for create-profile route
  if (isCreateProfileRoute) {
    // If user has a profile, redirect to their role page
    if (profile?.role) {
      return <Navigate to={`/${profile.role}`} replace />;
    }
    // Otherwise, show the create profile page
    return children;
  }

  // For all other protected routes
  // If user has no profile, redirect to create-profile
  if (!profile || !profile?.role) {
    return <Navigate to="/create-profile" replace />;
  }

  return children;
}
