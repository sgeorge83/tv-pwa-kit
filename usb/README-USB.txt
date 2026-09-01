Verse of the Day · WordOnAir Labs — USB stick
=============================================

Copy these files to the ROOT of a 3–4 GB (or larger) USB flash drive:

  launch.html
  README-USB.txt
  VerseOfTheDay.apk          (optional — after you generate it)

Live app:
  https://sgeorge83.github.io/bible-daily-pwa/

How to use launch.html
----------------------
1. Plug the USB drive into a computer connected to the TV (HDMI), or into a
   device whose browser can open HTML files from USB.
2. Open launch.html. If the device is on Wi-Fi, it sends you to the live
   GitHub Pages display (borderless / full window).
3. If the device is offline, stay on this file until Wi-Fi is connected,
   then press Try again (or wait — it retries when the network returns).

Android TV / Fire TV
--------------------
Most TV file managers will NOT run HTML. For a native TV app, copy
VerseOfTheDay.apk onto this drive, enable Unknown Sources, and install
from the TV’s File Manager. See docs/ANDROID-TV-APK.md in the kit repo.

The USB file cannot cache the PWA by itself (browsers block service
workers on file://). Open the live HTTPS URL once so the app shell
can be stored for later.
