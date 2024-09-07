import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, ScrollView } from 'react-native';


// [muscle, name, notes]
function AddExercise({ exercise, index }) {
  //exercise[index+1][0].muscle
  //exercise[index+1][1].name
  //exercise[index+1][2].note


  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Text>{exercise[index+1][1].name}</Text>
        <Text style={{ fontSize: 12 }}>{exercise[index+1][2].note}</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreateWorkoutModal({ navigation }) {
  const exercises = [
    {1: [
      { muscle: 'tricep' },
      { name: 'Tricep Pullarounds'},
      { note: 'Stand away'},
    ]},
    {2: [
      { muscle: 'chest' },
      { name: 'Chest Press'},
      { note: 'Seat on 5'},
    ]}
  ];
  console.log(exercises);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonContainer}>
        {exercises.map((exercise, index) => (
          <AddExercise key={index} exercise={exercise} index={index}/>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },  
  buttonContainer: {
    backgroundColor: 'blue',
    width: '70%',
    height: '100%',
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
    alignItems: 'center',
},
});

  export default CreateWorkoutModal;