import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/components/AppLayout";
// import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
// import { ErrorFallback } from "@/components/error-fallback";
import { CardSkeleton } from "@/components/loading-skeleton";

// Pages
import Welcome from "@/pages/Welcome";
import Auth from "@/pages/auth/Auth";
import Profile from "@/pages/Profile";
import Treater from "@/pages/treater-page/Treater";
import Treatee from "@/pages/treatee-page/Treatee";
import ShoppingCart from "@/pages/cart_page/Cart";
import Messages from "@/pages/Messages";
import Explore from "@/pages/Explore";
import CreateProfile from "@/pages/CreateProfile";
import EditProfile from "@/pages/edit-profile/EditProfile";
import AuthCallback from "@/routes/AuthCallback";
import Connect from "@/pages/connect_page/Connect";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Welcome />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Authentication route */}
      <Route
        path="/auth/*"
        element={!user ? <Auth /> : <Navigate to="/create-profile" />}
      />

      {/* PROTECTED ROUTES - WITHOUT LAYOUT */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>

      {/* LAYOUT-WRAPPED ROUTES */}

      <Route
        path="/explore"
        element={
          <Suspense fallback={<CardSkeleton />}>
            <Explore />
          </Suspense>
        }
      />

      {/* PROTECTED ROUTES + LAYOUT  */}
      <Route element={<ProtectedRoute />}>
        {/* <Route path="/create-profile" element={<CreateProfile />} /> */}
        {/* <Route path="/edit-profile" element={<EditProfile />} /> */}

        {/* TREATER PAGE */}
        <Route element={<Layout title="Welcome back, Treater!" />}>
          <Route path="/treater" element={<Treater />} />
        </Route>
        {/* TREATEE PAGE */}
        <Route element={<Layout title="Welcome back, Treatee!" />}>
          <Route path="/treatee" element={<Treatee />} />
        </Route>
        {/* PROFILE PAGE */}
        <Route element={<Layout title="Profile" />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* SHOPPING CART PAGE */}
        <Route element={<Layout title="My Cart" />}>
          <Route path="/my-cart" element={<ShoppingCart />} />
        </Route>
        {/* CONNECT PAGE */}
        <Route element={<Layout title="Connect" />}>
          <Route path="/connect" element={<Connect />} />
        </Route>
        {/* MESSAGES PAGE */}
        <Route element={<Layout title="Messages" />}>
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Route>
    </Routes>
  );
}
