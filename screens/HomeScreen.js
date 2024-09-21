// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';

const HomeScreen = ({}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading databases...</Text>
      <Text style={[styles.text, {fontSize: 10}]}>not really tho its already done</Text>        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Light gray background
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333', // Darker text color
    fontWeight: 'bold', // Bold text
  },
});

export default HomeScreen;
