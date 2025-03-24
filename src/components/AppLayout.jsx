import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  UtensilsCrossed,
  ShoppingCart,
  MessagesSquare,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import AppHeader from "./AppHeader";
import { useUserProfile } from "@/hooks/useUserProfile";

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
      <nav className="w-full max-w-sm sm:max-w-md mx-auto fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl">
        <div className="container mx-auto px-4 shadow-lg h-[4.5rem]">
          <div className="flex justify-around py-4">
            {/* USER ICON (PROFILE) BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleProtectedNavigation("/profile")}
            >
              <User
                className={`${
                  location.pathname === `/profile`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
            {/* FOOD ICON BUTTON */}
            <Button variant="ghost" size="icon" onClick={handleHomeClick}>
              <UtensilsCrossed
                className={`${
                  location.pathname === `/${profile?.role}`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
            {/* SHOPPING CART ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleProtectedNavigation("/bookmarks")}
            >
              <ShoppingCart
                className={`${
                  location.pathname === `/bookmarks`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
            {/* MESSAGE ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleProtectedNavigation("/messages")}
            >
              <MessagesSquare
                className={`${
                  location.pathname === `/messages`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
