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
  // additionalInfo = null,
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 border-none shadow-lg",
        expanded ? "bg-white" : "bg-white"
      )}
    >
      <div className="p-3 border-none shadow-xl">
        <div className="flex gap-4">
          {/* CARD IMAGE */}
          <div className="w-26 h-26 rounded-lg overflow-hidden flex-shrink-0">
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
                <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs font-light text-darkgray">
                  {item.cuisine_type}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5">
              <div className="mr-3 col-span-3">
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
                    {/* {item.location} */}
                    Petaling Jayaxxxxx
                  </span>
                  {/* {additionalInfo} */}
                </div>
              </div>

              {/* EXPAND / HIDE BUTTON */}
              <div className="flex items-end col-span-2">
                {showExpandButton && (
                  <Button
                    // variant="secondary"
                    className="w-20 h-10 bg-primary rounded-lg text-xs text-white hover:bg-secondary"
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
        <div className="p-2 space-y-3 pt-4">
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
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              {/* CONTENT SECTION */}
              <div className="flex gap-3">
                {/* IMAGE */}
                <div className="w-26 h-26 rounded-lg overflow-hidden">
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
              </div>

              <div className="flex flex-col w-full">
                {/* MENU NAME AND DESCRIPTION */}
                <div className="pl-3 pb-6">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {menuItem.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {menuItem.description}
                  </p>
                </div>

                <div className="flex items-center justify-between px-3">
                  {/* PRICE*/}
                  <span className="px-4 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-lg">
                    ${menuItem.price}
                  </span>

                  {/* ADD BUTTON */}
                  <Button className="bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-xl">
                    <Heart className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
