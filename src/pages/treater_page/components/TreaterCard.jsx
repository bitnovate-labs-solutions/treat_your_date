import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  ChevronDown,
  ChevronUp,
  Heart,
  MapPin,
  Clock,
  Tag,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import OrderCard from "@/pages/treater_page/components/OrderCard";
import ImageWithFallback from "@/components/ImageWithFallback";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TreaterCard({
  item,
  expanded,
  onToggle,
  showExpandButton = true,
  showMenuItems = true,
}) {
  const [showDescription, setShowDescription] = useState(false);
  const restaurantName = item.name;
  const restaurantMenuItems = item.menu_items || [];

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 border border-gray-100 rounded-xl shadow-lg relative w-full max-w-[360px] mx-auto",
          expanded ? "bg-white" : "bg-white"
        )}
      >
        <div className="min-h-[120px] p-3">
          <div className="flex gap-3 h-full">
            {/* CARD IMAGE */}
            <div className="w-[90px] h-[90px] rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={item.image_url}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CARD CONTENT SECTION */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              {/* TOP SECTION */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-gray-100 active:bg-gray-200 rounded-full touch-manipulation"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDescription(true);
                        }}
                      >
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* EXPAND / HIDE BUTTON */}
                  {showExpandButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 rounded-full transition-colors duration-200 shrink-0 touch-manipulation",
                        expanded
                          ? "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                          : "bg-primary/10 hover:bg-primary/20 active:bg-primary/30 text-primary"
                      )}
                      onClick={onToggle}
                    >
                      {expanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* MIDDLE SECTION */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="bg-primary/90 text-white px-2.5 py-1 rounded-full text-[10px] font-medium">
                    {item.cuisine_type}
                  </span>
                  <span className="bg-black/10 text-gray-700 px-2.5 py-1 rounded-full text-[10px] font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* BOTTOM SECTION */}
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-2">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD EXPANDED SECTION ------------------------------ */}
        {expanded && showMenuItems && (
          <div className="border-t border-gray-100 p-3 space-y-2 bg-gray-50">
            <div className="flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-primary" />
              <h4 className="font-medium text-gray-900 text-xs">Menu Items</h4>
            </div>
            <div className="grid gap-2">
              {restaurantMenuItems.map((menuItem) => (
                <OrderCard
                  key={menuItem.name}
                  item={menuItem}
                  restaurantName={restaurantName}
                />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Description Modal */}
      <Dialog open={showDescription} onOpenChange={setShowDescription}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">{item.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm text-lightgray leading-relaxed text-center mx-2">
              {item.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
