if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./js/service-worker.js')
    .then(function(registration){
      console.log("Service worker registered", registration);
    })
    .catch(function(err){
      console.log("Service worker failed to register", err);
    })
}
