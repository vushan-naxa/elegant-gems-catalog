
import { Link } from "react-router-dom";
import PurityBadge from "./PurityBadge";
import { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`block rounded-lg overflow-hidden animate-fade-in card-shadow ${className}`}
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <PurityBadge purity={product.purity} />
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 truncate">
          {product.store}
        </p>
        <div className="flex justify-between items-center mt-1">
          <span className="font-semibold text-sm">${product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
