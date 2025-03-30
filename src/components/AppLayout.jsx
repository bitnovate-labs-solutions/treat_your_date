import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import PullToRefresh from "react-pull-to-refresh";

// COMPONENTS
import AppHeader from "./AppHeader";
import AppNav from "./AppNav";

export default function Layout({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Define page routes for Header
  const isHomePage =
    location.pathname === "/treater" || location.pathname === "/treatee";
  const isProfilePage =
    location.pathname === "/treater" || location.pathname === "/profile";

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

  // Handle pull to refresh
  const handleRefresh = async () => {
    // Force a reload of the current page
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-sm mx-auto bg-gray-100">
      {/* HEADER */}
      <AppHeader
        isHomePage={isHomePage}
        isProfilePage={isProfilePage}
        title={title}
      />

      {/* OUTLET - placeholder for rendering child routes (Page content goes here!) */}
      <div className="flex-1 relative">
        <PullToRefresh
          onRefresh={handleRefresh}
          // className={`flex-1 ${isHomePage ? "px-3 pt-22" : "p-0"}`}
          className="absolute inset-0"
        >
          {/* <main className="flex-1 pt-14"> */}
          <main className={`h-full ${isHomePage ? "px-3 pt-34" : "p-0"}`}>
            <div className="pt-14">
              <Outlet />
            </div>
          </main>
        </PullToRefresh>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <AppNav
        profile={profile}
        handleHomeClick={handleHomeClick}
        handleProtectedNavigation={handleProtectedNavigation}
      />
    </div>
  );
}
