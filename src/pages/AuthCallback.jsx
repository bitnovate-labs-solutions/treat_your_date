import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const { user, checkUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      if (user) {
        const profile = await checkUserProfile(user.id);
        if (!profile) {
          navigate("/create-profile", { replace: true });
        } else {
          navigate(`/${profile.role}`, { replace: true });
        }
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
