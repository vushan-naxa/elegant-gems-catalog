
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import StoreHome from "./pages/store/StoreHome";
import AddProduct from "./pages/store/AddProduct";
import UpdatePrice from "./pages/admin/UpdatePrice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile" element={<Profile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="product/:id" element={<ProductDetail />} />
          </Route>
          
          {/* Store Owner Routes */}
          <Route path="/store" element={<StoreHome />} />
          <Route path="/store/add-product" element={<AddProduct />} />
          
          {/* Admin Routes */}
          <Route path="/admin/update-price" element={<UpdatePrice />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
