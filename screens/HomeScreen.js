// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [currentName, setCurrentName] = useState(undefined)
  const [db, setDb] = useState(null);

  useEffect(() => {
    (async () => {
      const database = await SQLite.openDatabaseAsync('example.db');
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View><Text>its loading</Text></View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput value={currentName} placeholder='workout' onChangeText={setCurrentName } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20, // Rounded corners
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#007BFF', // Blue border color
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#444444', // Slightly lighter grey for input background
    color: '#FFFFFF', // White text color
    fontSize: 16,
  },
});

export default HomeScreen;
