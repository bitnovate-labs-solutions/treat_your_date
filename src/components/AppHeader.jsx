import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const filters = [
  { id: "sort", label: "Sort by", icon: ChevronDown },
  { id: "cuisine", label: "Cuisine" },
  { id: "favorite", label: "Favorite" },
  { id: "location", label: "Location" },
];

export default function AppHeader({ title, activeTab, onTabChange }) {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 shadow-md z-10">
      <div className="container mx-auto pt-6">
        {/* HEADER TITLE */}
        <h1 className="text-xl font-bold mb-4 text-center">{title}</h1>
        {/* PAGE TABS */}
        <div className="space-y-2">
          <Tabs
            value={activeTab}
            onValueChange={onTabChange}
            className="w-full px-4"
          >
            <TabsList className="grid grid-cols-3 h-10 items-stretch">
              {/* MENU TAB */}
              <TabsTrigger
                value="menu"
                className="text-sm text-[#636AE8] data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
              >
                Menu
              </TabsTrigger>
              {/* PURCHASED TAB */}
              <TabsTrigger
                value="purchased"
                className="text-sm text-[#636AE8] data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
              >
                Purchased
              </TabsTrigger>
              {/* BOOKED TAB */}
              <TabsTrigger
                value="booked"
                className="text-sm text-[#636AE8] data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
              >
                Booked
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* FILTERS */}
          <div className="flex justify-center gap-4 overflow-x-auto pb-4 mt-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant="secondary"
                className="rounded-2xl whitespace-nowrap bg-gray-100 text-[12px] px-3 py-[5px]"
              >
                {filter.label}{" "}
                {filter.icon && <filter.icon className="w-4 h-4 ml-1" />}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
