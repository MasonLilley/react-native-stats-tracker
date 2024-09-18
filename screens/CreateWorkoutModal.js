import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ScrollView, Alert } from 'react-native';
import AddExercise from '../components/AddExercise';

function CreateWorkoutModal({ navigation }) {
  const route = useRoute();
  const [exercises, setExercises] = useState([]);

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

  const deleteExercise = (id) => {
    Alert.alert('Delete Exercise?', 'Are you sure you want to delete this exercise? This cannot be recovered.', [
      {
        text: 'Cancel',
        onPress: () => console.log('hello'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => {setExercises(exercises.filter((exercise) => exercise.id !== id));},
        style: 'destructive',
      },

    ]);    
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonContainer}>
        {exercises.map((exercise, index) => (
          <AddExercise
            key={exercise.id}
            exercise={exercise}
            index={index}
            deleteExercise={() => deleteExercise(exercise.id)}
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
    backgroundColor: 'gray',
    height: '100%',
  },
  buttonContainer: {
    padding: 10,
  },
});

export default CreateWorkoutModal;
