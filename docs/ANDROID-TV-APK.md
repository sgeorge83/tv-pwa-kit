# Package Verse of the Day as an Android TV / Fire TV APK

The live PWA, after you enable GitHub Pages on this repo, is:

**https://sgeorge83.github.io/tv-pwa-kit/**

If you named the GitHub repo something else, use `https://sgeorge83.github.io/<repo>/` everywhere below.

This guide turns that URL into a signed `.apk` you copy onto a USB flash drive and install on an Android TV box or Fire TV stick. The wrapper is a Trusted Web Activity (TWA): no browser chrome, landscape lock, and the same web app GitHub Pages hosts.

Do this **after** Pages is serving `manifest.json` and `sw.js`. PWABuilder reads the published manifest.

## Before you start

- A Windows, macOS, or Linux computer with a browser
- The PWA reachable over HTTPS (GitHub Pages)
- A USB flash drive (3–4 GB is plenty)
- Optional: [Node.js 18+](https://nodejs.org/) if you use Bubblewrap instead of the PWABuilder website
- Optional: Android Studio only if you apply the Leanback (TV launcher) patch below

Sideloading does **not** require a Google Play developer account. Keep the signing keystore PWABuilder generates; you will need it to install updates of the same app.

---

## Path A — PWABuilder (easiest)

1. Open [https://www.pwabuilder.com](https://www.pwabuilder.com).
2. Paste `https://sgeorge83.github.io/tv-pwa-kit/` and start the scan.
3. Choose **Package for stores**, then **Generate Package** under Android.
4. Stay on the **Google Play** tab and set:

   | Option | Value |
   | --- | --- |
   | Package ID | `com.wordonair.verseoftheday` |
   | App name | `Verse of the Day` |
   | Short name | `Verse of the Day` |
   | Host | `sgeorge83.github.io` |
   | Start URL | `/tv-pwa-kit/` |
   | Manifest URL | `https://sgeorge83.github.io/tv-pwa-kit/manifest.json` |
   | Display mode | **Fullscreen** (hides the address bar and system bars) |
   | Theme / background / nav colors | `#060b14` |
   | Icon URL | `https://sgeorge83.github.io/tv-pwa-kit/icon.png` |
   | Include source code | **On** (needed for the TV launcher patch) |
   | Signing key | **New** for a first sideload |
   | Notification / location / Play billing | Off |
   | Fallback behavior | Custom Tabs |

5. Download the zip.

Inside the zip you typically get:

- `app-release-signed.apk` — copy this to the USB drive
- `app-release-bundle.aab` — Play Store only; skip for USB sideload
- `signing.keystore` and `signing-key-info.txt` — **store these privately**
- `assetlinks.json` — needed to hide the Chrome URL bar (see below)
- Android Studio source (if you enabled “Include source code”)

Rename the APK to `VerseOfTheDay.apk` when you copy it to the stick so it is easy to find in the TV file manager.

---

## Path B — Bubblewrap CLI

Same TWA under the hood, useful if you already have a JDK / Android SDK.

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://sgeorge83.github.io/tv-pwa-kit/manifest.json
```

When prompted:

- Package ID: `com.wordonair.verseoftheday`
- Name: `Verse of the Day`
- Display: `fullscreen`
- Orientation: `landscape`
- Host: `sgeorge83.github.io`
- Start URL: `/tv-pwa-kit/`
- Theme color: `#060b14`

Then:

```bash
bubblewrap build
```

The signed APK is `app-release-signed.apk` in the project directory.

---

## Android TV extras (Leanback launcher)

PWABuilder and Bubblewrap build a phone-style TWA. It will **install** on Android TV and Fire TV, but it may not appear on the TV home row until you add a Leanback launcher entry.

With “Include source code” enabled:

1. Open the generated Android project in Android Studio (or edit the files directly).
2. Add a 320×180 PNG banner at `app/src/main/res/drawable/tv_banner.png` (navy background, gold cross, “Verse of the Day”). The wide screenshot in the live repo (`screenshot-wide.png`) can be cropped to 16:9 if you do not have a designer banner yet.
3. In `app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <uses-feature android:name="android.hardware.touchscreen" android:required="false" />
  <uses-feature android:name="android.software.leanback" android:required="false" />

  <application
      android:banner="@drawable/tv_banner"
      ...>

    <activity
        android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
        android:exported="true"
        android:screenOrientation="landscape">

      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
        <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
      </intent-filter>
    </activity>

  </application>
</manifest>
```

Keep `leanback` **required=false** so Fire TV and phones can still install the same APK.

4. Rebuild:

```bash
# from the generated Android project, after bubblewrap init
bubblewrap build
```

Or in Android Studio: **Build → Generate Signed Bundle / APK → APK**.

Remote control: Verse of the Day is a display, not a menu. D-pad focus only needs to reach the WordOnAir mark if someone tabs to it. No extra TV chrome is required.

---

## Hide the Chrome address bar (Digital Asset Links)

If the installed app shows a URL bar, GitHub Pages is missing a valid `assetlinks.json` **on the host origin**.

The TWA host is `sgeorge83.github.io`, so the file must be reachable at:

**https://sgeorge83.github.io/.well-known/assetlinks.json**

That is the **user site** (`sgeorge83.github.io` repository), not `sgeorge83.github.io/bible-daily-pwa/.well-known/…`. GitHub project pages cannot satisfy Digital Asset Links from a subpath.

1. Copy [`pwa/.well-known/assetlinks.json`](../pwa/.well-known/assetlinks.json) from this kit.
2. Replace `REPLACE_WITH_SHA256_FROM_PWA_BUILDER_OR_KEYTOOL` with the SHA-256 fingerprint from PWABuilder’s zip (or `signing-key-info.txt`).
3. You can also print it from the keystore:

```bash
keytool -list -v -keystore signing.keystore
```

4. Commit the file to the `sgeorge83.github.io` repo as `.well-known/assetlinks.json` and wait for Pages to publish.
5. Confirm in a browser that the JSON is public (no login) at the URL above.

Until that file matches the APK’s signing cert, Chrome may show an address bar. Sideload still works.

---

## Copy the APK onto the USB drive

```text
USB:\
  launch.html
  README-USB.txt
  VerseOfTheDay.apk
```

Use FAT32 so Android TV and Fire TV can both read the stick. A 3–4 GB drive formatted FAT32 is enough.

---

## Install on Android TV (Google TV / Chromecast with Google TV / boxes)

1. On the TV: **Settings → Security & restrictions** (or **Apps → Special app access**) and allow **Unknown sources** for your file manager. Some devices prompt per-app the first time you open an APK.
2. Plug in the USB drive.
3. Open **Files**, **File Manager**, or **USB** from the Apps row.
4. Select `VerseOfTheDay.apk` → **Install** → **Open**.
5. Launch **Verse of the Day** from the Apps row. If you applied the Leanback patch, it also appears on the home row.

The stick or box still needs Wi-Fi so the TWA can load GitHub Pages and fetch today’s verse.

---

## Install on Fire TV / Fire TV Stick

1. **Settings → My Fire TV → Developer Options**. If that menu is hidden, go to **My Fire TV → About** and click the name of the device seven times.
2. Turn on **Apps from Unknown Sources** (or enable it for **Files** when prompted).
3. Plug in the USB drive. If the stick has no USB port, use an OTG cable, or copy the APK with **Send files to TV** / **Downloader** from your phone.
4. Open **Files** (or **ES File Explorer** / **X-plore** if you already sideload with those).
5. Find `VerseOfTheDay.apk` → **Install**.
6. Open the app from **Settings → Applications → Manage Installed Applications** if it does not appear on the home row yet. After the Leanback patch, it should show in your apps row.

---

## First launch checklist

- Wi-Fi is connected on the TV.
- The app opens landscape, full screen, with no address bar (after `assetlinks.json` is live).
- Today’s ESV verse appears. If the API is unreachable, the last saved verse from `localStorage` / the service worker should still show after the PWA has loaded once.

The USB `launch.html` file is a separate path for computers and browsers. The APK is the native TV path.
