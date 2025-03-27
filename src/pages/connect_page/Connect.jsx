import { useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useImageCache } from "@/hooks/useImageCache";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  X,
  MapPin,
  User,
  GraduationCap,
  Ruler,
  Cigarette,
  Wine,
  PawPrint,
  Baby,
  Telescope,
  Church,
  ChevronDown,
} from "lucide-react";
import defaultImage from "@/assets/images/default-avatar.jpg";
import { toast } from "sonner";

const Connect = () => {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedUsers, setSwipedUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  // Fetch potential matches
  const { data: potentialMatches, isLoading } = useQuery({
    queryKey: ["potentialMatches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .neq("user_id", user.id)
        .not("user_id", "in", `(${swipedUsers.join(",")})`);

      if (error) throw error;
      return data;
    },
  });

  const currentUser = potentialMatches?.[currentIndex];
  const cachedImageUrl = useImageCache(currentUser?.avatar_url);

  const handleSwipe = useCallback(
    (direction) => {
      if (!currentUser || isSwiping) return;

      setIsSwiping(true);
      setShowDetails(false);

      if (direction === "right") {
        // Like user
        toast.success("Liked!");
        setSwipedUsers((prev) => [...prev, currentUser.user_id]);
      } else if (direction === "left") {
        // Pass user
        toast.info("Passed");
        setSwipedUsers((prev) => [...prev, currentUser.user_id]);
      }

      // Move to next user after a short delay
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsSwiping(false);
      }, 300);
    },
    [currentUser, isSwiping]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    onTouchStartOrOnMouseDown: () => {
      if (showDetails) {
        setShowDetails(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold mb-4">
          No more profiles to show
        </h2>
        <p className="text-gray-500">Check back later for more matches!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <div {...handlers} className="relative">
          <Card className="overflow-hidden border-none shadow-2xl rounded-2xl">
            {/* PROFILE IMAGE */}
            <div className="h-[600px] w-full relative">
              <img
                src={cachedImageUrl || defaultImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-black/10" />

              {/* USER NAME, AGE, GENDER */}
              <div className="flex absolute bottom-22 left-6 text-white text-2xl font-bold">
                <p>{currentUser.display_name || "-"}</p>
                <span>,</span>
                <p className="ml-2">{currentUser.age || "-"}</p>
              </div>

              <div className="flex absolute bottom-15 left-6">
                {/* USER GENDER */}
                <div
                  className={`px-3 py-0.5 rounded-full mr-2 ${
                    currentUser?.gender === "Male"
                      ? "bg-sky-200 text-sky-800"
                      : "bg-pink-200 text-pink-800"
                  }`}
                >
                  <p className="text-sm capitalize">
                    {currentUser.gender || "-"}
                  </p>
                </div>

                {/* USER ROLE */}
                <div
                  className={`px-3 py-0.5 rounded-full mr-2 ${
                    currentUser?.role === "treater"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-secondary text-primary"
                  }`}
                >
                  <p className="text-sm capitalize">
                    {currentUser.role || "-"}
                  </p>
                </div>

                {/* USER LOCATION */}
                <div className="flex gap-1 px-3 py-0.5 bg-emerald-100 rounded-full">
                  <MapPin className="text-emerald-900 w-4 h-4 mr-1 my-auto" />
                  <p className="text-emerald-900 text-sm capitalize">
                    {currentUser.location || "-"}
                  </p>
                </div>
              </div>

              {/* USER OCCUPATION */}
              <div className="flex absolute bottom-8 left-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 my-auto text-white" />
                </div>
                <p className="text-white text-sm capitalize">
                  {currentUser.occupation || "-"}
                </p>
              </div>

              {/* VIEW DETAILS BUTTON */}
              <div
                className={`absolute bottom-0 right-0.5 flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-tl-md px-4 py-1 cursor-pointer ${
                  showDetails ? "hidden" : "rounded-br-xl"
                }`}
                onClick={() => !isSwiping && setShowDetails(!showDetails)}
              >
                <span className="text-white text-sm">View Details</span>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform duration-200 ${
                    showDetails ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="absolute bottom-5 right-5 flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white rounded-full p-3 border-gray-100"
                onClick={() => handleSwipe("left")}
                disabled={isSwiping}
              >
                <X className="h-6 w-6 text-red-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white rounded-full p-3 border-gray-100"
                onClick={() => handleSwipe("right")}
                disabled={isSwiping}
              >
                <Heart className="h-6 w-6 text-green-500" />
              </Button>
            </div> */}

            {/* USER DETAILS - COLLAPSIBLE */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                showDetails
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <CardContent className="space-y-6 p-6">
                {/* ABOUT ME SECTION -------------------- */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">About Me</h3>
                  <p className="text-gray-600">
                    {currentUser.about_me || "No description available"}
                  </p>
                </div>

                {/* MY DETAILS SECTION -------------------- */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* EDUCATION */}
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {currentUser.education || "-"}
                      </span>
                    </div>

                    {/* HEIGHT */}
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {currentUser.height || "-"}
                      </span>
                    </div>
                    {/* SMOKING */}
                    <div className="flex items-center gap-2">
                      <Cigarette className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {currentUser.smoking || "-"}
                      </span>
                    </div>
                    {/* DRINKNG */}
                    <div className="flex items-center gap-2">
                      <Wine className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {currentUser.drinking || "-"}
                      </span>
                    </div>
                    {/* PETS */}
                    <div className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{currentUser.pets || "-"}</span>
                    </div>
                    {/* CHILDREN */}
                    <div className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {currentUser.children || "-"}
                      </span>
                    </div>
                    {/* ZODIAC */}
                    <div className="flex items-center gap-2">
                      <Telescope className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {currentUser.zodiac || "-"}
                      </span>
                    </div>
                    {/* RELIGION */}
                    <div className="flex items-center gap-2">
                      <Church className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {currentUser.religion || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* INTERESTS SECTION -------------------- */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Interests</h3>
                  {currentUser.interests && currentUser.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {currentUser.interests.map((interest) => (
                        <div
                          key={interest}
                          className="flex items-center gap-2 bg-primary/80 rounded-full py-1 px-3"
                        >
                          <span className="text-xs text-white">{interest}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-lightgray">
                      No interests added yet
                    </p>
                  )}
                </div>

                {/* LANGUAGES SECTION -------------------- */}
                <div className="space-y-4 pb-4">
                  <h3 className="text-lg font-bold">Languages</h3>
                  {currentUser.languages && currentUser.languages.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {currentUser.languages.map((language) => (
                        <div
                          key={language}
                          className="flex items-center gap-2 bg-primary/80 rounded-full py-1 px-3"
                        >
                          <span className="text-xs text-white">{language}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-lightgray">
                      No languages added yet
                    </p>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Connect;
