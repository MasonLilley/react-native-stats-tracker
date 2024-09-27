import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ScrollView, Alert, Modal, Text } from 'react-native';
import AddExercise from '../components/AddExercise';
import * as SQLite from 'expo-sqlite';

function CreateWorkoutModal({ navigation }) {
  const db = SQLite.useSQLiteContext();
  const route = useRoute();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    console.log(route.params?.selectedExercise);
    if (route.params?.selectedExercise) {
      const newExercise = {
        id: exercises.length + 1,
        muscle: route.params.selectedExercise.muscle,
        name: route.params.selectedExercise.name,
        notes: route.params.selectedExercise.notes,
      };
      setExercises([...exercises, newExercise]);
    }
  }, [route.params?.selectedExercise]);

  const updateExerciseNote = async (note, exerciseName) => {
    console.log('Changing', exerciseName, "'s note to:", note);
    
    const allRows = await db.getAllAsync('SELECT * FROM Exercises WHERE name = ?', exerciseName);
    console.log('Before:', allRows);
    
    try {
      const result = await db.runAsync('UPDATE Exercises SET notes = ? WHERE name = ?', [note, exerciseName]);

        setExercises(prevExercises => 
          prevExercises.map(exercise => 
              exercise.name === exerciseName ? { ...exercise, notes: note } : exercise
          )
      );
    } catch (error) {
        console.error('Error updating note:', error);
    }    
    const allRowsAfter = await db.getAllAsync('SELECT * FROM Exercises WHERE name = ?', [exerciseName]);
    console.log('After:', allRowsAfter);
  };
  

  const deleteExercise = (id) => {
    Alert.alert('Delete Exercise?', 'Are you sure you want to delete this exercise? This cannot be recovered.', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancelled delete');;
        },
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => {setExercises(exercises.filter((exercise) => exercise.id !== id));},
        style: 'destructive',
      },

    ]);    
  };

  const editNote = (id) => {
    const exerciseToEdit = exercises.find((exercise) => exercise.id === id);
    console.log("EXERCISETOEDIT:",exerciseToEdit);
    console.log("NAME:", exerciseToEdit.name);
    const exerciseName = exerciseToEdit.name;
    
    navigation.navigate('EditNoteModal', {
      exerciseName,
      onConfirm: (newNote) => {
        navigation.goBack();
        updateExerciseNote(newNote, exerciseName);
      },
      cancelEdit: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonContainer}>
        {exercises.map((exercise, index) => (
          <AddExercise
            navigation={navigation}
            key={exercise.id}
            exercise={exercise}
            index={index}
            deleteExercise={() => deleteExercise(exercise.id)}
            editNote={() => editNote(exercise.id)}
          />
        ))}

        <Button
          title="Add Dummy Exercise"
          onPress={() => {
            const newExercise = {
              id: exercises.length + 1,
              muscle: 'bicep',
              name: 'Dumbbell Curl',
              notes: 'Control eccentric',
            };
            setExercises([...exercises, newExercise]);
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    height: '100%',
  },
  buttonContainer: {
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'red',
  },
  modalContent: {
      width: '90%',
      padding: 0,
      backgroundColor: '#1e1e1e',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      backgroundColor: 'lightblue',
  },

});

export default CreateWorkoutModal;
