
import { useState } from "react";
import { Search, PlusCircle } from "lucide-react";
import { conversations } from "@/data/mockData";
import { motion } from "framer-motion";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      setFilteredConversations(
        conversations.filter((conversation) =>
          conversation.user.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredConversations(conversations);
    }
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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div 
        className="bg-white/90 backdrop-blur-md z-10 shadow-sm py-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center h-12 px-4">
          <h1 className="text-lg font-serif">Messages</h1>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search conversations"
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose focus:border-rose/60 transition-colors shadow-sm"
            />
          </div>
        </div>
      </motion.div>

      {/* Conversations List - without scrollbar */}
      <motion.div 
        className="flex-1 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="pb-16">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                variants={itemVariants}
                whileHover={{ x: 3, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                      <img
                        src={conversation.user.avatar}
                        alt={conversation.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {!conversation.lastMessage.read && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose animate-pulse-rose" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{conversation.user.name}</h3>
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessage.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* New Message Button with rose gold theme */}
      <motion.div 
        className="fixed bottom-24 right-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.button 
          className="w-12 h-12 rounded-full btn-gradient text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Messages;
