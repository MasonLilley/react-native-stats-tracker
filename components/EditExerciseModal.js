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
                <Ionicons name="close" size={25}/>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled={false}>
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
                        <Ionicons name="color-wand-sharp" size={24} color='red'/>
                        <Text style={styles.listText}>Delete Sets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listElement}>
                        <Ionicons name="apps" size={24} color='#00A5E0'/>
                        <Text style={styles.listText}>Placeholder</Text>
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
        borderRadius: 10,
        paddingTop: 10,
        alignItems: 'center',
        shadowColor: '#000', // Dark shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
    },
    scrollContainer: {
        padding: 20,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 80,
        width: 300,
        alignSelf: 'center',
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
    },
    listElement: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        // marginLeft: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#333',
        width: '100%',
    },
    itemList: {
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        padding: 5,
        gap: 5,
        width: '100%',
    },
    listText: {
        fontSize: 20,
        color: '#f0f0f0',
    },
    closeButton: {
        flexDirection: 'row',
        position: 'absolute',
        top: -10,
        left: 310,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        width: 50,
    },
});

export default EditExerciseModal;
