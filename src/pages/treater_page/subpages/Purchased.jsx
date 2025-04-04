import { useState } from "react";
import { usePurchasedItems } from "@/hooks/usePurchases";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import PurchaseCard from "../components/PurchaseCard";
import RedeemQRDialog from "../components/RedeemQRModal";
import PackageDetailsDialog from "../components/PackageDetailsModal";

export default function Purchased() {
  const [showQRCode, setShowQRCode] = useState(null);
  const [showPackageDetails, setShowPackageDetails] = useState(null);
  const { data: purchasedItems, isLoading, error } = usePurchasedItems();

  // LOADING AND ERROR HANDLERS
  if (isLoading) return <LoadingComponent type="screen" text="Loading..." />;
  if (error) return <ErrorComponent message={error.message} />;

  const selectedItem = purchasedItems?.find(
    (item) => item.id === showQRCode || item.id === showPackageDetails
  );

  return (
    <div className="space-y-4">
      {purchasedItems?.map((item) => (
        <PurchaseCard
          key={item.id}
          item={item}
          onShowQR={setShowQRCode}
          onShowDetails={setShowPackageDetails}
        />
      ))}

      {purchasedItems?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No purchased items yet
        </div>
      )}

      <RedeemQRDialog
        isOpen={!!showQRCode}
        onClose={() => setShowQRCode(null)}
        purchaseItem={selectedItem}
      />

      <PackageDetailsDialog
        isOpen={!!showPackageDetails}
        onClose={() => setShowPackageDetails(null)}
        purchaseItem={selectedItem}
      />
    </div>
  );
}
