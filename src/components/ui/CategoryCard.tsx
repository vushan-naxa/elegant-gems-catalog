
import { Link } from "react-router-dom";
import { Category } from "@/data/mockData";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/explore?category=${category.id}`} className="flex flex-col items-center animate-fade-in">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="mt-2 text-xs text-center">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
