
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { loadGoogleMapsScript } from './lib/google-maps-loader';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Load Google Maps script before rendering
loadGoogleMapsScript().then(() => {
  // Initialize the app with auto-redirect to auth
  const savedAuth = localStorage.getItem('user_profile') || localStorage.getItem('hamro_gahana_guest_id');
  const initialRoute = savedAuth ? '/' : '/auth';

  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
        {/* Redirect to auth if no session is found */}
        {!savedAuth && <Navigate to="/auth" replace />}
      </BrowserRouter>
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Failed to load Google Maps script:', error);
});
