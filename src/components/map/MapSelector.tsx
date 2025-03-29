
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSelectorProps {
  initialLat?: number;
  initialLng?: number;
  height?: string;
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapSelector = ({ 
  initialLat = 27.7172, 
  initialLng = 85.3240, 
  height = '300px', 
  onLocationSelect 
}: MapSelectorProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView(position, 13);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add initial marker
      const marker = L.marker(position, { draggable: true }).addTo(map);
      
      // Handle marker drag events
      marker.on('dragend', function(e) {
        const marker = e.target;
        const position = marker.getLatLng();
        setPosition([position.lat, position.lng]);
        onLocationSelect(position.lat, position.lng);
      });
      
      // Handle map click events to move marker
      map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        setPosition([e.latlng.lat, e.latlng.lng]);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      });
      
      // Store references
      leafletMapRef.current = map;
      markerRef.current = marker;
      
      // Notify parent of initial position
      onLocationSelect(position[0], position[1]);
      
      // Try to get user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
          marker.setLatLng([latitude, longitude]);
          setPosition([latitude, longitude]);
          onLocationSelect(latitude, longitude);
        },
        () => {
          // Fallback to default position if geolocation fails
          console.log('Unable to retrieve your location');
        }
      );
    }
    
    // Cleanup
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} style={{ height, width: '100%' }} className="rounded-lg overflow-hidden shadow-sm border border-gray-200" />
  );
};

export default MapSelector;
