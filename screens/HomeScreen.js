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
    console.log('workouts:',result);
    setWorkouts(result);
  }

  useEffect(() => {
    async function fetchData() {
      await getWorkouts();
      console.log(workouts);
    }

    fetchData();
  }, [db])

  return (
    <View style={[styles.container, styles.darkContainer]}>
      <Text style={[styles.title, styles.darkText]}>Past Workouts</Text>
      <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutBlurb item={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={[styles.text, styles.darkText]}>No workouts found</Text>}
      />
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
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#bbb',
  },
  item: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
  },
  darkItem: {
    backgroundColor: '#333', // Dark mode item background
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutDate: {
    fontSize: 14,
  },
  text: {
    fontSize: 18,
  },
});

export default HomeScreen;
