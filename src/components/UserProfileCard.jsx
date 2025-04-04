import { Card } from "@/components/ui/card";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Button } from "@/components/ui/button";
import {
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
  Folder,
} from "lucide-react";

export default function UserProfileCard({
  user,
  showDetails = false,
  onShowDetails,
  onChat,
  className = "",
}) {
  return (
    <Card className={`overflow-hidden border-none shadow-2xl rounded-2xl ${className}`}>
      {/* PROFILE IMAGE */}
      <div className="h-[450px] w-full relative">
        <ImageWithFallback
          src={user.avatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-black/10" />
      </div>

      {/* BASIC INFO SECTION */}
      <div className="p-6 space-y-4">
        {/* NAME AND AGE */}
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{user.name || "-"}</h2>
          <span className="text-2xl font-bold">,</span>
          <p className="text-2xl font-bold">{user.age || "-"}</p>
        </div>

        {/* ROLE AND LOCATION */}
        <div className="flex items-center gap-2">
          {/* USER ROLE */}
          <div
            className={`px-3 py-0.5 rounded-full ${
              user?.role === "treater"
                ? "bg-blue-200 text-blue-800"
                : "bg-secondary text-primary"
            }`}
          >
            <p className="text-sm capitalize">{user.role || "-"}</p>
          </div>

          {/* USER LOCATION */}
          <div className="flex gap-1 px-3 py-0.5 bg-emerald-100 rounded-full">
            <MapPin className="text-emerald-900 w-4 h-4 mr-1 my-auto" />
            <p className="text-emerald-900 text-sm capitalize">
              {user.location || "-"}
            </p>
          </div>
        </div>

        {/* OCCUPATION */}
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-darkgray" />
          <p className="text-darkgray capitalize">
            {user.occupation || "-"}
          </p>
        </div>

        {/* VIEW DETAILS BUTTON */}
        {onShowDetails && (
          <div
            className="flex items-center gap-2 bg-primary/10 rounded-xl p-3 cursor-pointer"
            onClick={onShowDetails}
          >
            <svg
              className={`w-5 h-5 text-primary transition-transform duration-200 ${
                showDetails ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="text-primary font-medium">View Details</span>
          </div>
        )}
      </div>

      {/* USER DETAILS - COLLAPSIBLE */}
      {showDetails && (
        <div className="p-6 space-y-6 border-t border-gray-100">
          {/* ABOUT ME SECTION */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">About Me</h3>
            <p className="text-gray-600">
              {user.about || "No description available"}
            </p>
          </div>

          {/* MY DETAILS SECTION */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">My Details</h3>
            <div className="space-y-4">
              {/* Education */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Education</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.education || "-"}</p>
              </div>

              {/* Height */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Height</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.height || "-"}</p>
              </div>

              {/* Smoking */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Cigarette className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Smoking</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.smoking || "-"}</p>
              </div>

              {/* Drinking */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Wine className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Drinking</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.drinking || "-"}</p>
              </div>

              {/* Pets */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <PawPrint className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Pets</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.pets || "-"}</p>
              </div>

              {/* Children */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Baby className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Children</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.children || "-"}</p>
              </div>

              {/* Zodiac */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Telescope className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Zodiac Sign</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.zodiac || "-"}</p>
              </div>

              {/* Religion */}
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Church className="w-4 h-4 mr-4 text-darkgray" />
                  <span className="text-base font-semibold text-darkgray">Religion</span>
                </div>
                <p className="text-lightgray text-sm text-right">{user.religion || "-"}</p>
              </div>
            </div>
          </div>

          {/* INTERESTS SECTION */}
          {user.interests?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">I enjoy</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 bg-primary/80 rounded-full py-1 px-3"
                  >
                    <span className="text-xs text-white">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES SECTION */}
          {user.languages?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">I communicate in</h3>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((language) => (
                  <div
                    key={language}
                    className="flex items-center gap-2 bg-primary/80 rounded-full py-1 px-3"
                  >
                    <span className="text-xs text-white">{language}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          {onChat && (
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 rounded-xl text-white" onClick={onChat}>
                Chat
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
} 