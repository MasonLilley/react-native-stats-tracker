import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditNoteModal = ({ navigation }) => {
    return (
        <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text>edit note here</Text>
                <TextInput>hi</TextInput>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        backgroundColor: 'red',
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

export default EditNoteModal;
