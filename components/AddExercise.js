import * as SQLite from 'expo-sqlite';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset';

function AddExercise({ exercise, index }) {
    const db = SQLite.useSQLiteContext();
    const placeholderColor = '#888';
    const [rows, setRows] = useState([{ reps: '', weight: '', notes: '' }]);

    //DATABASE STUFF

    async function getData() {
        const result = await db.getAllAsync('SELECT * FROM Sets');
        console.log(result);
      }


    //ROW STUFF

    const addRow = () => {
        setRows([...rows, { reps: '', weight: '', notes: '' }]);

    };

    const logRows = async () => {
        getData();
    };

    const handleRepsChange = (input, rowIndex) => {
        const intValue = input.replace(/[^0-9]/g, '');
        const updatedRows = [...rows];
        updatedRows[rowIndex].reps = intValue;
        setRows(updatedRows);
    };

    const handleWeightChange = (input, rowIndex) => {
        const floatValue = input.replace(/[^0-9.]/g, '');
        const updatedRows = [...rows];
        updatedRows[rowIndex].weight = floatValue;
        setRows(updatedRows);
    };

    const handleNotesChange = (input, rowIndex) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex].notes = input;
        setRows(updatedRows);
    };



    return (
        <View style={styles.exerciseBox}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.exerciseName}>{exercise[index + 1][1].name}</Text>
                    <Text style={styles.exerciseNotes}>{exercise[index + 1][2].notes}</Text>
                </View>

                <TouchableOpacity onPress={addRow} style={styles.trashIcon}>
                    <Ionicons name="trash-outline" size={25} color="red" />
                </TouchableOpacity>
            </View>

        {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.inputRow}>
            <Text style={styles.placeholderText}>Reps</Text>
            <TextInput
                style={styles.input}
                value={row.reps}
                onChangeText={(input) => handleRepsChange(input, rowIndex)}
                keyboardType="numeric" />
            <Text style={styles.placeholderText}>Weight</Text>
            <TextInput
                style={styles.input}
                value={row.weight}
                onChangeText={(input) => handleWeightChange(input, rowIndex)}
                keyboardType="decimal-pad" />
            <Text style={styles.placeholderText}>Notes</Text>
            <TextInput
                style={styles.input}
                value={row.notes}
                onChangeText={(input) => handleNotesChange(input, rowIndex)} />
            </View>
        ))}

        <View style={styles.lastRow}>
            <TouchableOpacity onPress={addRow} style={styles.icon}>
                <Ionicons name="barbell-outline" size={30} color="blue" />
            </TouchableOpacity>
        </View>

        <Button title="Log Rows" onPress={logRows} color="blue" />

        </View>
    );
}

//
// borderColor: 'red',
// borderWidth: 1,
//
const styles = StyleSheet.create({
    exerciseBox: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    },
    exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0f0f0',
    },
    exerciseNotes: {
    fontSize: 14,
    color: '#b0b0b0',
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
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    width: '20%',
    textAlign: 'center',
    color: '#ffffff',
    },
    icon: {
    marginLeft: 0,
    width: 35,
    tintColor: '#f0f0f0',
    },
    lastRow: {
    borderColor: '#444',
    borderWidth: 1,
    width: '101%',
    backgroundColor: '#2e2e2e',
    borderRadius: 12,
    padding: 12,
    },
    placeholderText: {
        color: '#888',
        paddingLeft: 7,
        paddingRight: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trashIcon: {
        margin: 0,
        padding: 0,
    }
});


export default AddExercise;
