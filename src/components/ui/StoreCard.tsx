
import { Link } from "react-router-dom";
import { Store } from "@/data/mockData";
import { motion } from "framer-motion";

interface StoreCardProps {
  store: Store;
  index?: number;
}

const StoreCard = ({ store, index = 0 }: StoreCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
    >
      <Link to={`/explore?store=${store.id}`} className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-gold/5 to-gold-light/5 shadow-md border border-gold/10">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="mt-2 text-sm text-center font-serif">{store.name}</span>
        <span className="text-xs text-gray-500">{store.location}</span>
      </Link>
    </motion.div>
  );
};

export default StoreCard;
