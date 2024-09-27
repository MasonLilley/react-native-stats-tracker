// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const HomeScreen = () => {
  // Mocked workout data
  const workouts = [
    { id: '1', name: 'Full Body Workout', date: '2024-09-20' },
    { id: '2', name: 'Cardio Blast', date: '2024-09-18' },
    { id: '3', name: 'Strength Training', date: '2024-09-15' },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.item, styles.darkItem]}>
      <Text style={[styles.workoutName, styles.darkText]}>{item.name}</Text>
      <Text style={[styles.workoutDate, styles.darkSubText]}>{item.date}</Text>
    </View>
  );

  return (
    <View style={[styles.container, styles.darkContainer]}>
      <Text style={[styles.title, styles.darkText]}>Past Workouts</Text>
      <FlatList
        data={workouts}
        renderItem={renderItem}
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
