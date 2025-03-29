import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

// ASSETS
import OnboardingImage1 from "@/assets/tyd_logo.png";
import TreaterImage from "@/assets/images/treater.png";
import TreateeImage from "@/assets/images/treatee.png";
import { onboardingSteps } from "./data/onboarding_data";

// Prefetch and cache API data
const prefetchData = async (queryClient) => {
  try {
    // Fetch initial data
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

    // Cache the data
    queryClient.setQueryData(["foodItems"], foodData);

    // Cache images
    foodData?.forEach((item) => {
      const img = new Image();
      img.src = item.image_url || item.restaurants?.image_url;
    });
  } catch (error) {
    console.error("Prefetch error:", error);
  }
};

export default function Welcome() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: profile, isLoading } = useUserProfile(user);

  // CHECK AUTH STATE AND REDIRECT BASED ON ROLE
  useEffect(() => {
    if (user && !isLoading) {
      if (profile?.role) {
        // If user has a profile, redirect to their role page
        navigate(`/${profile.role}`, { replace: true });
      } else {
        // If user is authenticated but no profile, redirect to create profile
        navigate("/create-profile", { replace: true });
      }
    }
  }, [user, profile, isLoading, navigate]);

  // Start prefetching data when component mounts
  useEffect(() => {
    prefetchData(queryClient);
  }, [queryClient]);

  // Show loading state while checking auth/profile
  if (isLoading) {
    return (
      <div className="h-screen max-w-md mx-auto bg-white flex flex-col items-center justify-center px-6">
        <img
          src={OnboardingImage1}
          alt="TreatYourDate Logo"
          className="w-32 h-32 mb-4"
        />
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  // RENDER ONBOARDING DESCRIPTION
  const renderDescription = (currentStep) => {
    if (currentStep === 2) {
      return (
        <>
          <div className="flex mt-8">
            <div className="w-1/2">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={TreaterImage}
                  alt="Welcome"
                  className="w-20 h-20 object-cover"
                />
              </div>
              <strong className="text-lg font-black text-primary">
                Be a Treator
              </strong>
              <p className="text-lightgray mt-2">
                <strong className="text-primary">Treat</strong> someone <br />{" "}
                to a meal and enjoy great company
              </p>
            </div>

            {/* DIVIDER */}
            <div className="flex flex-col items-center">
              <div className="flex-1 border-l border-lightgray mb-4" />
              <span className="px-3 text-xs">OR</span>
              <div className="flex-1 border-l border-lightgray mt-4" />
            </div>

            <div className="w-1/2">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={TreateeImage}
                  alt="Welcome"
                  className="w-20 h-20 object-cover"
                />
              </div>
              <strong className="text-lg font-black text-primary">
                Be a Treatee
              </strong>
              <p className="text-lightgray mt-2">
                <strong className="text-primary">Request</strong> a meal <br />{" "}
                and get invited by a Treator
              </p>
            </div>
          </div>
          <p className="mt-6 text-darkgray">
            Whichever <strong className="text-primary font-black">role</strong>{" "}
            you choose, <br /> good food and good company are just a tap away!
          </p>
        </>
      );
    }
    return (
      <p className="text-lightgray">
        {onboardingSteps[currentStep].description}
      </p>
    );
  };

  // HANDLE NEXT
  const handleNext = () => {
    // If user is not authenticated, show onboarding
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Navigate to Explore page instead of auth
      navigate("/explore", { replace: true });
    }
  };

  return (
    <div className="h-screen max-w-sm mx-auto bg-white flex flex-col justify-center px-6">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* WELCOME IMAGE */}
        {onboardingSteps[currentStep].image && (
          <div className="flex justify-center items-center mb-6">
            <img
              src={onboardingSteps[currentStep].image}
              alt="Welcome"
              loading={currentStep === 0 ? "eager" : "lazy"}
              className="w-65 h-auto object-cover flex-shrink-0"
            />
          </div>
        )}

        {/* TITLE & DESCRIPTION */}
        <div className="text-center mb-6 text-sm">
          <h1 className="text-2xl font-black text-gray-600 mb-6">
            {onboardingSteps[currentStep].title}
          </h1>
          <p className="text-lightgray">{renderDescription(currentStep)}</p>
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep ? "w-4 bg-primary" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* NEXT BUTTON */}
        <Button
          className="w-full max-w-md bg-primary hover:bg-primary-hover text-white rounded-full py-6"
          onClick={handleNext}
        >
          {currentStep === onboardingSteps.length - 1
            ? "Let's Get Started"
            : "Next"}
        </Button>
      </div>
    </div>
  );
}
