import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, User } from "lucide-react";
import { useImageCache } from "@/hooks/useImageCache";

export default function TreateeCard({ item, onLike, isLiked }) {
  const cachedImageUrl = useImageCache(
    item.image_url || item.restaurants?.image_url
  );

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
            {item.meal_type} | SET A
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
              {item.restaurants?.location}
            </p>
          </div>
          <div className="text-xs text-gray-300 flex items-center">
            <span className="mr-2">
              <Calendar size={15} />
            </span>
            {new Date(item.available_date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <CardContent className="py-2 px-4 h-[120px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold">Treators</p>
            <div className="flex flex-col">
              {/* Avatar stack */}
              <div className="flex -space-x-2 mb-1">
                {item.user_selections?.slice(0, 3).map((selection) => (
                  <div
                    key={selection.id}
                    className="w-10 h-10 rounded-xl bg-gray-200 border-2 border-white overflow-hidden"
                  >
                    {selection.user_profiles?.avatar_url ? (
                      <img
                        src={selection.user_profiles.avatar_url}
                        alt={selection.user_profiles.display_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#EEF2FF] flex items-center justify-center">
                        <span className="text-xs text-primary">
                          {selection.user_profiles?.display_name?.[0] || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Interested count */}
              <div className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-lg">
                <span className="text-sm text-primary">+{item.likes || 0}</span>
                <span className="text-sm text-primary flex items-center">
                  <User size={15} className="mx-1" /> interested
                </span>
              </div>
            </div>
          </div>
          {/* JOIN BUTTON */}
          <Button className="bg-primary hover:bg-primary-hover text-white">
            Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
