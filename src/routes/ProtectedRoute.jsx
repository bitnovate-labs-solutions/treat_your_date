import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const { data: profile, isLoading } = useUserProfile(user);

  if (isLoading) return null; // Prevent rendering while loading

  // If user has no profile or no role, redirect to role selection
  if (!profile || !profile?.role) {
    return <Navigate to="/role-selection" />;
  }

  return children;
}
