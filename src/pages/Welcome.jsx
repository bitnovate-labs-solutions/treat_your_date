import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import your onboarding images
import OnboardingImage1 from "@/assets/tyd_logo.png";
import OnboardingImage2 from "@/assets/images/welcome2.png";
import OnboardingImage3 from "@/assets/images/treater.png";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

const onboardingSteps = [
  {
    title: "Welcome to TreatYourDate",
    description: "Connect with food lovers and share amazing meals together",
    image: OnboardingImage1,
  },
  {
    title: "Find Your Perfect Match",
    description:
      "Whether you're here for love, friendship, or just great conversations, we’re here to help you find the right match starting with the right food interests",
    image: OnboardingImage2,
  },
  {
    title: "Share a meal and make meaningful connections",
    description: (
      <div className="text-center">
        <div className="flex flex-col space-y-4">
          <div className="mt-4">
            <strong className="block text-xl text-primary">Be a Treator</strong>
            <p className="text-lightgray">
              Treat someone to a meal and enjoy great company
            </p>
          </div>
          <div>
            <strong className="block text-xl text-primary">Be a Treatee</strong>
            <p className="text-lightgray">
              Request a meal and get invited by a Treator
            </p>
          </div>
        </div>
        <p className="mt-6">
          Whichever role you choose, good food and good company are just a tap
          away! <br />
          Let’s get started!
        </p>
      </div>
    ),
    image: OnboardingImage3,
  },
];

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

  // Check auth state and redirect if necessary
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

  // If user is not authenticated, show onboarding
  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Navigate to Explore page instead of auth
      navigate("/explore", { replace: true });
    }
  };

  return (
    <div className="h-screen max-w-md mx-auto bg-white flex flex-col justify-center px-6">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* WELCOME IMAGE */}
        <div className="flex justify-center items-center mb-6">
          <img
            src={onboardingSteps[currentStep].image}
            alt="Welcome"
            loading={currentStep === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-darkgray-title mb-2">
            {onboardingSteps[currentStep].title}
          </h1>
          <p className="text-lightgray">
            {onboardingSteps[currentStep].description}
          </p>
        </div>

        {/* Pagination Dots */}
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

        {/* Button */}
        <Button
          className="w-full max-w-md bg-primary hover:bg-primary-hover text-white rounded-full py-6"
          onClick={handleNext}
        >
          {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
