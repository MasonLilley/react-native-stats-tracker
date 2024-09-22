import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ScrollView, Alert, Modal, Text } from 'react-native';
import AddExercise from '../components/AddExercise';
import EditNoteModal from '../components/EditNoteModal';
import { TurboModuleRegistry } from 'react-native';

function CreateWorkoutModal({ navigation }) {
  const route = useRoute();
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);


  useEffect(() => {
    console.log('Modal visibility changed:', modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    console.log(route.params?.selectedExercise);
    if (route.params?.selectedExercise) {
      const newExercise = {
        id: exercises.length + 1,
        muscle: route.params.selectedExercise.muscle,
        name: route.params.selectedExercise.name,
        notes: route.params.selectedExercise.notes,
      };
      setExercises([...exercises, newExercise]);
    }
  }, [route.params?.selectedExercise]);

  const updateExerciseNote = (note) => {
    console.log('new note to be applied to database :),',note);
  }
  
  const deleteExercise = (id) => {
    Alert.alert('Delete Exercise?', 'Are you sure you want to delete this exercise? This cannot be recovered.', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancelled delete');
          navigation.navigate('EditNoteModal');
          toggleModal();
        },
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => {setExercises(exercises.filter((exercise) => exercise.id !== id));},
        style: 'destructive',
      },

    ]);    
  };

  const editNote = (id) => {
    const exerciseToEdit = exercises.find((exercise) => exercise.id === id);
    setSelectedExercise(exerciseToEdit);
    navigation.navigate('EditNoteModal')
    setModalVisible(true);
  }

  const toggleModal = () => {
    console.log('toggling modalvisible!');
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonContainer}>
        {exercises.map((exercise, index) => (
          <AddExercise
            navigation={navigation}
            key={exercise.id}
            exercise={exercise}
            index={index}
            deleteExercise={() => deleteExercise(exercise.id)}
            editNote={() => editNote(exercise.id)}
          />
        ))}

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalContent}>
                  <EditNoteModal closeModal={toggleModal} exercise={selectedExercise}></EditNoteModal>
                </View>
            </View>
            <Button onPress={() => { setModalVisible(false) }} title='temp close' />
        </Modal>

        <Button
          title="Add Dummy Exercise"
          onPress={() => {
            const newExercise = {
              id: exercises.length + 1,
              muscle: 'bicep',
              name: 'Dumbbell Curl',
              notes: 'Control eccentric',
            };
            setExercises([...exercises, newExercise]);
          }}
        />
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
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'red',
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

});

export default CreateWorkoutModal;
