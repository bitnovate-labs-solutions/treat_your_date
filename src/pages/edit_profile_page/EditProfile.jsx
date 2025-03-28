import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  MapPin,
  Camera,
  Briefcase,
  GraduationCap,
  Ruler,
  Cigarette,
  Cake,
  Wine,
  Dog,
  Baby,
  Sparkles,
  Church,
  Instagram,
  Facebook,
  Twitter,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { editProfileSchema } from "@/lib/zod_schema";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user);
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  // USESTATES
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // FORM INITIALIZATION
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      display_name: "",
      age: "",
      about_me: "",
      occupation: "",
      education: "",
      location: "",
      gender: profile?.gender || "",
      height: "",
      smoking: profile?.smoking || "",
      drinking: profile?.drinking || "",
      pets: profile?.pets || "",
      children: profile?.children || "",
      zodiac: profile?.zodiac || "",
      religion: profile?.religion || "",
      interests: [],
      languages: [],
      social_links: {
        instagram: "",
        facebook: "",
        twitter: "",
      },
    },
  });

  // LOAD PROFILE DATA
  useEffect(() => {
    if (profile) {
      form.reset({
        display_name: profile.display_name || user?.user_metadata?.name || "",
        age: profile.age?.toString() || "",
        about_me: profile.about_me || "",
        occupation: profile.occupation || "",
        education: profile.education || "",
        location: profile.location || "",
        gender: profile.gender || "",
        height: profile.height || "",
        smoking: profile.smoking || "",
        drinking: profile.drinking || "",
        pets: profile.pets || "",
        children: profile.children || "",
        zodiac: profile.zodiac || "",
        religion: profile.religion || "",
        interests: profile.interests || [],
        languages: profile.languages || [],
        social_links: profile.social_links || {
          instagram: "",
          facebook: "",
          twitter: "",
        },
      });
      setProfileImage(profile.avatar_url);
      setSelectedInterests(profile.interests || []);
      setSelectedLanguages(profile.languages || []);
    }
  }, [profile, form]);

  // HANDLE IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from("user-avatars")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("user-avatars").getPublicUrl(fileName);

        setProfileImage(publicUrl);
      } catch (error) {
        toast.error("Error uploading image: ", error);
      }
    }
  };

  //   HANDLE SUBMIT
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          display_name: data.display_name,
          age: parseInt(data.age),
          about_me: data.about_me,
          occupation: data.occupation,
          education: data.education,
          location: data.location,
          gender: data.gender,
          height: data.height,
          smoking: data.smoking,
          drinking: data.drinking,
          pets: data.pets,
          children: data.children,
          zodiac: data.zodiac,
          religion: data.religion,
          interests: selectedInterests,
          languages: selectedLanguages,
          social_links: data.social_links,
          avatar_url: profileImage,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) throw error;

      // Invalidate profile cache to trigger a refetch
      await queryClient.invalidateQueries(["profile", user.id]);

      toast.success("Profile updated!", {
        description: "Your profile has been updated successfully",
      });

      navigate("/profile");
    } catch (error) {
      toast.error("Error", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full max-w-sm sm:max-w-md mx-auto">
      <div className="px-4 py-4 border-b border-b-gray-300">
        <div className="flex items-center">
          {/* LEFT CHEVRON */}
          <ChevronLeft onClick={() => navigate(-1)} className="text-gray-400" />
          <h1 className="flex-1 text-center font-semibold text-lg">
            Edit profile
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* FORMS */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* AVATAR PHOTO SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Photos</h2>

            {/* AVATAR UPDATE */}
            <div className="flex justify-center">
              <label className="h-[500px] not-target:aspect-square bg-lightgray/20 rounded-lg overflow-hidden relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Add photo</span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0"
                />
              </label>
            </div>
            {profileImage && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setProfileImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-sm text-primary hover:text-red-600"
                >
                  Remove photo
                </button>
              </div>
            )}
          </div>

          {/* DISPLAY NAME */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Display Name</h2>
            <p className="text-sm text-gray-500 mb-4">
              This is how you&apos;ll appear to others on the platform.
            </p>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                className="h-10 text-base rounded-xl border-gray-200 pl-12 shadow-lg"
                placeholder="Your display name"
                {...form.register("display_name")}
              />
            </div>
            {form.formState.errors.display_name && (
              <p className="text-sm text-red-500 px-1 mt-2">
                {form.formState.errors.display_name.message}
              </p>
            )}
          </div>

          {/* ABOUT ME SECTION ------------------------------ */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About me</h2>
            <p className="text-sm text-gray-500 mb-4">
              Make it easy for others to get a sense of who you are.
            </p>

            {/* TEXTAREA */}
            <Textarea
              placeholder="Share a few words about yourself, your interests, and what you're looking for in a connection..."
              className="min-h-[150px] text-sm text-darkgray border-none bg-lightgray/20"
              {...form.register("about_me")}
            />
          </div>

          {/* MY DETAILS SECTION ------------------------------ */}
          <div>
            <h2 className="text-xl font-semibold mb-4">My details</h2>
            <div className="space-y-3">
              {/* AGE FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Cake className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Age
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  type="number"
                  min="18"
                  max="120"
                  className="w-2/5 h-auto text-right text-sm text-lightgray border-none shadow-none bg-white"
                  {...form.register("age")}
                />
              </div>

              {/* OCCUPATION FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Briefcase className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Occupation
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  className="w-1/2 h-auto text-right text-sm text-lightgray border-none shadow-none bg-white"
                  {...form.register("occupation")}
                />
              </div>

              {/* GENDER FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <User className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Gender & Pronouns
                  </span>
                </div>
                <Select
                  value={form.watch("gender")}
                  onValueChange={(value) => form.setValue("gender", value)}
                >
                  <SelectTrigger className="h-auto bg-white border-none shadow-none text-darkgray">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-lightgray/20">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* EDUCATION FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Education
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  className="w-2/5 h-auto text-right text-sm text-darkgray border-none shadow-none bg-white"
                  {...form.register("education")}
                />
              </div>

              {/* LOCATION FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <MapPin className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Location
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  className="w-2/5 h-auto text-right text-sm text-darkgray border-none shadow-none bg-white"
                  {...form.register("location")}
                />
              </div>
            </div>
          </div>

          {/* MOST PEOPLE ALSO WANT TO KNOW SECTION -------------------- */}
          <div>
            <h2 className="text-sm text-gray-500 mb-4">
              Most people also want to know:
            </h2>
            <div className="space-y-3">
              {/* HEIGHT FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Ruler className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Height
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  className="w-2/5 h-auto text-right text-sm text-lightgray border-none shadow-none bg-white"
                  {...form.register("height")}
                />
              </div>

              {/* SMOKING FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Cigarette className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Smoking
                  </span>
                </div>
                <Select
                  value={form.watch("smoking") || ""}
                  onValueChange={(value) => {
                    console.log("Setting smoking to:", value); // Debugging log
                    form.setValue("smoking", value);
                  }}
                >
                  <SelectTrigger className="h-auto bg-white border-none shadow-none text-darkgray">
                    <SelectValue placeholder="Add" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-lightgray/20">
                    <SelectItem value="Never">Never</SelectItem>
                    <SelectItem value="Sometimes">Sometimes</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* DRINKING FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Wine className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Drinking
                  </span>
                </div>
                <Select
                  value={form.watch("drinking")}
                  onValueChange={(value) => form.setValue("drinking", value)}
                >
                  <SelectTrigger className="h-auto bg-white border-none shadow-none text-darkgray">
                    <SelectValue placeholder="Add" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-lightgray/20">
                    <SelectItem value="Never">Never</SelectItem>
                    <SelectItem value="Socially">Socially</SelectItem>
                    <SelectItem value="Regularly">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PETS FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Dog className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Pets
                  </span>
                </div>
                <Select
                  value={form.watch("pets")}
                  onValueChange={(value) => form.setValue("pets", value)}
                >
                  <SelectTrigger className="h-auto bg-white border-none shadow-none text-darkgray">
                    <SelectValue placeholder="Add" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-lightgray/20">
                    <SelectItem value="Have">Have</SelectItem>
                    <SelectItem value="Want">Want</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CHILDREN FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Baby className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Children
                  </span>
                </div>
                <Select
                  value={form.watch("children")}
                  onValueChange={(value) => form.setValue("children", value)}
                >
                  <SelectTrigger className="h-auto bg-white border-none shadow-none text-darkgray">
                    <SelectValue placeholder="Add" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-lightgray/20">
                    <SelectItem value="Have">Have</SelectItem>
                    <SelectItem value="Want">Want</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ZODIAC FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Sparkles className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Zodiac sign
                  </span>
                </div>
                <Select
                  value={form.watch("zodiac")}
                  onValueChange={(value) => form.setValue("zodiac", value)}
                >
                  <SelectTrigger className="h-auto bg-white border-none shadow-none text-darkgray">
                    <SelectValue placeholder="Add" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-lightgray/20">
                    {[
                      "Aries",
                      "Taurus",
                      "Gemini",
                      "Cancer",
                      "Leo",
                      "Virgo",
                      "Libra",
                      "Scorpio",
                      "Sagittarius",
                      "Capricorn",
                      "Aquarius",
                      "Pisces",
                    ].map((sign) => (
                      <SelectItem key={sign} value={sign}>
                        {sign}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* RELIGION FIELD */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Church className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Religion
                  </span>
                </div>
                <Select
                  value={form.watch("religion")}
                  onValueChange={(value) => form.setValue("religion", value)}
                >
                  <SelectTrigger className="h-auto bg-white border-none shadow-none text-darkgray">
                    <SelectValue placeholder="Add" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-lightgray/20">
                    {[
                      "Christian",
                      "Muslim",
                      "Jewish",
                      "Hindu",
                      "Buddhist",
                      "Spiritual",
                      "Agnostic",
                      "Atheist",
                      "Other",
                    ].map((religion) => (
                      <SelectItem key={religion} value={religion}>
                        {religion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* I ENJOY SECTION ------------------- */}
          <div>
            <h2 className="text-xl font-semibold mb-4">I enjoy</h2>
            <div className="space-y-3">
              {/* INTEREST SELECTION DROPDOWN */}
              <Select
                onValueChange={(interest) => {
                  setSelectedInterests((prev) => [...prev, interest]);
                }}
                value=""
              >
                <SelectTrigger className="w-full h-auto bg-lightgray/20 border-none shadow-none text-darkgray">
                  <SelectValue placeholder="Add an interest" />
                </SelectTrigger>
                <SelectContent className="bg-white border-lightgray/20">
                  {[
                    "Reading",
                    "Writing",
                    "Cooking",
                    "Baking",
                    "Photography",
                    "Traveling",
                    "Hiking",
                    "Gaming",
                    "Music",
                    "Movies",
                    "Art",
                    "Sports",
                    "Dancing",
                    "Yoga",
                    "Meditation",
                    "Coffee brewing",
                    "Wine tasting",
                    "Food exploring",
                  ]
                    .filter((interest) => !selectedInterests.includes(interest))
                    .map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* SELECTED INTERESTS CAPSULES */}
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 bg-primary/80 rounded-full px-3 py-0.5"
                  >
                    <span className="text-xs font-light text-white">
                      {interest}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedInterests((interests) =>
                          interests.filter((i) => i !== interest)
                        )
                      }
                      className="text-white text-sm my-auto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LANGUAGE SECTION ------------------- */}
          <div>
            <h2 className="text-xl font-semibold mb-4">I communicate in</h2>
            <div className="space-y-3">
              {/* LANGUAGE SELECTION DROPDOWN */}
              <Select
                value={selectedLanguage}
                onValueChange={(language) => {
                  setSelectedLanguage(language);
                  setSelectedLanguages((prev) => [...prev, language]);
                }}
              >
                <SelectTrigger className="w-full h-auto bg-lightgray/20 border-none shadow-none text-darkgray">
                  <SelectValue placeholder="Add a language" />
                </SelectTrigger>
                <SelectContent className="bg-white border-lightgray/20">
                  {[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Russian",
                    "Chinese",
                    "Japanese",
                    "Korean",
                    "Arabic",
                    "Hindi",
                    "Finnish",
                    "Swedish",
                    "Norwegian",
                  ]
                    .filter((lang) => !selectedLanguages.includes(lang))
                    .map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* SELECTED LANGUAGES CAPSULES */}
              <div className="flex flex-wrap gap-2">
                {selectedLanguages.map((language) => (
                  <div
                    key={language}
                    className="flex items-center gap-2 bg-primary/80 rounded-full px-3 py-0.5"
                  >
                    <span className="text-xs font-light text-white">
                      {language}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLanguages((prev) =>
                          prev.filter((l) => l !== language)
                        );
                        if (selectedLanguage === language) {
                          setSelectedLanguage("");
                        }
                      }}
                      className="text-white text-sm my-auto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LINKED ACCOUNTS SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Linked accounts</h2>
            <div className="space-y-3">
              {/* INSTAGRAM */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Instagram className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Instagram
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  className="w-2/5 h-auto text-right text-sm text-lightgray border-none shadow-none bg-white"
                  {...form.register("social_links.instagram")}
                />
              </div>

              {/* FACEBOOK */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Facebook className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Facebook
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  className="w-2/5 h-auto text-right text-sm text-lightgray border-none shadow-none bg-white"
                  {...form.register("social_links.facebook")}
                />
              </div>

              {/* TIKTOK */}
              <div className="flex items-center justify-between rounded-lg">
                <div className="flex items-center gap-4">
                  <Twitter className="w-4 h-4 text-lightgray" />
                  <span className="text-sm font-semibold text-darkgray">
                    Twitter
                  </span>
                </div>
                <Input
                  placeholder="Add"
                  className="w-2/5 h-auto text-right text-sm text-lightgray border-none shadow-none bg-white"
                  {...form.register("social_links.twitter")}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-xl bg-primary font-medium text-white hover:bg-primary-hover/90 shadow-xl"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
