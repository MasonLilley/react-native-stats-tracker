import * as SQLite from 'expo-sqlite';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Button, Alert, Pressable, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditExerciseModal from './EditExerciseModal';

function AddExercise({ exercise, deleteExercise, editNote }) {
    const db = SQLite.useSQLiteContext();
    const placeholderColor = '#888';
    const [rows, setRows] = useState([{ reps: '', weight: '', notes: '', muscle: '' }]);
    const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    async function addToDatabase(row) {
        const statement = await db.prepareAsync("INSERT INTO Sets (exercise_name, reps, weight, date, note, muscle) VALUES ($name, $reps, $weight, $date, $note, $muscle)");

        const sets = await db.getAllAsync("SELECT * FROM Sets");
        console.log("sets before: ",sets);

        try {
            let result = await statement.executeAsync({ 
                $name: 'test',
                $reps: row.reps, 
                $weight: row.weight, 
                $date: '2024-09-08', 
                $note: row.notes,
                $muscle: row.muscle
            });
        } catch(e) {
            console.log(e);
        } finally {
            await statement.finalizeAsync();
            const sets = await db.getAllAsync("SELECT * FROM Sets");
            console.log("finalized async, sets now: ", sets);
        }
      }

    //ROW STUFF

    const addRow = () => {
        setRows([...rows, { name: 'test', reps: '', weight: '', notes: '', muscle: exercise.muscle }]);
    };

    const handleFocus = (index) => {
        setFocusedInputIndex(index);
    };
    
    const handleBlur = () => {
        setFocusedInputIndex(null);
    };

    const logRows = async () => {
        for (const row of rows) {
            if (row.reps == '') {
                Alert.alert('Undefined Reps', 'One or more of your sets have undefined reps. Please fix or press dismiss to autofill reps.');
            } else if (row.weight == '') {
                Alert.alert('Undefined Weight', 'One or more of your sets have undefined weight. Please fix or press dismiss to autofill weight.');
            } else {
                console.log('Success! Row added: ', row);
                await addToDatabase(row);
            }
        }
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

    const handleDropdownChange = (value) => {
        setSelectedDropdown(value);
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.exerciseBox}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    setModalVisible(false);
                    deleteExercise();
                }} style={styles.trashIcon}>
                    <Ionicons name="trash-outline" size={25} color="red" />
                </TouchableOpacity>
            </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalContent}>
                    <EditExerciseModal deleteExercise={deleteExercise} editNote={editNote} closeModal={closeModal} logRows={logRows}/>
                </View>
            </View>
            <Button onPress={() => { setModalVisible(false) }} title='temp close' />
        </Modal>

            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={[
                    styles.inputRow,
                    focusedInputIndex === rowIndex && styles.focusedInputRow,
                ]}>
                    <View style={styles.inputBox}>
                        <Text style={styles.placeholderText}>Reps</Text>
                            <TextInput
                                style={styles.input}
                                value={row.reps}
                                onChangeText={(input) => handleRepsChange(input, rowIndex)}
                                onFocus={() => handleFocus(rowIndex)}
                                onBlur={handleBlur}
                                keyboardType="numeric" />
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.placeholderText}>Weight</Text>
                        <TextInput
                            style={styles.input}
                            value={row.weight}
                            onChangeText={(input) => handleWeightChange(input, rowIndex)}
                            onFocus={() => handleFocus(rowIndex)}
                            onBlur={handleBlur}
                            keyboardType="decimal-pad" />
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.placeholderText}>Notes</Text>
                        <TextInput
                            style={styles.input}
                            value={row.notes}
                            onChangeText={(input) => handleNotesChange(input, rowIndex)}
                            onFocus={() => handleFocus(rowIndex)}
                            onBlur={handleBlur}
                        />
                    </View>
                </View>
            ))}

            <View style={styles.lastRow}>
                <TouchableOpacity onPress={addRow} style={styles.icon}>
                    <Ionicons name="barbell-outline" size={25} color="lightblue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(true)}} style={styles.icon}>
                    <Ionicons name="ellipsis-horizontal" size={25} color="lightblue" />
                </TouchableOpacity>
            </View>

            <Button title="Log Rows" onPress={logRows} color="blue" />
            <Button title="DELETE SETS" onPress={async () => {
                let result = await db.execAsync("DELETE FROM Sets");
                console.log("Deleted Sets");
            }} color="red"/>
        </View>
    );
}

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
        width: '100%',
        marginBottom: 12,
        padding: 10,
        paddingTop: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2c2c2c', // Darker border
        backgroundColor: '#1c1c1e', // Dark background
    },
    focusedInputRow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 6, // Increase shadow for focused input
    },
    input: {
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 8,
        marginTop: 3,
        padding: 8,
        width: '70%',
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
        width: '100%',
        height: 50,
        backgroundColor: '#2e2e2e',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items to center for better appearance
    },
    placeholderText: {
        color: '#888',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trashIcon: {
        margin: 0,
        padding: 0,
    },
    inputBox: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    testOpacity: {
        width: '100%',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    // .
});

export default AddExercise;
