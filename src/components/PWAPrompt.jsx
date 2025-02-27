import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-semibold">Install TreatYourDate</h3>
          <p className="text-sm text-gray-600">
            Add to your home screen for better experience
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setShowPrompt(false)}>
            Later
          </Button>
          <Button onClick={handleInstallClick}>Install</Button>
        </div>
      </div>
    </div>
  );
}
