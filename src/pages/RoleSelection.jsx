import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Media
import Treater_img from "@/assets/images/treater.png";
import Treatee_img from "@/assets/images/treatee.png";

export default function RoleSelection() {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch current profile to prevent duplicate inserts
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data || null;
    },
    enabled: !!user?.id,
  });

  // CREATE NEW USER PROFILE
  const createProfile = useMutation({
    mutationFn: async (selectedRole) => {
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          user_id: user.id,
          role: selectedRole,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Update the cache with the new profile
      queryClient.setQueryData(["profile", user.id], data);
      // Navigate to the role page
      navigate(`/${data.role}`, { replace: true });
      toast.success("Role selected!", {
        description: `You're now registered as a ${data.role}`,
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      toast.error("Role Required", {
        description: "Please select a role to continue",
      });
      return;
    }

    setIsLoading(true);

    if (profile?.role) {
      // If profile already exists with a role, just navigate
      navigate(`/${role}`);
      setIsLoading(false);
      return;
    }

    try {
      await createProfile.mutateAsync(role);
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const { error } = await supabase
    //     .from("user_profiles")
    //     .insert({
    //       user_id: user.id,
    //       role: role,
    //       created_at: new Date().toISOString(),
    //     })
    //     .select()
    //     .single();

    //   if (error) throw error;

    //   // Invalidate the profile query to force a refresh
    //   queryClient.invalidateQueries(["profile", user.id]);

    //   navigate(`/${role}`, { replace: true });
    //   toast.success("Role selected!", {
    //     description: `You're now registered as a ${role}`,
    //   });
    // } catch (error) {
    //   toast.error("Error", {
    //     description: error.message,
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-white px-6">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[28px] font-semibold text-gray-900 mb-4">
            Choose Your Role
          </h1>
          <p className="text-gray-400">
            Select how you want to use TreatYourDate
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* TREATER OPTION */}
          <button
            className={`p-6 rounded-2xl border-1 transition-all ${
              role === "treater"
                ? "border-[#636AE8] bg-[#EEF2FF] shadow-xl"
                : "border-gray-100 hover:border-gray-200"
            }`}
            onClick={() => setRole("treater")}
          >
            {/* TREATER IMAGE */}
            <div className="flex items-center justify-center mb-6">
              <img src={Treater_img} />
            </div>
            <h3 className="font-semibold text-center">Treater</h3>
            <p className="text-xs text-center text-gray-400 text-muted-foreground mt-3">
              The one who buys the meal
            </p>
          </button>

          {/* TREATEE OPTION */}
          <button
            className={`p-6 rounded-2xl border-2 transition-all ${
              role === "treatee"
                ? "border-[#6366F1] bg-[#EEF2FF] shadow-xl"
                : "border-gray-100 hover:border-gray-200"
            }`}
            onClick={() => setRole("treatee")}
          >
            {/* TREATER IMAGE */}
            <div className="flex items-center justify-center mb-6">
              <img src={Treatee_img} />
            </div>
            <h3 className="font-semibold text-center">Treatee</h3>
            <p className="text-xs text-center text-gray-400 text-muted-foreground mt-3">
              The one who gets the meal
            </p>
          </button>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!role || isLoading}
          >
            {isLoading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
