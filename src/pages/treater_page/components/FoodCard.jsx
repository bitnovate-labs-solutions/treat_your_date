import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, ChevronUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import OrderCard from "@/pages/treater_page/components/OrderCard";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function FoodCard({
  item,
  expanded,
  onToggle,
  showExpandButton = true,
  showMenuItems = true,
}) {
  // PASS RESTAURANT NAME as PROP TO ORDER CARD
  const restaurantName = item.name;

  // Use menu items from the food item
  const restaurantMenuItems = item.menu_items || [];

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 border-none rounded-2xl shadow-lg",
        expanded ? "bg-white" : "bg-white"
      )}
    >
      <div className="p-3 border-none">
        <div className="flex gap-3">
          {/* CARD IMAGE */}
          <div className="w-26 h-26 rounded-lg overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={item.image_url}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CARD CONTENT SECTION */}
          <div className="flex-1">
            {/* CARD TITLE */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs font-light text-darkgray">
                  {item.cuisine_type}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5">
              <div className="mr-2 col-span-3">
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {/* RATING */}
                    <span className="text-xs text-darkgray">
                      {item.rating.toFixed(1)}
                    </span>
                    {/* STAR ICON */}
                    <Star className="h-3 w-3 text-yellow-400 ml-1" />
                  </div>
                  <span className="text-darkgray text-xl">•</span>
                  {/* LIKES */}
                  <div className="flex items-center">
                    <span className="text-xs text-darkgray">{item.likes}</span>
                    <Heart className="h-3 w-3 text-pink-500 ml-1 fill-current" />
                  </div>
                </div>

                {/* CARD LOCATION */}
                <div className="mt-1">
                  <span className="inline-block px-2 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-md text-xs">
                    {item.location}
                  </span>
                </div>
              </div>

              {/* EXPAND / HIDE BUTTON */}
              <div className="flex items-end col-span-2 ml-2">
                {showExpandButton && (
                  <Button
                    className={`w-20 h-8 rounded-lg text-xs hover:bg-secondary ${
                      expanded
                        ? "bg-white border-1 border-primary text-primary"
                        : " bg-primary text-white"
                    }`}
                    onClick={onToggle}
                  >
                    {expanded ? (
                      <>
                        Hide <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Expand <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD EXPANDED SECTION ------------------------------ */}
      {expanded && showMenuItems && (
        <div className="p-2 space-y-3 pt-3">
          {restaurantMenuItems.map((menuItem) => (
            <OrderCard
              key={menuItem.name}
              item={menuItem}
              restaurantName={restaurantName}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
