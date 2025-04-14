self.addEventListener('install', (event) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });
  
  // Handle messages from the main thread
  self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_CALL') {
      const { delay } = event.data;
      
      setTimeout(() => {
        // When the timeout completes, notify all clients (browser windows/tabs)
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'EXECUTE_CALL',
            });
          });
        });
      }, delay);
    }
  });