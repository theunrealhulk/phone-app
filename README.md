# Quran Typing Practice App

A mobile application for practicing Arabic Quranic words typing with real-time feedback on letter and diacritic (tashkeel) accuracy.

## Purpose

This app helps users learn to type Arabic Quranic words correctly, including proper diacritics (tashkeel). It provides visual feedback:

- **Green** - Correct letter and diacritics
- **Orange** - Correct letters but missing or incorrect diacritics
- **Red** - Wrong letter typed

## Features

- Quranic Arabic word practice
- Real-time typing feedback
- Animated key press effects
- Typing restrictions:
  - When text is red (wrong letter) - cannot type more until cleared
  - When text is orange (missing diacritics) - can only type tashkeel until correct

## Prerequisites

- Node.js 18+
- Android SDK (for Android builds)
- Expo CLI (`npm install -g expo-cli`)

## Installation

```bash
npm install
```

## Running the App

### Development with Expo Go

```bash
npx expo start
```

Then scan the QR code with Expo Go on your phone.

### Development Build

```bash
npx expo run:android
```

### Native Build (Debug)

```bash
cd android && ./gradlew assembleDebug
```

The APK will be at `android/app/build/outputs/apk/debug/app-debug.apk`

### Native Build (Release)

```bash
cd android && ./gradlew assembleRelease
```

The APK will be at `android/app/build/outputs/apk/release/app-release.apk`

## Setting ANDROID_HOME

If the Android SDK is not in the default location, set the environment variable:

```bash
export ANDROID_HOME=~/Android
```

Then run the build commands.

## Project Structure

```
.
├── app/                    # Expo Router screens
│   └── write.tsx           # Main typing practice screen
├── android/                # Android native project
├── assets/                 # Images and fonts
└── package.json           # Dependencies
```

## Dependencies

- Expo SDK 54
- React Native 0.81
- expo-router
- react-native-reanimated

## License

Private - For personal use only