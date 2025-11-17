# Development Build Guide

## Pourquoi un Development Build ?

Expo Go a des limitations sur les versions de modules natifs qu'il supporte. Pour contourner cela, on crée un **development build** personnalisé qui contient exactement les bonnes versions natives pour ce projet.

## Avantages

- ✅ Contrôle total sur les versions natives (Reanimated, etc.)
- ✅ Pas de conflit Worklets ou PlatformConstants
- ✅ Debugging complet comme avec Expo Go
- ✅ Hot reload fonctionne normalement
- ✅ Fonctionne comme une app "custom Expo Go" pour ce projet

## Prérequis

1. **Compte Expo** (gratuit)
   - Créer un compte sur https://expo.dev
   - Se connecter: `npx eas-cli login`

2. **EAS CLI** (déjà configuré dans package.json)
   ```bash
   npm install -g eas-cli
   ```

## Étape 1: Installation des dépendances

```bash
# Installer expo-dev-client (déjà dans package.json)
npm install
```

## Étape 2: Configurer le projet EAS

```bash
# Initialiser EAS (si première fois)
eas build:configure
```

Cela va créer/mettre à jour `eas.json` avec la configuration de build.

## Étape 3: Build Android APK de développement

```bash
# Build Android development APK
npm run build:dev:android

# Ou directement:
eas build --profile development --platform android
```

**Durée:** 10-15 minutes (sur les serveurs EAS dans le cloud)

**Résultat:** Un APK téléchargeable depuis le dashboard Expo

## Étape 4: Installer l'APK sur ton téléphone

1. Une fois le build terminé, tu recevras un lien
2. Ouvre le lien sur ton téléphone Android
3. Télécharge et installe l'APK
4. Cette app est ton "Expo Go personnalisé" pour ce projet

## Étape 5: Lancer le développement

```bash
# Démarrer Metro avec dev-client
npm run start:dev

# Ou:
expo start --dev-client
```

**Important:** N'ouvre PAS avec Expo Go classique, ouvre avec ton APK développement personnalisé!

## Workflow de développement

1. **Une seule fois:** Build l'APK développement et installe-le
2. **Chaque jour:** Lance `npm run start:dev` et ouvre l'app depuis ton APK
3. **Hot reload:** Fonctionne normalement, pas besoin de rebuild
4. **Rebuild seulement si:** Tu changes des dépendances natives ou la config

## iOS Development Build

Pour iOS (nécessite un compte Apple Developer):

```bash
npm run build:dev:ios
# Ou:
eas build --profile development --platform ios
```

## Troubleshooting

### "No development build installed"
- Assure-toi d'avoir installé l'APK de développement (pas Expo Go)
- Vérifie que tu lances avec `npm run start:dev`

### "Build failed"
- Vérifie que tu es connecté: `eas whoami`
- Vérifie ta connexion internet (build sur serveurs cloud)

### Modifications de code ne se reflètent pas
- Fais un reload dans l'app (shake + reload)
- Redémarre Metro: Ctrl+C puis `npm run start:dev`

## Build Local (Alternatif)

Si tu veux builder localement sans serveurs EAS:

```bash
# Android (nécessite Android Studio + SDK)
npx expo run:android

# iOS (Mac uniquement, nécessite Xcode)
npx expo run:ios
```

## Comparaison: Expo Go vs Development Build

| Aspect | Expo Go | Development Build |
|--------|---------|-------------------|
| Setup | Aucun | Build initial requis |
| Versions natives | Fixées par Expo | Contrôle total |
| Updates | Instantanés | Hot reload (même rapidité) |
| Erreurs natives | Possibles | Aucune |
| Build time | 0 | ~10-15 min (une fois) |

## Next Steps

Après avoir installé ton development build:

1. Lance `npm run start:dev`
2. Ouvre l'app depuis l'APK personnalisé sur ton téléphone
3. Développe normalement avec hot reload
4. Tous les modules natifs (Reanimated, Audio, Haptics) fonctionneront parfaitement!

## Documentation Officielle

- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
