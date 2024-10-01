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
    const [sets, setSets] = useState([]);

    async function getSetsFromWorkout() {
        const result = await db.getAllAsync('SELECT * FROM Sets WHERE date = ?', [item.date]);
        setSets(result);
        console.log("All Sets w/ Name + Date:",result);

        if (Array.isArray(result)) {
            navigation.navigate('CreateWorkoutModal', { sets: result });
        } else {
            console.error("Expected result to be an array but got:", result);
        }
    }

    return(
        <View style={styles.mainContainer}>
            <TouchableOpacity style={[styles.item, styles.darkItem]} 
            activeOpacity={0.8}
            onPress={getSetsFromWorkout}>
                <Text style={[styles.workoutName, styles.darkText]}>{item.workout_name}</Text>
                <Text style={[styles.workoutDate, styles.darkSubText]}>{item.date}</Text>
            </TouchableOpacity>        
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '65%',
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
