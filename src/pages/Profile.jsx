import { Suspense } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  LogOut,
  Mail,
  Calendar,
  Folder,
  User,
  GraduationCap,
  MapPin,
  Ruler,
  Cigarette,
  Wine,
  PawPrint,
  Baby,
  Telescope,
  Church,
  Instagram,
  Facebook,
  Twitter,
  Edit,
} from "lucide-react";
import defaultImage from "@/assets/images/default-avatar.jpg";

// Error & Loading Handlers
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { ProfileSkeleton } from "@/components/loading-skeleton";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import { useImageCache } from "@/hooks/useImageCache";

function UserProfile() {
  // const [imageSrc, setImageSrc] = useState(null);
  const { user, signOut } = useAuth();
  const { data: profile, isLoading, error } = useUserProfile(user); // Fetch data from user_profiles
  const navigate = useNavigate();

  // Use custom caching hook
  const cachedImageUrl = useImageCache(profile?.avatar_url);

  if (isLoading) return <ProfileSkeleton />;
  if (error) return <ErrorFallback error={error} />;

  // HANDLE SIGN OUT
  const handleSignOut = async () => {
    try {
      // Remove all cached images
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("img_cache_")) {
          localStorage.removeItem(key);
        }
      });

      await signOut();
    } catch (error) {
      console.error("Sign-out error: ", error);
      toast.error("Error", {
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  console.log(profile);

  return (
    <div>
      <Card className="bg-white border-gray-200 shadow-md rounded-none pb-12">
        <CardContent className="space-y-4 p-4">
          {/* PROFILE IMAGE */}
          <div className="h-[450px] w-full relative">
            {/* IMAGE */}
            <img
              // src={imageSrc}
              src={cachedImageUrl || defaultImage}
              alt="Profile"
              className="w-full h-full rounded-2xl object-cover border-1 border-gray-200 shadow-xl"
            />

            {/* IMAGE OVERLAY */}
            <div className="rounded-2xl shadow-xl absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />

            {/* Name */}
            <div className="flex absolute bottom-20 left-6 text-white text-2xl font-bold">
              <p>{profile?.display_name || "-"}</p>
              <span>,</span>
              <p className="ml-2">{profile?.age || "-"}</p>
            </div>

            <div className="flex absolute bottom-12 left-6">
              {/* Role */}
              <div
                className={`px-3 py-0.5 rounded-full mr-2 ${
                  profile?.role === "treater"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-secondary text-primary"
                }`}
              >
                <p className="text-sm capitalize">{profile?.role || "-"}</p>
              </div>

              {/* Location */}
              <div className="flex gap-1 px-3 py-0.5 bg-emerald-100 rounded-full">
                <MapPin className="text-emerald-900 w-4 h-4 mr-1 my-auto" />
                <p className="text-emerald-900 text-sm capitalize">
                  {profile?.location || "-"}
                </p>
              </div>
            </div>

            {/* Occupation */}
            <div className="flex absolute bottom-5 left-6">
              <div className="flex items-center">
                <Folder className="w-4 h-4 mr-2 my-auto text-white" />
              </div>
              <p className="text-white text-sm capitalize">
                {profile?.occupation || "-"}
              </p>
            </div>

            {/* CODE FOR POSSIBLE FUTURE USE */}
            {/* <p className="text-xs text-center text-darkgray mt-2">
              This is how your profile will appear in the swipe view
            </p> */}
          </div>

          {/* HEADER TITLE */}
          <CardHeader>
            <CardTitle className="text-lg text-center font-semibold text-gray-800">
              Hello, {profile?.display_name || "User"}!
            </CardTitle>

            <div className="flex justify-center">
              <h6 className="text-center text-sm font-bold text-darkgray">
                User ID:
              </h6>
              <span className="text-sm text-gray-400 ml-2">
                {profile?.user_id.slice(0, 8)}
              </span>
            </div>
          </CardHeader>

          {/* EDIT PROFILE BUTTON -------------------- */}
          <Button
            variant="outline"
            className="w-full mb-6 border-2 border-primary/50"
            onClick={() => navigate("/edit-profile")}
          >
            <Edit className="mr-2 h-4 w-4 text-primary" />
            <span className="text-primary">Edit Profile</span>
          </Button>

          <div className="space-y-4 mt-2">
            {/* ABOUT ME SECTION -------------------- */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-bold">About Me</h3>
              <p className="text-darkgray">{profile?.about_me}</p>
            </div>

            {/* MY DETAILS SECTION -------------------- */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-bold">My Details</h3>

              {/* Email */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Email
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right justify-between">
                  {user?.email}
                </p>
              </div>

              {/* Gender & Pronouns */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Gender
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize">
                  {profile?.gender || "-"}
                </p>
              </div>

              {/* Education */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Education
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.education || "-"}
                </p>
              </div>

              {/* Height */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Height
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.height || "-"}
                </p>
              </div>

              {/* Smoking */}
              <div className="flex justify-between">
                <div className="flex">
                  <Cigarette className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Smoking
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.smoking || "-"}
                </p>
              </div>

              {/* Drinking */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Wine className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Drinking
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.drinking || "-"}
                </p>
              </div>

              {/* Pets */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <PawPrint className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Pets
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.pets || "-"}
                </p>
              </div>

              {/* Children */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Baby className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Children
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.children || "-"}
                </p>
              </div>

              {/* Zodiac Sign */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Telescope className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Zodiac Sign
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.zodiac || "-"}
                </p>
              </div>

              {/* Religion */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Church className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Religion
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right capitalize overflow-ellipsis">
                  {profile?.religion || "-"}
                </p>
              </div>
            </div>

            {/* INTERESTS SECTION -------------------- */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-bold">I enjoy</h3>
              {/* INTERESTS CAPSULES */}
              {profile?.interests && profile.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile?.interests.map((interest) => (
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
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-bold">I communicate in</h3>
              {/* LANGUAGE CAPSULES */}
              {profile?.languages && profile.languages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile?.languages.map((language) => (
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

            {/* SOCIAL LINKS SECTION -------------------- */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-bold">Linked accounts</h3>

              {/* IG */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Instagram className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Instagram
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right overflow-ellipsis">
                  {profile?.social_links.instagram || "-"}
                </p>
              </div>

              {/* FB */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Facebook className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Facebook
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right overflow-ellipsis">
                  {profile?.social_links.facebook || "-"}
                </p>
              </div>

              {/* TWITTER */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Twitter className="w-4 h-4 mr-4 my-auto text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">
                    Twitter
                  </span>
                </div>
                <p className="text-lightgray text-sm text-right overflow-ellipsis">
                  {profile?.social_links.twitter || "-"}
                </p>
              </div>
            </div>

            {/* MEMBER SINCE -------------------- */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-bold">Member Since</h3>
              <p className="text-darkgray flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {formatDate(profile?.created_at)}
                </span>
              </p>
            </div>
          </div>

          {/* SIGN OUT BUTTON -------------------- */}
          <div className="pt-6">
            <Button
              className="w-full h-14 text-base bg-primary hover:bg-primary-hover text-white shadow-2xl"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Profile() {
  return (
    <ScrollArea>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<ProfileSkeleton />}>
          <UserProfile />
        </Suspense>
      </ErrorBoundary>
    </ScrollArea>
  );
}
