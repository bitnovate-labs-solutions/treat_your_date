// NOTES FOR DATABASE
// Create these tables:
// ratings table?
//

// Restaurant-specific menu items
const restaurantMenuItems = {
  "Sushi Platter": [
    {
      name: "California Roll",
      description: "Crab meat, avocado, cucumber wrapped in rice and seaweed",
      price: 12.99,
      image_url:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Spicy Tuna Roll",
      description: "Fresh tuna with spicy sauce and tempura bits",
      price: 14.99,
      image_url:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Dragon Roll",
      description: "Eel and cucumber topped with avocado and eel sauce",
      price: 16.99,
      image_url:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1935&auto=format&fit=crop",
    },
  ],
  "Steak Dinner": [
    {
      name: "Ribeye Steak",
      description: "12oz premium cut with garlic butter and herbs",
      price: 49.99,
      image_url:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Filet Mignon",
      description: "8oz tender cut with red wine reduction sauce",
      price: 59.99,
      image_url:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "New York Strip",
      description: "14oz classic cut with herb butter",
      price: 54.99,
      image_url:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1935&auto=format&fit=crop",
    },
  ],
  "Roger's Pasta": [
    {
      name: "Fettuccine Alfredo",
      description: "Creamy parmesan sauce with fresh herbs",
      price: 19.99,
      image_url:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Spaghetti Carbonara",
      description: "Classic Italian pasta with eggs, cheese, and pancetta",
      price: 21.99,
      image_url:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Penne Arrabbiata",
      description: "Spicy tomato sauce with garlic and chili",
      price: 18.99,
      image_url:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1935&auto=format&fit=crop",
    },
  ],
  "Seafood Feast": [
    {
      name: "Lobster Thermidor",
      description: "Classic French preparation with cream sauce",
      price: 69.99,
      image_url:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Grilled Shrimp Scampi",
      description: "Jumbo shrimp in garlic butter sauce",
      price: 39.99,
      image_url:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Crab Cakes",
      description: "Lump crab meat with special sauce",
      price: 34.99,
      image_url:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1935&auto=format&fit=crop",
    },
  ],
};

// Static food items data
const foodItems = [
  {
    id: "1",
    name: "Sushi Platter",
    description:
      "Fresh assortment of premium sushi rolls with wasabi and ginger",
    location: "California",
    price: 89.99,
    rating: 4.8,
    likes: 25,
    image_url:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "japanese",
    status: "available",
    created_at: "2024-03-15T10:00:00Z",
    purchased_at: null,
    booked_at: null,
    user_profiles: {
      display_name: "sushi_master",
    },
    menu_items: restaurantMenuItems["Sushi Platter"],
  },
  {
    id: "2",
    name: "Steak Dinner",
    description:
      "Premium cut steak with seasonal vegetables and red wine sauce",
    location: "Texas",
    price: 129.99,
    rating: 4.9,
    likes: 28,
    image_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "american",
    status: "available",
    created_at: "2024-03-14T15:30:00Z",
    purchased_at: null,
    booked_at: null,
    user_profiles: {
      display_name: "steak_house",
    },
    menu_items: restaurantMenuItems["Steak Dinner"],
  },
  {
    id: "3",
    name: "Roger's Pasta",
    description: "Homemade pasta with fresh ingredients and signature sauce",
    location: "New York",
    price: 49.99,
    rating: 4.7,
    likes: 22,
    image_url:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "italian",
    status: "available",
    created_at: "2024-03-13T12:00:00Z",
    purchased_at: null,
    booked_at: null,
    user_profiles: {
      display_name: "rogers_kitchen",
    },
    menu_items: restaurantMenuItems["Roger's Pasta"],
  },
  {
    id: "4",
    name: "Seafood Feast",
    description: "Fresh seafood platter with lobster, shrimp, and crab",
    location: "Florida",
    price: 159.99,
    rating: 4.9,
    likes: 30,
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "seafood",
    status: "available",
    created_at: "2024-03-12T09:00:00Z",
    purchased_at: null,
    booked_at: null,
    user_profiles: {
      display_name: "ocean_fresh",
    },
    menu_items: restaurantMenuItems["Seafood Feast"],
  },
];

// Static purchased items --------------------------------------------------------------------------
const purchasedItems = [
  {
    id: "5",
    name: "Vegetarian Bowl",
    description: "Healthy bowl packed with fresh vegetables and quinoa",
    location: "California",
    price: 39.99,
    rating: 4.6,
    likes: 18,
    image_url:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "vegetarian",
    status: "purchased",
    created_at: "2024-03-10T11:00:00Z",
    purchased_at: "2024-03-11T14:30:00Z",
    booked_at: null,
    user_profiles: {
      display_name: "green_plate",
    },
    menu_items: [],
  },
  {
    id: "6",
    name: "BBQ Combo",
    description: "Mixed BBQ platter with ribs, brisket, and sides",
    location: "Texas",
    price: 79.99,
    rating: 4.8,
    likes: 24,
    image_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "bbq",
    status: "purchased",
    created_at: "2024-03-09T13:00:00Z",
    purchased_at: "2024-03-10T16:45:00Z",
    booked_at: null,
    user_profiles: {
      display_name: "bbq_master",
    },
    menu_items: [],
  },
];

// Static booked items --------------------------------------------------------------------------
const bookedItems = [
  {
    id: "7",
    name: "Mexican Fiesta",
    description: "Authentic Mexican dishes with fresh tortillas and salsa",
    location: "Arizona",
    price: 59.99,
    rating: 4.7,
    likes: 20,
    image_url:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "mexican",
    status: "booked",
    created_at: "2024-03-08T10:00:00Z",
    purchased_at: null,
    booked_at: "2024-03-09T12:00:00Z",
    user_profiles: {
      display_name: "mexican_fusion",
    },
    menu_items: [],
  },
  {
    id: "8",
    name: "Asian Fusion",
    description:
      "Modern Asian cuisine combining flavors from different regions",
    location: "New York",
    price: 69.99,
    rating: 4.8,
    likes: 26,
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    cuisine_type: "asian",
    status: "booked",
    created_at: "2024-03-07T14:00:00Z",
    purchased_at: null,
    booked_at: "2024-03-08T19:30:00Z",
    user_profiles: {
      display_name: "asian_fusion",
    },
    menu_items: [],
  },
];

// --------------------------------------------------------------------------------------------------

// Mock data store
const mockData = {
  menu: foodItems,
  purchased: purchasedItems,
  booked: bookedItems,
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

// Export the menu items map for direct access if needed
export { restaurantMenuItems };
