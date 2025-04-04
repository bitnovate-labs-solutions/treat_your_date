import { useState, Suspense } from "react";
import { usePurchasedItems } from "@/hooks/usePurchases";

// COMPONENTS
import ErrorComponent from "@/components/ErrorComponent";
import PurchaseCard from "../components/PurchaseCard";
import RedeemQRModal from "../components/RedeemQRModal";
import PackageDetailsModal from "../components/PackageDetailsModal";

// Separate component for the purchase list to enable suspense
function PurchaseList() {
  const [showQRCode, setShowQRCode] = useState(null);
  const [showPackageDetails, setShowPackageDetails] = useState(null);

  // HOOKS
  const { data: purchasedItems, error } = usePurchasedItems();

  // LOADING AND ERROR HANDLERS
  if (error) return <ErrorComponent message={error.message} />;

  const selectedItem = purchasedItems?.find(
    (item) => item.id === showQRCode || item.id === showPackageDetails
  );

  return (
    <>
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

      <RedeemQRModal
        isOpen={!!showQRCode}
        onClose={() => setShowQRCode(null)}
        purchaseItem={selectedItem}
      />

      <PackageDetailsModal
        isOpen={!!showPackageDetails}
        onClose={() => setShowPackageDetails(null)}
        purchaseItem={selectedItem}
      />
    </>
  );
}

// Loading skeleton for purchase cards
function PurchaseCardSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-32 bg-gray-100 rounded-xl animate-pulse"
        ></div>
      ))}
    </div>
  );
}

// Main Purchased component
export default function Purchased() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<PurchaseCardSkeleton />}>
        <PurchaseList />
      </Suspense>
    </div>
  );
}
