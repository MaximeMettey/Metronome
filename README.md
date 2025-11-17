# 🎵 Metronome Pro

**Professional Cross-Platform Metronome Application**

A feature-rich, professional metronome application built with React Native and Expo, supporting iOS, Android, Web, and Desktop platforms.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web%20%7C%20Desktop-lightgrey)
![React Native](https://img.shields.io/badge/react--native-0.74-blue)
![Expo](https://img.shields.io/badge/expo-~51.0-black)

## ✨ Features

### Core Functionality
- ⏱️ **Precise Tempo Control**: 20-300 BPM with ±1 and ±10 BPM increments
- 🎼 **Multiple Time Signatures**: Support for 2/4, 3/4, 4/4, 5/4, 6/4, 7/4, 3/8, 5/8, 6/8, 7/8, 9/8, 12/8, 2/2, 3/2
- 🎯 **High-Precision Timing**: Web Audio API-based scheduling for accurate beat generation
- 👆 **Tap Tempo**: Set tempo by tapping the beat

### Feedback Modes
- 🔊 **Audio Feedback**: Multiple sound types (click, woodblock, cowbell, beep, clap, stick)
- 👁️ **Visual Feedback**: Animated beat indicators with strong/weak beat differentiation
- 📳 **Haptic Feedback**: Vibration support on mobile devices (iOS/Android)

### Advanced Features
- 🎛️ **Polyrhythm Support**: Layer multiple rhythms simultaneously
- 💾 **Preset Management**: Save and load your favorite metronome configurations
- 🌍 **Internationalization**: Support for English, French, Spanish, German, Italian, and Portuguese
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 💪 **Offline Support**: Works without internet connection

### Cross-Platform
- 📱 iOS (iPhone & iPad)
- 🤖 Android (Phone & Tablet)
- 🌐 Web (Desktop & Mobile browsers)
- 💻 Desktop (via Expo)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **npm** or **yarn**: Latest version
- **Expo CLI**: Installed globally (optional but recommended)

```bash
npm install -g expo-cli
```

For mobile development:
- **iOS**: macOS with Xcode 14+ and CocoaPods
- **Android**: Android Studio with Android SDK 33+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MaximeMettey/Metronome.git
cd Metronome
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

**IMPORTANT**: If you encounter any issues with missing dependencies, run:
```bash
npm install --legacy-peer-deps
```

3. **Start the development server**
```bash
npm start
# or
expo start
```

## 📱 Running on Different Platforms

### iOS (requires macOS)
```bash
npm run ios
# or
expo start --ios
```

### Android
```bash
npm run android
# or
expo start --android
```

### Web
```bash
npm run web
# or
expo start --web
```

The web version will open in your default browser at `http://localhost:19006`

### Using Expo Go (Easiest for Testing)

1. Install Expo Go on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Run `npm start` or `expo start`

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## 🛠️ Troubleshooting

### Common Issues

#### "Cannot find module 'babel-plugin-module-resolver'"
This should be fixed in the latest version. If you still see this error:
```bash
npm install --save-dev babel-plugin-module-resolver
```

#### "Unable to resolve asset"
The app is configured to work without custom assets. Default Expo assets will be used.

#### Metro bundler cache issues
If you experience any caching issues:
```bash
expo start -c
# or
npx expo start --clear
```

#### Module resolution errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

#### TypeScript errors
Make sure TypeScript is properly installed:
```bash
npm install --save-dev typescript @types/react @types/react-native
```

## 🏗️ Project Structure

```
Metronome/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BeatIndicator.tsx
│   │   ├── PlaybackControls.tsx
│   │   ├── TempoControl.tsx
│   │   ├── TimeSignatureSelector.tsx
│   │   ├── TapTempoButton.tsx
│   │   └── ToggleSwitch.tsx
│   ├── screens/             # Screen components
│   │   └── MetronomeScreen.tsx
│   ├── services/            # Business logic
│   │   ├── MetronomeEngine.ts
│   │   ├── AudioService.ts
│   │   └── StorageService.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── useMetronome.ts
│   │   ├── useTapTempo.ts
│   │   └── usePresets.ts
│   ├── i18n/                # Internationalization
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── en.json
│   │       ├── fr.json
│   │       ├── es.json
│   │       ├── de.json
│   │       ├── it.json
│   │       └── pt.json
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── constants/           # App constants
│       ├── defaults.ts
│       └── timeSignatures.ts
├── assets/                  # Images, fonts, sounds
├── App.tsx                  # Root component
├── package.json
├── tsconfig.json
├── babel.config.js
└── app.json                # Expo configuration
```

## 🔧 Configuration

### Changing App Name or Icon

Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "icon": "./assets/icon.png"
  }
}
```

### Adding New Languages

1. Create a new translation file in `src/i18n/locales/` (e.g., `ja.json`)
2. Add translations following the structure of existing files
3. Import and register in `src/i18n/index.ts`:

```typescript
import ja from './locales/ja.json';

const resources = {
  // ... existing languages
  ja: { translation: ja },
};
```

## 📦 Building for Production

### EAS Build (Recommended)

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Configure EAS**
```bash
eas build:configure
```

3. **Build for Android**
```bash
npm run build:android
# or
eas build --platform android
```

4. **Build for iOS**
```bash
npm run build:ios
# or
eas build --platform ios
```

### Web Build

```bash
npm run build:web
# or
expo build:web
```

The web build will be output to the `web-build/` directory.

### Local Builds

#### Android APK
```bash
eas build --platform android --profile preview --local
```

#### iOS (macOS only)
```bash
eas build --platform ios --profile preview --local
```

## 🚀 Deployment

### Web Deployment

The app can be deployed to any static hosting service:

#### Netlify
```bash
npm run build:web
# Deploy the web-build/ directory
```

#### Vercel
```bash
npm run build:web
vercel --prod
```

#### GitHub Pages
```bash
npm run build:web
# Copy web-build/ contents to your gh-pages branch
```

### Mobile App Stores

#### Google Play Store
1. Build a production APK/AAB with `eas build --platform android`
2. Follow [Google Play Console](https://play.google.com/console) submission process
3. Upload your build and fill in app details

#### Apple App Store
1. Build for iOS with `eas build --platform ios`
2. Use [App Store Connect](https://appstoreconnect.apple.com/)
3. Submit for review following Apple's guidelines

## 🎨 Customization

### Changing Colors

Edit `src/constants/defaults.ts`:
```typescript
export const COLORS = {
  primary: '#4A90E2',      // Main brand color
  secondary: '#7B68EE',    // Secondary actions
  accent: '#FF6B6B',       // Highlights
  // ... more colors
};
```

### Adding Sound Types

1. Add sound files to `assets/sounds/`
2. Update `SoundType` in `src/types/index.ts`
3. Load sounds in `AudioService.ts`

### Custom Time Signatures

Edit `src/constants/timeSignatures.ts`:
```typescript
export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 7, noteValue: 8, name: '7/8' },
  // Add your custom signatures
];
```

## 🧪 Testing

```bash
npm test
# or
yarn test
```

## 🐛 Debugging

### Enable Remote Debugging
1. Run `npm start`
2. Press `d` to open developer menu
3. Select "Debug Remote JS"

### React DevTools
```bash
npm install -g react-devtools
react-devtools
```

### Inspecting Network Requests
Enable network inspection in Expo DevTools (press `m` in terminal)

## 📚 Technical Details

### Audio Engine
- Uses Web Audio API for precise timing on web
- Falls back to Expo AV for mobile platforms
- Scheduling algorithm ensures sub-millisecond accuracy

### State Management
- React Hooks for local state
- AsyncStorage for persistent data
- Custom hooks for business logic separation

### Performance
- React Native Reanimated for smooth animations
- Optimized re-renders with memo and useCallback
- Efficient beat scheduling with look-ahead algorithm

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Powered by [Expo](https://expo.dev/)
- Icons from system emojis
- Inspired by professional music tools

## 📞 Support

If you encounter any issues or have questions:
- Open an [Issue](https://github.com/MaximeMettey/Metronome/issues)
- Check existing issues for solutions
- Read the [Expo documentation](https://docs.expo.dev/)

## 🗺️ Roadmap

- [ ] MIDI clock sync
- [ ] Custom sound uploads
- [ ] Advanced polyrhythm editor
- [ ] Subdivision accents
- [ ] Practice mode with tempo ramping
- [ ] Dark/Light theme toggle
- [ ] Cloud sync for presets
- [ ] Apple Watch & WearOS support

---

**Made with ❤️ for musicians worldwide**
