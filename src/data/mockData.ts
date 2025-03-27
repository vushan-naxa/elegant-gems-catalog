
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  purity: string;
  category: string;
  store: string;
  storeId: string;
  weight: number;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  location: string;
  distance?: string;
}

export interface Message {
  id: string;
  sender: string;
  recipient: string;
  text: string;
  timestamp: string;
  read: boolean;
  avatar: string;
}

export interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    read: boolean;
  };
}

export interface MetalPrice {
  id: string;
  metalType: 'Gold' | 'Silver';
  purity: string;
  pricePerGram: number;
  updatedAt: string;
}

// Sample Product Data
export const products: Product[] = [
  {
    id: '1',
    name: '22k Gold Ring',
    description: 'A beautiful 22k gold ring with a classic design. Perfect for everyday wear.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZCUyMHJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    price: 299,
    purity: '22k',
    category: 'rings',
    store: 'Luxury Jewels',
    storeId: '1',
    weight: 5,
    available: true,
  },
  {
    id: '2',
    name: '18k Gold Necklace',
    description: 'Elegant 18k gold necklace with a pendant. Perfect for special occasions.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z29sZCUyMG5lY2tsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price: 419,
    purity: '18k',
    category: 'necklaces',
    store: 'Golden Treasures',
    storeId: '2',
    weight: 8,
    available: true,
  },
  {
    id: '3',
    name: '14k Gold Bracelet',
    description: 'Delicate 14k gold bracelet with a minimalist design. Perfect for everyday wear.',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdvbGQlMjBicmFjZWxldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 249,
    purity: '14k',
    category: 'bracelets',
    store: 'Jewelry Haven',
    storeId: '3',
    weight: 4,
    available: true,
  },
  {
    id: '4',
    name: '24k Gold Earrings',
    description: 'Stunning 24k gold earrings with a modern design. Perfect for special occasions.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z29sZCUyMGVhcnJpbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price: 359,
    purity: '24k',
    category: 'earrings',
    store: 'Elite Accessories',
    storeId: '4',
    weight: 3,
    available: true,
  },
  {
    id: '5',
    name: '18k Gold Chain',
    description: 'Premium 18k gold chain with a durable clasp. Perfect for everyday wear.',
    image: 'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGdvbGQlMjBjaGFpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 449,
    purity: '18k',
    category: 'necklaces',
    store: 'Golden Treasures',
    storeId: '2',
    weight: 10,
    available: true,
  },
  {
    id: '6',
    name: '24k Gold Pendant',
    description: 'Exquisite 24k gold pendant with intricate detailing. Perfect for special occasions.',
    image: 'https://images.unsplash.com/photo-1620336501657-38a2982ee29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdvbGQlMjBwZW5kYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price: 499,
    purity: '24k',
    category: 'necklaces',
    store: 'Luxury Jewels',
    storeId: '1',
    weight: 6,
    available: true,
  },
];

// Sample Category Data
export const categories: Category[] = [
  {
    id: 'necklaces',
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmVja2xhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'rings',
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZCUyMHJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'earrings',
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z29sZCUyMGVhcnJpbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdvbGQlMjBicmFjZWxldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
];

// Sample Store Data
export const stores: Store[] = [
  {
    id: '1',
    name: 'Union Square',
    image: 'https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2Vscnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    location: 'Union Square',
    distance: '1.2 miles',
  },
  {
    id: '2',
    name: 'Westfield',
    image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8amV3ZWxyeSUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    location: 'Westfield',
    distance: '2.5 miles',
  },
  {
    id: '3',
    name: 'Embarcadero',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZWxyeSUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    location: 'Embarcadero',
    distance: '3.8 miles',
  },
];

// Sample Conversation Data
export const conversations: Conversation[] = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Chloe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    lastMessage: {
      text: 'I love that necklace at your place',
      timestamp: '5:25 PM',
      read: true,
    },
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    lastMessage: {
      text: 'Do you want to go to the jewelry store this weekend?',
      timestamp: '5:25 PM',
      read: false,
    },
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'Lily',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    },
    lastMessage: {
      text: 'I found a new jewelry trend, do you want to check it out?',
      timestamp: '5:23 PM',
      read: true,
    },
  },
];

// Sample Metal Prices
export const metalPrices: MetalPrice[] = [
  {
    id: '1',
    metalType: 'Gold',
    purity: '24k',
    pricePerGram: 67.50,
    updatedAt: '2023-05-15',
  },
  {
    id: '2',
    metalType: 'Gold',
    purity: '22k',
    pricePerGram: 62.20,
    updatedAt: '2023-05-15',
  },
  {
    id: '3',
    metalType: 'Gold',
    purity: '18k',
    pricePerGram: 50.90,
    updatedAt: '2023-05-15',
  },
  {
    id: '4',
    metalType: 'Gold',
    purity: '14k',
    pricePerGram: 39.70,
    updatedAt: '2023-05-15',
  },
  {
    id: '5',
    metalType: 'Silver',
    purity: '999',
    pricePerGram: 0.85,
    updatedAt: '2023-05-15',
  },
  {
    id: '6',
    metalType: 'Silver',
    purity: '925',
    pricePerGram: 0.79,
    updatedAt: '2023-05-15',
  },
];

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

// Helper function to get products by store
export const getProductsByStore = (storeId: string) => {
  return products.filter(product => product.storeId === storeId);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return products.slice(0, 3); // Return first 3 products as featured
};

// Helper function to search products
export const searchProducts = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerCaseQuery) || 
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.store.toLowerCase().includes(lowerCaseQuery)
  );
};
