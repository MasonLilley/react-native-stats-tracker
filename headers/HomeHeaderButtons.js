// CustomHeaderButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomeHeaderButtons = ({ onLeft1ButtonPress, onLeft2ButtonPress, onRight1ButtonPress, onRight2ButtonPress, title }) => (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
    </View>

    <View style={styles.centerContainer}>
      <Text style={styles.centerText}>{title}</Text>
    </View>

    <View style={styles.rightContainer}>
      <TouchableOpacity style={[styles.button, styles.rightButtons]} onPress={onRight2ButtonPress}>
      <Ionicons name="add-circle-outline" size={30} color="#18F3E5" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: '8%',
    },
    leftContainer: {
     display: 'flex',
    },
    centerContainer: {
      display: 'flex',
    },
    rightContainer: {
      display: 'flex',
      marginRight: '100',
    },
    centerText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default HomeHeaderButtons;
