import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";

export default function RedeemQRModal({ isOpen, onClose, purchaseItem }) {
  if (!purchaseItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-2xl">
        {/* MODAL TITLE */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {purchaseItem?.purchase_items?.[0]?.menu_packages?.name ||
              "Voucher Title"}
          </DialogTitle>
        </DialogHeader>

        {/* ORDER CONTENTS */}
        <div className="space-y-4">
          <div className="space-y-3 text-sm text-gray-600">
            {/* ORDER ID */}
            <div className="flex justify-between">
              <span className="text-gray-700">Order ID</span>
              <span className="font-medium text-gray-900">
                {(purchaseItem.id || "ABC12345").slice(0, 18)}
              </span>
            </div>

            {/* ORDER AMOUNT */}
            <div className="flex justify-between">
              <span>Package Price</span>
              <span className="font-medium">
                RM{" "}
                {purchaseItem?.purchase_items?.[0]?.menu_packages?.price || ""}
              </span>
            </div>

            {/* ORDER DATE */}
            <div className="flex justify-between">
              <span>Purchase date</span>
              <span className="font-medium">
                {purchaseItem?.created_at
                  ? new Date(purchaseItem.created_at).toLocaleDateString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )
                  : new Date().toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
              </span>
            </div>

            {/* VALIDITY */}
            <div className="flex justify-between">
              <span>Validity</span>
              <span className="font-medium">30 days from date of purchase</span>
            </div>

            {/* VOUCHER CODE */}
            <div className="flex justify-between">
              <span>Voucher code</span>
              <span className="font-medium">PP12345</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center py-4">
            <div className="w-48 h-48 bg-gray-200 border-2 border-gray-200 rounded-lg flex items-center justify-center">
              <QrCode className="h-32 w-32 text-gray-800" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
