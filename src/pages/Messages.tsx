
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import { conversations } from "@/data/mockData";
import { motion } from "framer-motion";

const Messages = () => {
  const navigate = useNavigate();
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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => navigate(-1)} className="mr-2 text-gray-600">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">Messages</h1>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Conversations List */}
      <motion.div 
        className="flex-1 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredConversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {!conversation.lastMessage.read && (
                  <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-gold" />
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
        ))}
      </motion.div>

      {/* New Message Button */}
      <div className="sticky bottom-4 right-4 flex justify-end p-4">
        <button className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center shadow-lg hover:bg-gold-dark transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Messages;
