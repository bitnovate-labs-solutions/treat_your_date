import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, User, User2 } from "lucide-react";
import { useImageCache } from "@/hooks/useImageCache";
import { useState } from "react";

export default function TreateeCard({ item, onLike, isLiked, additionalInfo }) {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [interestedCount, setInterestedCount] = useState(item.likes || 0);
  const cachedImageUrl = useImageCache(
    item.image_url || item.restaurants?.image_url
  );

  const allUsers = item.purchased_by || [];
  const displayedUsers = showAllUsers ? allUsers : allUsers.slice(0, 4);
  const remainingCount = allUsers.length - 4;

  const handleJoinClick = () => {
    setHasRequested(true);
    setInterestedCount((prev) => prev + 1);
  };

  return (
    <Card className="overflow-hidden bg-white border-gray-200 shadow-md">
      {/* CARD HEADER */}
      <div className="relative w-full h-[130px] overflow-hidden">
        {/* CARD IMAGE */}
        <img
          src={cachedImageUrl}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="absolute top-4 right-4 flex gap-2">
          {/* CARD LABEL */}
          <span className="flex items-center bg-primary text-white px-3 py-auto rounded-lg text-sm">
            {item.cuisine_type} | SET A
          </span>

          {/* CARD LIKE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="bg-secondary/80 rounded-lg"
            onClick={() => onLike(item.id)}
          >
            <Heart
              className="h-5 w-5 text-white"
              fill={isLiked ? "white" : "none"}
            />
          </Button>
        </div>

        {/* CARD LABEL - Food, Location and Date */}
        <div className="w-full absolute bottom-0 flex justify-between mb-2 px-4 text-white">
          <div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-white/80">
              {item.name}, {item.location}
            </p>
          </div>
          <div className="text-xs text-gray-300 flex items-center">
            <span className="mr-2">
              <Calendar size={15} />
            </span>
            {item.purchase_date || item.booked_at
              ? new Date(
                  item.purchase_date || item.booked_at
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : new Date(item.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <CardContent className="py-2 px-4">
        <div className="grid grid-cols-3">
          <div className="space-y-2 col-span-2">
            {/* Treators section */}
            <div>
              <p className="text-sm font-semibold mb-2">Purchased by</p>
              {/* Avatar stack */}
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {displayedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="relative w-10 h-10 rounded-xl bg-gray-200 border-2 border-white overflow-hidden"
                    >
                      <img
                        src={user.user_profiles.avatar_url}
                        alt={user.user_profiles.display_name}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${
                          user.user_profiles.status === "online"
                            ? "bg-green-500"
                            : user.user_profiles.status === "away"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                {!showAllUsers && remainingCount > 0 && (
                  <div className="ml-2 h-10 rounded-xl bg-secondary/30 flex items-center justify-center px-4">
                    <span className="text-sm text-primary">
                      +{remainingCount}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Interested count */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-lg w-fit">
              <span className="text-sm text-rose-500 flex">
                {interestedCount}
              </span>
              <span className="text-sm text-rose-500 flex">
                <User2 className="h-4 w-4 text-primary mr-1" />
                <p>interested</p>
              </span>
            </div>
          </div>

          {/* Join Button */}
          <Button
            onClick={handleJoinClick}
            disabled={hasRequested}
            className={`h-8 bg-primary text-white hover:bg-bg-secondary rounded-lg my-auto ${
              hasRequested ? "bg-gray-400 cursor-not-allowed" : "px-6"
            }`}
          >
            <span className="text-sm">
              {hasRequested ? "Requested" : "Join"}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
