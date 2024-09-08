import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AddExercise({ exercise, index }) {
  const [rows, setRows] = useState([{ reps: '', weight: '', notes: '' }]);

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { reps: '', weight: '', notes: '' }]);
  };

  // Function to handle changes in reps for a specific row
  const handleRepsChange = (input, rowIndex) => {
    const intValue = input.replace(/[^0-9]/g, '');
    const updatedRows = [...rows];
    updatedRows[rowIndex].reps = intValue;
    setRows(updatedRows);
  };

  // Function to handle changes in weight for a specific row
  const handleWeightChange = (input, rowIndex) => {
    const floatValue = input.replace(/[^0-9.]/g, '');
    const updatedRows = [...rows];
    updatedRows[rowIndex].weight = floatValue;
    setRows(updatedRows);
  };

  // Function to handle changes in notes for a specific row
  const handleNotesChange = (input, rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].notes = input;
    setRows(updatedRows);
  };

  return (
    <View style={styles.exerciseBox}>
      <Text style={styles.exerciseName}>{exercise[index + 1][1].name}</Text>
      <Text style={styles.exerciseNotes}>{exercise[index + 1][2].notes}</Text>

      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Reps"
            value={row.reps}
            onChangeText={(input) => handleRepsChange(input, rowIndex)}
            keyboardType="numeric" />
          <TextInput
            style={styles.input}
            placeholder="Weight"
            value={row.weight}
            onChangeText={(input) => handleWeightChange(input, rowIndex)}
            keyboardType="decimal-pad" />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            value={row.notes}
            onChangeText={(input) => handleNotesChange(input, rowIndex)} />
        </View>
      ))}

      <View style={styles.lastRow}>
        <TouchableOpacity onPress={addRow} style={styles.icon}>
            <Ionicons name="barbell-outline" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

//
// borderColor: 'red',
// borderWidth: 1,
//
const styles = StyleSheet.create({
  exerciseBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseNotes: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: '30%',
    textAlign: 'center',
  },
  icon: {
    marginLeft: 0,

    width: 35,
  },
  lastRow: {
    borderColor: 'red',
    borderWidth: 1,
    width: '90%',
    backgroundColor: 'grey',
    borderRadius: 8,
  }
});

export default AddExercise;
