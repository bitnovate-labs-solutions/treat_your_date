import { useState, useEffect } from "react";

export function useImageCache(imageUrl) {
  const [cachedUrl, setCachedUrl] = useState(null);
  const cacheKey = `img_cache_${imageUrl}`;

  useEffect(() => {
    if (!imageUrl) return;

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setCachedUrl(cached);
      return;
    }

    try {
      localStorage.setItem(cacheKey, imageUrl);
      setCachedUrl(imageUrl);
    } catch (error) {
      console.error("LocalStorage full, clearing cache...", error);
      clearOldCache();
      localStorage.setItem(cacheKey, imageUrl);
      setCachedUrl(imageUrl);
    }
  }, [imageUrl, cacheKey]);

  return cachedUrl || imageUrl;
}

function clearOldCache() {
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith("img_cache_")
  );
  if (keys.length > 10) {
    keys.slice(0, 5).forEach((key) => localStorage.removeItem(key));
  }
}
