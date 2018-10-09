let cacheVersion = 'v1';
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
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }

      var requestClone = event.request.clone();

      return fetch(requestClone)
      .then(function(response) {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        var responseClone = response.clone();

        caches.open(cacheVersion).then(function(cache){
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
