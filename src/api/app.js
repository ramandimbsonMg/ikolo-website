import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
    const [users, setUsers] = useState([]);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
    };

    const addUser = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', {
                nom,
                prenom,
                age: parseInt(age),
            });
            setUsers([...users, response.data]);
            setNom('');
            setPrenom('');
            setAge('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des utilisateurs</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.prenom} {item.nom} - {item.age} ans</Text>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
            />
            <TextInput
                style={styles.input}
                placeholder="Âge"
                value={age}
                keyboardType="numeric"
                onChangeText={setAge}
            />
            <Button title="Ajouter un utilisateur" onPress={addUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
});
