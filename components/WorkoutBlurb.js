import * as SQLite from 'expo-sqlite';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Button, Alert, Pressable, Modal, Touchable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditExerciseModal from './EditExerciseModal';
import { TouchableWithoutFeedback } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

function WorkoutBlurb({ item }) {
    const navigation = useNavigation();
    const db = SQLite.useSQLiteContext();

    sets = [];

    async function getAllData() {
        const result = await db.getAllAsync('SELECT * FROM Exercises');
        setExercises(result);
      }

    const getSetsFromWorkout = async () => {
        const result = await db.getAllAsync('SELECT * FROM Exercises');
        // console.log(result);
    }

    return(
        <View style={styles.mainContainer}>
            <TouchableOpacity style={[styles.item, styles.darkItem]} 
            activeOpacity={0.8}
            onPress={() => {
                getSetsFromWorkout();
                // console.log("Sets:",sets);
                // navigation.navigate('CreateWorkoutModal', {sets: sets});
            }}>
                <Text style={[styles.workoutName, styles.darkText]}>{item.workout_name}</Text>
                <Text style={[styles.workoutDate, styles.darkSubText]}>{item.date}</Text>
            </TouchableOpacity>        
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
    },
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

export default WorkoutBlurb;
