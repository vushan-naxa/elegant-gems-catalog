
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { searchProducts, products, categories } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { calculateDistance, getSavedUserLocation } from "@/lib/location-utils";

const Explore = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [searchResults, setSearchResults] = useState(products);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedPurity, setSelectedPurity] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState<number>(25); // Default 25km
  const [isLoading, setIsLoading] = useState(false);
  const userLocation = getSavedUserLocation();

  // Extract search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("category");
    const storeId = params.get("store");
    const query = params.get("q");
    const view = params.get("view");
    
    if (view === "stores") {
      setActiveTab("stores");
    }
    
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else if (categoryId || storeId) {
      // Simulate search based on category or store
      setIsLoading(true);
      setTimeout(() => {
        setSearchResults(products.slice(0, 6));
        setIsLoading(false);
      }, 800);
    } else {
      setSearchResults(products);
    }
  }, [location.search]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate API call with a slight delay
    setTimeout(() => {
      if (query.trim()) {
        setSearchResults(searchProducts(query));
      } else {
        setSearchResults(products);
      }
      setIsLoading(false);
    }, 600);
  };

  const handleSearchSubmit = () => {
    handleSearch(searchQuery);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const togglePurity = (purity: string) => {
    if (selectedPurity.includes(purity)) {
      setSelectedPurity(selectedPurity.filter(p => p !== purity));
    } else {
      setSelectedPurity([...selectedPurity, purity]);
    }
  };

  const applyFilters = () => {
    setIsLoading(true);
    
    // Simulate API call with a slight delay
    setTimeout(() => {
      let filtered = products;
      
      // Filter by price
      filtered = filtered.filter(
        product => product.price >= priceRange.min && product.price <= priceRange.max
      );
      
      // Filter by purity
      if (selectedPurity.length > 0) {
        filtered = filtered.filter(product => selectedPurity.includes(product.purity));
      }
      
      // Filter by distance if user location is available
      if (userLocation && activeTab === "stores") {
        filtered = filtered.filter(product => {
          // This is simulated - in a real app we would get the store's location
          // and calculate the distance
          const distance = Math.random() * 50; // Random distance for demo
          return distance <= maxDistance;
        });
      }
      
      setSearchResults(filtered);
      setFilterVisible(false);
      setIsLoading(false);
    }, 600);
  };

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 5000 });
    setSelectedPurity([]);
    setMaxDistance(25);
  };

  return (
    <div className="pb-8">
      {/* Search Bar */}
      <motion.div 
        className="sticky top-0 z-10 bg-white/90 backdrop-blur-md py-3 px-4 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jewelry, stores, or designers"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold/60 transition-colors shadow-sm"
          />
          <button
            onClick={toggleFilter}
            className="ml-2 p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gold-dark transition-colors shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-3">
          <button
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              activeTab === "products"
                ? "text-gold-dark border-b-2 border-gold"
                : "text-gray-500 hover:text-gold-dark"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              activeTab === "stores"
                ? "text-gold-dark border-b-2 border-gold"
                : "text-gray-500 hover:text-gold-dark"
            }`}
            onClick={() => setActiveTab("stores")}
          >
            Stores
          </button>
        </div>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {filterVisible && (
          <motion.div 
            className="p-4 bg-white border-b border-gray-200 shadow-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif font-medium">Filter & Sort</h3>
              <button 
                onClick={toggleFilter}
                className="text-gray-500 hover:text-gold-dark transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-5">
              <p className="text-sm font-medium mb-2">Price range</p>
              <div className="flex items-center justify-between space-x-2">
                <button className={`px-3 py-1.5 text-xs rounded-full transition-colors ${priceRange.min === 0 && priceRange.max === 5000 ? 'bg-gold text-white shadow-md' : 'bg-gray-100'}`}>
                  Any price
                </button>
                <button className={`px-3 py-1.5 text-xs rounded-full transition-colors ${priceRange.min === 0 && priceRange.max === 1000 ? 'bg-gold text-white shadow-md' : 'bg-gray-100'}`}>
                  Under $1000
                </button>
                <button className={`px-3 py-1.5 text-xs rounded-full transition-colors ${priceRange.min === 1000 && priceRange.max === 5000 ? 'bg-gold text-white shadow-md' : 'bg-gray-100'}`}>
                  $1000 - $5000
                </button>
                <button className={`px-3 py-1.5 text-xs rounded-full transition-colors ${priceRange.min === 5000 ? 'bg-gold text-white shadow-md' : 'bg-gray-100'}`}>
                  $5000+
                </button>
              </div>
            </div>
            
            <div className="mb-5">
              <p className="text-sm font-medium mb-2">Purity</p>
              <div className="flex flex-wrap gap-2">
                {['14k', '18k', '22k', '24k'].map(purity => (
                  <button
                    key={purity}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      selectedPurity.includes(purity) ? 'bg-gold text-white shadow-md' : 'bg-gray-100'
                    }`}
                    onClick={() => togglePurity(purity)}
                  >
                    {purity} gold
                  </button>
                ))}
              </div>
            </div>
            
            {userLocation && activeTab === "stores" && (
              <div className="mb-5">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gold-dark mr-2" />
                  <p className="text-sm font-medium">Distance</p>
                </div>
                <p className="text-xs text-gray-500 mb-2">Show stores within {maxDistance} km</p>
                <Slider 
                  defaultValue={[maxDistance]} 
                  value={[maxDistance]}
                  min={1} 
                  max={50} 
                  step={1} 
                  onValueChange={(value) => setMaxDistance(value[0])}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 km</span>
                  <span>50 km</span>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg font-medium text-sm transition-colors hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-2.5 btn-gradient text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {isLoading ? (
          // Skeleton loaders
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded mt-2 w-1/2"></div>
            </div>
          ))
        ) : searchResults.length > 0 ? (
          searchResults.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <div className="col-span-2 py-8 text-center text-gray-500">
            <p>No items found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
