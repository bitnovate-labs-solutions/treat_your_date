import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function uploadProfileImage(file, userId) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("user_avatars")
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (uploadError) throw uploadError;

    // const {
    //   data: { publicUrl },
    // } = supabase.storage.from("user_avatars").getPublicUrl(filePath);

    // return publicUrl;
    return fileName; // Return just the filename
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export const getProfileImageUrl = (fileName) => {
  if (!fileName) return null;
  if (fileName.startsWith("http")) return fileName;
  return `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/user_avatars/${fileName}`;
};
