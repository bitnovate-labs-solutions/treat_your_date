import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Logo from "@/assets/images/welcome_logo.png";
import { Mail, Lock } from "lucide-react";

// Form email and password validation
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters, containing a letter and a number"
    )
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    // Preserve the mode even after state is lost due to navigation
    const isConfirmation = location.pathname.includes("/auth/confirmation");
    return isConfirmation ? "signup" : location.state?.mode || "login";
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  useEffect(() => {
    // Show confirmation screen if we're on the confirmation path
    if (location.pathname === "/auth/confirmation") {
      setShowConfirmation(true);
    }
  }, [location.pathname]);

  // FORM INITIALIZATION
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // HANDLE SUBMIT
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (activeTab === "login") {
        await signIn(data);
        toast.success("Welcome back!", {
          description: "Successfully logged in",
        });
      } else {
        await signUp(data);
        setShowConfirmation(true);
        setConfirmedEmail(data.email);
        // Update URL without triggering a navigation
        window.history.replaceState(null, "", "/auth/confirmation");
        toast.success("Check your email", {
          description: "Verification email sent. Please check your inbox.",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // SIGN UP CONFIRMATION SCREEN
  if (showConfirmation) {
    return (
      <div className="h-screen flex flex-col bg-white px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={() => setShowConfirmation(false)}
            className="mb-8 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ←
          </button>

          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <img src={Logo} />
            </div>
            <div>
              <h1 className="text-[28px] font-semibold text-gray-900 mb-4">
                Check your email
              </h1>
              <p className="text-gray-500 mb-2">
                We&apos;ve sent a confirmation link to:
              </p>
              <p className="font-medium text-gray-900 mb-4">{confirmedEmail}</p>
              <p className="text-gray-500">
                Click the link in the email to verify your account.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                After confirming your email, you&apos;ll be able to select your
                role and start using the app.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Didn&apos;t receive the email?{" "}
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="text-[#6366F1] hover:underline font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white px-6 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ←
        </button>

        <div className="space-y-8">
          {/* LOGO */}
          <div className="flex justify-center">
            <img src={Logo} />
          </div>
          <div className="text-center">
            {/* SIGN UP TITLE */}
            <h1 className="text-[28px] font-semibold mb-2 text-gray-900">
              {activeTab === "login" ? "Welcome back!" : "Nice to see you!"}
            </h1>
            {/* SIGN IN DESCRIPTION */}
            <p className="text-base text-gray-400">
              {activeTab === "login"
                ? "Log back into your account"
                : "Create your account"}
            </p>

            {/* SIGN UP / LOGIN TABS */}
            <div className="flex justify-center space-x-8 text-base mt-8">
              <button
                className={`pb-2 w-1/3 ${
                  activeTab === "signup"
                    ? "text-[#636AE8] border-b-4 border-[#636AE8]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
              <button
                className={`pb-2 w-1/3 ${
                  activeTab === "login"
                    ? "text-[#636AE8] border-b-4 border-[#636AE8]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Log In
              </button>
            </div>
          </div>

          {/* FORMS */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <div className="space-y-2">
                <Input
                  className="h-14 text-base rounded-xl border-gray-200 pl-12"
                  placeholder="Email"
                  {...form.register("email")}
                />
              </div>
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 px-1">
                {form.formState.errors.email.message}
              </p>
            )}

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <div className="space-y-2">
                <Input
                  className="h-14 text-base rounded-xl border-gray-200 pl-12"
                  type="password"
                  placeholder="Password"
                  {...form.register("password")}
                />
              </div>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-500 px-1">
                {form.formState.errors.password.message}
              </p>
            )}

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full h-14 text-base bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : activeTab === "login"
                ? "Log in"
                : "Sign up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
