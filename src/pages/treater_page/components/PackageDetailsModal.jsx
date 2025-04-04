import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function PackageDetailsModal({ isOpen, onClose, purchaseItem }) {
  if (!purchaseItem) return null;

  const menuPackage = purchaseItem?.purchase_items?.[0]?.menu_packages;
  const restaurant = menuPackage?.restaurant;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border border-white/20 shadow-xl rounded-2xl">
        {/* PACKAGE NAME */}
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center text-gray-800">
            {menuPackage?.name || "Package Details"}
          </DialogTitle>
        </DialogHeader>

        {/* PACKAGE IMAGES */}
        <div className="relative w-full h-42 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={menuPackage?.menu_images?.[0]?.image_url}
            alt="Package"
            className="w-full h-full object-cover"
          />
          {menuPackage?.menu_images?.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {menuPackage.menu_images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === 0 ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* PACKAGE DESCRIPTION */}
        <div className="px-1 text-sm">
          <h4 className="font-semibold text-gray-800 mb-2">Package offers</h4>
          <p className="text-lightgray">{menuPackage?.description}</p>
        </div>

        {/* RESTAURANT INFO */}
        <div className="space-y-4 p-0 pt-4 border-t-1 border-gray-300">
          <div className="text-sm">
            <div className="flex items-center gap-3 px-1 pb-4">
              {/* RESTAURANT IMAGE */}
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={restaurant?.image_url}
                  alt="Restaurant"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RESTAURANT NAME & LOCATION */}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {restaurant?.name}
                </h3>
                <p className="text-lightgray text-sm">{restaurant?.location}</p>
              </div>
            </div>

            <div className="space-y-2">
              {/* RESTAURANT ADDRESS */}
              <div className="flex justify-between px-1">
                <span className="font-semibold text-gray-800">
                  Restaurant Address
                </span>
                <span className="text-lightgray text-right max-w-[200px] text-sm">
                  {restaurant?.address}
                </span>
              </div>

              {/* RESTAURANT CONTACT */}
              <div className="flex justify-between items-center p-1">
                <span className="font-semibold text-gray-800">Contact</span>
                <span className="text-lightgray text-right max-w-[200px] text-sm">
                  {restaurant?.phone_number}
                </span>
              </div>
            </div>
          </div>

          {/* VIEW ON MAP BUTTON */}
          <Button
            variant="outline"
            className="w-full mt-1 transition-all duration-300 text-primary"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  restaurant?.address
                )}`,
                "_blank"
              );
            }}
          >
            View on Map
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
