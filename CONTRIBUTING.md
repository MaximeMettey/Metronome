# Contributing to Metronome Pro

First off, thank you for considering contributing to Metronome Pro! It's people like you that make this app better for musicians everywhere.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and constructive in your interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Mention your device/browser and OS version**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing style (use Prettier)
5. Write a convincing description of your PR and why we should merge it

## Development Process

1. **Clone the repository**
   ```bash
   git clone https://github.com/MaximeMettey/Metronome.git
   cd Metronome
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

4. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "Add some feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/my-new-feature
   ```

6. **Create a Pull Request**

## Coding Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use meaningful variable and function names
- Comment complex logic
- Keep functions small and focused
- Use React hooks appropriately
- Run `npm run format` before committing

## Project Structure Guidelines

- **Components**: Reusable UI components go in `src/components/`
- **Screens**: Full screen components in `src/screens/`
- **Services**: Business logic in `src/services/`
- **Hooks**: Custom hooks in `src/hooks/`
- **Types**: TypeScript types in `src/types/`
- **Constants**: App constants in `src/constants/`
- **i18n**: Translation files in `src/i18n/locales/`

## Adding New Features

When adding new features:

1. Discuss the feature in an issue first
2. Follow the existing patterns
3. Add translations for all supported languages
4. Update the README if needed
5. Consider backward compatibility

## Testing

```bash
npm test
```

Test your changes on multiple platforms if possible:
- iOS
- Android
- Web

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎵
