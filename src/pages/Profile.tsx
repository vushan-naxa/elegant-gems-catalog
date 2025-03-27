
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, UserCircle, LogOut, Settings, Camera, Heart, ShoppingBag, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock user data
  const userData = {
    name: "Luna C.",
    email: "luna.c@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleLogin = () => {
    // Mock login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Mock logout
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <motion.div 
        className="h-full flex flex-col items-center justify-center py-10 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full max-w-sm">
          <motion.h1 
            className="text-2xl font-serif font-medium text-center mb-8 bg-gradient-to-r from-teal-dark to-teal bg-clip-text text-transparent"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Sign In
          </motion.h1>
          
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal/60 focus:border-teal transition-colors shadow-sm"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal/60 focus:border-teal transition-colors shadow-sm"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button
                onClick={handleLogin}
                className="w-full py-6 btn-gradient text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Sign In
              </Button>
            </motion.div>
            
            <motion.p className="text-sm text-center text-gray-600 mt-4" variants={itemVariants}>
              Don't have an account?{" "}
              <a href="#" className="text-teal-dark font-medium hover:underline">
                Sign Up
              </a>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="h-full pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.div 
        className="bg-gradient-to-r from-teal-dark/10 to-teal-light/10 p-6 rounded-b-2xl shadow-sm mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <Camera className="h-4 w-4 text-teal" />
            </button>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-serif font-medium">{userData.name}</h2>
            <p className="text-sm text-gray-600">{userData.email}</p>
            <Button variant="outline" className="mt-2 text-xs h-8 px-3 border-teal/30 text-teal-dark hover:bg-teal/5">
              Edit Profile
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Menu Options */}
      <motion.div className="px-4 space-y-4" variants={itemVariants}>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <ProfileMenuItem icon={<Heart className="text-rose-500" />} label="Saved Items" />
          <ProfileMenuItem icon={<ShoppingBag className="text-emerald-500" />} label="Order History" />
          <ProfileMenuItem icon={<CreditCard className="text-violet-500" />} label="Payment Methods" />
          <ProfileMenuItem icon={<Settings className="text-blue-500" />} label="Account Settings" />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-4">
          <ProfileMenuItem icon={<HelpCircle className="text-amber-500" />} label="Help & Support" />
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div variants={itemVariants} className="px-4 pt-8">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full py-6 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl flex items-center justify-center shadow-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </motion.div>
    </motion.div>
  );
};

const ProfileMenuItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-100/80 flex items-center justify-center mr-3">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};

export default Profile;
