import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, ScrollView, TextInput, Touchable } from 'react-native';
import AddExercise from '../components/AddExercise';


function CreateWorkoutModal({ navigation }) {
  const route = useRoute();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    console.log(route.params?.selectedExercise);
    if (route.params?.selectedExercise) {
      const newExercise = {
        [exercises.length+1]: [
          { muscle: route.params.selectedExercise.muscle },
          { name: route.params.selectedExercise.name },
          { notes: route.params.selectedExercise.notes },
        ],
      };
      setExercises([...exercises, newExercise]);
    }
  }, [route.params?.selectedExercise]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonContainer}>
        {exercises.map((exercise, index) => (
          <AddExercise key={index} exercise={exercise} index={index} />
        ))}

        <Button title="Add Dummy Exercise" onPress={() => {
          const newIndex = exercises.length + 1;
          setExercises([
            ...exercises,
            {
              [newIndex]: [
                { muscle: 'bicep' },
                { name: 'Dumbbell Curl' },
                { notes: 'Control eccentric' },
              ],
            },
          ]);
        }} />
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
  },
});

export default CreateWorkoutModal;
