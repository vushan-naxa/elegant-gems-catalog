
/// <reference types="vite/client" />

// Add Google Maps types to window object
interface Window {
  google: {
    maps: {
      places: {
        Autocomplete: new (
          input: HTMLInputElement,
          options?: {
            types?: string[];
            componentRestrictions?: { country: string };
          }
        ) => {
          addListener: (event: string, callback: () => void) => void;
          getPlace: () => {
            formatted_address?: string;
            geometry?: {
              location: {
                lat: () => number;
                lng: () => number;
              };
            };
          };
        };
      };
      Map: any;
      Marker: any;
    };
  };
}
