# React Native Performance Benchmark

A cross-platform performance benchmarking tool for React Native applications. Measures app startup time and UI stability using platform-native SDKs.

## 🎯 Purpose

This project benchmarks React Native app performance by measuring:

- **UI stability time** (when animations become stable)
- **App launch to scene stability duration**

Results are provided by platform-specific SDKs:

- **iOS**: Uses PixelSamplerSDK
- **Android**: Uses PixelSamplerSDK

## ⚠️ Disclaimer

This SDK has been tested on the following devices only:

| Platform | Device/OS |
|----------|-----------|
| **Android** | Redmi Note 8 Pro (Android 10/Q) |
| **iOS** | iPhone 15 (iOS 26+) |

**Important Notes:**

- Results may vary across different devices, Android/iOS versions, and system configurations
- The benchmark numbers provided are for reference only and not guaranteed to be reproducible on all devices
- Build and test scripts assume a Unix-like environment (macOS/Linux)

## 🚀 Quick Start

### Prerequisites

#### For iOS Development

- macOS with Xcode 14.0+
- iOS 16.0+ device or simulator
- CocoaPods (installed via Ruby bundler)

#### For Android Development

- macOS / Linux / Windows
- Android Studio or command line tools
- Android SDK (API 29+)
- Java 17

### Clone the Repository

```bash
git clone https://github.com/timionius/RNBenchmark.git
cd RNBenchmark
```


## 📱 Android Benchmarking

### Build and Run

```bash
# Install JavaScript dependencies
npm install

# Bundle the JavaScript
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# Navigate to Android project
cd android

# Build release APK
./gradlew assembleRelease

# Install with permissions (automatically grants screen capture permission)
adb install -r -g ./app/build/outputs/apk/release/app-release.apk

# Grant MediaProjection permission (bypasses dialog)
adb shell cmd appops set com.rnbenchmark PROJECT_MEDIA allow

# Launch the app
adb shell am start -n com.rnbenchmark/.MainActivity
```


### View Results

Monitor Logcat for benchmark output:

```bash
adb logcat | grep -E "BENCHMARK"
```


Monitor Logcat for PixelSamplerSDK pipeline output:

```bash
adb logcat -s "PixelSampler:*"
```


Expected output:

```text
05-09 12:51:58.588 18309 18309 I PixelSampler: ✅ [BENCHMARK] APP_START: 0,076ms
05-09 12:51:58.689 18309 18309 I PixelSampler: ✅ [BENCHMARK] FRAMEWORK_ENTRY: 101,811ms
05-09 12:52:00.019 18309 18309 I PixelSampler: ✅ [BENCHMARK] Total time: 1381,080ms
```


## 📱 iOS Benchmarking

### Run in Xcode

First, install CocoaPods dependencies (only needed once per clone or after native updates):

```bash
# Install bundler and CocoaPods if not already done
bundle install

# Install pod dependencies
bundle exec pod install

# Bundle the JavaScript
npx react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
```


Then open the Xcode workspace:

```bash
open ios/RNBenchmark.xcworkspace
```


In Xcode:

1. Select your target device or simulator
2. Press `Cmd + R` to run
3. View benchmark results in the Xcode console

### View Results

iOS benchmark results appear in Xcode console:

```text
🚀 [BENCHMARK] APP_START: 0.000ms
✅ [BENCHMARK] Total time: 1219.8ms
```


## 📊 Understanding Results

| Metric | Description | Target |
|--------|-------------|--------|
| **APP_START** | Time from app launch to SDK initialization (base) | 0ms |
| **FRAMEWORK_ENTRY** (Android only) | Time when framework entrypoint is accessible | <200ms |
| **Total time** | Complete benchmark duration | Varies by device |

## 🏗️ Native Integration Notes

This project uses the **PixelSamplerSDK** natively on each platform:

### Android (Kotlin)
- SDK integrated into Android via importing from jitpack
- Permission handling: `PROJECT_MEDIA` granted via adb command
- Results logged to Logcat with `PixelSampler` tag

### iOS (Swift)
- SDK integrated into iOS using SPM package
- Results appear in Xcode console

## 📄 License

```text
MIT License

Copyright (c) 2026 Dmitrii Nikishov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
