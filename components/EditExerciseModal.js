import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditExerciseModal = ({ navigation, deleteExercise, editNote, closeModal, logRows, deleteSets }) => {

    const handleDelete = () => {
        deleteExercise();
    };

    const handleLog = () => {
        editNote();
    }
    
    return (
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {closeModal();}}>
                <Ionicons name="close" size={20}/>
                <Text styles={styles.closeButtonText}>CLOSE MODAL</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.topRow}>
                    <View style={styles.mainOption}>
                        <TouchableOpacity style={styles.topButton} onPress={handleLog}>
                            <Text style={styles.mainOptionText}>Edit Note</Text>
                            <Ionicons name='create-outline' size={50} color='#00A5E0'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainOption}>
                        <TouchableOpacity style={styles.topButton} onPress={() => {}}>
                            <Text style={styles.mainOptionText}>IDK TBH</Text>
                            <Ionicons name='bag-check' size={50} color='#00A5E0'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainOption}>
                        <TouchableOpacity style={styles.topButton} onPress={handleDelete}>
                            <Text style={styles.mainOptionText}>Delete</Text>
                            <Ionicons name='trash-outline' size={50} color='#E04C4C'/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.itemList}>
                    <TouchableOpacity style={styles.listElement} onPress={logRows}>
                        <Ionicons name="save-sharp" size={24} color='#00A5E0'/>
                        <Text style={styles.listText}>Log Rows</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listElement} onPress={deleteSets}>
                        <Ionicons name="save-sharp" size={24} color='#00A5E0'/>
                        <Text style={styles.listText}>Delete Sets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listElement}>
                        <Ionicons name="save-sharp" size={24} color='#00A5E0'/>
                        <Text style={styles.listText}>Log Rows</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: 20,
        backgroundColor: '#1e1e1e', // Dark background
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000', // Dark shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 10,
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
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'lightblue',
        borderRadius: 10,
        backgroundColor: '#2a2a2a',
        marginBottom: 10,
    },
    topButton: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 5,
    },
    mainOption: {
        alignItems: 'center',
        width: '30%',
    },
    mainOptionText: {
        color: '#f0f0f0', // Light font color for dark mode
        fontSize: 15,
        fontFamily: 'Georgia',
    },
    listElement: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#333', // Darker background for list elements
    },
    itemList: {
        backgroundColor: '#2a2a2a', // Darker background for the list container
        borderRadius: 5,
        padding: 5,
        gap: 5,
    },
    listText: {
        fontSize: 20,
        fontFamily: 'Times New Roman',
        color: '#f0f0f0',
    },
    closeButton: {
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        left: 34,
        width: '100%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    closeButtonText: {
        fontSize: 20,
        fontFamily: "Times New Roman",
        color: '#f0f0f0',
    },
});

export default EditExerciseModal;
