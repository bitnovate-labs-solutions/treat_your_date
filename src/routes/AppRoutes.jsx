import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/components/AppLayout";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { ErrorFallback } from "@/components/error-fallback";
import { CardSkeleton } from "@/components/loading-skeleton";

// Pages
import Welcome from "@/pages/Onboarding/Welcome";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Treater from "@/pages/Treater";
import Treatee from "@/pages/Treatee/Treatee";
import Bookmarks from "@/pages/Bookmarks";
import Messages from "@/pages/Messages";
import Explore from "@/pages/Explore";
import CreateProfile from "@/pages/CreateProfile";
import AuthCallback from "@/pages/AuthCallback";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route
        path="/auth/*"
        element={!user ? <Auth /> : <Navigate to="/create-profile" />}
      />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Layout-wrapped routes (both public and protected) */}
      <Route element={<Layout />}>
        {/* Public route with layout */}
        <Route
          path="/explore"
          element={
            <Suspense fallback={<CardSkeleton />}>
              <Explore />
            </Suspense>
          }
        />

        {/* Protected routes */}
        {/* Once inside a protected route ( /treater, /treatee, /profile,...) -> ProtectedRoute.js will redirect users if they don't have a role */}
        <Route
          element={
            user ? (
              <Outlet />
            ) : (
              <Navigate to="/auth" state={{ mode: "login" }} />
            )
          }
        >
          <Route
            path="/create-profile"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ProtectedRoute>
                  <CreateProfile />
                </ProtectedRoute>
              </ErrorBoundary>
            }
          />

          <Route
            path="/treater"
            element={
              <ProtectedRoute>
                <Treater />
              </ProtectedRoute>
            }
          />
          <Route
            path="/treatee"
            element={
              <ProtectedRoute>
                <Treatee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
