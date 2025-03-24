import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useUserProfile } from "@/hooks/useUserProfile";

// COMPONENTS
import AppHeader from "./AppHeader";
import AppNav from "./AppNav";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: profile } = useUserProfile(user); // Fetch user_profile data
  const [activeTab, setActiveTab] = useState("menu");

  // If no profile exists and we're not on the create-profile or auth/callback path,
  // redirect to create-profile
  useEffect(() => {
    const currentPath = location.pathname;
    if (
      user &&
      !profile?.role &&
      currentPath !== "/create-profile" &&
      currentPath !== "/auth/callback"
    ) {
      navigate("/create-profile", { replace: true });
    }
  }, [user, profile, location.pathname, navigate]);

  // HANDLE PROTECTED ROUTES
  const handleProtectedNavigation = (path) => {
    if (!user) {
      // Store current location before redirecting
      navigate("/auth", {
        state: {
          mode: "login",
          from: location.pathname,
        },
      });
    } else {
      navigate(path);
    }
  };

  // HANDLE HEADER TAB CHANGE
  const handleTabChange = (value) => {
    setActiveTab(value);
    // Invalidate relevant queries based on tab
    queryClient.invalidateQueries(["foodItems", value]);
  };

  // HANDLE HOME PAGE VIEW
  const handleHomeClick = () => {
    if (profile?.role) {
      navigate(`/${profile.role}`);
    } else {
      navigate("/explore"); // Default to explore for non-authenticated users
    }
  };

  return (
    <div className="h-full flex flex-col w-full max-w-md mx-auto">
      {/* HEADER */}
      <AppHeader
        title={location.pathname === "/profile" ? "User Profile" : "Food"}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showTabsAndFilters={location.pathname !== "/profile"}
      />

      {/* OUTLET - placeholder for rendering child routes (Page content goes here!) */}
      <main className="flex-1 overflow-y-auto pb-16 bg-gray-100">
        <Outlet />
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <AppNav
        profile={profile}
        handleHomeClick={handleHomeClick}
        handleProtectedNavigation={handleProtectedNavigation}
      />
    </div>
  );
}
