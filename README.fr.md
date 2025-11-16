# 🎵 Metronome Pro

**Application de Métronome Cross-Platform Professionnelle**

Une application de métronome riche en fonctionnalités, construite avec React Native et Expo, supportant iOS, Android, Web et Desktop.

## ✨ Fonctionnalités

### Fonctionnalités de Base
- ⏱️ **Contrôle Précis du Tempo**: 20-300 BPM avec incréments de ±1 et ±10 BPM
- 🎼 **Signatures Rythmiques Multiples**: Support pour 2/4, 3/4, 4/4, 5/4, 6/4, 7/4, 3/8, 5/8, 6/8, 7/8, 9/8, 12/8, 2/2, 3/2
- 🎯 **Précision Temporelle**: Planification basée sur Web Audio API pour une génération précise des temps
- 👆 **Tap Tempo**: Définir le tempo en tapant le rythme

### Modes de Retour
- 🔊 **Retour Audio**: Plusieurs types de sons (clic, woodblock, cloche, bip, claquement, baguette)
- 👁️ **Retour Visuel**: Indicateurs de temps animés avec différenciation temps fort/temps faible
- 📳 **Retour Haptique**: Support de vibration sur appareils mobiles (iOS/Android)

### Fonctionnalités Avancées
- 🎛️ **Support Polyrythmique**: Superposer plusieurs rythmes simultanément
- 💾 **Gestion des Préréglages**: Sauvegarder et charger vos configurations favorites
- 🌍 **Internationalisation**: Support pour Anglais, Français, Espagnol, Allemand, Italien et Portugais
- 🎨 **UI Moderne**: Design avec dégradés et animations fluides
- 💪 **Support Hors Ligne**: Fonctionne sans connexion internet

### Multi-Plateforme
- 📱 iOS (iPhone & iPad)
- 🤖 Android (Téléphone & Tablette)
- 🌐 Web (Navigateurs Desktop & Mobile)
- 💻 Desktop (via Expo)

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js**: 18.x ou supérieur
- **npm** ou **yarn**: Dernière version
- **Expo CLI**: Installé globalement (optionnel mais recommandé)

```bash
npm install -g expo-cli
```

### Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/MaximeMettey/Metronome.git
cd Metronome
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**
```bash
npm start
```

## 📱 Exécution sur Différentes Plateformes

### iOS (nécessite macOS)
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

### Utiliser Expo Go (Plus Facile pour les Tests)

1. Installer Expo Go sur votre appareil mobile
2. Exécuter `npm start`
3. Scanner le QR code

## 🏗️ Structure du Projet

```
Metronome/
├── src/
│   ├── components/          # Composants UI réutilisables
│   ├── screens/             # Composants d'écran
│   ├── services/            # Logique métier
│   ├── hooks/               # Hooks React personnalisés
│   ├── i18n/                # Internationalisation
│   ├── types/               # Types TypeScript
│   └── constants/           # Constantes de l'app
├── assets/                  # Images, polices, sons
├── App.tsx                  # Composant racine
└── package.json
```

## 📦 Build pour Production

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

### Web
```bash
npm run build:web
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request.

## 📄 Licence

Ce projet est sous licence MIT.

---

**Fait avec ❤️ pour les musiciens du monde entier**
