let cacheVersion = 'v2';
let cacheFiles = [
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './data/restaurants.json',
  './css/responsive.css',
  './css/styles.css'
];

self.addEventListener('install', function(event) {
  console.log("Installed")
  event.waitUntil(
    caches.open(cacheVersion).then(function(cache){
      console.log("Caching all cacheFiles");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log("Activated")

  event.waitUntil(
    caches.keys().then(function(keyNames){
      return Promise.all(keyNames.map(function(thisKey){
        if (thisKey !== cacheVersion) {
          console.log("Removing files from the cache ", thisKey);
          return caches.delete(thisKey);
        }
      }))
    })
  )
})

self.addEventListener('fetch', function(event) {
  console.log('Fetching', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('This was found in the cache:', response);
        return response;
      }
      console.log('Not found in cache. Fetching from network');
      return fetch(event.request).then(function(response) {
        console.log('Network responded with:', response);
        return response;
      }).catch(function(error) {
        console.error('Fetching failed:', error);
      });
    })
  );
});
