import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/components/AppLayout";
// import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
// import { ErrorFallback } from "@/components/error-fallback";
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
import AuthCallback from "@/routes/AuthCallback";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Authentication route */}
      <Route
        path="/auth/*"
        element={!user ? <Auth /> : <Navigate to="/create-profile" />}
      />

      {/* Layout-wrapped routes (Public + Protected) */}
      <Route element={<Layout />}>
        {/* Public route */}
        <Route
          path="/explore"
          element={
            <Suspense fallback={<CardSkeleton />}>
              <Explore />
            </Suspense>
          }
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/treater" element={<Treater />} />
          <Route path="/treatee" element={<Treatee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Route>
    </Routes>
  );
}
