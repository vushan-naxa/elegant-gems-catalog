
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, SlidersHorizontal, X, MapPin, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { calculateDistance, getSavedUserLocation, getUserLocation, saveUserLocation } from "@/lib/location-utils";
import { useProducts, Product } from "@/hooks/use-products";
import { useStores } from "@/hooks/use-stores";
import { toast } from "@/hooks/use-toast";
import StoreCard from "@/components/ui/StoreCard";

const Explore = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedPurity, setSelectedPurity] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState<number>(25); // Default 25km
  const [isLocating, setIsLocating] = useState(false);
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
    }
    
    // Reset filters when navigation params change
    setPriceRange({ min: 0, max: 5000 });
    setSelectedPurity([]);
  }, [location.search]);

  // Fetch data based on filters
  const { data: products, isLoading: productsLoading } = useProducts({
    storeId: new URLSearchParams(location.search).get("store") || undefined,
    categoryId: new URLSearchParams(location.search).get("category") || undefined,
    searchQuery: searchQuery || new URLSearchParams(location.search).get("q") || undefined,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    purity: selectedPurity.length > 0 ? selectedPurity : undefined,
    maxDistance: userLocation && activeTab === "stores" ? maxDistance : undefined
  });

  const { data: stores, isLoading: storesLoading } = useStores();

  const handleSearchSubmit = () => {
    // Just let the query run with the searchQuery state
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
    // Filters are applied via the useProducts hook
    setFilterVisible(false);
  };

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 5000 });
    setSelectedPurity([]);
    setMaxDistance(25);
  };

  const requestLocation = async () => {
    setIsLocating(true);
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      saveUserLocation(latitude, longitude);
      toast({
        title: "Location updated",
        description: "We'll show you nearby stores based on your location",
      });
      // Force re-render to pick up the new location
      window.location.reload();
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Could not get your location",
        description: "Please check your browser permissions and try again",
        variant: "destructive",
      });
    } finally {
      setIsLocating(false);
    }
  };

  const isLoading = activeTab === "products" ? productsLoading : storesLoading;
  const isDataEmpty = activeTab === "products" ? 
    (!products || products.length === 0) : 
    (!stores || stores.length === 0);

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

      {/* Location Request Banner */}
      {!userLocation && (
        <div className="mx-4 mt-3 p-3 bg-cream rounded-lg text-sm flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gold-dark mr-2" />
            <span>Show items near me</span>
          </div>
          <button 
            onClick={requestLocation}
            className="px-3 py-1 bg-gold text-white text-xs rounded-full"
            disabled={isLocating}
          >
            {isLocating ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              'Share location'
            )}
          </button>
        </div>
      )}

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
                <button 
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                    priceRange.min === 0 && priceRange.max === 5000 
                      ? 'bg-gold text-white shadow-md' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => setPriceRange({ min: 0, max: 5000 })}
                >
                  Any price
                </button>
                <button 
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                    priceRange.min === 0 && priceRange.max === 1000 
                      ? 'bg-gold text-white shadow-md' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => setPriceRange({ min: 0, max: 1000 })}
                >
                  Under $1000
                </button>
                <button 
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                    priceRange.min === 1000 && priceRange.max === 5000 
                      ? 'bg-gold text-white shadow-md' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => setPriceRange({ min: 1000, max: 5000 })}
                >
                  $1000 - $5000
                </button>
                <button 
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                    priceRange.min === 5000 
                      ? 'bg-gold text-white shadow-md' 
                      : 'bg-gray-100'
                  }`}
                  onClick={() => setPriceRange({ min: 5000, max: 999999 })}
                >
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
            
            {userLocation && (
              <div className="mb-5">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gold-dark mr-2" />
                  <p className="text-sm font-medium">Distance</p>
                </div>
                <p className="text-xs text-gray-500 mb-2">Show items within {maxDistance} km</p>
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

      {/* Results Display */}
      <div className={`${activeTab === "products" ? "grid grid-cols-2" : "flex flex-col"} gap-4 p-4`}>
        {isLoading ? (
          // Skeleton loaders
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded mt-2 w-1/2"></div>
            </div>
          ))
        ) : isDataEmpty ? (
          <div className="col-span-2 py-8 text-center text-gray-500">
            <p>No items found matching your criteria</p>
          </div>
        ) : activeTab === "products" ? (
          // Product results
          products?.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                description: product.description || '',
                price: product.price,
                image: product.images && product.images.length > 0 
                  ? product.images[0] as string 
                  : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZCUyMHJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
                purity: product.purity,
                category: product.category_id || '',
                store: product.stores?.name || 'Unknown Store',
                storeId: product.store_id,
                weight: 0, // Placeholder since we don't have this data
                available: true
              }} 
              index={index} 
            />
          ))
        ) : (
          // Store results
          stores?.map((store, index) => (
            <div key={store.id} className="mb-2">
              <StoreCard 
                store={{
                  id: store.id,
                  name: store.name,
                  location: store.address || 'No address',
                  image: store.logo_url || 'https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2Vscnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
                  distance: store.latitude && store.longitude && userLocation 
                    ? `${calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        store.latitude,
                        store.longitude
                      ).toFixed(1)} km` 
                    : undefined
                }}
                index={index}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
