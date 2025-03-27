
import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import Logo from "../ui/Logo";
import { motion } from "framer-motion";

const AppLayout = () => {
  return (
    <div className="app-container">
      <header className="page-header">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Logo className="h-8" />
        </motion.div>
        <div className="flex items-center space-x-4">
          {/* Placeholder for future icons */}
        </div>
      </header>
      <main className="page-container bg-gradient-to-b from-white to-secondary">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default AppLayout;
