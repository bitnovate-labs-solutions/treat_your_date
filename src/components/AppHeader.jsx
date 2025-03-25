import { useState } from "react";
import { cuisineTypes, foodCategories, sortOptions } from "@/lib/constants";

// COMPONENTS
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AppHeader({ title, isProfilePage }) {
  const [activeTab, setActiveTab] = useState("menu");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const handleCuisineChange = (value) => {
    setSelectedCuisine(value);
  };

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 shadow-md z-10">
      <div className="container mx-auto pt-1">
        {/* HEADER TITLE -------------------- */}
        <h1 className="text-lg font-bold mb-4 text-center text-gray-800">
          {title}
        </h1>
        {/* PAGE TABS -------------------- */}
        <div className="space-y-2">
          {/* Only show TabList and filters if showTabsAndFilters is true and user is authenticated */}
          {/* {showTabsAndFilters && user ? ( */}
          {!isProfilePage && (
            <div className="space-y-2">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full px-4"
              >
                <TabsList className="grid grid-cols-3 h-10 items-stretch px-1.5">
                  {/* MENU TAB */}
                  <TabsTrigger
                    value="menu"
                    className="text-sm text-primary data-[state=active]:bg-primary data-[state=active]:text-white border-primary rounded-r-none border-1"
                  >
                    Menu
                  </TabsTrigger>
                  {/* PURCHASED TAB */}
                  <TabsTrigger
                    value="purchased"
                    className="text-sm text-primary data-[state=active]:bg-primary data-[state=active]:text-white border-primary rounded-none border-1 border-l-0"
                  >
                    Purchased
                  </TabsTrigger>
                  {/* BOOKED TAB */}
                  <TabsTrigger
                    value="booked"
                    className="text-sm text-primary data-[state=active]:bg-primary data-[state=active]:text-white border-primary rounded-l-none border-1 border-l-0"
                  >
                    Booked
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* FILTERS -------------------- */}
              <div className="flex gap-2 overflow-x-auto pb-2 pl-4">
                {/* SORT BY */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="h-7">
                    <Button
                      variant="secondary"
                      className="rounded-full whitespace-nowrap text-[12px] font-light py-1"
                    >
                      Sort by <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-46 bg-white border-gray-100 shadow-xl text-darkgray py-4"
                  >
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={
                          selectedSort === option.value ? "bg-accent" : ""
                        }
                        onClick={() => handleSortChange(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* CUISINE */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="h-7">
                    <Button
                      variant="secondary"
                      className="rounded-full whitespace-nowrap text-[12px] font-light py-1"
                    >
                      {selectedCuisine
                        ? [...cuisineTypes, ...foodCategories].find(
                            (c) => c.value === selectedCuisine
                          )?.label
                        : "Cuisine"}
                      <ChevronDown className="w-4 h-4 mr-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-46 bg-white border-gray-100 shadow-xl text-darkgray py-4"
                  >
                    <DropdownMenuLabel className="text-primary font-bold">
                      Cuisine Types
                    </DropdownMenuLabel>
                    {cuisineTypes.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={
                          selectedCuisine === option.value ? "bg-accent" : ""
                        }
                        onClick={() => handleCuisineChange(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-gray-300 mb-4" />
                    <DropdownMenuLabel className="text-primary font-bold">
                      Food Categories
                    </DropdownMenuLabel>
                    {foodCategories.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={
                          selectedCuisine === option.value ? "bg-accent" : ""
                        }
                        onClick={() => handleCuisineChange(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* FAVOURITE */}
                <Button
                  variant="secondary"
                  className="rounded-full whitespace-nowrap text-[12px] font-light py-1 h-7"
                >
                  Favorite
                </Button>

                {/* LOCATION */}
                <Button
                  variant="secondary"
                  className="rounded-full whitespace-nowrap text-[12px] font-light py-1 h-7"
                >
                  Location
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
