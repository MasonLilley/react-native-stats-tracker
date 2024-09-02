// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CreateWorkout from '../screens/CreateWorkout';
import CreateWorkoutModal from '../screens/CreateWorkoutModal';
import { DefaultTheme } from '@react-navigation/native';
import WorkoutHeaderButtons from '../headers/CreateWorkoutHeaderButtons';
import HomeHeaderButtons from '../headers/HomeHeaderButtons';
import ChooseExerciseModal from '../screens/ChooseExerciseModal';
import CreateWorkoutHeaderButtons from '../headers/CreateWorkoutHeaderButtons';
import ChooseExerciseButtons from '../headers/ChooseExerciseButtons';
import TricepExercises from '../screens/exercises/TricepExercises';


const RootStack = createNativeStackNavigator();

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
    <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
            headerLeft: () => (
              <HomeHeaderButtons
                onRight2ButtonPress={() => navigation.navigate('CreateWorkoutModal')}
                title="Home title"
              />
          ),      
          headerTitle: '',
        })}
        />

        <RootStack.Screen name="CreateWorkout" component={CreateWorkout} options={{

        }}/>
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'fullScreenModal'}}>
        <RootStack.Screen name="CreateWorkoutModal" component={CreateWorkoutModal} options={({ navigation }) => ({
            headerLeft: () => (
              <CreateWorkoutHeaderButtons
                onLeft1ButtonPress={() => navigation.goBack()}
                onLeft2ButtonPress={() => console.log('left2')}
                onRight1ButtonPress={() => console.log('right2')}
                onRight2ButtonPress={() => navigation.navigate('ChooseExerciseModal')}
                title="Title Day/Text"
              />
          ),
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

      <RootStack.Group screenOptions={{ presentation: 'card' }}>
          <RootStack.Screen
            name="TricepExercises"
            component={TricepExercises}
            options={{ title: 'Triceps Exercises' }}
          />
        </RootStack.Group>
    </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AppNavigator = () => {
  return (
    RootStackScreen()
  );
};

export default AppNavigator;
