import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Mail } from "lucide-react";
import Logo from "@/assets/images/tyd_logo.png";

export default function Welcome() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // HANDLE EMAIL SIGN UP
  const handleEmailSignup = () => {
    if (!agreedToTerms) {
      toast({
        title: "Please agree to the Terms & Conditions to continue",
        description: "You must accept the terms before continuing",
        style: { background: "hsl(var(--destructive))", color: "white" },
      });
      return;
    }
    navigate("/auth", { state: { mode: "signup" } });
  };

  // HANDLE EMAIL SIGN UP
  const handleGoogleSignup = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Please agree to the Terms & Conditions to continue",
        description: "You must accept the terms before continuing",
        style: { background: "hsl(var(--destructive))", color: "white" },
      });
      return;
    }
    await signInWithGoogle();
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-white px-6">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          {/* WELCOME TITLE */}
          <h1 className="text-[32px] font-semibold text-darkgray-title">
            Welcome to
            <br />
            TreatYourDate
          </h1>

          {/* WELCOME LOGO */}
          <div className="flex items-center justify-center">
            <img src={Logo} />
          </div>

          {/* WELCOME DESCRIPTION */}
          <p className="text-base text-lightgray px-8">
            A place to dine and date.
            <br />
            Make the first connection in person over a meal.
          </p>
        </div>

        <div className="space-y-4">
          {/* BUTTON - GOOGLE */}
          <Button
            className="w-full h-14 bg-primary hover:bg-primary-hover text-white rounded-2xl text-base"
            onClick={handleGoogleSignup}
            disabled={!agreedToTerms}
          >
            {/* GOOGLE LOGO */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35 10.04C21.49 10.67 21.56 11.32 21.56 12C21.56 17.5 17.16 21.9 11.66 21.9C6.16 21.9 1.76 17.5 1.76 12C1.76 6.5 6.16 2.1 11.66 2.1C14.56 2.1 17.16 3.2 19.06 5L16.16 7.9C15.06 6.8 13.46 6.1 11.66 6.1C8.36 6.1 5.66 8.8 5.66 12.1C5.66 15.4 8.36 18.1 11.66 18.1C14.46 18.1 16.76 16.3 17.46 13.9H11.66V10.1H21.36C21.36 10.1 21.35 10.04 21.35 10.04Z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* BUTTON - SIGN UP WITH EMAIL */}
          <Button
            variant="outline"
            className="w-full h-14 bg-secondary text-primary border-secondary-border hover:bg-secondary-hover rounded-2xl text-base"
            onClick={handleEmailSignup}
            disabled={!agreedToTerms}
          >
            <Mail className="w-5 h-5" />
            Sign up with Email
          </Button>
        </div>

        <div className="h-1/5 flex flex-col justify-between">
          <div>
            {/* LOG IN */}
            <p className="text-sm text-center text-primary">
              Already have an account?{" "}
              <button
                className="text-primary hover:underline font-bold underline"
                onClick={() => navigate("/auth", { state: { mode: "login" } })}
              >
                Log in
              </button>
            </p>
          </div>

          {/* TERMS & CONDITIONS */}
          <div className="flex justify-center gap-2">
            <Checkbox
              id="terms"
              className="my-auto data-[state=checked]:bg-primary data-[state=checked]:text-white"
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
            />
            <label htmlFor="terms" className="text-sm text-darkgray">
              I agree with{" "}
              <button className="text-primary hover:underline">
                Terms & Conditions
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
