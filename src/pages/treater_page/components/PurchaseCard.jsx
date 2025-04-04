import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Users, Package, Info } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function PurchaseCard({ item, onShowQR, onShowDetails }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl shadow-lg">
      {/* CARD HEADER */}
      <CardHeader className="p-4">
        <div className="flex items-start gap-3">
          {/* PACKAGE IMAGE */}
          <div className="w-22 h-22 rounded-lg overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={item?.purchase_items[0]?.menu_packages?.menu_images?.[0]?.image_url || []}
              alt={item.name || "Package image"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                {/* RESTAURANT NAME */}
                <h6 className="text-sm font-bold text-darkgray">
                  {item?.purchase_items?.[0]?.menu_packages?.restaurant.name || "Unnamed Restaurant"}
                </h6>

                {/* PACKAGE NAME */}
                <CardTitle className="text-base font-bold text-gray-900">
                  {item?.purchase_items?.[0]?.menu_packages?.name || "Unnamed Package"}
                </CardTitle>
              </div>

              {/* ABOUT PACKAGE */}
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 active:bg-gray-200 rounded-full touch-manipulation"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowDetails(item.id);
                  }}
                >
                  <Info className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>

            {/* PACKAGE PRICE & BUTTON */}
            <div className="grid grid-cols-2 mt-2.5">
              <div>
                <Badge
                  variant="outline"
                  className={`font-medium h-8 text-sm px-3 rounded-md flex items-center ${
                    item?.purchase_items?.[0]?.menu_packages?.package_type === "basic"
                      ? "bg-sky-200 text-sky-600"
                      : item?.purchase_items?.[0]?.menu_packages === "mid"
                      ? "bg-purple-200 text-purple-600"
                      : item?.purchase_items?.[0]?.menu_packages === "premium"
                      ? "bg-orange-200 text-orange-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  RM {item?.purchase_items?.[0]?.menu_packages?.price || 0}
                </Badge>
              </div>

              <div>
                <Button
                  size="sm"
                  className="w-full shadow-xl"
                  onClick={() => onShowQR(item.id)}
                >
                  <QrCode className="h-4 w-4 mr-1 text-white" />
                  <span className="text-white">Redeem</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* CARD CONTENT */}
      <CardContent className="p-3 pt-0">
        <div className="grid grid-cols-4 gap-2 pb-1">
          {/* PACKAGE QUANTITY */}
          <div className="flex items-center gap-2 mx-auto">
            <Package className="h-4 w-4 text-lightgray" />
            <span className="text-sm text-gray-600">
              x {item?.purchase_items?.[0]?.quantity || 0}
            </span>
          </div>

          {/* INTERESTED TREATEES */}
          <div className="col-span-3 flex gap-2 ml-4">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm text-gray-600">
              {item.interested_count || 0} interested
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
