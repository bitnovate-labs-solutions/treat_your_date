import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import your onboarding images
import OnboardingImage1 from "@/assets/images/tyd_logo.png";
import OnboardingImage2 from "@/assets/images/welcome2.png";
import OnboardingImage3 from "@/assets/images/welcome3.png";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

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
    title: "Where Generosity Meets Great Company!",
    description: (
      <>
        Ready to share a meal and make meaningful connections? Choose your role
        and start your journey: <br />
        <br />
        <strong>Be a Treator</strong> <br />
        Treat someone to a meal and enjoy great company <br />
        <br />
        <strong>Be a Treatee</strong> <br />
        Request a meal and get invited by a Treator
        <br /> <br />
        Whichever role you choose, good food and good company are just a tap
        away! <br /> Let’s get started!
      </>
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

  // Start prefetching data when component mounts
  useEffect(() => {
    prefetchData(queryClient);
  }, [queryClient]);

  // HANDLE NEXT
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
        <div className="flex justify-center items-center">
          <img
            src={onboardingSteps[currentStep].image}
            alt="Welcome"
            loading={currentStep === 0 ? "eager" : "lazy"}
            // className="w-full h-full object-cover rounded-2xl"
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
