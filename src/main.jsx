import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

let serviceWorkerRegistration = null;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        serviceWorkerRegistration = registration;
        console.log('Service Worker registered successfully:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.type === 'EXECUTE_CALL') {
    console.log("Received instruction to execute call from service worker");
    if (window.callSubmit) {
      window.callSubmit();
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);