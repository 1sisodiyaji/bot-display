// In main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
 
const handleServiceWorkerMessage = (event) => {
  if (event.data.type === 'EXECUTE_CALL') {
    console.log("Received instruction to execute call from service worker");
    if (window.callSubmit) {
      window.callSubmit();
    }
  }
};
 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
        
        // Only add the message listener after successful registration
        navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);