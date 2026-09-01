# Put this project on GitHub (browser only)

You do not need WSL, Git, Origin CLI, or Node. Use github.com in a normal Windows browser.

This agent cannot push to github.com (no access to your GitHub account). You upload once; after that, GitHub Actions deploys Pages on every push you make from the website.

## 1. Create the repository

1. Sign in at [https://github.com/new](https://github.com/new).
2. Repository name: **`tv-pwa-kit`** (recommended — USB launcher and APK docs already use this name).
3. Set it **Public** if you want GitHub Pages on a free personal account without extra setup. Private Pages need GitHub Pro.
4. Leave **Add a README** unchecked (empty repo is easiest for the first upload).
5. Click **Create repository**.

If you choose a different name, edit the live URL in `usb/launch.html` (search for `sgeorge83.github.io/tv-pwa-kit`) before you upload.

## 2. Upload the project

On the empty repo page:

1. Click **Add file → Upload files**.
2. Drag the project folder contents into the browser (not `node_modules`, not `.git`).

Include at least:

```text
index.html
kit.html
manifest.json
sw.js
sw-register.js
style.css
script.js
favicon.png
icon.png
icon1.png
screenshot-wide.png
screenshot-mobile.png
assets/
usb/
docs/
.github/workflows/pages.yml
.well-known/assetlinks.json
README.md
```

3. Commit message: `Add Verse of the Day TV PWA`.
4. Click **Commit changes**.

Windows File Explorer: open the cloned/copied project folder, select the files listed above, drag them onto the GitHub tab. To upload `.github`, drag the `.github` folder itself.

## 3. Turn on GitHub Pages

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab and wait for **Deploy GitHub Pages** to finish (green check).
4. Live site: **https://sgeorge83.github.io/tv-pwa-kit/**

If the first workflow failed with “Get Pages site failed”, enable Pages (step 2) and re-run the job.

## 4. USB stick

Copy `usb/launch.html` to the root of a FAT32 flash drive. On Wi-Fi it opens the GitHub Pages display.

## 5. Android TV APK

When the Pages URL loads in a browser, follow `docs/ANDROID-TV-APK.md`. Package **https://sgeorge83.github.io/tv-pwa-kit/** with PWABuilder.
