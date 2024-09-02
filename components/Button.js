import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, theme, onPress }) {
    // Function to get the dynamic style based on pressed state
    const getButtonStyle = ({ pressed }) => {
      const baseStyle = [styles.button];
        if (theme === "primary") {
            return [
                ...baseStyle,
                { backgroundColor: pressed ? '#f0f0f0' : '#fff' } // Change the color when pressed
            ];
        }
        return [
            ...baseStyle,
            { backgroundColor: pressed ? '#dcdcdc' : '#007bff' } // Example: changing color for non-primary theme
        ];
    };

    if (theme === "primary") {
        return (
            <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
                <Pressable style={getButtonStyle} onPress={onPress}>
                    <Text style={[styles.buttonLabel, { color: "#25292e" }]}>Text Here</Text>
                </Pressable>
            </View>
        );
    }
    
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={getButtonStyle} onPress={onPress}>
              <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 30,
    },
});
