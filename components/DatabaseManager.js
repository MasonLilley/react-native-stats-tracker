import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import  * as SQLite from 'expo-sqlite';

export default function DatabaseManager() {
    const [db, setDb] = useState(null);

    useEffect(() => {
        (async () => {
            const database = await SQLite.openDatabaseAsync('testDatabase');
            await database.execAsync('DROP TABLE IF EXISTS Exercises');
            await database.execAsync(`
                PRAGMA journal_mode = WAL;

                CREATE TABLE IF NOT EXISTS Exercises (
                    id INTEGER PRIMARY KEY NOT NULL,
                    muscle TEXT NOT NULL,
                    name TEXT NOT NULL,
                    notes TEXT
                );

                INSERT INTO Exercises (muscle, name, notes) VALUES ('tricep', 'Tricep Pushdowns', 'Stand away');
                INSERT INTO Exercises (muscle, name, notes) VALUES ('tricep', 'Dips', 'Close grip');
                INSERT INTO Exercises (muscle, name, notes) VALUES ('chest', 'Seated Chest Press', 'Seat on 10');
            `);
            setDb(database);
        })();
    }, []);



    const databaseTest = async () => {
        if (db) {
            for await (const row of db.getEachAsync('SELECT * FROM Exercises WHERE muscle = ?', ['tricep'])) {
                console.log(row.id, row.muscle, row.name, row.notes);
            }
            return 'example return array';
            console.log('Finished.');
        } else {
            console.log('database not real?');
        }
    } 

    return (
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
                databaseTest(); // Call databaseTest to test the database
            }}
        >
            <Text style={styles.buttonText}>DB Test</Text>
        </TouchableOpacity>
    );
}

function exampleFunction() {

}

const styles = StyleSheet.create({

});
