/* Add this file next to index.html, then include before </body>:
 *   <script src="./sw-register.js" defer></script>
 * Service workers require HTTPS (GitHub Pages qualifies). They do not run from file://.
 */
(function registerVerseOfTheDayWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").catch(function (error) {
      console.warn("Verse of the Day service worker was not registered.", error);
    });
  });
})();
