import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function RedeemQRModal({
  isOpen,
  onClose,
  purchaseItem,
  onNextQR,
  onPrevQR,
}) {
  if (!purchaseItem) return null;

  const { currentQRCode, totalQRCodes, unusedQRCodes, qrIndex } = purchaseItem;
  const menuPackage = purchaseItem.purchase_items[0]?.menu_packages;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-2xl border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Redeem QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          {/* QR Code Display with Navigation */}
          <div className="flex items-center gap-2 text-primary">
            <Button
              variant="outline"
              onClick={onPrevQR}
              className="h-12 w-12 rounded-full border-none"
            >
              <ChevronLeft
                style={{ width: "28px", height: "28px" }}
                className="mx-auto"
              />
            </Button>

            <div className="flex-shrink-0">
              <QRCodeSVG
                value={currentQRCode}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={onNextQR}
              className="h-12 w-12 rounded-full border-none"
            >
              <ChevronRight
                style={{ width: "28px", height: "28px" }}
                className="mx-auto"
              />
            </Button>
          </div>

          {/* Package Info */}
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-primary">
              {menuPackage?.name}
            </h3>
            <p className="text-sm text-muted-foreground text-darkgray">
              {menuPackage?.restaurant?.name}
            </p>
          </div>

          {/* QR Code Progress */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              QR Code {qrIndex + 1} of {totalQRCodes}
            </p>
            <p>{unusedQRCodes} remaining</p>
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-muted-foreground text-lightgray">
            <p>
              Show this QR code to the restaurant staff to redeem your purchase.
            </p>
            <p>Each QR code can only be used once.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
