
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MessageCircle } from "lucide-react";
import PurityBadge from "@/components/ui/PurityBadge";
import { products } from "@/data/mockData";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [isLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-gold-dark underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleMessageStore = () => {
    if (isLoggedIn) {
      navigate(`/messages?store=${product.storeId}`);
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-2 text-gray-600"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">{product.name}</h1>
        </div>
      </div>

      {/* Product Image */}
      <motion.div 
        className="w-full aspect-square bg-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Product Details */}
      <motion.div 
        className="p-4 space-y-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-serif font-medium">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.store}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${product.price}</p>
            <PurityBadge purity={product.purity} />
          </div>
        </div>

        <p className="text-sm text-gray-700">{product.description}</p>

        <div className="pt-4">
          <button
            onClick={handleMessageStore}
            className="flex items-center justify-center w-full py-3 bg-gold text-white rounded-lg font-medium hover:bg-gold-dark transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message Store
          </button>
        </div>
      </motion.div>

      {/* Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-5 w-11/12 max-w-sm">
            <h3 className="text-lg font-medium mb-2">Sign in Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please sign in to message the store.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex-1 py-2 bg-gold text-white rounded-lg text-sm font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
