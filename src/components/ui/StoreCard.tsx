
import { Link } from "react-router-dom";
import { Store } from "@/data/mockData";

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <Link to={`/explore?store=${store.id}`} className="flex flex-col items-center animate-fade-in">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="mt-2 text-xs text-center font-medium">{store.name}</span>
      <span className="text-xs text-gray-500">{store.location}</span>
    </Link>
  );
};

export default StoreCard;
