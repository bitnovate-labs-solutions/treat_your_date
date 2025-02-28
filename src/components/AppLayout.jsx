import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  UtensilsCrossed,
  ShoppingCart,
  MessagesSquare,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import AppHeader from "./AppHeader";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("menu");

  // Only fetch profile if user is authenticated
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      // Return null if no user
      if (!user) return null;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id, // Only run query if user exists
  });

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
        title="Food"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* OUTLET - placeholder for rendering child routes (Page content goes here!) */}
      <main className="flex-1 overflow-y-auto pb-16 bg-gray-100">
        <Outlet />
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="w-full max-w-md mx-auto fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl">
        <div className="container mx-auto px-4 shadow-lg h-[4.5rem]">
          <div className="flex justify-around py-4">
            {/* USER ICON (PROFILE) BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
            >
              <User
                className={`${
                  location.pathname === `/profile`
                    ? "text-[#636AE8]"
                    : "text-gray-500"
                }`}
              />
            </Button>
            {/* FOOD ICON BUTTON */}
            <Button variant="ghost" size="icon" onClick={handleHomeClick}>
              <UtensilsCrossed
                className={`${
                  location.pathname === `/${profile?.role}`
                    ? "text-[#636AE8]"
                    : "text-gray-500"
                }`}
              />
            </Button>
            {/* SHOPPING CART ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/bookmarks")}
            >
              <ShoppingCart className="h-6 w-6 text-gray-500" />
            </Button>
            {/* MESSAGE ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/messages")}
            >
              <MessagesSquare className="h-6 w-6 text-gray-500" />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
