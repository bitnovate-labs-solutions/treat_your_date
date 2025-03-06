import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Only show for iOS devices
    if (isIOSDevice) {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      if (!isStandalone) {
        setShowPrompt(true);
      }
    }
  }, []);

  // Only show for iOS devices that haven't installed the PWA
  if (!isIOS || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-semibold">Install TreatYourDate</h3>
          <div className="text-sm text-gray-600">
            <p>To install this app:</p>
            <ol className="ml-4 list-decimal">
              <li>
                Tap the share button <Share className="w-4 h-4 inline" />
              </li>
              <li>Scroll down and tap &quot;Add to Home Screen&quot;</li>
            </ol>
          </div>
        </div>
        <Button variant="ghost" onClick={() => setShowPrompt(false)}>
          Not now
        </Button>
      </div>
    </div>
  );
}
