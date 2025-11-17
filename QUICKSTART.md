# 🚀 Quick Start Guide

Get Metronome Pro running in 3 simple steps!

## Step 1: Install Dependencies

```bash
# Clone the repository (if not already done)
git clone https://github.com/MaximeMettey/Metronome.git
cd Metronome

# Install all dependencies
npm install
```

If you encounter any peer dependency issues:
```bash
npm install --legacy-peer-deps
```

## Step 2: Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

## Step 3: Choose Your Platform

### Option A: Mobile (Easiest) 📱

1. Install **Expo Go** on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code:
   - **iOS**: Use your Camera app
   - **Android**: Use the Expo Go app

### Option B: Web Browser 🌐

Press `w` in the terminal or visit `http://localhost:19006`

### Option C: iOS Simulator (macOS only) 📱

```bash
npm run ios
```

### Option D: Android Emulator 🤖

1. Make sure Android Studio and an emulator are running
2. Run:
```bash
npm run android
```

## 🎵 Using the Metronome

1. **Set Tempo**: Use +/- buttons or tap the BPM number to type
2. **Tap Tempo**: Tap the "Tap Tempo" button to set tempo by tapping
3. **Change Time Signature**: Tap the time signature (e.g., "4/4")
4. **Play**: Press the play button ▶️
5. **Adjust Settings**: Toggle sound 🔊, visual 👁️, or vibration 📳

## ⚠️ Troubleshooting

### "Cannot find module 'babel-plugin-module-resolver'"

```bash
npm install --save-dev babel-plugin-module-resolver
npm start
```

### Metro bundler not starting

```bash
# Clear cache and restart
expo start -c
```

### App won't load in Expo Go

1. Make sure your phone and computer are on the same WiFi network
2. Try scanning the QR code again
3. Manually enter the URL shown in the terminal

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Explore the codebase in the `src/` directory

## 🎉 That's it!

You now have a fully functional metronome app running on your device!

For more advanced features and configuration options, see the main README.
