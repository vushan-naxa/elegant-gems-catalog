
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Upload } from "lucide-react";
import { motion } from "framer-motion";

const AddProduct = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    metalType: "",
    purity: "",
    weight: "",
    cost: "",
    availability: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleAvailability = () => {
    setFormData({
      ...formData,
      availability: !formData.availability,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", { ...formData, image });
    // Submit logic here
    navigate("/store");
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
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
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-600 mr-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">Add Product</h1>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-1 text-sm font-medium"
        >
          Save
        </button>
      </header>

      <motion.form
        className="p-4 space-y-6 flex-1 overflow-y-auto"
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-40 bg-gray-50 cursor-pointer"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {image ? (
              <img
                src={image}
                alt="Product preview"
                className="h-full object-contain"
              />
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload image</p>
              </>
            )}
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            required
          />
        </div>

        {/* Metal Type */}
        <div>
          <label htmlFor="metalType" className="block text-sm font-medium text-gray-700 mb-2">
            Metal Type
          </label>
          <select
            id="metalType"
            name="metalType"
            value={formData.metalType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            required
          >
            <option value="" disabled>Select metal type</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>
        </div>

        {/* Purity */}
        <div>
          <label htmlFor="purity" className="block text-sm font-medium text-gray-700 mb-2">
            Purity
          </label>
          <select
            id="purity"
            name="purity"
            value={formData.purity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            required
          >
            <option value="" disabled>Select purity</option>
            <option value="24k">24k</option>
            <option value="22k">22k</option>
            <option value="18k">18k</option>
            <option value="14k">14k</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            Weight
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Weight in grams"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            required
          />
        </div>

        {/* Cost */}
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
            Cost
          </label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            placeholder="Fixed cost"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            required
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>
          <button
            type="button"
            onClick={handleToggleAvailability}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.availability ? "bg-gold" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.availability ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gold text-white rounded-lg font-medium hover:bg-gold-dark transition-colors"
        >
          Submit for approval
        </button>
      </motion.form>
    </div>
  );
};

export default AddProduct;
