import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ImageViewerModal({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  onPrevious,
  onNext,
}) {
  const [dragStart, setDragStart] = useState(0);

  const handleDragStart = (event, info) => {
    setDragStart(info.point.x);
  };

  const handleDragEnd = (event, info) => {
    const dragDistance = info.point.x - dragStart;
    const threshold = 100; // minimum distance to trigger swipe

    if (dragDistance > threshold && currentImageIndex > 0) {
      onPrevious();
    } else if (
      dragDistance < -threshold &&
      currentImageIndex < images.length - 1
    ) {
      onNext();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] h-[95vh] bg-black/95 border-none p-0 rounded-2xl">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 0.98 }}
        >
          {/* X BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
          >
            <X className="h-6 w-6" />
          </button>

          {/* IMAGE HOLDER */}
          <div className="w-full h-full flex items-center justify-center p-2">
            <ImageWithFallback
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain pointer-events-none"
            />
          </div>

          {/* IMAGE COUNTER */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-xs">
            {currentImageIndex + 1} / {images.length}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
