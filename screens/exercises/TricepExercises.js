import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function TricepsScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Triceps Screen!</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});

export default TricepsScreen;
