import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ChevronLeft, Plus } from "lucide-react";

export default function CreateProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    photo: null,
    display_name: "",
    about_me: "",
    occupation: "",
    education: "",
    location: "",
    height: "",
    smoking: "",
    drinking: "",
    zodiac: "",
    interests: "",
    children: "",
    pets: "",
    religion: "",
    role: "", // 'treatee' or 'treater'
    languages: "",
    linked_accounts: {
      instagram: "",
      facebook: "",
      twitter: "",
    },
  });

  // Calculate profile completion
  const calculateCompletion = () => {
    const requiredFields = ["photo", "about_me", "occupation", "role"];
    const completed = requiredFields.filter((field) => formData[field]).length;
    return (completed / requiredFields.length) * 100;
  };

  const createProfile = useMutation({
    mutationFn: async (profileData) => {
      // Upload photo if exists
      let photoUrl = null;
      if (profileData.photo instanceof File) {
        const fileExt = profileData.photo.name.split(".").pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("user_avatars")
          .upload(fileName, profileData.photo);

        if (uploadError) throw uploadError;
        photoUrl = uploadData.path;
      }

      // Create profile
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          user_id: user.id,
          ...profileData,
          photo: photoUrl,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", user.id], data);
      navigate(`/${data.role}`, { replace: true });
      toast.success("Profile created successfully!");
    },
    onError: (error) => {
      toast.error("Error creating profile", {
        description: error.message,
      });
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white px-4">
      {/* Header */}
      <div className="sticky top-0 bg-white py-4 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">Create profile</h1>
        <Button
          onClick={() => createProfile.mutate(formData)}
          disabled={createProfile.isLoading || calculateCompletion() < 100}
          variant="ghost"
          className="text-primary"
        >
          {createProfile.isLoading ? "Creating..." : "Create"}
        </Button>
      </div>

      {/* Profile Completion Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Profile completion</span>
          <span>{Math.round(calculateCompletion())}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${calculateCompletion()}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Photos Section */}
        <section>
          <h2 className="font-semibold mb-4">Photos</h2>
          <div className="relative aspect-square w-32">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className={`absolute inset-0 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer
                ${formData.photo ? "border-none" : ""}`}
            >
              {formData.photo ? (
                <img
                  src={
                    formData.photo instanceof File
                      ? URL.createObjectURL(formData.photo)
                      : formData.photo
                  }
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Plus className="text-gray-500" />
              )}
            </label>
          </div>
        </section>

        {/* About Me Section */}
        <section>
          <h2 className="font-semibold mb-4">About me</h2>
          <textarea
            className="w-full p-3 rounded-lg border border-gray-200 min-h-[100px]"
            placeholder="Write a few words about yourself"
            value={formData.about_me}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                about_me: e.target.value,
              }))
            }
          />
        </section>

        {/* Role Selection */}
        <section>
          <h2 className="font-semibold mb-4">I want to be a</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={formData.role === "treater" ? "default" : "outline"}
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "treater" }))
              }
              className="h-14"
            >
              Treater
            </Button>
            <Button
              type="button"
              variant={formData.role === "treatee" ? "default" : "outline"}
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "treatee" }))
              }
              className="h-14"
            >
              Treatee
            </Button>
          </div>
        </section>

        {/* My Details Section */}
        <section>
          <h2 className="font-semibold mb-4">My details</h2>
          <div className="space-y-4">
            {[
              { label: "Occupation", key: "occupation" },
              { label: "Education", key: "education" },
              { label: "Location", key: "location" },
              { label: "Height", key: "height" },
              { label: "Smoking", key: "smoking" },
              { label: "Drinking", key: "drinking" },
              { label: "Zodiac", key: "zodiac" },
              { label: "Religion", key: "religion" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex justify-between items-center"
              >
                <span className="text-gray-600">{field.label}</span>
                <Input
                  className="w-1/2 text-right"
                  placeholder="Add"
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* Language Section */}
        <section>
          <h2 className="font-semibold mb-4">I communicate in</h2>
          <div className="flex justify-between items-center">
            <span>Languages</span>
            <select
              className="border rounded-lg p-2"
              value={formData.languages}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  languages: e.target.value,
                }))
              }
            >
              <option>Native</option>
              <option>Fluent</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
          </div>
        </section>

        {/* Linked Accounts Section */}
        <section>
          <h2 className="font-semibold mb-4">Linked accounts</h2>
          <div className="space-y-4">
            {["Instagram", "Facebook", "Twitter"].map((platform) => (
              <div key={platform} className="flex justify-between items-center">
                <span>{platform}</span>
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom padding for scroll */}
      <div className="h-20" />
    </div>
  );
}
