
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStores, Store } from '@/hooks/use-stores';
import { calculateDistance, getUserLocation, getSavedUserLocation, saveUserLocation } from '@/lib/location-utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MapPin, Store as StoreIcon, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const NearbyStores = () => {
  const { data: stores, isLoading: storesLoading } = useStores();
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(getSavedUserLocation());
  const [nearbyStores, setNearbyStores] = useState<(Store & {distance: number})[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(25); // Default 25km

  useEffect(() => {
    if (userLocation && stores) {
      // Calculate distances and sort by proximity
      const storesWithDistance = stores.map(store => {
        if (!store.latitude || !store.longitude) return { ...store, distance: Infinity };
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          Number(store.latitude),
          Number(store.longitude)
        );
        return { ...store, distance };
      })
      .filter(store => store.distance !== Infinity && store.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
      
      setNearbyStores(storesWithDistance);
    }
  }, [stores, userLocation, maxDistance]);

  const requestLocation = async () => {
    setIsLocating(true);
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      saveUserLocation(latitude, longitude);
      toast({
        title: "Location updated",
        description: "We'll show you nearby stores based on your location",
      });
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

  if (storesLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {!userLocation ? (
        <div className="bg-cream rounded-lg p-4 text-center space-y-3">
          <p className="text-sm text-gray-600">Share your location to find nearby jewelry stores</p>
          <Button onClick={requestLocation} className="bg-gold text-white hover:bg-gold-dark" disabled={isLocating}>
            {isLocating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting location...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Share my location
              </>
            )}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Distance filter</h3>
              <p className="text-xs text-gray-500">Show stores within {maxDistance} km</p>
            </div>
            <Button variant="outline" size="sm" onClick={requestLocation} disabled={isLocating}>
              {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="px-2">
            <Slider 
              defaultValue={[maxDistance]} 
              min={1} 
              max={50} 
              step={1} 
              onValueChange={(value) => setMaxDistance(value[0])}
            />
          </div>
          
          <div className="space-y-3 mt-4">
            {nearbyStores.length > 0 ? (
              nearbyStores.map(store => (
                <Link 
                  key={store.id} 
                  to={`/explore?store=${store.id}`}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gold/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/5 to-gold-light/5 border border-gold/10 flex items-center justify-center mr-3">
                    {store.logo_url ? (
                      <img src={store.logo_url} alt={store.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <StoreIcon className="h-5 w-5 text-gold-dark/70" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-sm">{store.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{store.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium bg-cream text-gold-dark px-2 py-1 rounded-full">
                      {store.distance.toFixed(1)} km
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No stores found within {maxDistance} km</p>
                <p className="text-sm mt-1">Try increasing the distance</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NearbyStores;
