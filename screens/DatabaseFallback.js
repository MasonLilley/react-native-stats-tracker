import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

function DatabaseFallback({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>FALLBACK</Text>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignITems: 'center',
    justifyContent: 'center',

  },  
});

  export default DatabaseFallback;