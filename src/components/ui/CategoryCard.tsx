
import { Link } from "react-router-dom";
import { Category } from "@/data/mockData";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
    >
      <Link to={`/explore?category=${category.id}`} className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gradient-to-br from-gold/10 to-gold-light/10 shadow-sm flex items-center justify-center border border-gold/10">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="mt-2 text-xs text-center font-medium">{category.name}</span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
