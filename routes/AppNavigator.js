// AppNavigator.js
import React from 'react';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CreateWorkoutModal from '../screens/CreateWorkoutModal';
import { DefaultTheme } from '@react-navigation/native';
import HomeHeaderButtons from '../headers/HomeHeaderButtons';
import ChooseExerciseModal from '../screens/ChooseExerciseModal';
import CreateWorkoutHeaderButtons from '../headers/CreateWorkoutHeaderButtons';
import ChooseExerciseButtons from '../headers/ChooseExerciseButtons';
import TricepExercises from '../screens/exercises/TricepExercises';
import EditNoteModal from '../components/EditNoteModal';
import StatisticsHome from '../screens/statistics/StatisticsHome';

const getCurrentDay = () => {
  const date = new Date();
  const options = { weekday: 'long' }; // This will return the full name of the day (e.g., "Monday")
  const currentDay = date.toLocaleDateString('en-US', options);

  return currentDay;
};

const RootStack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4511e', // Primary color
    background: '#121212', // Dark background
    card: '#1e1e1e', // Dark card
    text: '#ffffff', // Light text
    border: '#333333', // Dark border
  },
};

function RootStackScreen() {
  return (
    // <SQLiteProvider databaseName='exerciseDB.db' assetSource={{ assetId: require('../assets/exerciseDB.db') }}>
    <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
            headerLeft: () => (
              <HomeHeaderButtons
                onLeft1ButtonPress={() => navigation.navigate('StatisticsHome')}
                onRight2ButtonPress={() => navigation.navigate('CreateWorkoutModal')}
                title="Home title"
              />
          ),      
          headerTitle: '',
        })}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'fullScreenModal'}}>
        <RootStack.Screen name="CreateWorkoutModal" component={CreateWorkoutModal} options={({ navigation }) => ({
            headerLeft: () => (
              <CreateWorkoutHeaderButtons
                onLeft1ButtonPress={() => navigation.goBack()}
                onLeft2ButtonPress={() => console.log('left2')}
                onRight1ButtonPress={() => console.log('right2')}
                onRight2ButtonPress={() => navigation.navigate('ChooseExerciseModal')}
                title={() => getCurrentDay()}
              />
          ),
          headerStyle: {
            backgroundColor: 'lightgrey',
          },
        })}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'modal'}}>
        <RootStack.Screen name="ChooseExerciseModal" component={ChooseExerciseModal} options={({ navigation }) => ({
            headerLeft: () => (
              <ChooseExerciseButtons
                onLeft1ButtonPress={() => navigation.goBack()}
                onRight2ButtonPress={() => navigation.navigate('')}
                title="Choose Exercise"
              />
          ),
        })}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'modal'}}>
        <RootStack.Screen name="EditNoteModal" component={EditNoteModal} options={({ navigation }) => ({
            headerLeft: () => (
              <ChooseExerciseButtons
                onLeft1ButtonPress={() => navigation.goBack()}
                onRight2ButtonPress={() => navigation.navigate('')}
                title="Edit Note Modal"
              />
          ),
        })}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'card' }}>
          <RootStack.Screen
            name="TricepExercises"
            component={TricepExercises}
            options={{ title: 'Triceps Exercises' }}
          />
        </RootStack.Group>

        <RootStack.Group screenOptions={{ presentation: 'card' }}>
          <RootStack.Screen
            name="StatisticsHome"
            component={StatisticsHome}
            options={{ title: 'Statistics Home' }}
          />
        </RootStack.Group>


    </RootStack.Navigator>
    </NavigationContainer>
    // </SQLiteProvider>
  );
}

const AppNavigator = () => {
  return (
    RootStackScreen()
  );
};

export default AppNavigator;
