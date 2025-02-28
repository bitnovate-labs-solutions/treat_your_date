import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/components/AppLayout";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { ErrorFallback } from "@/components/error-fallback";
import { RoleSelectionSkeleton } from "@/components/loading-skeleton";
import { CardSkeleton } from "@/components/loading-skeleton";

// Pages
import Welcome from "@/pages/Onboarding/Welcome";
import Auth from "@/pages/Auth";
import RoleSelection from "@/pages/RoleSelection";
import Profile from "@/pages/Profile";
import Treater from "@/pages/Treater";
import Treatee from "@/pages/Treatee/Treatee";
import Bookmarks from "@/pages/Bookmarks";
import Messages from "@/pages/Messages";
import Explore from "@/pages/Explore";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route element={<Layout />}>
        <Route
          path="/explore"
          element={
            <Suspense fallback={<CardSkeleton />}>
              <Explore />
            </Suspense>
          }
        />
      </Route>

      {/* Protected routes */}
      <Route
        path="/auth/*"
        element={!user ? <Auth /> : <Navigate to="/role-selection" />}
      />
      <Route
        path="/role-selection"
        element={
          user ? (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<RoleSelectionSkeleton />}>
                <RoleSelection />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      {/* Once inside a protected page ( /treater, /treatee, /profile,...) -> ProtectedRoute.js will redirect users if they don't have a role */}
      <Route
        element={
          user ? <Layout /> : <Navigate to="/auth" state={{ mode: "login" }} />
        }
      >
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
    </Routes>
  );
}
