
import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import Logo from "../ui/Logo";

const AppLayout = () => {
  return (
    <div className="app-container">
      <header className="page-header">
        <Logo className="h-8" />
        <div className="flex items-center space-x-4">
          {/* Removed shopping cart icon */}
        </div>
      </header>
      <main className="page-container">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default AppLayout;
