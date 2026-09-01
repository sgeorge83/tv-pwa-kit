import "./styles.css";

const banner = document.getElementById("offline-banner");
const previewError = document.getElementById("preview-error");
const previewFrame = document.getElementById("launcher-preview");

function syncOffline() {
  const off = navigator.onLine === false;
  banner?.classList.toggle("is-on", off);
}

window.addEventListener("online", syncOffline);
window.addEventListener("offline", syncOffline);
syncOffline();

previewFrame?.addEventListener("error", () => {
  previewError?.classList.add("is-on");
});
