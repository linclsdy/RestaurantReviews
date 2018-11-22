var staticCacheName = 'restaurant-v1';
var cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('restaurant-v1').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});

/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then(function(reponse) {

      })
    )
  // TODO: respond to requests for the root page with
  // the page skeleton from the cache
  //Respond to requests for the root page with the page skeleton from the cache
  var requestUrl = new URL(event.request.url);
  
  //Only intercept requests from the same origin (i.e. Don't intercept Google Fonts requests, or any third party request like that)
  if (requestUrl.origin === location.origin) {
    //Check if the request is for the root page
    if (requestUrl.pathname === '/') {
      //Respond with the cached skeleton, which will be there as it is now cached as part of the install step
      event.respondWith(caches.match('/skeleton'));
      return;
    }
  }
});
*/