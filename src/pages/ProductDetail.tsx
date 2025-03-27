
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MessageCircle, ArrowLeft } from "lucide-react";
import PurityBadge from "@/components/ui/PurityBadge";
import { products } from "@/data/mockData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      <motion.div 
        className="sticky top-0 bg-white/80 backdrop-blur-md z-10 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-2 text-gray-600 hover:text-gold transition-colors p-2 rounded-full hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-serif">{product.name}</h1>
        </div>
      </motion.div>

      {/* Product Image */}
      <motion.div 
        className="w-full aspect-square bg-gray-50 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <PurityBadge purity={product.purity} className="shadow-md" />
        </div>
      </motion.div>

      {/* Product Details */}
      <motion.div 
        className="p-5 space-y-5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-serif font-medium bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{product.store}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">${product.price}</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>

        <div className="py-2">
          <Button
            onClick={handleMessageStore}
            className="w-full py-6 btn-gradient text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all group"
          >
            <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Message Store
          </Button>
        </div>
      </motion.div>

      {/* Login Prompt */}
      {showLoginPrompt && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 w-11/12 max-w-sm shadow-2xl"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <h3 className="text-xl font-serif font-medium mb-3">Sign in Required</h3>
            <p className="text-sm text-gray-600 mb-5">
              Please sign in to message the store about this beautiful piece.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => navigate("/profile")}
                className="flex-1 btn-gradient text-white"
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetail;
