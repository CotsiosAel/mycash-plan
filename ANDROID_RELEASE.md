# Android / Google Play beta preparation

This project is a simple static HTML/CSS/JavaScript PWA. The safest Android packaging path is Capacitor, keeping the existing web app unchanged and copying only the current web files into a native Android shell.

## Current setup

- App name: `MyCash Plan`
- Package ID: `com.mycashplan.app`
- Capacitor web directory: `dist/android-web`
- Source web app remains at the repository root: `index.html`, `styles.css`, `app.js`, `manifest.json`, `service-worker.js`
- No cloud sync, ads, premium flow, or UI changes are added.
- GitHub Pages / web deployment remains unchanged because the root web files are still the canonical web app.

## One-time dependency install

Install Node dependencies from the repository root:

```bash
npm install
```

If the npm registry is blocked by your environment, run the same command on a machine/network that can access npm.

## Prepare the web assets for Android

There is no web build step for the current vanilla app. Instead, copy the existing static web files into Capacitor's Android web directory:

```bash
npm run android:prepare
```

This creates `dist/android-web/index.html`, so Capacitor opens the same app entry point that the web/PWA version uses.

## Create or sync the Android project

For the first Android setup, add the native Android project after dependencies are installed:

```bash
npm run android:add
```

For later updates, sync the prepared web assets into Android:

```bash
npm run android:sync
```

## Open Android Studio

Open the Android project with:

```bash
npm run android:open
```

In Android Studio, let Gradle finish syncing before building.

## Generate a signed Android App Bundle (AAB)

In Android Studio:

1. Select **Build** → **Generate Signed Bundle / APK**.
2. Choose **Android App Bundle**.
3. Create or select a release keystore.
4. Choose the `release` build variant.
5. Generate the `.aab` file.

Keep the keystore and passwords safe. Losing the release key can block future updates unless Play App Signing recovery is configured.

## Upload to Google Play Console beta

1. Open Google Play Console.
2. Create the app using the package ID `com.mycashplan.app`.
3. Complete app content, privacy, data safety, and store listing requirements.
4. Upload the signed `.aab` to an internal, closed, or open testing track.
5. Add testers and submit the beta release for review.

## Recommended safety checklist before upload

- Confirm the web/PWA version still works from `index.html`.
- Run `npm run android:prepare` and verify `dist/android-web/index.html` exists.
- Run `npm run android:sync` after every web change intended for Android.
- Test the app on at least one Android emulator and one physical Android device.
- Do not add native permissions unless a future feature truly requires them.
