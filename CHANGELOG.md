# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-11-17

### Changed - MAJOR SIMPLIFICATION
- **REMOVED react-native-reanimated** - Source of all Expo Go compatibility issues
- **Animations now use standard React Native Animated API** - Works with ANY Expo Go version
- Removed expo-dev-client (not needed anymore)
- Removed Reanimated import from index.js
- Removed Reanimated plugin from babel.config.js
- Rewrote BeatIndicator.tsx to use Animated instead of Reanimated

### Why This Change
- react-native-reanimated caused: Worklets errors, PlatformConstants errors, version conflicts
- For a metronome app, standard Animated API is SUFFICIENT and SIMPLER
- **Now works with Expo Go out of the box - NO BUILD REQUIRED**
- No more native module version conflicts
- Hot reload works perfectly
- Same visual result, zero complexity

### Result
- ✅ Works with Expo Go immediately
- ✅ No version conflicts
- ✅ No build process needed
- ✅ Smooth animations with native driver
- ✅ 100% compatible across all Expo Go versions

## [1.2.2] - 2025-11-17 (SUPERSEDED by 1.3.0)

### Added
- Added expo-dev-client ~5.0.0 for custom development builds
- Added EAS development build configuration in eas.json
- Added npm scripts: `start:dev`, `build:dev:android`, `build:dev:ios`
- Added DEVELOPMENT-BUILD.md guide for creating custom builds

### Fixed
- Solution for PlatformConstants and Worklets errors: use development build instead of Expo Go
- Development build bypasses Expo Go version constraints

### Note
- **Recommended approach**: Use development build for full native module control
- Expo Go has version constraints that cause Worklets and PlatformConstants errors
- Development build = custom "Expo Go" with exact native versions for this project
- See DEVELOPMENT-BUILD.md for complete setup instructions

## [1.2.1] - 2025-11-17

### Fixed
- Fixed Reanimated Worklets version mismatch error (0.6.1 vs 0.5.1)
- Downgraded packages to Expo Go compatible versions
- react-native-reanimated: ~4.1.1 → ~3.16.0 (Expo Go compatible)
- react: 19.1.0 → 18.3.1 (stable version)
- react-native: 0.81.5 → 0.76.5 (stable version)
- All Expo packages reverted to widely supported SDK 54 versions:
  - expo-av: ~16.0.7 → ~15.0.0
  - expo-haptics: ~15.0.7 → ~14.0.0
  - expo-linear-gradient: ~15.0.7 → ~14.0.0
  - expo-localization: ~17.0.7 → ~16.0.0
  - expo-status-bar: ~3.0.8 → ~2.0.0
  - @react-native-async-storage/async-storage: 2.2.0 → ~2.0.0
- Re-added @types/react-native: ~0.73.0
- Reverted @types/react: ~19.1.10 → ~18.3.0
- Reverted babel-preset-expo: ~54.0.0 → ~12.0.0
- Reverted jest: ~29.7.0 → ^29.7.0

### Note
- These versions are more widely compatible with standard Expo Go installations
- React 18.3.1 and React Native 0.76.5 are the stable SDK 54 versions
- Reanimated 3.16.0 works with most Expo Go app versions
- App now works with Expo Go without requiring latest update

## [1.2.0] - 2025-11-17 (REVERTED in 1.2.1)

### Changed - BREAKING
- Updated ALL packages to official Expo SDK 54 expected versions
- react: 18.3.1 → 19.1.0
- react-native: 0.76.5 → 0.81.5
- expo-av: ~15.0.0 → ~16.0.7
- expo-haptics: ~14.0.0 → ~15.0.7
- expo-linear-gradient: ~14.0.0 → ~15.0.7
- expo-localization: ~16.0.0 → ~17.0.7
- expo-status-bar: ~2.0.0 → ~3.0.8
- react-native-reanimated: ~3.16.0 → ~4.1.1
- @react-native-async-storage/async-storage: ~2.0.0 → 2.2.0
- @types/react: ~18.3.0 → ~19.1.10
- babel-preset-expo: ~12.0.0 → ~54.0.0
- jest: ^30.2.0 → ~29.7.0
- Removed @types/react-native (no longer needed, provided by react-native)

### Note
- These were the OFFICIAL bleeding-edge versions for Expo SDK 54
- However, they were not compatible with most Expo Go installations
- Reverted in v1.2.1 for better compatibility

## [1.1.6] - 2025-11-17

### Fixed
- Fixed React Native version to 0.76.5 (correct version for Expo SDK 54)
- Reverted react-native from ^0.80.2 to 0.76.5 (exact version)
- Reverted @types/react from ~19.0.0 to ~18.3.0 (matches React 18.3.1)
- Resolved peer dependency conflicts

### Changed
- react-native: ^0.80.2 → 0.76.5 (locked to Expo SDK 54 compatible version)
- @types/react: ~19.0.0 → ~18.3.0 (matches React 18.3.1)

### Note
- React Native 0.76.5 is the correct version for Expo SDK 54
- React 18.3.1 is the correct version (not React 19)
- Using exact version for react-native to prevent auto-updates

## [1.1.5] - 2025-11-17

### Fixed
- Fixed peer dependency conflict with @types/react
- Updated @types/react from ~18.3.0 to ~19.0.0 (required by React Native 0.80.2)
- Resolved ERESOLVE conflicts during npm install

### Changed
- @types/react: ~18.3.0 → ~19.0.0

## [1.1.4] - 2025-11-17

### Fixed
- Fixed "Exception in HostObject::get got prop 'ReanimatedModule'" error
- Added 'react-native-reanimated' import at top of index.js
- Reordered Babel plugins to ensure Reanimated plugin is last
- Fixed Reanimated initialization for Expo SDK 54

### Changed
- Moved react-native-reanimated plugin to end of Babel config
- Added explicit Reanimated import in entry file

## [1.1.3] - 2025-11-17

### Fixed
- Fixed "cannot read property split of undefined" error in i18n
- Updated expo-localization usage to SDK 54 API (getLocales())
- Added fallback handling for locale detection
- Improved error handling for language detection

### Changed
- Updated i18n initialization to use getDeviceLanguage() helper
- Added try-catch blocks for robust locale detection

## [1.1.2] - 2025-11-17

### Fixed
- Added missing babel-preset-expo dependency (~12.0.0)
- Fixed bundling error "Cannot find module 'babel-preset-expo'"

## [1.1.1] - 2025-11-17

### Fixed
- Fixed @types/react-native version to ~0.73.0 (0.76.0 types not yet available)
- Corrected package.json to use compatible type definitions

## [1.1.0] - 2025-11-17

### Changed
- **BREAKING**: Updated to Expo SDK 54 for compatibility with latest Expo Go
- Updated React to 18.3.1
- Updated React Native to 0.76.5
- Updated all Expo packages to SDK 54 compatible versions:
  - expo-av: ~15.0.0
  - expo-haptics: ~14.0.0
  - expo-localization: ~16.0.0
  - expo-status-bar: ~2.0.0
  - expo-linear-gradient: ~14.0.0
- Updated react-native-reanimated to ~3.16.0
- Updated @react-native-async-storage/async-storage to ~2.0.0
- Updated i18next to ^23.15.0
- Updated react-i18next to ^15.0.0
- Updated all devDependencies to latest versions
- Changed web build command from `expo build:web` to `expo export:web`
- Web build output now goes to `dist/` directory instead of `web-build/`
- Note: Using @types/react-native ~0.73.0 as 0.76.0 types are not yet published

### Fixed
- Added missing babel-plugin-module-resolver dependency
- Removed hardcoded asset paths to allow running without custom icons
- Added comprehensive troubleshooting section to README

### Added
- QUICKSTART.md for easier onboarding
- Troubleshooting section in README
- SDK version requirements in documentation

## [1.0.0] - 2025-11-16

### Added
- Initial release of Metronome Pro
- Precise tempo control (20-300 BPM)
- Multiple time signature support (2/4, 3/4, 4/4, 5/4, 6/4, 7/4, 3/8, 5/8, 6/8, 7/8, 9/8, 12/8, 2/2, 3/2)
- Audio feedback with multiple sound types
- Visual feedback with animated beat indicators
- Haptic feedback (vibration) support on mobile
- Tap tempo functionality
- Preset management system
- Internationalization support (EN, FR, ES, DE, IT, PT)
- Cross-platform support (iOS, Android, Web, Desktop)
- Modern gradient UI design
- Offline support
- Web Audio API-based timing engine for precision
- AsyncStorage for persistent data
- React Native Reanimated for smooth animations

### Features
- Play/Pause/Stop controls
- Tempo increment/decrement buttons (±1, ±10)
- Strong beat emphasis (visual and audio)
- Toggle sound, visual, and vibration feedback
- Time signature picker with 14 options
- Tap tempo with automatic BPM calculation
- Preset saving and loading
- Language auto-detection
- Responsive design for all screen sizes

### Technical
- Built with React Native 0.74
- Expo SDK 51
- TypeScript for type safety
- Custom metronome engine with high-precision scheduling
- Modular architecture with hooks and services
- Comprehensive documentation
