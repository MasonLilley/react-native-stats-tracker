import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

function DatabaseFallback() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading databases...</Text>
    </View>
  );
}

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

export default DatabaseFallback;
