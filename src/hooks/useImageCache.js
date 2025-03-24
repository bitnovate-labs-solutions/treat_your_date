import { useMemo, useEffect, useState } from "react";

export function useImageCache(imageUrl) {
  const cacheKey = `img_cache_${imageUrl}`;

  // 🔥 Read from localStorage first to avoid re-renders
  const initialUrl = useMemo(
    () => localStorage.getItem(cacheKey) || imageUrl,
    [cacheKey, imageUrl]
  );

  const [cachedUrl, setCachedUrl] = useState(initialUrl);

  useEffect(() => {
    if (!imageUrl) return;

    // 🔥 Preload the image in the background
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      try {
        localStorage.setItem(cacheKey, imageUrl);
      } catch (error) {
        console.error("LocalStorage full, clearing cache...", error);
        clearOldCache();
        localStorage.setItem(cacheKey, imageUrl);
      }
      setCachedUrl(imageUrl); // Update state only after preload
    };
  }, [imageUrl, cacheKey]);

  return cachedUrl;
}

function clearOldCache() {
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith("img_cache_")
  );
  if (keys.length > 10) {
    keys.slice(0, 5).forEach((key) => localStorage.removeItem(key));
  }
}
