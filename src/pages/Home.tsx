
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

  const itemVariants = {
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
    <div className="space-y-8 pb-8">
      {/* Tabs for Featured / New Arrivals */}
      <div className="flex border-b border-gray-200">
        <button className="py-2 px-4 text-sm font-medium text-gold-dark border-b-2 border-gold">
          Featured
        </button>
        <button className="py-2 px-4 text-sm font-medium text-gray-500">
          New Arrivals
        </button>
      </div>

      {/* Featured Products */}
      <motion.section 
        className="section-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories */}
      <section className="section-container">
        <SectionHeader title="Categories" />
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Stores near you */}
      <section className="section-container">
        <SectionHeader title="Stores near you" />
        <div className="grid grid-cols-3 gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
