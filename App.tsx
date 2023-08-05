import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Timer } from './components/Timer';
import { PlayAction } from './components/PlayAction';
import { LinearGradient } from 'expo-linear-gradient';
import { PhaseInfo } from './components/PhaseInfo';
import { useState } from 'react';
import { useAppSelector } from './redux/store';
import { ReduxProvider } from './redux/provider';
import { Home } from './pages/Home';

export default function App() {
  return (
    <ReduxProvider>
      <Home />
      <StatusBar style="auto" />
    </ReduxProvider>
  );
}
