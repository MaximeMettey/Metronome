# 📦 Installation Complete Guide

## Quick Install (Latest Version 1.1.2)

```bash
# 1. Navigate to your project
cd ~/Documents/dev/Metronome

# 2. Pull latest changes
git pull origin claude/cross-platform-metronome-app-01UGDLx8PK7AVH6WUdUo961d

# 3. Clean install
rm -rf node_modules package-lock.json

# 4. Install dependencies
npm install

# 5. Start the app
npm start
```

## What Was Fixed (Version History)

### v1.1.2 (Current) ✅
- ✅ Added `babel-preset-expo` (~12.0.0)
- ✅ Fixed "Cannot find module 'babel-preset-expo'" error

### v1.1.1
- ✅ Fixed `@types/react-native` to ~0.73.0
- ✅ Fixed "No matching version found for @types/react-native@^0.76.0"

### v1.1.0
- ✅ Updated to Expo SDK 54
- ✅ All packages compatible with latest Expo Go

## Complete Dependencies List

### Runtime Dependencies
```json
{
  "expo": "~54.0.0",
  "expo-av": "~15.0.0",
  "expo-haptics": "~14.0.0",
  "expo-localization": "~16.0.0",
  "expo-status-bar": "~2.0.0",
  "i18next": "^23.15.0",
  "react": "18.3.1",
  "react-native": "0.76.5",
  "react-native-reanimated": "~3.16.0",
  "react-i18next": "^15.0.0",
  "@react-native-async-storage/async-storage": "~2.0.0",
  "expo-linear-gradient": "~14.0.0"
}
```

### Development Dependencies
```json
{
  "@babel/core": "^7.25.0",
  "@types/react": "~18.3.0",
  "@types/react-native": "~0.73.0",
  "typescript": "^5.3.0",
  "jest": "^29.7.0",
  "eslint": "^8.57.0",
  "prettier": "^3.3.0",
  "babel-plugin-module-resolver": "^5.0.0",
  "babel-preset-expo": "~12.0.0"
}
```

## Troubleshooting

### Error: "Cannot find module 'babel-preset-expo'"
**Solution**: This is fixed in v1.1.2. Run:
```bash
git pull
rm -rf node_modules
npm install
```

### Error: "No matching version found for @types/react-native@^0.76.0"
**Solution**: This is fixed in v1.1.1. The package.json now uses ~0.73.0 which is compatible.

### Peer Dependency Warnings
If you see peer dependency warnings (not errors), you can:
```bash
npm install --legacy-peer-deps
```

### Metro Bundler Cache Issues
```bash
# Clear cache and restart
expo start -c

# Or more aggressive:
rm -rf node_modules .expo .expo-shared
npm install
expo start -c
```

### Network Issues
If installation is slow or times out:
```bash
# Use a different registry
npm install --registry=https://registry.npmjs.org/

# Or configure npm
npm config set registry https://registry.npmjs.org/
npm install
```

## Verification Steps

After successful installation, verify:

### 1. Check Package Versions
```bash
npm list expo
# Should show: expo@54.x.x

npm list react-native
# Should show: react-native@0.76.5

npm list babel-preset-expo
# Should show: babel-preset-expo@12.x.x
```

### 2. Start Development Server
```bash
npm start
```

You should see:
- Metro bundler starting
- QR code displayed
- No errors about missing modules

### 3. Test on Device
- Open Expo Go (latest version)
- Scan QR code
- App should load successfully

## Platform-Specific Setup

### iOS (requires macOS)
```bash
# Install CocoaPods
sudo gem install cocoapods

# Run iOS simulator
npm run ios
```

### Android
```bash
# Make sure Android Studio is installed
# Start Android emulator

# Run on Android
npm run android
```

### Web
```bash
npm run web
# Opens at http://localhost:19006
```

## Common Installation Patterns

### Fresh Install
```bash
git clone https://github.com/MaximeMettey/Metronome.git
cd Metronome
npm install
npm start
```

### Update Existing Installation
```bash
cd Metronome
git pull
rm -rf node_modules package-lock.json
npm install
npm start
```

### Reset Everything
```bash
cd Metronome
git pull
rm -rf node_modules package-lock.json .expo .expo-shared
npm cache clean --force
npm install
expo start -c
```

## Expected Installation Time

- **npm install**: 2-5 minutes (depending on internet speed)
- **First start**: 30-60 seconds (Metro bundler)
- **Subsequent starts**: 10-20 seconds

## System Requirements

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Expo Go**: Latest version (SDK 54 compatible)
- **Disk Space**: ~500MB for node_modules
- **Memory**: 4GB RAM minimum, 8GB recommended

## Success Indicators

You'll know installation was successful when:

1. ✅ `npm install` completes without errors
2. ✅ `npm start` launches Metro bundler
3. ✅ QR code appears in terminal
4. ✅ No "Cannot find module" errors
5. ✅ App loads in Expo Go without crashes

## Next Steps After Installation

1. **Test Basic Features**:
   - Play/pause metronome
   - Change tempo
   - Switch time signatures

2. **Explore Settings**:
   - Toggle sound/visual/vibration
   - Try tap tempo
   - Change language

3. **Read Documentation**:
   - [README.md](README.md) - Full documentation
   - [QUICKSTART.md](QUICKSTART.md) - Quick start guide
   - [MIGRATION.md](MIGRATION.md) - SDK 54 migration notes

## Getting Help

If you encounter issues not covered here:

1. Check [README.md](README.md) troubleshooting section
2. Review [FIX-TYPES.md](FIX-TYPES.md) for type-related issues
3. See [CHANGELOG.md](CHANGELOG.md) for version history
4. Open an issue on GitHub

## Current Status: READY TO USE ✅

Version 1.1.2 has all dependencies correctly configured and should install without errors!

```bash
cd ~/Documents/dev/Metronome
git pull
npm install
npm start
```

Enjoy your Metronome Pro! 🎵
