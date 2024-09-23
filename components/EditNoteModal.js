import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const EditNoteModal = ({ }) => {
    const route = useRoute();
    const [note, setNote] = useState('');

    const handleConfirmNote = () => {
        if (route.params && route.params.onConfirm) {
            route.params.onConfirm(note);
        }
    };

    const handleNoteChange = (input) => {
        setNote(input);
    };
    
    const closeModal = () => {
        route.params.cancelEdit();
    }

    return (
        <View style={styles.modalContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write your note here..."
                    placeholderTextColor="#7d7d7d"
                    onChangeText={(input) => handleNoteChange(input)}
                    multiline
                />
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                        <Text style={styles.cancelButtonText}>Cancel Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmNote}>
                        <Text style={styles.confirmButtonText}>Confirm Note</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: 20,
        backgroundColor: '#1e1e1e',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 10,
    },
    scrollContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#2c2c2c',
        color: 'white',
        fontSize: 18,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#444',
        borderWidth: 1,
        height: 150,
        minWidth: 300,
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    }
});

export default EditNoteModal;
