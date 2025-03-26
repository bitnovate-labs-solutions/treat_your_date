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

// FoodCard menu items
export const generateMenuItems = (count = 3) => {
  const foodImages = [
    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1935&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  ];

  const foodNames = [
    "Classic Chicken Sandwich",
    "Grilled Salmon Fillet",
    "Beef Tenderloin Steak",
    "Mushroom Risotto",
    "Vegetable Stir Fry",
    "Margherita Pizza",
    "Caesar Salad",
    "Shrimp Scampi Pasta",
    "BBQ Ribs Platter",
    "Sushi Roll Combo",
    "Pad Thai Noodles",
    "Greek Salad Bowl",
    "Chicken Tikka Masala",
    "Fish and Chips",
    "Beef Wellington",
  ];

  const foodDescriptions = [
    "Served with fresh lettuce, tomatoes, and special sauce",
    "Pan-seared with lemon butter sauce and seasonal vegetables",
    "Grilled to perfection with red wine reduction sauce",
    "Creamy Arborio rice with mixed mushrooms and parmesan",
    "Fresh vegetables in garlic sauce with choice of protein",
    "Fresh tomatoes, mozzarella, and basil on thin crust",
    "Crisp romaine lettuce, croutons, and parmesan cheese",
    "Linguine pasta with garlic shrimp in white wine sauce",
    "Slow-cooked ribs with BBQ sauce and coleslaw",
    "Assorted fresh sushi rolls with wasabi and ginger",
    "Stir-fried rice noodles with shrimp and peanuts",
    "Fresh vegetables, feta cheese, and olive oil dressing",
    "Tender chicken in rich tomato and cream sauce",
    "Crispy battered fish with golden fries",
    "Beef wrapped in puff pastry with mushroom duxelles",
  ];

  return Array.from({ length: count }, () => {
    const randomIndex = faker.number.int({ min: 0, max: foodNames.length - 1 });
    return {
      name: foodNames[randomIndex],
      description: foodDescriptions[randomIndex],
      price: faker.number.int({ min: 50, max: 200 }),
      image_url: faker.helpers.arrayElement(foodImages),
    };
  });
};

export const menuItems = generateMenuItems();
