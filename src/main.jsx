import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { registerSW } from 'virtual:pwa-register';
import { Toaster, toast } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="bottom-center" richColors />
    <button id="install-button" className="hidden fixed bottom-4 right-4 p-3 bg-cyan-600 text-white rounded-xl shadow-xl z-50">
      Install App
    </button>
    <App />
  </StrictMode>
);

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('install-button');
  if (installBtn) installBtn.classList.remove('hidden');

  installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log('Install prompt result:', result.outcome);

    installBtn.classList.add('hidden');
    deferredPrompt = null;
  });
});

const updateSW = registerSW({
  onNeedRefresh() {
    toast.info('New update available!', {
      action: {
        label: 'Update',
        onClick: () => updateSW(true), // Force SW update and reload
      },
    });
  },
  onOfflineReady() {
    toast.success('App ready to work offline 🚀');
  },
});