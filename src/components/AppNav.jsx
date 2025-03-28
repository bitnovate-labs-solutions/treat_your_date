import {
  MessagesSquare,
  ShoppingCart,
  User,
  UtensilsCrossed,
  UserSearch,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

const AppNav = ({ profile, handleHomeClick, handleProtectedNavigation }) => {
  const { user } = useAuth();

  return (
    <div>
      <nav className="w-full max-w-md mx-auto fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl">
        <div className="container mx-auto px-4 shadow-lg h-[5.5rem]">
          <div className="flex justify-around py-4">
            {/* USER ICON (PROFILE) BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => user && handleProtectedNavigation("/profile")}
            >
              <User
                className={`${
                  location.pathname === `/profile`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
            {/* FOOD ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={user && handleHomeClick}
            >
              <UtensilsCrossed
                className={`${
                  location.pathname === `/${profile?.role}`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
            {/* SHOPPING CART/SEARCH ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                user &&
                handleProtectedNavigation(
                  profile?.role === "treatee" ? "/connect" : "/my-cart"
                )
              }
            >
              {profile?.role === "treatee" ? (
                <UserSearch
                  className={`${
                    location.pathname === `/connect`
                      ? "text-primary"
                      : "text-darkgray"
                  }`}
                />
              ) : (
                <ShoppingCart
                  className={`${
                    location.pathname === `/my-cart`
                      ? "text-primary"
                      : "text-darkgray"
                  }`}
                />
              )}
            </Button>
            {/* MESSAGE ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => user && handleProtectedNavigation("/messages")}
            >
              <MessagesSquare
                className={`${
                  location.pathname === `/messages`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppNav;
