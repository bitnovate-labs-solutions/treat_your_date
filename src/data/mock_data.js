// RESTAURANT-SPECIFIC MENU PACKAGES FOR 2 PEOPLE --------------------------------------------------------------------------
const menuPackages = {
  "Sushi Tei": [
    {
      name: "Sushi Lovers Set",
      description:
        "Perfect for 2 - California Roll, Spicy Tuna Roll, Dragon Roll, Salmon Nigiri, Miso Soup, Edamame, Green Tea, and Japanese Dessert xdsgdsfgiahjsgoiadsjfgiosadjgpoisagjpsagasgs asfasfasfasf",
      set_type: "basic",
      price: 99,
      rating: 4.4,
      likes: 6,
      image_url:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Sashimi Delight Set",
      description:
        "Fresh selection for 2 - Assorted Sashimi, Tempura Udon, Edamame, and Japanese Tea",
      set_type: "mid",
      price: 149,
      rating: 4.7,
      likes: 8,
      image_url:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Premium Sushi Set",
      description:
        "Luxury set for 2 - Premium Sushi Selection, Wagyu Beef, Seaweed Salad, and Sake",
      set_type: "premium",
      price: 199,
      rating: 4.9,
      likes: 12,
      image_url:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
  ],
  "The Steakhouse KL": [
    {
      name: "Classic Steak Set",
      description:
        "Perfect for 2 - Ribeye Steak, Caesar Salad, Mashed Potatoes, and Red Wine",
      set_type: "basic",
      price: 99,
      rating: 4.4,
      likes: 6,
      image_url:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Premium Cut Set",
      description:
        "Luxury set for 2 - Filet Mignon, Truffle Fries, Grilled Vegetables, and Wine Pairing",
      set_type: "mid",
      price: 149,
      rating: 4.7,
      likes: 8,
      image_url:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Surf & Turf Set",
      description:
        "Ultimate set for 2 - New York Strip, Lobster Tail, Garlic Bread, and Champagne",
      set_type: "premium",
      price: 199,
      rating: 4.9,
      likes: 12,
      image_url:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
  ],
  "Pasta Zanmai": [
    {
      name: "Classic Italian Set",
      description:
        "Traditional set for 2 - Spaghetti Bolognese, Caesar Salad, Garlic Bread, and Italian Wine",
      set_type: "basic",
      price: 99,
      rating: 4.4,
      likes: 6,
      image_url:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Carbonara Set",
      description:
        "Traditional set for 2 - Spaghetti Carbonara, Bruschetta, Minestrone Soup, and Italian Wine",
      price: 149,
      set_type: "mid",
      rating: 4.7,
      likes: 8,
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Vegetarian Set",
      description:
        "Healthy set for 2 - Penne Arrabbiata, Caprese Salad, Garlic Bread, and Sparkling Water",
      set_type: "premium",
      price: 199,
      rating: 4.9,
      likes: 12,
      image_url:
        "https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
  ],
  "Ocean Seafood Restaurant": [
    {
      name: "Seafood Platter Set",
      description:
        "Perfect for 2 - Lobster Thermidor, Grilled Shrimp, Crab Cakes, and White Wine",
      set_type: "basic",
      price: 99,
      rating: 4.4,
      likes: 6,
      image_url:
        "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Catch of the Day Set",
      description:
        "Fresh set for 2 - Daily Fresh Fish, Shrimp Scampi, Seafood Chowder, and Wine",
      set_type: "mid",
      price: 149,
      rating: 4.7,
      likes: 8,
      image_url:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
    {
      name: "Shellfish Set",
      description:
        "Shellfish lovers set for 2 - Crab Cakes, Mussels, Clams, and Sparkling Wine",
      set_type: "premium",
      price: 199,
      rating: 4.9,
      likes: 12,
      image_url:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3270&auto=format&fit=crop",
      purchased_at: null,
      booked_at: null,
    },
  ],
};

// RESTAURANT PROFILE --------------------------------------------------------------------------
export const restaurant_profiles = [
  {
    id: "1",
    name: "Sushi Tei",
    description:
      "Authentic Japanese cuisine with fresh sushi and sashimi, located in Pavilion KL",
    location: "Pavilion KL, Kuala Lumpur",
    address: "Lot 6.12.00, Level 6, Pavilion KL, 168, Jalan Bukit Bintang, 55100 Kuala Lumpur",
    hours: "11:00 AM - 10:00 PM",
    phone: "+60 3-2141 1234",
    rating: 4.8,
    likes: 25,
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=3270&auto=format&fit=crop",
    cuisine_type: "japanese",
    category: "non-halal",
    status: "available",
    created_at: "2024-03-15T10:00:00Z",
    user_profiles: {
      display_name: "sushi_master",
    },
    menu_items: menuPackages["Sushi Tei"],
  },
  {
    id: "2",
    name: "The Steakhouse KL",
    description:
      "Premium steakhouse in the heart of KL, offering the finest cuts of meat and wine selection",
    location: "KLCC, Kuala Lumpur",
    address: "Level 56, Petronas Twin Towers, Kuala Lumpur City Centre, 50088 Kuala Lumpur",
    hours: "12:00 PM - 11:00 PM",
    phone: "+60 3-2389 5678",
    rating: 4.9,
    likes: 28,
    image_url:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=3270&auto=format&fit=crop",
    cuisine_type: "american",
    category: "non-halal",
    status: "available",
    created_at: "2024-03-14T15:30:00Z",
    user_profiles: {
      display_name: "steak_house",
    },
    menu_items: menuPackages["The Steakhouse KL"],
  },
  {
    id: "3",
    name: "Pasta Zanmai",
    description:
      "Modern Italian restaurant with fresh homemade pasta and authentic sauces",
    location: "Sunway Pyramid, Petaling Jaya",
    address: "Lot G1.117, Ground Floor, Sunway Pyramid Shopping Mall, No. 3, Jalan PJS 11/15, Bandar Sunway, 47500 Petaling Jaya",
    hours: "11:30 AM - 10:30 PM",
    phone: "+60 3-7492 9012",
    rating: 4.7,
    likes: 22,
    image_url:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=3270&auto=format&fit=crop",
    cuisine_type: "italian",
    category: "vegetarian",
    status: "available",
    created_at: "2024-03-13T12:00:00Z",
    user_profiles: {
      display_name: "rogers_kitchen",
    },
    menu_items: menuPackages["Pasta Zanmai"],
  },
  {
    id: "4",
    name: "Ocean Seafood Restaurant",
    description:
      "Fresh seafood restaurant specializing in Chinese-style seafood dishes",
    location: "SS2, Petaling Jaya",
    address: "No. 123, Jalan SS2/24, SS2, 47300 Petaling Jaya, Selangor",
    hours: "10:00 AM - 11:00 PM",
    phone: "+60 3-7876 3456",
    rating: 4.9,
    likes: 30,
    image_url:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=3270&auto=format&fit=crop",
    cuisine_type: "seafood",
    category: "non-halal",
    status: "available",
    created_at: "2024-03-12T09:00:00Z",
    user_profiles: {
      display_name: "ocean_fresh",
    },
    menu_items: menuPackages["Ocean Seafood Restaurant"],
  },
];

// PURCHASED ITEMS --------------------------------------------------------------------------
export const purchasedItems = [
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
    purchase_date: "2024-03-11",
    booked_at: null,
    user_profiles: {
      display_name: "green_plate",
    },
    menu_items: [],
    purchased_by: [
      {
        id: 1,
        user_profiles: {
          display_name: "John",
          avatar_url: "https://i.pravatar.cc/150?img=1",
          status: "online",
        },
        purchased_at: "2024-03-11T14:30:00Z",
      },
      {
        id: 2,
        user_profiles: {
          display_name: "Mike",
          avatar_url: "https://i.pravatar.cc/150?img=2",
          status: "away",
        },
        purchased_at: "2024-03-11T14:35:00Z",
      },
      {
        id: 3,
        user_profiles: {
          display_name: "Sarah",
          avatar_url: "https://i.pravatar.cc/150?img=3",
          status: "offline",
        },
        purchased_at: "2024-03-11T14:40:00Z",
      },
      {
        id: 9,
        user_profiles: {
          display_name: "Emma",
          avatar_url: "https://i.pravatar.cc/150?img=9",
          status: "online",
        },
        purchased_at: "2024-03-11T14:45:00Z",
      },
      {
        id: 10,
        user_profiles: {
          display_name: "Alex",
          avatar_url: "https://i.pravatar.cc/150?img=10",
          status: "away",
        },
        purchased_at: "2024-03-11T14:50:00Z",
      },
      {
        id: 11,
        user_profiles: {
          display_name: "Sophie",
          avatar_url: "https://i.pravatar.cc/150?img=11",
          status: "online",
        },
        purchased_at: "2024-03-11T14:55:00Z",
      },
      {
        id: 12,
        user_profiles: {
          display_name: "James",
          avatar_url: "https://i.pravatar.cc/150?img=12",
          status: "offline",
        },
        purchased_at: "2024-03-11T15:00:00Z",
      },
      {
        id: 13,
        user_profiles: {
          display_name: "Olivia",
          avatar_url: "https://i.pravatar.cc/150?img=13",
          status: "online",
        },
        purchased_at: "2024-03-11T15:05:00Z",
      },
    ],
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
    purchase_date: "2024-03-10",
    booked_at: null,
    user_profiles: {
      display_name: "bbq_master",
    },
    menu_items: [],
    purchased_by: [
      {
        id: 6,
        user_profiles: {
          display_name: "David",
          avatar_url: "https://i.pravatar.cc/150?img=6",
          status: "online",
        },
        purchased_at: "2024-03-10T16:45:00Z",
      },
      {
        id: 7,
        user_profiles: {
          display_name: "Lisa",
          avatar_url: "https://i.pravatar.cc/150?img=7",
          status: "away",
        },
        purchased_at: "2024-03-10T16:50:00Z",
      },
      {
        id: 8,
        user_profiles: {
          display_name: "Tom",
          avatar_url: "https://i.pravatar.cc/150?img=8",
          status: "offline",
        },
        purchased_at: "2024-03-10T16:55:00Z",
      },
      {
        id: 14,
        user_profiles: {
          display_name: "Rachel",
          avatar_url: "https://i.pravatar.cc/150?img=14",
          status: "online",
        },
        purchased_at: "2024-03-10T17:00:00Z",
      },
      {
        id: 15,
        user_profiles: {
          display_name: "Michael",
          avatar_url: "https://i.pravatar.cc/150?img=15",
          status: "away",
        },
        purchased_at: "2024-03-10T17:05:00Z",
      },
      {
        id: 16,
        user_profiles: {
          display_name: "Sophia",
          avatar_url: "https://i.pravatar.cc/150?img=16",
          status: "online",
        },
        purchased_at: "2024-03-10T17:10:00Z",
      },
      {
        id: 17,
        user_profiles: {
          display_name: "Daniel",
          avatar_url: "https://i.pravatar.cc/150?img=17",
          status: "offline",
        },
        purchased_at: "2024-03-10T17:15:00Z",
      },
    ],
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
  menu: restaurant_profiles,
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

// Export the menu packages map for direct access if needed
export { menuPackages };

export const popularRecipes = [
  {
    id: 1,
    title: "Salmon Sushi Roll",
    author: "Emma Harper",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Classic Burger",
    author: "John Smith",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Vegetarian Pizza",
    author: "Sarah Wilson",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1974&auto=format&fit=crop",
    rating: 4.7,
  },
];

// Vouchers and Updates for Popular section
export const voucherUpdates = [
  {
    id: "v1",
    name: "50% Off All Burgers",
    description:
      "Get half price on all premium burgers this weekend at BurgerLab",
    location: "BurgerLab, SS2",
    image_url:
      "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=3270&auto=format&fit=crop",
    cuisine_type: "Promotion",
    valid_until: "2024-03-31",
    promo_code: "BURGER50",
  },
  {
    id: "v2",
    name: "New Restaurant Alert",
    description:
      "Sushi Master opens in Bangsar - Get 20% off on your first visit",
    location: "Bangsar",
    image_url:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=3270&auto=format&fit=crop",
    cuisine_type: "New Opening",
    valid_until: "2024-04-15",
    promo_code: "SUSHI20",
  },
  {
    id: "v3",
    name: "Weekend Special",
    description: "Buy 1 Free 1 on all pasta dishes at Roger's Kitchen",
    location: "TTDI",
    image_url:
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=3270&auto=format&fit=crop",
    cuisine_type: "Special Offer",
    valid_until: "2024-03-24",
    promo_code: "PASTA11",
  },
];
