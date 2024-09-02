// CustomHeaderButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CreateWorkoutHeaderButtons = ({ onLeft1ButtonPress, onLeft2ButtonPress, onRight1ButtonPress, onRight2ButtonPress, title }) => (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
      <TouchableOpacity style={[styles.button, styles.leftButtons]} onPress={onLeft1ButtonPress} activeOpacity={0.7}>
        <Ionicons name="arrow-back-outline" size={30} color="red" style={styles.icon} />
      </TouchableOpacity>
    </View>

    <View style={styles.centerContainer}>
      <Text style={styles.centerText}>{title}</Text>
    </View>

    <View style={styles.rightContainer}>
      <TouchableOpacity style={[styles.button, styles.rightButtons]} onPress={onRight2ButtonPress}>
      <Ionicons name="add-outline" size={30} color="#18F3E5" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '-3%',
    marginRight: '1%'
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {

  },
  rightButtons: {
    marginRight: '6%',
  },
  leftButtons: {
    
  },
  icon: {

  },
});


export default CreateWorkoutHeaderButtons;
