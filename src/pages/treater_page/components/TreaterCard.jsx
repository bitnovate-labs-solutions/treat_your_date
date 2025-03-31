import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, ChevronUp, Heart, MapPin, Clock, Tag, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import OrderCard from "@/pages/treater_page/components/OrderCard";
import ImageWithFallback from "@/components/ImageWithFallback";
import { useState } from "react";

export default function TreaterCard({
  item,
  expanded,
  onToggle,
  showExpandButton = true,
  showMenuItems = true,
}) {
  const [showDescription, setShowDescription] = useState(false);
  const restaurantName = item.restaurant_name;
  const restaurantMenuItems = item.menu_items || [];

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 border border-gray-100 rounded-xl hover:shadow-lg relative w-full",
        expanded ? "bg-white" : "bg-white"
      )}
    >
      {/* Description Sheet - Bottom Sheet style for mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 z-50 transition-all duration-300 touch-none",
          showDescription ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowDescription(false)}
      >
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 transition-transform duration-300 touch-pan-y",
            showDescription ? "translate-y-0" : "translate-y-full"
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">About {item.restaurant_name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full"
              onClick={() => setShowDescription(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>
          <div className="h-8" /> {/* Safe area spacing */}
        </div>
      </div>

      <div className="min-h-[120px] p-2.5">
        <div className="flex gap-2.5 h-full">
          {/* CARD IMAGE */}
          <div className="w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={item.image_url}
              alt={item.restaurant_name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CARD CONTENT SECTION */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* TOP SECTION */}
            <div>
              <div className="flex items-start justify-between gap-1.5 mb-1.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {item.restaurant_name}
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
                  <div className="flex items-center gap-2 text-xs text-gray-600">
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
              <div className="flex flex-wrap items-center gap-1">
                <span className="bg-primary/90 text-white px-2 py-0.5 rounded-full text-[10px] font-medium">
                  {item.cuisine_type}
                </span>
                <span className="bg-black/10 text-gray-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                  {item.category}
                </span>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CARD EXPANDED SECTION ------------------------------ */}
      {expanded && showMenuItems && (
        <div className="border-t border-gray-100 p-2.5 space-y-2 bg-gray-50">
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
  );
}
