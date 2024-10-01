import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ScrollView, Alert, Text } from 'react-native';
import AddExercise from '../components/AddExercise';
import * as SQLite from 'expo-sqlite';
import { TouchableOpacity } from 'react-native';

function CreateWorkoutModal({ navigation }) {
  const db = SQLite.useSQLiteContext();
  const route = useRoute();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const groupedData = {};


  useEffect(() => {
    if (route.params?.sets) {
      setWorkoutHistory(route.params.sets);
      console.log("CWM received sets:", route.params.sets);

      var result = Object.keys(workoutHistory).map((key) => [key, workoutHistory[key]]);
    }
    
    if (route.params?.selectedExercise) {
      const newExercise = {
        id: exercises.length + 1,
        muscle: route.params.selectedExercise.muscle,
        name: route.params.selectedExercise.name,
        notes: route.params.selectedExercise.notes,
      };
      console.log("CWM new exercises:", [...exercises, newExercise]);
      setExercises([...exercises, newExercise]);
    }
  }, [route.params?.selectedExercise, route.params?.sets]);

  const updateExerciseNote = async (note, exerciseName) => {
    console.log('Changing', exerciseName, "'s note to:", note);
    
    const allRows = await db.getAllAsync('SELECT * FROM Exercises WHERE name = ?', exerciseName);
    
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
  };
  
  const deleteExercise = (id) => {
    Alert.alert('Delete Exercise?', 'Are you sure you want to delete this exercise? This cannot be recovered.', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancelled delete');
        },
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => { setExercises(exercises.filter((exercise) => exercise.id !== id)); },
        style: 'destructive',
      },
    ]);    
  };

  const editNote = (id) => {
    const exerciseToEdit = exercises.find((exercise) => exercise.id === id);
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
        
        {/* Renders AddExercise with sets prefilled to simulate history */}
        {(workoutHistory.length > 0) ? 
            <View style={styles.historyContainer}>
              <Text style={styles.historyHeader}>Workout History</Text>
              {workoutHistory.map((set, index) => (
                console.log("SET:",set)
                // <AddExercise
                //   navigation={navigation}
                //   key={set.id}
                //   exercise={set.exercise_name}
                //   index={index}
                //   deleteExercise={() => deleteExercise(exercise.id)}
                //   editNote={() => editNote(exercise.id)}
                //   givenSets={workoutHistory[index]}
                // />
              ))}

              {
              workoutHistory.forEach(entry => {
                  if(!groupedData[entry.exercise_name]) {
                    groupedData[entry.exercise_name] = [];
                  }
                  groupedData[entry.exercise_name].push([entry.reps, entry.weight, entry.note]);
                console.log("GROUPED DATA:",groupedData)
              })
              }

              {
                Object.entries(groupedData).map(([exerciseName, sets], index) => (
                  <AddExercise
                    navigation={navigation}
                    exercise={exerciseName}
                    key={index}
                    deleteExercise={() => deleteExercise(exercise.id)}
                    editNote={() => editNote(exercise.id)}
                    givenSets={sets}
                  />
                ))
              }
            </View> 
          : 
          <></>
        }
    <TouchableOpacity
      onPress={() => {
        const newExercise = {
            id: exercises.length + 1,
            muscle: 'bicep',
            name: 'Dumbbell Curl',
            notes: 'Control eccentric',
        };
        setExercises([...exercises, newExercise]);
      }}
      style={{        
          alignItems: 'center',
      }}
    >
    <Text style={{ color: '#333333', fontSize: 5 }}>Add Dummy Exercise</Text>
</TouchableOpacity>
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
  historyContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#444444',
    borderRadius: 8,
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#555555',
    borderRadius: 5,
  },
  historyExerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  historyText: {
    color: 'white',
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
  plusButtonPrompt: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'lightblue',
    padding: 10,
  },
});

export default CreateWorkoutModal;



