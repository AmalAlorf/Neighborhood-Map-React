//Service worker module

export default function register() {
  if ('serviceWorker' in navigator) {
    // The URL constructor
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
    //  the service worker does not work if PUBLIC_URL is  a different from origin
      console.log('Service worker does not work');
      return;
    }
    window.addEventListener('load', () => {
      const serviceWorkerURL = `${process.env.PUBLIC_URL}/service-worker.js`;
      fetch(serviceWorkerURL)
        .then(response => {
            // Registe
            registerServiceWorker(serviceWorkerURL);
        })
        .catch(() => {
          console.log('No internet connection found'  );

        });
    });
  }
}
//////////////Register a service worker//////
function registerServiceWorker(serviceWorkerURL) {
  if ('serviceWorker' in navigator){
navigator.serviceWorker.register(serviceWorkerURL).then(registration => {
  console.log('Service worker registration succeeded');
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}
}
