import { useState, useRef, useEffect } from "react";
import ExploreCard from "./components/ExploreCard";
import VoucherCard from "./components/VoucherCard";
import CategoryCard from "@/pages/explore_page/components/CategoryCard";
import { foodCategories } from "@/lib/constants";
import { restaurant_profiles, voucherUpdates } from "@/data/mock_data";

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  // Handle scroll events to update current slide
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newSlide = Math.round(scrollPosition / cardWidth);
      setCurrentSlide(newSlide);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 pt-5 pb-20">
      <div className="mb-10">
        <h2 className="text-xl text-gray-900 font-semibold mb-2">Popular</h2>
        <div className="relative">
          {/* CAROUSEL */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {voucherUpdates.map((item) => (
              <div
                key={item.id}
                className="flex-none w-full snap-center px-[1px]"
              >
                <VoucherCard item={item} />
              </div>
            ))}
          </div>

          {/* PAGINATION DOTS */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {voucherUpdates.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {foodCategories.map((category, index) => (
            <CategoryCard
              key={index}
              {...category}
              isActive={activeCategory === category.value}
              onClick={() => setActiveCategory(category.value)}
            />
          ))}
        </div>
      </div>

      {/* WHAT'S TRENDING */}
      <div>
        <h2 className="text-xl font-semibold mb-4">What&apos;s Trending</h2>
        <div className="gap-2">
          {restaurant_profiles.map((item) => (
            <ExploreCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
