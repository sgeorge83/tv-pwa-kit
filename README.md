# Verse of the Day — WordOnAir Labs

Fullscreen daily Scripture display, USB TV launcher, and Android TV APK steps. **This project is meant to live on GitHub only** (GitHub Pages). You do not need WSL, Origin CLI, or Node to publish it.

**Intended live URL:** https://sgeorge83.github.io/tv-pwa-kit/

Upload instructions (Windows browser, no Git): **[docs/GITHUB-UPLOAD.md](docs/GITHUB-UPLOAD.md)**

## What is in this repo

| Path | Role |
| --- | --- |
| `index.html` | Verse of the Day PWA (landscape / TV) |
| `manifest.json`, `sw.js`, `sw-register.js` | Standalone PWA + app-shell cache |
| `usb/launch.html` | Copy to a USB stick root |
| `docs/ANDROID-TV-APK.md` | PWABuilder / Fire TV sideload |
| `docs/GITHUB-UPLOAD.md` | Create the GitHub repo in a browser |
| `kit.html` | Short TV/USB overview page |

Daily verse text still comes from `https://bible-widget-backend.vercel.app/api/morning`. GitHub Pages hosts the app shell. The service worker caches that shell and fetches a fresh verse over Wi-Fi.

## GitHub (required)

This coding session cannot push to github.com — it has no access to your GitHub account. Create **https://github.com/sgeorge83/tv-pwa-kit** yourself and upload the files as described in [docs/GITHUB-UPLOAD.md](docs/GITHUB-UPLOAD.md). Then:

1. **Settings → Pages → Source → GitHub Actions**
2. Wait for the **Deploy GitHub Pages** workflow
3. Open https://sgeorge83.github.io/tv-pwa-kit/

## USB flash drive

Format **FAT32**. Copy to the stick root:

```text
launch.html          ← from usb/launch.html
README-USB.txt       ← from usb/README-USB.txt
VerseOfTheDay.apk    ← after PWABuilder
```

## Android TV / Fire TV

After Pages is live, follow [docs/ANDROID-TV-APK.md](docs/ANDROID-TV-APK.md). Package `https://sgeorge83.github.io/tv-pwa-kit/` as a fullscreen landscape TWA.

Digital Asset Links (`/.well-known/assetlinks.json`) must be on **https://sgeorge83.github.io/.well-known/assetlinks.json** (the user site), not only under `/tv-pwa-kit/`.

## Preview locally (optional)

```bash
npm install
npm run dev
```

http://127.0.0.1:43123/ is the verse display. Kit page: `/kit.html`. USB splash: `/launch.html?preview=1`.

## Disclaimer

Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © Crossway.

A project of **WordOnAir Labs**.
