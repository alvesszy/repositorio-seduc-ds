const CACHE_NAME = 'monitoramento-v1';
const ARQUIVOS_INICIAIS = ['/', '/index.html', '/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ARQUIVOS_INICIAIS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((armazenado) => {
      if (armazenado) return armazenado;
      return fetch(event.request).then((resposta) => {
        const copia = resposta.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, copia));
        return resposta;
      });
    })
  );
});