import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';
import { MetronomeScreen } from './src/screens/MetronomeScreen';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <MetronomeScreen />
    </I18nextProvider>
  );
}
