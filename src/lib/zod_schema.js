// FORM VALIDATION SCHEMAS FOR ZOD
import * as z from "zod";

export const registerSchema = z
  .object({
    display_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword && data.password !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

export const createProfileSchema = z.object({
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => !isNaN(parseInt(val)), {
      message: "Age must be a valid number",
    })
    .refine((val) => parseInt(val) >= 18 && parseInt(val) <= 120, {
      message: "Age must be between 18 and 120",
    }),
  about_me: z
    .string()
    .max(500, "About me must be less than 500 characters")
    .optional(),
  occupation: z.string().optional(),
  education: z.string().optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .optional(),
  gender: z.string().optional(),
  height: z.string().optional(),
  smoking: z.string().optional(),
  drinking: z.string().optional(),
  pets: z.string().optional(),
  children: z.string().optional(),
  zodiac: z.string().optional(),
  religion: z.string().optional(),
  interests: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  social_links: z
    .object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
    })
    .default({}),
});

export const editProfileSchema = z.object({
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => !isNaN(parseInt(val)), {
      message: "Age must be a valid number",
    })
    .refine((val) => parseInt(val) >= 18 && parseInt(val) <= 120, {
      message: "Age must be between 18 and 120",
    }),
  about_me: z
    .string()
    .max(500, "About me must be less than 500 characters")
    .optional(),
  occupation: z.string().optional(),
  education: z.string().optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .optional(),
  gender: z.string().optional(),
  height: z.string().optional(),
  smoking: z.string().optional(),
  drinking: z.string().optional(),
  pets: z.string().optional(),
  children: z.string().optional(),
  zodiac: z.string().optional(),
  religion: z.string().optional(),
  interests: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  social_links: z
    .object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
    })
    .default({}),
});
