# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
