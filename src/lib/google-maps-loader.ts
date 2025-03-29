
export function loadGoogleMapsScript() {
  return new Promise<void>((resolve, reject) => {
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const API_KEY = 'AIzaSyCDHxUTyoaBJjIpJm9T_hzrIs_zdVOj84s';
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps script failed to load'));
    document.head.appendChild(script);
  });
}
