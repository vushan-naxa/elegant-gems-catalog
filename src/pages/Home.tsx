
import { useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import StoreCard from "@/components/ui/StoreCard";
import { getFeaturedProducts, products, categories, stores } from "@/data/mockData";
import { motion } from "framer-motion";

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = products.slice(3, 6);

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

  const sectionVariants = {
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
    <motion.div 
      className="space-y-8 pb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Banner */}
      <motion.div 
        className="relative h-40 mb-8 rounded-xl overflow-hidden shadow-lg"
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold-dark/80 to-gold-light/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800" 
          alt="Luxury jewelry" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-5">
          <h2 className="text-2xl font-serif font-medium text-center mb-2 drop-shadow-md">Timeless Elegance</h2>
          <p className="text-sm text-center max-w-xs drop-shadow-md">Discover our curated collection of exquisite jewelry</p>
        </div>
      </motion.div>

      {/* Tabs for Featured / New Arrivals */}
      <motion.div 
        className="flex border-b border-gray-200 mb-4"
        variants={sectionVariants}
      >
        <button className="py-2 px-4 text-sm font-medium border-b-2 border-gold text-gold-dark relative">
          Featured
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-dark to-gold-light"></span>
        </button>
        <button className="py-2 px-4 text-sm font-medium text-gray-500 hover:text-gold-dark transition-colors duration-300">
          New Arrivals
        </button>
      </motion.div>

      {/* Featured Products */}
      <motion.section 
        className="section-container"
        variants={sectionVariants}
      >
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section 
        className="section-container"
        variants={sectionVariants}
      >
        <SectionHeader title="Categories" actionText="View All" actionLink="/explore" />
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Stores near you */}
      <motion.section 
        className="section-container"
        variants={sectionVariants}
      >
        <SectionHeader title="Stores near you" actionText="See All" actionLink="/explore?view=stores" />
        <div className="grid grid-cols-3 gap-5">
          {stores.map((store, index) => (
            <StoreCard key={store.id} store={store} index={index} />
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
