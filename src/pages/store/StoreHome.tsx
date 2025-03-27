
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Settings } from "lucide-react";
import { products } from "@/data/mockData";
import { motion } from "framer-motion";

const StoreHome = () => {
  const navigate = useNavigate();
  const [storeProducts, setStoreProducts] = useState(products.slice(0, 4));

  const handleEdit = (productId: string) => {
    // Navigate to edit product page
    console.log("Edit product:", productId);
  };

  const handleDelete = (productId: string) => {
    // Delete product from store
    setStoreProducts(storeProducts.filter(product => product.id !== productId));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <h1 className="text-xl font-serif font-semibold tracking-tight">Storefront</h1>
        <button
          onClick={() => navigate("/store/add-product")}
          className="px-3 py-1.5 bg-gold text-white rounded-lg text-sm font-medium flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Product
        </button>
      </header>

      <motion.main 
        className="page-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {storeProducts.map((product) => (
          <motion.div
            key={product.id}
            className="flex p-3 border-b border-gray-200"
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="font-medium text-sm">{product.name}</h3>
              <p className="text-xs text-gray-500">${product.price}</p>
            </div>
            <button
              onClick={() => handleEdit(product.id)}
              className="text-gray-500 hover:text-gold-dark transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </motion.main>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-200 h-16 flex items-center justify-around">
        <button className="flex flex-col items-center justify-center text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72L4.318 3.44A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .415.336.75.75.75Z" />
          </svg>
          <span className="text-xs mt-1">Store</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
          </svg>
          <span className="text-xs mt-1">Orders</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
          <span className="text-xs mt-1">Help</span>
        </button>
      </div>
    </div>
  );
};

export default StoreHome;
