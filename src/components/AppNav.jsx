import {
  MessagesSquare,
  ShoppingCart,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "./ui/button";

const AppNav = ({ profile, handleHomeClick, handleProtectedNavigation }) => {
  return (
    <div>
      {" "}
      {/* BOTTOM NAVIGATION BAR */}
      <nav className="w-full max-w-md mx-auto fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl">
        <div className="container mx-auto px-4 shadow-lg h-[4.5rem]">
          <div className="flex justify-around py-4">
            {/* USER ICON (PROFILE) BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleProtectedNavigation("/profile")}
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
            <Button variant="ghost" size="icon" onClick={handleHomeClick}>
              <UtensilsCrossed
                className={`${
                  location.pathname === `/${profile?.role}`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
            {/* SHOPPING CART ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleProtectedNavigation("/bookmarks")}
            >
              <ShoppingCart
                className={`${
                  location.pathname === `/bookmarks`
                    ? "text-primary"
                    : "text-darkgray"
                }`}
              />
            </Button>
            {/* MESSAGE ICON BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleProtectedNavigation("/messages")}
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
