
import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const BottomNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto z-10">
      {/* Curved background with shadow */}
      <div className="bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.07)] rounded-t-2xl h-16 border-t border-gray-100">
        <div className="flex items-center justify-around h-full">
          <NavItem 
            to="/" 
            isActive={isActive("/")} 
            icon={<Home className={`h-5 w-5 transition-colors duration-300 ${isActive("/") ? "fill-teal-light stroke-teal" : "stroke-gray-500"}`} />}
            label="Home"
          />

          <NavItem 
            to="/explore" 
            isActive={isActive("/explore")} 
            icon={<Search className={`h-5 w-5 transition-colors duration-300 ${isActive("/explore") ? "stroke-teal" : "stroke-gray-500"}`} />}
            label="Explore"
          />
          
          <NavItem 
            to="/messages" 
            isActive={isActive("/messages")} 
            icon={<MessageSquare className={`h-5 w-5 transition-colors duration-300 ${isActive("/messages") ? "stroke-teal" : "stroke-gray-500"}`} />}
            label="Messages"
          />

          <NavItem 
            to="/profile" 
            isActive={isActive("/profile")} 
            icon={<User className={`h-5 w-5 transition-colors duration-300 ${isActive("/profile") ? "stroke-teal" : "stroke-gray-500"}`} />}
            label="Profile"
          />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, isActive, icon, label }: { to: string; isActive: boolean; icon: React.ReactNode; label: string }) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center w-1/4 py-1 relative"
    >
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -top-1 w-10 h-1 bg-gradient-to-r from-teal-dark to-teal rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`p-2 ${isActive ? "bg-teal/10 rounded-full" : ""}`}>
        {icon}
      </div>
      <span className={`text-xs mt-0.5 font-medium transition-colors duration-300 ${isActive ? "text-teal" : "text-gray-500"}`}>
        {label}
      </span>
    </Link>
  );
};

export default BottomNavbar;
