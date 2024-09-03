import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Button } from 'react-native';
import TricepsScreen from './exercises/TricepExercises';

function ChooseExerciseModal({ navigation }) {
    const [selectedExercise, setSelectedExercise] = useState('');
    const [buttonsAnimatedValue] = useState(new Animated.Value(0));
    const [exercisesAnimatedValue] = useState(new Animated.Value(200));
    const [isActive, setisActive] = useState(false);

    const animateButton = () => {
        Animated.parallel([
            Animated.timing(buttonsAnimatedValue, {
                toValue: isActive ? 0 : -200, // Animate buttons
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(exercisesAnimatedValue, {
                toValue: isActive ? 100 : -720, // Animate menu content
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();

        setisActive(!isActive);
    };

    const buttonStyle = {
        transform: [
            {
                translateY: buttonsAnimatedValue, // Apply translation to buttons
            },
        ],
    };

    const menuContentStyle = {
        transform: [
            {
                translateY: exercisesAnimatedValue, // Apply translation to menu content
            },
        ],
    };

    return (
        <View style={styles.container}>
            <View style={styles.selections}>
                <TouchableOpacity 
                    style={[styles.button, buttonStyle]} 
                    onPress={() => {
                        setSelectedExercise('Triceps'); // Set selected exercise
                        animateButton();
                    }}
                >
                    <Text style={styles.buttonText}>Triceps</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, buttonStyle]} 
                    onPress={() => {
                        setSelectedExercise('Biceps'); // Set selected exercise
                        animateButton();
                    }}
                >
                    <Text style={styles.buttonText}>Biceps</Text>
                </TouchableOpacity>
                
            </View>

            {(
                <Animated.View style={[styles.menuContent, menuContentStyle]}>
                    {renderMenuContent()}
                </Animated.View>
            )}
        </View>
    );

    function renderMenuContent() {
        switch (selectedExercise) {
            case 'Triceps':
                return (
                    <View>
                        <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => animateButton()}>
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                        <TricepsScreen />
                    </View>
                );
            case 'Biceps':
                return (
                    <Text style={styles.menuText}>Biceps Exercises Content</Text>
                );
            default:
                return null; 
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        width: '100%',
    },
    selections: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
    menuContent: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: -725,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        elevation: 4,
        // backgroundColor: 'lightgray',
    },
    menuText: {
        fontSize: 18,
        color: '#333',
    },
    triceps: {
        backgroundColor: 'black',
    },
    morebutton: {
    },
    text: {
        color: 'red',
        fontSize: '20',
    }
});

export default ChooseExerciseModal;
