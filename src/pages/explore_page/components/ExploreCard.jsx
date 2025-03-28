import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ExploreCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleJoin = () => {
    setHasJoined(true);
  };

  // Format the date to display as "Feb 22, 2025"
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden mb-6 shadow-xl border-gray-200">
      {/* Card Header with Image */}
      <div className="relative w-full h-[130px]">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Top Labels */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <span className="bg-primary text-white px-4 py-1 rounded-lg">
            DINNER | SET A
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 hover:bg-white/30 rounded-lg"
            onClick={handleLike}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </Button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-semibold text-white mb-1">
            {item.name}
          </h3>
          <div className="flex justify-between items-center text-white">
            <span>{item.location}</span>
            <span>{formatDate(item.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          {/* Treators Section */}
          <div className="w-1/2">
            <h4 className="text-sm font-medium mb-2">Treators</h4>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 px-3 py-1 rounded-lg">
                <span className="text-primary">+3</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 w-full mx-4"
              >
                Pay
              </Button>
            </div>
          </div>

          {/* Treatee Section */}
          <div className="w-1/2 ml-4">
            <h4 className="text-sm font-medium mb-2">Treatee</h4>
            <div className="flex items-center gap-2">
              <div className="bg-red-50 px-3 py-1 rounded-lg">
                <span className="text-red-500">+20</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary/10 w-full mx-4"
                onClick={handleJoin}
                disabled={hasJoined}
              >
                {hasJoined ? "Joined" : "Join"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
