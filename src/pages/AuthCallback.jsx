import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const { user, checkUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Get the PWA state from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const isPWA = urlParams.get("isPWA") === "true";

      if (user) {
        const profile = await checkUserProfile(user.id);
        const redirectPath = !profile ? "/create-profile" : `/${profile.role}`;

        if (isPWA) {
          // For PWA, use window.location to force a full reload
          window.location.href = redirectPath;
        } else {
          // For browser, use normal navigation
          navigate(redirectPath, { replace: true });
        }

        // if (!profile) {
        //   navigate("/create-profile", { replace: true });
        // } else {
        //   navigate(`/${profile.role}`, { replace: true });
        // }
      }
    };

    handleCallback();
  }, [user, navigate, checkUserProfile]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Setting up your account...</p>
    </div>
  );
}
