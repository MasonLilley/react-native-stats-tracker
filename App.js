import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutManager from './components/WorkoutManager';
import Button from './components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './routes/AppNavigator';

export default function App() {
  return (
    <AppNavigator />
  );
}

const styles = StyleSheet.create({

});
