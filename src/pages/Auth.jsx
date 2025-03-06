import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Logo from "@/assets/tyd_logo.png";
import Google from "@/assets/google.svg";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function Auth() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // const prefetchData = async () => {
  //   try {
  //     const { data: foodData } = await supabase
  //       .from("foods")
  //       .select(
  //         `
  //         *,
  //         restaurants (*),
  //         user_selections (
  //           id,
  //           user_profile_id,
  //           role,
  //           user_profiles (*)
  //         )
  //       `
  //       )
  //       .order("available_date", { ascending: true });

  //     // Cache the data with optimized settings
  //     queryClient.setQueryData(["foodItems"], foodData, {
  //       staleTime: 5 * 60 * 1000, // 5 minutes
  //       cacheTime: 30 * 60 * 1000, // 30 minutes
  //     });

  //     // Preload images in background
  //     foodData?.forEach((item) => {
  //       if (item.image_url || item.restaurants?.image_url) {
  //         const img = new Image();
  //         img.src = item.image_url || item.restaurants?.image_url;
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Prefetch error:", error);
  //   }
  // };

  // HANDLE GOOGLE SIGN IN
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true); // Prevent navigation until auth is complete

      // Cache API responses before triggering Google auth
      const { data: foodData } = await supabase
        .from("foods")
        .select(
          `
      *,
      restaurants (*),
      user_selections (
        id,
        user_profile_id,
        role,
        user_profiles (*)
      )
    `
        )
        .order("available_date", { ascending: true });

      // Set cached data with optimized settings
      queryClient.setQueryData(["foodItems"], foodData, {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
      });

      // Only trigger Google auth after caching is complete
      await signInWithGoogle();
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Authentication Error", {
        description: "Please ensure you have enabled pop-ups for this site.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white py-12">
      <div className="w-full max-w-md mx-auto px-6">
        {/* BACK BUTTON */}
        <Button
          onClick={() => navigate(-1)}
          className="bg-white mb-8 text-darkgray hover:text-darkgray-hover hover:bg-white text-2xl shadow-none"
          disabled={isLoading}
        >
          ←
        </Button>

        <div className="space-y-8">
          {/* LOGO */}
          <div className="flex justify-center">
            <img src={Logo} alt="TreatYourDate logo" />
          </div>

          <div className="text-center">
            {/* SIGN UP TITLE */}
            <h1 className="text-2xl font-semibold mb-2 text-darkgray-title">
              Welcome to TreatYourDate
            </h1>

            {/* SIGN IN DESCRIPTION */}
            <p className="text-base text-lightgray">
              Continue with Google to get started
            </p>
          </div>

          {/* GOOGLE AUTH BUTTON */}
          <div className="px-4">
            <Button
              className="w-full h-14 bg-primary hover:bg-primary-hover text-white text-base rounded-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading ? true : undefined}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>
                  <img src={Google} alt="Google" className="w-5 h-5" />
                  Continue with Google
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
