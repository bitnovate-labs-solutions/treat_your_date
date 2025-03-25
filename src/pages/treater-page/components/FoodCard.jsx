import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, ChevronUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FoodCard({
  item,
  expanded,
  onToggle,
  showExpandButton = true,
  showMenuItems = true,
  additionalInfo = null,
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 border-none shadow-lg",
        expanded ? "bg-white" : "bg-white"
      )}
    >
      <div className="p-4 border-none shadow-xl">
        <div className="flex gap-4">
          {/* CARD IMAGE */}
          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>

          {/* CARD CONTENT SECTION */}
          <div className="flex-1">
            {/* CARD TITLE */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.cuisine_type}</p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-6">
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center">
                    {/* RATING */}
                    <span className="text-sm text-darkgray">
                      {item.rating.toFixed(1)}
                    </span>
                    {/* STAR ICON */}
                    <Star className="h-4 w-4 text-yellow-400 ml-1" />
                  </div>
                  <span className="text-darkgray text-xl">•</span>
                  {/* LIKES */}
                  <div className="flex items-center">
                    <span className="text-sm text-darkgray">{item.likes}</span>
                    <Heart className="h-4 w-4 text-pink-500 ml-1 fill-current" />
                  </div>
                </div>

                {/* CARD LOCATION */}
                <div className="mt-1">
                  <span className="inline-block px-3 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-md text-sm">
                    {/* {item.location} */}
                    Petaling Jaya
                  </span>
                  {/* {additionalInfo} */}
                </div>
              </div>

              {/* EXPAND / HIDE BUTTON */}
              <div className="flex items-end mx-auto">
                {showExpandButton && (
                  <Button
                    // variant="secondary"
                    className="bg-primary rounded-xl text-white hover:bg-secondary"
                    onClick={onToggle}
                  >
                    {expanded ? (
                      <>
                        Hide <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Expand <ChevronDown className="ml-2 h-4 w-4" />
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
        <div className="p-2 space-y-6 pt-4">
          {[
            {
              name: "Chicken Sandwich",
              description: "Chicken with mushroom & drinks",
              price: 100,
            },
            {
              name: "Chicken Chop",
              description: "With fries, vege & drinks",
              price: 149,
            },
            {
              name: "Chicken Wings",
              description: "With potatoes & drinks",
              price: 199,
            },
          ].map((menuItem, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
            >
              {/* CONTENT SECTION */}
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1540189549336 + index
                    }?auto=format&fit=crop&w=400&q=80`}
                    alt={menuItem.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{menuItem.name}</h4>
                  <p className="text-sm text-gray-500">
                    {menuItem.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* PRICE*/}
                <span className="px-3 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-lg">
                  ${menuItem.price}
                </span>

                {/* ADD BUTTON */}
                <Button className="bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-xl">
                  <Heart className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
