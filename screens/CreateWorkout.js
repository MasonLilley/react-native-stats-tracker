import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';


const CreateWorkout = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Create</Text>
      <Button title="gotohome"
        onPress={() => navigation.navigate('Home')} />

      <WebView 
        source={{ uri: 'https://masonlilley.github.io/react-graphs-real' }} 
        style={{ flex: 1 }} 
      />
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default CreateWorkout;
