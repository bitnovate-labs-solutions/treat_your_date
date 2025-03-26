import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

// COMPONENTS
import AppHeader from "./AppHeader";
import AppNav from "./AppNav";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [title, setTitle] = useState("No Title");

  // Define Home Page route
  const isHomePage =
    location.pathname === "/treater" || location.pathname === "/treatee";

  const { data: profile } = useUserProfile(user); // Fetch user_profile data

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

  // HANDLE HOME PAGE VIEW
  const handleHomeClick = () => {
    if (profile?.role) {
      navigate(`/${profile.role}`);
    } else {
      navigate("/explore"); // Default to explore for non-authenticated users
    }
  };

  // MAP ROUTES TO TITLES HERE
  useEffect(() => {
    const titles = {
      "/": "Home",
      "/profile": "Profile",
      "/my-cart": "My Cart",
      "/messages": "Messages",
    };

    setTitle(titles[location.pathname] || "Home"); // Set the title based on the current route, fallback to "Home"
  }, [location.pathname]);

  return (
    <div className="h-full flex flex-col w-full max-w-md mx-auto">
      {/* HEADER */}
      <AppHeader isHomePage={isHomePage} title={title} />

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
