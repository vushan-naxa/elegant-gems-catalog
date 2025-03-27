
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronRight } from "lucide-react";
import { metalPrices } from "@/data/mockData";
import { motion } from "framer-motion";

const UpdatePrice = () => {
  const navigate = useNavigate();
  const [selectedMetal, setSelectedMetal] = useState("Gold");
  const [selectedPurity, setSelectedPurity] = useState("24k");
  const [price, setPrice] = useState("");

  const handleUpdatePrice = () => {
    console.log("Updating price:", {
      metalType: selectedMetal,
      purity: selectedPurity,
      pricePerGram: parseFloat(price),
    });
    // Price update logic here
    setPrice("");
  };

  const getFilteredPrices = () => {
    return metalPrices.filter(
      (price) => price.metalType === selectedMetal
    );
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
    <div className="app-container bg-gray-50">
      <motion.div 
        className="bg-white rounded-lg mx-4 my-8 shadow-md overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-medium">Gold Price</h1>
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Metal Type */}
          <motion.div variants={itemVariants}>
            <h2 className="font-medium mb-3">Metal Type</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedMetal("Gold")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  selectedMetal === "Gold"
                    ? "bg-gold text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Gold
              </button>
              <button
                onClick={() => setSelectedMetal("Silver")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  selectedMetal === "Silver"
                    ? "bg-gold text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Silver
              </button>
            </div>
          </motion.div>

          {/* Purity */}
          <motion.div variants={itemVariants}>
            <h2 className="font-medium mb-3">Purity</h2>
            <div className="flex space-x-2">
              {selectedMetal === "Gold" ? (
                <>
                  <button
                    onClick={() => setSelectedPurity("14k")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      selectedPurity === "14k"
                        ? "bg-gold text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    14k
                  </button>
                  <button
                    onClick={() => setSelectedPurity("18k")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      selectedPurity === "18k"
                        ? "bg-gold text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    18k
                  </button>
                  <button
                    onClick={() => setSelectedPurity("24k")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      selectedPurity === "24k"
                        ? "bg-gold text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    24k
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedPurity("925")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      selectedPurity === "925"
                        ? "bg-gold text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    925
                  </button>
                  <button
                    onClick={() => setSelectedPurity("999")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      selectedPurity === "999"
                        ? "bg-gold text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    999
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Price Input */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <label htmlFor="price" className="block font-medium mb-3">
                Price per gram
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                placeholder="Enter price"
                step="0.01"
                min="0"
                required
              />
            </div>

            <button
              onClick={handleUpdatePrice}
              className="w-full py-3 bg-gold text-white rounded-lg font-medium hover:bg-gold-dark transition-colors"
              disabled={!price}
            >
              Update Price
            </button>
          </motion.div>

          {/* Current Prices */}
          <motion.div variants={itemVariants} className="mt-8">
            <h2 className="font-medium mb-3">Current {selectedMetal} Price</h2>
            <div className="space-y-3">
              {getFilteredPrices().map((price) => (
                <div
                  key={price.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">
                      Current {price.purity} {price.metalType} Price
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${price.pricePerGram.toFixed(2)}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdatePrice;
