
import { Link, useLocation } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

const BottomNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-200 h-16 flex items-center justify-around z-10">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${
          isActive("/") ? "text-gold" : "text-gray-500"
        } transition-colors duration-200`}
      >
        <Home className={`h-6 w-6 ${isActive("/") && "fill-gold-light stroke-gold"}`} />
        <span className="text-xs mt-1 font-medium">Home</span>
      </Link>

      <Link
        to="/explore"
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${
          isActive("/explore") ? "text-gold" : "text-gray-500"
        } transition-colors duration-200`}
      >
        <Search className={`h-6 w-6 ${isActive("/explore") && "stroke-gold"}`} />
        <span className="text-xs mt-1 font-medium">Explore</span>
      </Link>

      <Link
        to="/profile"
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${
          isActive("/profile") ? "text-gold" : "text-gray-500"
        } transition-colors duration-200`}
      >
        <User className={`h-6 w-6 ${isActive("/profile") && "stroke-gold"}`} />
        <span className="text-xs mt-1 font-medium">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
