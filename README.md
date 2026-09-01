# Verse of the Day — TV & USB kit

Deployment kit for the live WordOnAir Labs PWA:

**https://sgeorge83.github.io/bible-daily-pwa/**

This repository does not replace [sgeorge83/bible-daily-pwa](https://github.com/sgeorge83/bible-daily-pwa). It adds TV-ready PWA files, a USB launcher, and APK packaging steps so you can put the display on a 16:9 screen from a 3–4 GB flash drive.

## Two ways onto a TV

| Path | What you copy to USB | What it is for |
| --- | --- | --- |
| **USB launcher** | `launch.html` | A computer on HDMI, or any browser that can open HTML from the stick. Needs Wi-Fi. |
| **Android TV APK** | `VerseOfTheDay.apk` | Android TV boxes and Fire TV sticks. Sideload from the TV file manager, then launch as an app. |

Most Android TV / Fire TV file managers **will not run HTML**. Use the APK for a native TV app. `launch.html` is the zero-install path for a PC attached to the TV.

Daily verse text is still fetched from the existing API (`bible-widget-backend.vercel.app`), not from GitHub. GitHub Pages hosts the app shell. The service worker caches that shell and keeps the verse request network-first so a new day loads when the TV is on Wi-Fi.

## Preview this kit

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123/](http://127.0.0.1:43123/). The USB splash is at `/launch.html?preview=1`. `/launch.html` (no query) redirects to the live PWA when online.

## 1. Drop-in PWA files

Copy these into the **root** of `bible-daily-pwa` (overwrite `manifest.json`):

| This kit | GitHub Pages repo |
| --- | --- |
| `pwa/manifest.json` | `manifest.json` |
| `pwa/sw.js` | `sw.js` |
| `pwa/sw-register.js` | `sw-register.js` |

In `index.html`, add before `</body>`:

```html
<script src="./sw-register.js" defer></script>
```

Then push to `main` and wait for GitHub Pages.

`manifest.json` is set for TV landscape:

- `"display": "standalone"` with `"display_override": ["fullscreen", "standalone"]`
- `"orientation": "landscape"`
- existing 192 / 512 icons, including a maskable 512 entry

`sw.js` precaches the UI (`index.html`, CSS, JS, icons) and always tries the network for the verse API, falling back to the last cached API response. Service workers only run on HTTPS after someone has opened the live site; they do not run from `file://` on the USB stick.

`pwa/.well-known/assetlinks.json` is a **template** for the Android TWA. It must be published at `https://sgeorge83.github.io/.well-known/assetlinks.json` (the user site origin), not under `/bible-daily-pwa/`. See [docs/ANDROID-TV-APK.md](docs/ANDROID-TV-APK.md).

## 2. USB flash drive

Format the stick **FAT32**. Copy to the root:

```text
USB:\
  launch.html          ← from usb/launch.html
  README-USB.txt       ← from usb/README-USB.txt
  VerseOfTheDay.apk    ← after you generate it
```

Open `launch.html` on a Wi-Fi-connected computer. It full-screen redirects to GitHub Pages (iframe plus `location.replace`, with a `<noscript>` meta-refresh). If the device is offline, it shows a retry screen and launches automatically when the network returns.

## 3. Android TV / Fire TV APK

Follow **[docs/ANDROID-TV-APK.md](docs/ANDROID-TV-APK.md)** for PWABuilder and Bubblewrap settings (package ID `com.wordonair.verseoftheday`, fullscreen, landscape), the Leanback launcher patch, Digital Asset Links, and sideload steps for Google TV and Fire TV.

Short version:

1. Publish the PWA files above.
2. Package https://sgeorge83.github.io/bible-daily-pwa/ at [pwabuilder.com](https://www.pwabuilder.com).
3. Copy `app-release-signed.apk` to the USB root as `VerseOfTheDay.apk`.
4. On the TV, allow Unknown Sources, install from the file manager, launch the app.

## Disclaimer

Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © Crossway.

A project of **WordOnAir Labs**.
