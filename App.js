// App.js
import 'react-native-url-polyfill/auto';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BudgetProvider } from './src/contexts/BudgetContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <BudgetProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </BudgetProvider>
    </SafeAreaProvider>
  );
}

