
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
    <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 h-16 flex items-center justify-around z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <NavItem 
        to="/" 
        isActive={isActive("/")} 
        icon={<Home className={`h-6 w-6 transition-colors duration-300 ${isActive("/") ? "fill-gold-light stroke-gold" : "stroke-gray-500"}`} />}
        label="Home"
      />

      <NavItem 
        to="/explore" 
        isActive={isActive("/explore")} 
        icon={<Search className={`h-6 w-6 transition-colors duration-300 ${isActive("/explore") ? "stroke-gold" : "stroke-gray-500"}`} />}
        label="Explore"
      />
      
      <NavItem 
        to="/messages" 
        isActive={isActive("/messages")} 
        icon={<MessageSquare className={`h-6 w-6 transition-colors duration-300 ${isActive("/messages") ? "stroke-gold" : "stroke-gray-500"}`} />}
        label="Messages"
      />

      <NavItem 
        to="/profile" 
        isActive={isActive("/profile")} 
        icon={<User className={`h-6 w-6 transition-colors duration-300 ${isActive("/profile") ? "stroke-gold" : "stroke-gray-500"}`} />}
        label="Profile"
      />
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
          className="absolute -top-1 w-12 h-1 bg-gradient-to-r from-gold-dark to-gold rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      {icon}
      <span className={`text-xs mt-1 font-medium transition-colors duration-300 ${isActive ? "text-gold" : "text-gray-500"}`}>
        {label}
      </span>
    </Link>
  );
};

export default BottomNavbar;
