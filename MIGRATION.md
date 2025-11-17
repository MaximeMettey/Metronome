# Migration Guide: SDK 51 → SDK 54

This guide helps you migrate from Expo SDK 51 to SDK 54.

## What Changed

### Major Version Updates

| Package | SDK 51 | SDK 54 |
|---------|--------|--------|
| expo | ~51.0.0 | ~54.0.0 |
| react | 18.2.0 | 18.3.1 |
| react-native | 0.74.0 | 0.76.5 |
| expo-av | ~14.0.0 | ~15.0.0 |
| expo-haptics | ~13.0.0 | ~14.0.0 |
| expo-localization | ~15.0.0 | ~16.0.0 |
| expo-status-bar | ~1.12.0 | ~2.0.0 |
| expo-linear-gradient | ~13.0.0 | ~14.0.0 |
| react-native-reanimated | ~3.10.0 | ~3.16.0 |
| @react-native-async-storage/async-storage | 1.23.0 | ~2.0.0 |

## Migration Steps

### For Existing Installations

1. **Pull the latest changes**
   ```bash
   git pull origin claude/cross-platform-metronome-app-01UGDLx8PK7AVH6WUdUo961d
   ```

2. **Remove old dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. **Install new dependencies**
   ```bash
   npm install
   ```

   If you encounter peer dependency issues:
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Clear Metro bundler cache**
   ```bash
   npm start -- --clear
   # or
   expo start -c
   ```

### Breaking Changes

#### 1. Web Build Command
**Old:**
```bash
expo build:web
```

**New:**
```bash
expo export:web
```

Output directory also changed from `web-build/` to `dist/`.

#### 2. Main Entry Point
The `main` field in `package.json` changed from `expo/AppEntry.js` to `index.js`.

#### 3. AsyncStorage Breaking Changes
AsyncStorage v2.0 has some API changes. Our current usage is compatible, but if you extend the storage functionality, be aware of:
- Improved TypeScript types
- Better error handling
- New hooks available

### New Features in SDK 54

- **Improved Performance**: React Native 0.76 brings significant performance improvements
- **Better TypeScript Support**: Enhanced type definitions across all Expo packages
- **New React Features**: React 18.3.1 includes latest bug fixes and improvements
- **Reanimated 3.16**: Better animations performance and new features

## Testing After Migration

1. **Test on Expo Go**
   - Make sure you have the latest Expo Go app (SDK 54 compatible)
   - Scan the QR code and verify the app loads

2. **Test Core Features**
   - ✅ Tempo control (±1, ±10, tap tempo)
   - ✅ Time signature selection
   - ✅ Audio playback
   - ✅ Visual feedback (beat indicators)
   - ✅ Haptic feedback (vibration)
   - ✅ Preset save/load
   - ✅ Language switching

3. **Test on All Platforms**
   - iOS (physical device or simulator)
   - Android (physical device or emulator)
   - Web browser

## Troubleshooting

### "This app is incompatible with Expo Go"
Update Expo Go to the latest version that supports SDK 54.

### "Cannot find module"
Clear cache and reinstall:
```bash
rm -rf node_modules
npm install
expo start -c
```

### TypeScript errors
Update your IDE's TypeScript version to match package.json (^5.3.0).

### Metro bundler issues
```bash
# Kill all Metro processes
pkill -f metro

# Clear watchman (macOS/Linux)
watchman watch-del-all

# Restart
npm start -- --clear
```

## Rollback (If Needed)

If you need to rollback to SDK 51:

1. **Checkout previous commit**
   ```bash
   git checkout 36ffa8b
   ```

2. **Reinstall dependencies**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Note**: SDK 51 may not work with the latest Expo Go app. You might need to use an older version of Expo Go or create a development build.

## Support

If you encounter any issues:
- Check the [Expo SDK 54 changelog](https://expo.dev/changelog/2024/11-12-sdk-54)
- Open an issue on GitHub
- Check existing issues for solutions

## Benefits of SDK 54

- ✅ Compatible with latest Expo Go
- ✅ Better performance
- ✅ Latest React Native features
- ✅ Improved developer experience
- ✅ Bug fixes and security updates
- ✅ Future-proof for upcoming features
