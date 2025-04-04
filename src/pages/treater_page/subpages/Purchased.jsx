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
  const [selectedQRIndex, setSelectedQRIndex] = useState(0); // Track which QR code is being shown

  // HOOKS
  const { data: purchasedItems, error } = usePurchasedItems();

  // LOADING AND ERROR HANDLERS
  if (error) return <ErrorComponent message={error.message} />;

  // Process and group purchase items by menu package
  const processedItems = purchasedItems?.reduce((acc, purchase) => {
    purchase.purchase_items.forEach(item => {
      const menuPackageId = item.menu_packages.id;
      const existingItem = acc.find(i => i.menuPackageId === menuPackageId);

      if (existingItem) {
        // Update existing item
        existingItem.purchase_items[0].quantity += item.quantity;
        // Add this purchase ID to the list if it's not already included
        if (!existingItem.purchaseIds.includes(purchase.id)) {
          existingItem.purchaseIds.push(purchase.id);
        }
        // Add individual QR codes for each quantity
        for (let i = 0; i < item.quantity; i++) {
          existingItem.qrCodes.push({
            code: `${purchase.id}-${menuPackageId}-${existingItem.qrCodes.length + i}`,
            purchaseId: purchase.id,
            used: false
          });
        }
      } else {
        // Create new grouped item with QR codes
        const qrCodes = Array.from({ length: item.quantity }, (_, i) => ({
          code: `${purchase.id}-${menuPackageId}-${i}`,
          purchaseId: purchase.id,
          used: false
        }));

        acc.push({
          id: `${purchase.id}-${menuPackageId}`,
          menuPackageId,
          purchaseIds: [purchase.id],
          created_at: purchase.created_at,
          interested_count: purchase.interested_count,
          purchase_items: [{
            ...item,
            quantity: item.quantity
          }],
          qrCodes
        });
      }
    });
    return acc;
  }, []) || [];

  // Find the selected item from processed items
  const selectedProcessedItem = processedItems.find(
    item => item.id === showQRCode || item.id === showPackageDetails
  );

  // Find all related purchases for the selected item
  const selectedPurchases = selectedProcessedItem
    ? purchasedItems?.filter(purchase => 
        selectedProcessedItem.purchaseIds.includes(purchase.id)
      )
    : [];

  // Combine all related purchases into one purchase object and filter for the correct menu package
  const combinedPurchase = selectedProcessedItem && selectedPurchases?.length
    ? {
        ...selectedPurchases[0],
        purchase_items: selectedPurchases
          .flatMap(p => p.purchase_items)
          .filter(item => item.menu_packages.id === selectedProcessedItem.menuPackageId),
        // Add the current QR code and total available
        currentQRCode: selectedProcessedItem.qrCodes[selectedQRIndex]?.code,
        totalQRCodes: selectedProcessedItem.qrCodes.length,
        unusedQRCodes: selectedProcessedItem.qrCodes.filter(qr => !qr.used).length,
        qrIndex: selectedQRIndex
      }
    : null;

  // Handle QR code navigation
  const handleNextQR = () => {
    if (selectedProcessedItem) {
      const nextIndex = (selectedQRIndex + 1) % selectedProcessedItem.qrCodes.length;
      setSelectedQRIndex(nextIndex);
    }
  };

  const handlePrevQR = () => {
    if (selectedProcessedItem) {
      const prevIndex = selectedQRIndex === 0 
        ? selectedProcessedItem.qrCodes.length - 1 
        : selectedQRIndex - 1;
      setSelectedQRIndex(prevIndex);
    }
  };

  // Reset QR index when closing modal
  const handleCloseQR = () => {
    setShowQRCode(null);
    setSelectedQRIndex(0);
  };

  return (
    <>
      {processedItems.map((item) => (
        <PurchaseCard
          key={item.id}
          item={item}
          onShowQR={(id) => setShowQRCode(id)}
          onShowDetails={(id) => setShowPackageDetails(id)}
        />
      ))}

      {processedItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No purchased items yet
        </div>
      )}

      <RedeemQRModal
        isOpen={!!showQRCode}
        onClose={handleCloseQR}
        purchaseItem={combinedPurchase}
        onNextQR={handleNextQR}
        onPrevQR={handlePrevQR}
      />

      <PackageDetailsModal
        isOpen={!!showPackageDetails}
        onClose={() => setShowPackageDetails(null)}
        purchaseItem={combinedPurchase}
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
