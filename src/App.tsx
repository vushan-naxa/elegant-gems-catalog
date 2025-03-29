
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
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
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Auth Route */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Customer Routes */}
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="messages" element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } />
                <Route path="product/:id" element={
                  <ProtectedRoute allowGuest={true}>
                    <ProductDetail />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* Store Owner Routes */}
              <Route path="/store" element={
                <ProtectedRoute requiredRole="store_owner">
                  <StoreHome />
                </ProtectedRoute>
              } />
              <Route path="/store/add-product" element={
                <ProtectedRoute requiredRole="store_owner">
                  <AddProduct />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/update-price" element={
                <ProtectedRoute requiredRole="admin">
                  <UpdatePrice />
                </ProtectedRoute>
              } />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
