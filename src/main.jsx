import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './custom.css';
import './script/cssScript.js'
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
