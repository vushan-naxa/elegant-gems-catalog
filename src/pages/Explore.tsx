
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { searchProducts, products, categories } from "@/data/mockData";

const Explore = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [searchResults, setSearchResults] = useState(products);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedPurity, setSelectedPurity] = useState<string[]>([]);

  // Extract search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("category");
    const storeId = params.get("store");
    const query = params.get("q");
    
    if (query) {
      setSearchQuery(query);
      setSearchResults(searchProducts(query));
    } else {
      setSearchResults(products);
    }
  }, [location.search]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResults(searchProducts(searchQuery));
    } else {
      setSearchResults(products);
    }
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
    let filtered = products;
    
    // Filter by price
    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Filter by purity
    if (selectedPurity.length > 0) {
      filtered = filtered.filter(product => selectedPurity.includes(product.purity));
    }
    
    setSearchResults(filtered);
    setFilterVisible(false);
  };

  return (
    <div className="pb-8">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-white py-2">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for products, stores, or locations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
          />
          <button
            onClick={toggleFilter}
            className="ml-2 p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-3">
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "products"
                ? "text-gold-dark border-b-2 border-gold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "stores"
                ? "text-gold-dark border-b-2 border-gold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("stores")}
          >
            Stores
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {filterVisible && (
        <div className="p-4 bg-white border-b border-gray-200 animate-slide-down">
          <h3 className="font-medium mb-3">Filter & Sort</h3>
          
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Price range</p>
            <div className="flex items-center justify-between">
              <button className={`px-3 py-1 text-xs rounded-full ${priceRange.min === 0 && priceRange.max === 5000 ? 'bg-gold text-white' : 'bg-gray-100'}`}>
                Low to High
              </button>
              <button className={`px-3 py-1 text-xs rounded-full ${priceRange.min === 5000 && priceRange.max === 0 ? 'bg-gold text-white' : 'bg-gray-100'}`}>
                High to Low
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Purity</p>
            <div className="flex flex-wrap gap-2">
              {['14k', '18k', '22k', '24k'].map(purity => (
                <button
                  key={purity}
                  className={`px-3 py-1 text-xs rounded-full ${
                    selectedPurity.includes(purity) ? 'bg-gold text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => togglePurity(purity)}
                >
                  {purity} gold
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={applyFilters}
            className="w-full py-2 bg-gold text-white rounded-lg font-medium text-sm hover:bg-gold-dark transition-colors"
          >
            Show {searchResults.length} Results
          </button>
        </div>
      )}

      {/* Search Results */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
