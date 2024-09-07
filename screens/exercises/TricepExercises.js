import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function TricepsScreen({ onAnimateButton }) {
  const [exercises, setExercises] = useState();
  const db = useSQLiteContext();

  async function getData() {
    console.log('called');
    const result = await db.getAllAsync('SELECT * FROM Exercises');
    console.log(result);
  }


    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => {
            getData()
          }}>
            <Text style={styles.buttonText}>Database Exercise 1</Text>
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TricepsScreen;
