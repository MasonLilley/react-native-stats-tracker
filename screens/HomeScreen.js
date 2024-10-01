// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import WorkoutBlurb from '../components/WorkoutBlurb'; 
import * as SQLite from 'expo-sqlite';

function HomeScreen() {
  const db = SQLite.useSQLiteContext();
  const [workouts, setWorkouts] = useState([]);

  async function getWorkouts() {
    const result = await db.getAllAsync('SELECT * FROM workouts');
    console.log('All Workouts:',result);
    setWorkouts(result);
  }

  useEffect(() => {
    async function fetchData() {
      await getWorkouts();
    }

    fetchData();
  }, [db])

  return (
    <View style={[styles.container, styles.darkContainer]}>
      <Text style={[styles.title, styles.darkText]}>Past Workouts</Text>
      <View style={styles.list}>
        <FlatList
          data={workouts.reverse()}
          renderItem={({ item }) => <WorkoutBlurb item={item} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={[styles.text, styles.darkText]}>No workouts found</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#bbb',
  },
  list: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
});

export default HomeScreen;
