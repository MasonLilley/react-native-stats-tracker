import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, View, TouchableWithoutFeedback, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function StatisticsHome() {
    const slideAnim = useRef(new Animated.Value(100)).current; // Initial position is below the screen
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
    const promptFadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for prompt is 0
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [showPrompt, setShowPrompt] = useState(false);
    const [showGraphOptions, setShowGraphOptions] = useState(false);

    // Dropdown state for workout, detail, and graph type
    const [workoutOpen, setWorkoutOpen] = useState(false);
    const [workoutValue, setWorkoutValue] = useState(null);
    const [workoutItems, setWorkoutItems] = useState([
        { label: 'Chest Press', value: 'chest_press' },
        { label: 'Squat', value: 'squat' },
        { label: 'Deadlift', value: 'deadlift' },
        { label: 'Bicep Curl', value: 'bicep_curl' },
    ]);

    const [detailOpen, setDetailOpen] = useState(false);
    const [detailValue, setDetailValue] = useState(null);
    const [detailItems, setDetailItems] = useState([
        { label: 'Weight Lifted', value: 'weight' },
        { label: 'Reps Completed', value: 'reps' },
        { label: 'Workout Duration', value: 'duration' },
    ]);

    const [graphOpen, setGraphOpen] = useState(false);
    const [graphValue, setGraphValue] = useState(null);
    const [graphItems, setGraphItems] = useState([
        { label: 'Line Graph', value: 'line' },
        { label: 'Bar Chart', value: 'bar' },
        { label: 'Pie Chart', value: 'pie' },
    ]);

    const topics = [
        {
            title: 'Welcome to Statistics',
            description: 'Tracking your progress is crucial to improving your workouts.',
        },
        {
            title: 'Measure Your Growth',
            description: 'By keeping track of your workouts, you can see how your strength, endurance, and performance evolve over time.',
        },
        {
            title: 'Stay Motivated',
            description: 'Seeing your past achievements keeps you motivated to push harder, knowing that your efforts lead to real results.',
        },
    ];

    useEffect(() => {
        if (!showGraphOptions) {
            animateTopic();

            // Show "Tap to continue" prompt if no interaction after 3 seconds
            const promptTimeout = setTimeout(() => {
                setShowPrompt(true);
                Animated.timing(promptFadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }, 3000);

            return () => clearTimeout(promptTimeout);
        }
    }, [currentTopicIndex, showGraphOptions]);

    const animateTopic = () => {
        // Reset animation values
        slideAnim.setValue(100);
        fadeAnim.setValue(0);
        promptFadeAnim.setValue(0);
        setShowPrompt(false);

        // Start the slide and fade animations
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleNextTopic = () => {
        if (currentTopicIndex < topics.length - 1) {
            setCurrentTopicIndex((prevIndex) => prevIndex + 1);
        } else {
            setShowGraphOptions(true);
        }
    };

    if (showGraphOptions) {
        return (
            <View style={styles.optionsContainer}>
                <Text style={styles.optionsTitle}>Workout Statistics Options</Text>

                {/* Dropdown for selecting a workout */}
                <Text style={styles.optionLabel}>Select Workout:</Text>
                <DropDownPicker
                    open={workoutOpen}
                    value={workoutValue}
                    items={workoutItems}
                    setOpen={setWorkoutOpen}
                    setValue={setWorkoutValue}
                    setItems={setWorkoutItems}
                    placeholder="Select a workout..."
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    zIndex={3000}
                    zIndexInverse={1000}
                />

                {/* Dropdown for selecting a detail to graph */}
                <Text style={styles.optionLabel}>Select Detail to Graph:</Text>
                <DropDownPicker
                    open={detailOpen}
                    value={detailValue}
                    items={detailItems}
                    setOpen={setDetailOpen}
                    setValue={setDetailValue}
                    setItems={setDetailItems}
                    placeholder="Select a detail..."
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    zIndex={2000}
                    zIndexInverse={2000}
                />

                {/* Dropdown for selecting the type of graph */}
                <Text style={styles.optionLabel}>Select Graph Type:</Text>
                <DropDownPicker
                    open={graphOpen}
                    value={graphValue}
                    items={graphItems}
                    setOpen={setGraphOpen}
                    setValue={setGraphValue}
                    setItems={setGraphItems}
                    placeholder="Select a graph type..."
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    zIndex={1000}
                    zIndexInverse={3000}
                />

                {/* Button to proceed with generating the graph */}
                <Button
                    title="Generate Graph"
                    onPress={() => {
                        console.log('Generating graph for:', {
                            workout: workoutValue,
                            detail: detailValue,
                            graphType: graphValue,
                        });
                    }}
                    disabled={!workoutValue || !detailValue || !graphValue}
                />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={handleNextTopic}>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.animatedView,
                        { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
                    ]}
                >
                    <Text style={styles.text}>{topics[currentTopicIndex].title}</Text>
                    <Text style={styles.subText}>{topics[currentTopicIndex].description}</Text>
                </Animated.View>
                {showPrompt && (
                    <Animated.View style={{ opacity: promptFadeAnim }}>
                        <Text style={styles.promptText}>Tap to continue</Text>
                    </Animated.View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', // Dark mode background
    },
    animatedView: {
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: '#ff8c00', // Orange color for main titles
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#ffffff', // White text for contrast
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    promptText: {
        fontSize: 16,
        color: '#aaaaaa', // Light grey text for prompt
        marginTop: 20,
        textAlign: 'center',
    },
    optionsContainer: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    optionsTitle: {
        fontSize: 28,
        color: '#ff8c00', // Orange color for titles
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    optionLabel: {
        fontSize: 18,
        color: '#ffffff',
        marginTop: 10,
        marginBottom: 5,
    },
    dropdown: {
        backgroundColor: '#343a40', // Darker background for dropdown
        borderColor: '#ff8c00', // Orange border for visibility
    },
    dropdownContainer: {
        backgroundColor: '#2a2a2a',
        borderColor: '#ff8c00', // Orange border for dropdown container as well
    },
});

export default StatisticsHome;
