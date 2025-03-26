import { useNavigate } from "react-router-dom";

// COMPONENTS
import { Button } from "@/components/ui/button";

// ASSETS
import SuccessImage from "@/assets/images/order-success.png";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-64 h-64 mx-auto">
          <img src={SuccessImage} alt="Success" className="w-full h-full" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Order Success
          </h2>
          <p className="text-lightgray mb-20">
            Your order will be sent to your address. <br /> Thank you for order.
          </p>
        </div>

        {/* BACK BUTTON */}
        <Button
          onClick={() => navigate("/")}
          className="w-full h-12 bg-primary hover:bg-red-500 text-white"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
