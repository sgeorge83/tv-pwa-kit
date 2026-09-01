import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

function serveKitFiles() {
  const files = {
    "/launch.html": {
      path: resolve("usb/launch.html"),
      type: "text/html; charset=utf-8",
    },
    "/docs/ANDROID-TV-APK.md": {
      path: resolve("docs/ANDROID-TV-APK.md"),
      type: "text/markdown; charset=utf-8",
    },
    "/docs/GITHUB-UPLOAD.md": {
      path: resolve("docs/GITHUB-UPLOAD.md"),
      type: "text/markdown; charset=utf-8",
    },
  };

  const middleware = (req, res, next) => {
    const url = req.url?.split("?")[0];
    const file = files[url];
    if (!file) {
      next();
      return;
    }
    res.setHeader("Content-Type", file.type);
    res.end(readFileSync(file.path));
  };

  return {
    name: "serve-kit-files",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 43123,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 43123,
    strictPort: true,
  },
  plugins: [serveKitFiles()],
});
