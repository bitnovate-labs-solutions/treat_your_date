import { faker } from "@faker-js/faker";
import { states } from "./constants";

// Generate a list of mock food items
const generateFoodItems = (count, status = "available") => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      "Sushi Platter",
      "Steak Dinner",
      "Roger's Pasta",
      "Seafood Feast",
      "Vegetarian Bowl",
      "BBQ Combo",
      "Mexican Fiesta",
      "Asian Fusion",
      "Mediterranean Mezze",
      "Indian Thali",
    ]),
    description: faker.lorem.sentence(),
    // location: faker.location.streetAddress(),
    location: faker.helpers.arrayElement(states).label,
    price: faker.number.float({ min: 20, max: 200, precision: 0.01 }),
    rating: Math.round(faker.number.float({ min: 4.0, max: 5.0 }) * 10) / 10,
    likes: faker.number.int({ min: 5, max: 30 }),
    image_url: faker.helpers.arrayElement([
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    ]),
    cuisine_type: faker.helpers.arrayElement([
      "japanese",
      "american",
      "italian",
      "seafood",
      "vegetarian",
      "bbq",
      "mexican",
      "asian",
      "mediterranean",
      "indian",
    ]),
    status,
    created_at: faker.date.recent({ days: 30 }).toISOString(),
    purchased_at:
      status === "purchased"
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
    booked_at:
      status === "booked" ? faker.date.recent({ days: 7 }).toISOString() : null,
    user_profiles: {
      display_name: faker.internet.userName(),
    },
  }));
};

// Mock data store
const mockData = {
  menu: generateFoodItems(8, "available"),
  purchased: generateFoodItems(4, "purchased"),
  booked: generateFoodItems(3, "booked"),
};

// Mock API functions
export const mockApi = {
  getMenuItems: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.menu;
  },
  getCartItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.menu.slice(0, 3).map((item) => ({
      ...item,
      quantity: 1,
    }));
  },
  getPurchasedItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.purchased;
  },
  getBookedItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.booked;
  },
};
