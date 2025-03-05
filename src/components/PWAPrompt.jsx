import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // For non-iOS devices, listen for install prompt
    if (!isIOSDevice) {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowPrompt(true);
      });
    } else {
      // Show iOS prompt if not already installed
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      if (!isStandalone) {
        setShowPrompt(true);
      }
    }
  }, []);

  // HANDLE INSTALL
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
          {isIOS ? (
            <div className="text-sm text-gray-600">
              <p>To install this app:</p>
              <ol className="ml-4 list-decimal">
                <li>
                  Tap the share button <Share className="w-4 h-4 inline" />
                </li>
                <li>Scroll down and tap &quot;Add to Home Screen&quot;</li>
              </ol>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Add to your home screen for better experience
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setShowPrompt(false)}>
            {isIOS ? "Got it" : "Later"}
          </Button>
          {!isIOS && <Button onClick={handleInstallClick}>Install</Button>}
        </div>
      </div>
    </div>
  );
}
