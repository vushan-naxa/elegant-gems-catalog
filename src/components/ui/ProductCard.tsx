
import { Link } from "react-router-dom";
import PurityBadge from "./PurityBadge";
import { Product } from "@/data/mockData";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

const ProductCard = ({ product, className, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={className}
    >
      <Link
        to={`/product/${product.id}`}
        className="block rounded-lg overflow-hidden card-shadow bg-white hover:shadow-lg transition-all duration-300"
      >
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <PurityBadge purity={product.purity} />
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-serif font-medium text-sm truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 truncate">
            {product.store}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold text-sm bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">${product.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
