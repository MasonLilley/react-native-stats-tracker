import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './routes/AppNavigator';
import { SQLiteProvider } from 'expo-sqlite';
import DatabaseFallback from './screens/DatabaseFallback';
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset';

const loadDatabse = async () => {
  const dbName = 'exerciseDB.db';
  const dbAsset = require('./assets/exerciseDB.db');
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo  = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
  }
  await FileSystem.downloadAsync(dbUri, dbFilePath);
}

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);

  React.useEffect(() => {
    loadDatabse()
    .then(() => setDbLoaded(true))
    .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded) {
    return (<DatabaseFallback />);
  }
  
  return (
    <React.Suspense fallback={<DatabaseFallback />}>
      <SQLiteProvider databaseName='exerciseDB.db' useSuspense>
        <AppNavigator />
      </SQLiteProvider>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({

});
