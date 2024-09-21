import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, LogBox } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditExerciseModal = ({ navigation, deleteExercise, editNote }) => {

    const handleDelete = () => {
        deleteExercise();
    };


    const handleLog = () => {
        editNote();
    }
    return (
        <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.topRow}>
                    <View style={styles.mainOption}>
                        <TouchableOpacity style={styles.topButton} onPress={() => {/* yeah */}}>
                            <Text style={styles.mainOptionText}>Edit Note</Text>
                            <Ionicons name='create-outline' size={50} color='blue'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainOption}>
                        <TouchableOpacity style={styles.topButton} onPress={ handleLog }>
                            <Text style={styles.mainOptionText}>IDK TBH</Text>
                            <Ionicons name='bag-check' size={50} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainOption}>
                        <TouchableOpacity style={styles.topButton} onPress={ handleDelete }>
                            <Text style={styles.mainOptionText}>Delete</Text>
                            <Ionicons name='trash-outline' size={50} color='red'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    scrollContainer: {
        padding: 20,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 100,
        width: '100%',
        borderWidth: 10,
        borderColor: 'lightgrey',
        borderRadius: 10,
    },
    topButton: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 16,
        color: 'white',
    },
    mainOption: {
        alignItems: 'center',
        width: '30%',
    },
    mainOptionText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Georgia',
    },
});

export default EditExerciseModal;
