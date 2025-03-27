
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Settings } from "lucide-react";

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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
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
      <div className="h-full flex flex-col items-center justify-center py-10 px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-serif font-medium text-center mb-8">Sign In</h1>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gold text-white rounded-lg font-medium hover:bg-gold-dark transition-colors"
            >
              Sign In
            </button>
            
            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-gold-dark font-medium">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="h-full p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.div 
        className="flex items-center py-4"
        variants={itemVariants}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-serif font-medium">{userData.name}</h2>
          <p className="text-sm text-gray-600">Account settings</p>
        </div>
      </motion.div>

      {/* Account Settings */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <p className="text-sm font-medium">Email</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">{userData.email}</span>
            <button className="text-sm font-medium text-gold-dark">Change</button>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <p className="text-sm font-medium">Password</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">••••••</span>
            <button className="text-sm font-medium text-gold-dark">Change</button>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <p className="text-sm font-medium">Shipping address</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Enter shipping address</span>
            <button className="text-sm font-medium text-gold-dark">Add</button>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <p className="text-sm font-medium">Preferences</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Manage your email preferences</span>
            <button className="text-sm font-medium text-gold-dark">Open</button>
          </div>
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div variants={itemVariants} className="pt-6">
        <button
          onClick={handleLogout}
          className="w-full py-3 border border-gray-300 rounded-lg text-sm font-medium"
        >
          Log Out
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
