// To replace the fallback image with a Lucide React CircleAlert icon (or any other image) when an image fails to load
import { useState } from "react";
import { CircleAlert } from "lucide-react";

const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  return error ? (
    <div className={`flex items-center justify-center ${className}`}>
      <CircleAlert size={48} className="text-gray-400" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default ImageWithFallback;

// // Usage example:
// <ImageWithFallback
//   src="https://example.com/nonexistent.jpg"
//   alt="Fallback Example"
//   className="w-32 h-32 object-cover"
// />
